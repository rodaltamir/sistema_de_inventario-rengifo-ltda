"use server";

import { getTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface MovimientoImportado {
  productoCodigo: string;
  productoNombre: string;
  marca?: string;
  descripcion?: string;
  unidadMedida?: string;
  fecha: string; // Formato YYYY-MM-DD o ISO string
  tipoTransaccion: "VENTA" | "COMPRA" | "INVENTARIO INICIAL";
  nitCi: string;
  razonSocial: string;
  nroDocumento: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  saldoStock?: number;
}

export interface OpcionesImportacion {
  crearProductosFaltantes?: boolean;
  actualizarStock?: boolean;
  crearContactosFaltantes?: boolean;
}

export async function importarTransacciones(
  movimientos: MovimientoImportado[],
  opciones: OpcionesImportacion = { crearProductosFaltantes: true, actualizarStock: true, crearContactosFaltantes: true }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa o conexión de base de datos disponible");
  }

  if (!movimientos || movimientos.length === 0) {
    return {
      success: true,
      count: 0,
      transactionsCreated: 0,
      itemsAddedToExistingTransactions: 0,
      transactionsSkippedDuplicate: 0,
      productsCreated: 0,
      productsReused: 0,
      clientsCreated: 0,
      providersCreated: 0
    };
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validar y filtrar movimientos válidos
  const movimientosValidos: MovimientoImportado[] = [];
  for (let idx = 0; idx < movimientos.length; idx++) {
    const m = movimientos[idx];
    if (!m) continue;

    const cod = (m.productoCodigo || "").trim();
    const nom = (m.productoNombre || "").trim();
    if (!cod && !nom) continue; // No tiene ni código ni nombre

    // Validar fecha
    let fechaObj: Date;
    if (m.fecha && m.fecha.includes("T")) {
      fechaObj = new Date(m.fecha);
    } else if (m.fecha) {
      const parts = m.fecha.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        const [year, month, day] = parts;
        fechaObj = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12, 0, 0));
      } else {
        fechaObj = new Date(m.fecha);
      }
    } else {
      fechaObj = new Date();
    }

    if (isNaN(fechaObj.getTime())) {
      fechaObj = new Date();
    }

    const anio = fechaObj.getUTCFullYear();
    if (anio < 1990 || anio > 2100) {
      fechaObj = new Date();
    }

    const cant = Math.max(1, Math.abs(Math.round(m.cantidad || 1)));
    let pu = Math.max(0, Math.abs(m.precioUnitario || 0));
    let sub = Math.max(0, Math.abs(m.subtotal || 0));

    if (pu === 0 && sub > 0 && cant > 0) {
      pu = Number((sub / cant).toFixed(4));
    }
    if (sub === 0 && pu > 0 && cant > 0) {
      sub = Number((cant * pu).toFixed(2));
    }

    const docKey = (m.nroDocumento || "").trim() || `DOC-IMP-${idx + 1}`;
    const nitKey = (m.nitCi || "").trim() || "0";
    const tipoTx: "VENTA" | "COMPRA" | "INVENTARIO INICIAL" = 
      m.tipoTransaccion === "COMPRA" || m.tipoTransaccion === "INVENTARIO INICIAL" 
        ? m.tipoTransaccion 
        : "VENTA";
    const razonKey = (m.razonSocial || "").trim() || (tipoTx === "VENTA" ? "CLIENTE GENERAL" : "PROVEEDOR GENERAL");

    movimientosValidos.push({
      productoCodigo: cod,
      productoNombre: nom || `Producto ${cod}`,
      marca: (m.marca || "").trim(),
      descripcion: (m.descripcion || "").trim(),
      unidadMedida: (m.unidadMedida || "").trim() || "Unidad",
      fecha: fechaObj.toISOString(),
      tipoTransaccion: tipoTx,
      nitCi: nitKey,
      razonSocial: razonKey,
      nroDocumento: docKey,
      cantidad: cant,
      precioUnitario: pu,
      subtotal: sub,
      saldoStock: m.saldoStock
    });
  }

  if (movimientosValidos.length === 0) {
    throw new Error("Ninguno de los movimientos seleccionados contiene información válida para importar.");
  }

  // Cargar TODOS los productos de la empresa para reutilización y mapeo ÚNICAMENTE por código
  const todosLosProductos = await tenantPrisma.producto.findMany({
    select: {
      codigo: true,
      nombre: true,
      marca: true,
      descripcion: true,
      unidadMedida: true,
      stock: true,
      costo: true,
      precioVenta: true,
    }
  });

  const mapaPorCodigo = new Map<string, typeof todosLosProductos[0]>();

  for (const p of todosLosProductos) {
    if (p.codigo) mapaPorCodigo.set(p.codigo.trim().toLowerCase(), p);
  }

  // Reutilizar productos existentes por coincidencia de código ÚNICAMENTE
  const productosReutilizadosSet = new Set<string>();

  for (const m of movimientosValidos) {
    const codKey = m.productoCodigo.trim().toLowerCase();

    const prodExistente = codKey ? mapaPorCodigo.get(codKey) : undefined;

    if (prodExistente) {
      m.productoCodigo = prodExistente.codigo;
      m.productoNombre = prodExistente.nombre;
      if (prodExistente.marca) m.marca = prodExistente.marca;
      if (prodExistente.unidadMedida) m.unidadMedida = prodExistente.unidadMedida;
      productosReutilizadosSet.add(prodExistente.codigo);
    }
  }

  // 1. Identificar y crear Clientes y Proveedores si faltan
  let clientesCreadosCount = 0;
  let proveedoresCreadosCount = 0;
  const mapaProveedoresId = new Map<string, string>(); // codigoProducto -> proveedorId

  if (opciones.crearContactosFaltantes !== false) {
    const contactosExistentes = await tenantPrisma.proveedor.findMany({
      select: { id: true, nombre: true, nit: true, tipo: true }
    });

    const nombresClientes = new Set(
      contactosExistentes
        .filter((c) => c.tipo === "CLIENTE")
        .map((c) => c.nombre.trim().toLowerCase())
    );
    const nitsClientes = new Set(
      contactosExistentes
        .filter((c) => c.tipo === "CLIENTE" && c.nit && c.nit !== "0" && c.nit.toUpperCase() !== "S/N")
        .map((c) => c.nit.trim())
    );

    const nombresProveedores = new Set(
      contactosExistentes
        .filter((c) => c.tipo === "PROVEEDOR")
        .map((c) => c.nombre.trim().toLowerCase())
    );
    const nitsProveedores = new Set(
      contactosExistentes
        .filter((c) => c.tipo === "PROVEEDOR" && c.nit && c.nit !== "0" && c.nit.toUpperCase() !== "S/N")
        .map((c) => c.nit.trim())
    );

    const nombresGenericos = new Set([
      "cliente general",
      "proveedor general",
      "inventario inicial",
      "saldo inicial",
      "ajuste por inventario (negativo)",
      "ajuste por inventario (positivo)",
      "ajuste de inventario",
      "s/n",
      "sin nombre",
      "ninguno",
      "0",
      "null",
      "undefined",
      "anonimo",
      "anónimo"
    ]);

    for (const m of movimientosValidos) {
      const nombre = (m.razonSocial || "").trim();
      const nombreLower = nombre.toLowerCase();
      if (!nombre || nombresGenericos.has(nombreLower)) continue;

      const nit = (m.nitCi || "").trim() || "0";
      const esVenta = m.tipoTransaccion === "VENTA";
      const tipoContacto = esVenta ? "CLIENTE" : "PROVEEDOR";

      if (tipoContacto === "CLIENTE") {
        const existePorNombre = nombresClientes.has(nombreLower);
        const existePorNit = nit !== "0" && nit.toUpperCase() !== "S/N" && nitsClientes.has(nit);

        if (!existePorNombre && !existePorNit) {
          await tenantPrisma.proveedor.create({
            data: {
              nombre: nombre,
              nit: nit,
              tipo: "CLIENTE",
              logo: "user"
            }
          });
          nombresClientes.add(nombreLower);
          if (nit !== "0" && nit.toUpperCase() !== "S/N") nitsClientes.add(nit);
          clientesCreadosCount++;
        }
      } else {
        const existePorNombre = nombresProveedores.has(nombreLower);
        const existePorNit = nit !== "0" && nit.toUpperCase() !== "S/N" && nitsProveedores.has(nit);

        let proveedorId: string | null = null;

        if (!existePorNombre && !existePorNit) {
          const nuevoProv = await tenantPrisma.proveedor.create({
            data: {
              nombre: nombre,
              nit: nit,
              tipo: "PROVEEDOR",
              logo: "truck"
            }
          });
          nombresProveedores.add(nombreLower);
          if (nit !== "0" && nit.toUpperCase() !== "S/N") nitsProveedores.add(nit);
          proveedoresCreadosCount++;
          proveedorId = nuevoProv.id;
        } else {
          const provExistente = contactosExistentes.find(
            (c) => c.tipo === "PROVEEDOR" && (
              c.nombre.trim().toLowerCase() === nombreLower ||
              (nit !== "0" && nit.toUpperCase() !== "S/N" && c.nit.trim() === nit)
            )
          );
          if (provExistente) proveedorId = provExistente.id;
        }

        if (proveedorId && m.productoCodigo) {
          mapaProveedoresId.set(m.productoCodigo.trim(), proveedorId);
        }
      }
    }
  }

  // 2. Identificar productos auténticamente nuevos y crearlos si faltan (VALIDACIÓN ESTRICTA POR CÓDIGO)
  let productosCreadosCount = 0;
  const codigosEnMovimientos = Array.from(new Set(movimientosValidos.map((m) => m.productoCodigo.trim()))).filter(Boolean);

  if (opciones.crearProductosFaltantes !== false) {
    for (const cod of codigosEnMovimientos) {
      const codLower = cod.toLowerCase();
      // Si ya existe por código en los mapas o BD, no recrear
      if (!mapaPorCodigo.has(codLower)) {
        const movsDelProd = movimientosValidos.filter((m) => m.productoCodigo.trim().toLowerCase() === codLower);
        const muestra = movsDelProd[0];
        const nom = (muestra?.productoNombre || `Producto ${cod}`).trim();

        const compraOInicial = movsDelProd.find((m) => m.tipoTransaccion !== "VENTA" && m.precioUnitario > 0);
        const ventaMov = movsDelProd.find((m) => m.tipoTransaccion === "VENTA" && m.precioUnitario > 0);

        const costoIni = compraOInicial ? Math.abs(compraOInicial.precioUnitario) : Math.abs(muestra?.precioUnitario || 0);
        const pVentaIni = ventaMov ? Math.abs(ventaMov.precioUnitario) : (costoIni > 0 ? costoIni * 1.25 : 0);
        const provIdParaProd = mapaProveedoresId.get(cod) || null;

        const nuevoProd = await tenantPrisma.producto.create({
          data: {
            codigo: cod,
            nombre: nom,
            marca: muestra?.marca || "",
            descripcion: muestra?.descripcion || "",
            unidadMedida: muestra?.unidadMedida || "Unidad",
            stock: 0,
            costo: Math.max(0, costoIni),
            precioVenta: Math.max(0, pVentaIni),
            metodoInventario: "Promedio Ponderado",
            activo: true,
            proveedorId: provIdParaProd,
          }
        });

        mapaPorCodigo.set(nuevoProd.codigo.trim().toLowerCase(), nuevoProd);
        productosCreadosCount++;
      }
    }
  }

  // 3. Agrupar movimientos en Transacciones según N° Documento, Fecha, Tipo y Cliente/Proveedor
  type GrupoTx = {
    tipoTransaccion: "VENTA" | "COMPRA" | "INVENTARIO INICIAL";
    nroDocumento: string;
    fecha: Date;
    nitCi: string;
    razonSocial: string;
    detalles: Array<{
      productoCodigo: string;
      cantidad: number;
      precioUnitario: number;
      subtotal: number;
    }>;
  };

  const gruposMap = new Map<string, GrupoTx>();

  for (let idx = 0; idx < movimientosValidos.length; idx++) {
    const m = movimientosValidos[idx];
    const cod = m.productoCodigo.trim();
    if (!cod) continue;

    const fechaObj = new Date(m.fecha);
    const fechaKey = fechaObj.toISOString().slice(0, 10);
    const docKey = m.nroDocumento;
    const nitKey = m.nitCi;
    const razonKey = m.razonSocial;

    const claveGrupo = `${m.tipoTransaccion}___${docKey}___${fechaKey}___${nitKey}___${razonKey}`;

    if (!gruposMap.has(claveGrupo)) {
      gruposMap.set(claveGrupo, {
        tipoTransaccion: m.tipoTransaccion,
        nroDocumento: docKey,
        fecha: fechaObj,
        nitCi: nitKey,
        razonSocial: razonKey,
        detalles: []
      });
    }

    const grupo = gruposMap.get(claveGrupo)!;
    const detExistente = grupo.detalles.find(
      (d) => d.productoCodigo.trim().toLowerCase() === cod.toLowerCase()
    );

    if (detExistente) {
      detExistente.cantidad += m.cantidad;
      detExistente.subtotal += m.subtotal;
      if (detExistente.cantidad > 0) {
        detExistente.precioUnitario = Number((detExistente.subtotal / detExistente.cantidad).toFixed(4));
      }
    } else {
      grupo.detalles.push({
        productoCodigo: cod,
        cantidad: m.cantidad,
        precioUnitario: m.precioUnitario,
        subtotal: m.subtotal
      });
    }
  }

  const listaTransacciones = Array.from(gruposMap.values());
  let transaccionesCreadasCount = 0;
  let itemsAgregadosExistentesCount = 0;
  let transaccionesOmitidasDuplicadasCount = 0;

  // 4. Insertar transacciones y pagos en lotes (chunks) evitando duplicados por factura + producto
  const CHUNK_SIZE = 30;
  for (let i = 0; i < listaTransacciones.length; i += CHUNK_SIZE) {
    const chunk = listaTransacciones.slice(i, i + CHUNK_SIZE);

    await tenantPrisma.$transaction(async (tx) => {
      for (const tData of chunk) {
        // DEDUPLICACIÓN INTELIGENTE: Comprobar si ya existe una transacción en el mismo día con el mismo N° documento y tipo
        const inicioDia = new Date(tData.fecha);
        inicioDia.setUTCHours(0, 0, 0, 0);
        const finDia = new Date(tData.fecha);
        finDia.setUTCHours(23, 59, 59, 999);

        const txExistente = await tx.transaccion.findFirst({
          where: {
            tipoTransaccion: tData.tipoTransaccion,
            nroDocumento: tData.nroDocumento,
            fecha: {
              gte: inicioDia,
              lte: finDia
            }
          },
          include: {
            detalles: true
          }
        });

        if (txExistente) {
          // Obtener los códigos de los productos que YA están en la factura existente
          const codigosEnTxExistente = new Set(
            txExistente.detalles.map((d) => d.productoCodigo.trim().toLowerCase())
          );

          // Filtrar únicamente los productos que NO existen todavía en la factura
          // (permitiendo que una misma factura contenga múltiples productos diferentes)
          const detallesNuevos = tData.detalles.filter(
            (d) => !codigosEnTxExistente.has(d.productoCodigo.trim().toLowerCase())
          );

          if (detallesNuevos.length === 0) {
            // Todos los productos de esta factura ya estaban registrados (duplicado exacto de factura + producto)
            transaccionesOmitidasDuplicadasCount++;
            continue;
          }

          // Si hay productos nuevos que pertenecen a esta misma factura,
          // los incorporamos como nuevos detalles a la transacción existente
          for (const d of detallesNuevos) {
            await tx.detalleTransaccion.create({
              data: {
                transaccionId: txExistente.id,
                productoCodigo: d.productoCodigo,
                cantidad: d.cantidad,
                precioUnitario: d.precioUnitario,
                subtotal: d.subtotal
              }
            });
          }

          // Registrar pago adicional correspondiente a los nuevos productos agregados a la factura
          const totalNuevos = detallesNuevos.reduce((acc, d) => acc + d.subtotal, 0);
          if (totalNuevos > 0) {
            await tx.pago.create({
              data: {
                transaccionId: txExistente.id,
                monto: totalNuevos,
                fecha: tData.fecha,
                observaciones: "Pago correspondiente a nuevos productos incorporados a la factura en importación"
              }
            });
          }

          // Si la factura existente tenía cliente/proveedor genérico y la nueva tiene nombre real, enriquecer
          const esGenerico = (nombre: string) =>
            !nombre ||
            nombre === "CLIENTE GENERAL" ||
            nombre === "PROVEEDOR GENERAL";

          if (esGenerico(txExistente.razonSocial) && !esGenerico(tData.razonSocial)) {
            await tx.transaccion.update({
              where: { id: txExistente.id },
              data: {
                razonSocial: tData.razonSocial,
                nitCi: tData.nitCi !== "0" ? tData.nitCi : txExistente.nitCi
              }
            });
          }

          itemsAgregadosExistentesCount += detallesNuevos.length;
          continue;
        }

        const totalTx = tData.detalles.reduce((acc, d) => acc + d.subtotal, 0);

        const nuevaTx = await tx.transaccion.create({
          data: {
            tipoTransaccion: tData.tipoTransaccion,
            nroDocumento: tData.nroDocumento,
            fecha: tData.fecha,
            nitCi: tData.nitCi,
            razonSocial: tData.razonSocial,
            formaPago: "EFECTIVO",
            descuento: 0,
            observaciones: "Importación desde Excel (Kardex / Movimientos)",
            createdAt: tData.fecha,
            detalles: {
              create: tData.detalles.map((d) => ({
                productoCodigo: d.productoCodigo,
                cantidad: d.cantidad,
                precioUnitario: d.precioUnitario,
                subtotal: d.subtotal
              }))
            }
          }
        });

        // Registrar pago completado para mantener coherencia financiera
        await tx.pago.create({
          data: {
            transaccionId: nuevaTx.id,
            monto: totalTx,
            fecha: tData.fecha,
            observaciones: "Pago completado por importación histórica"
          }
        });

        transaccionesCreadasCount++;
      }
    });
  }

  // 5. Actualizar Stock y Costos / Precios de Venta en la tabla Producto
  const codigosAActualizar = Array.from(new Set(movimientosValidos.map((m) => m.productoCodigo.trim()))).filter(Boolean);

  if (opciones.actualizarStock !== false) {
    for (const cod of codigosAActualizar) {
      // Sincronizar el stock real consultando todas las transacciones históricas registradas para el producto
      const detalles = await tenantPrisma.detalleTransaccion.findMany({
        where: { productoCodigo: cod },
        select: {
          cantidad: true,
          precioUnitario: true,
          transaccion: {
            select: { tipoTransaccion: true, fecha: true }
          }
        },
        orderBy: { transaccion: { fecha: "asc" } }
      });

      let stockCalculado = 0;
      let ultimoCosto = 0;
      let ultimoPrecioVenta = 0;

      for (const d of detalles) {
        if (d.transaccion.tipoTransaccion === "VENTA") {
          stockCalculado -= d.cantidad;
          if (d.precioUnitario > 0) ultimoPrecioVenta = d.precioUnitario;
        } else {
          // COMPRA, INVENTARIO INICIAL o SALDO INICIAL
          stockCalculado += d.cantidad;
          if (d.precioUnitario > 0) ultimoCosto = d.precioUnitario;
        }
      }

      const stockFinal = Math.round(stockCalculado);

      await tenantPrisma.producto.update({
        where: { codigo: cod },
        data: {
          stock: stockFinal,
          ...(ultimoCosto > 0 ? { costo: Math.abs(ultimoCosto) } : {}),
          ...(ultimoPrecioVenta > 0 ? { precioVenta: Math.abs(ultimoPrecioVenta) } : {})
        }
      });
    }
  }

  // Revalidar rutas para refrescar la UI
  revalidatePath("/historial");
  revalidatePath("/kardex");
  revalidatePath("/productos");
  revalidatePath("/dashboard");
  revalidatePath("/transacciones");
  revalidatePath("/proveedores");

  return {
    success: true,
    count: movimientosValidos.length,
    transactionsCreated: transaccionesCreadasCount,
    itemsAddedToExistingTransactions: itemsAgregadosExistentesCount,
    transactionsSkippedDuplicate: transaccionesOmitidasDuplicadasCount,
    productsCreated: productosCreadosCount,
    productsReused: productosReutilizadosSet.size,
    clientsCreated: clientesCreadosCount,
    providersCreated: proveedoresCreadosCount
  };
}

export interface TransaccionEditPayload {
  tipoTransaccion: string;
  nroDocumento: string;
  fecha: string;
  nitCi: string;
  razonSocial: string;
  formaPago: string;
  descuento: number;
  observaciones?: string;
  detalles: Array<{
    productoCodigo: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }>;
}

export async function eliminarTransaccion(transaccionId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Buscar transacción existente con sus relaciones
  const txObj = await tenantPrisma.transaccion.findUnique({
    where: { id: transaccionId },
    include: {
      detalles: true,
      pagos: true,
      deudaCredito: true,
    }
  });

  if (!txObj) {
    throw new Error("La transacción no existe o ya fue eliminada.");
  }

  await tenantPrisma.$transaction(async (tx) => {
    // 1. Revertir stock de cada detalle
    for (const d of txObj.detalles) {
      if (txObj.tipoTransaccion === "VENTA") {
        // La venta restó stock; revertirla significa sumar
        await tx.producto.update({
          where: { codigo: d.productoCodigo },
          data: { stock: { increment: d.cantidad } }
        });
      } else {
        // COMPRA, INVENTARIO INICIAL o SALDO INICIAL sumaron stock; revertirla significa restar
        await tx.producto.update({
          where: { codigo: d.productoCodigo },
          data: { stock: { decrement: d.cantidad } }
        });
      }
    }

    // 2. Eliminar relaciones dependientes
    await tx.pago.deleteMany({
      where: { transaccionId }
    });

    await tx.deudaCredito.deleteMany({
      where: { transaccionId }
    });

    await tx.detalleTransaccion.deleteMany({
      where: { transaccionId }
    });

    // 3. Eliminar la transacción
    await tx.transaccion.delete({
      where: { id: transaccionId }
    });
  });

  revalidatePath("/historial");
  revalidatePath("/transacciones");
  revalidatePath("/productos");
  revalidatePath("/kardex");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function editarTransaccion(transaccionId: string, data: TransaccionEditPayload) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  const currentTx = await tenantPrisma.transaccion.findUnique({
    where: { id: transaccionId },
    include: {
      detalles: true,
      pagos: true,
      deudaCredito: true,
    }
  });

  if (!currentTx) {
    throw new Error("La transacción no existe o ya fue eliminada.");
  }

  if (!data.detalles || data.detalles.length === 0) {
    throw new Error("La transacción debe contener al menos un producto.");
  }

  // Verificar que todos los productos existan
  for (const d of data.detalles) {
    const prod = await tenantPrisma.producto.findUnique({ where: { codigo: d.productoCodigo } });
    if (!prod) {
      throw new Error(`El producto con código ${d.productoCodigo} no existe en el catálogo.`);
    }
  }

  const parsedFecha = data.fecha ? new Date(data.fecha.includes("T") ? data.fecha : data.fecha + "T12:00:00") : new Date();
  const totalDetalles = data.detalles.reduce((acc, curr) => acc + (curr.subtotal || (curr.cantidad * curr.precioUnitario)), 0);
  const totalPagado = Math.max(0, totalDetalles - (data.descuento || 0));

  await tenantPrisma.$transaction(async (tx) => {
    // 1. Revertir el stock de los detalles ANTERIORES
    for (const oldD of currentTx.detalles) {
      if (currentTx.tipoTransaccion === "VENTA") {
        await tx.producto.update({
          where: { codigo: oldD.productoCodigo },
          data: { stock: { increment: oldD.cantidad } }
        });
      } else {
        await tx.producto.update({
          where: { codigo: oldD.productoCodigo },
          data: { stock: { decrement: oldD.cantidad } }
        });
      }
    }

    // 2. Aplicar el stock de los NUEVOS detalles
    for (const newD of data.detalles) {
      const cant = Math.round(Number(newD.cantidad)) || 0;
      if (data.tipoTransaccion === "VENTA") {
        await tx.producto.update({
          where: { codigo: newD.productoCodigo },
          data: { stock: { decrement: cant } }
        });
      } else {
        await tx.producto.update({
          where: { codigo: newD.productoCodigo },
          data: { stock: { increment: cant } }
        });
      }
    }

    // 3. Reemplazar los detalles de la transacción
    await tx.detalleTransaccion.deleteMany({
      where: { transaccionId }
    });

    await tx.detalleTransaccion.createMany({
      data: data.detalles.map((d) => ({
        transaccionId,
        productoCodigo: d.productoCodigo,
        cantidad: Math.round(Number(d.cantidad)) || 1,
        precioUnitario: Number(d.precioUnitario) || 0,
        subtotal: Number(d.subtotal) || ((Math.round(Number(d.cantidad)) || 1) * (Number(d.precioUnitario) || 0))
      }))
    });

    // 4. Actualizar cabecera de la transacción
    await tx.transaccion.update({
      where: { id: transaccionId },
      data: {
        tipoTransaccion: data.tipoTransaccion,
        nroDocumento: data.nroDocumento.trim(),
        fecha: parsedFecha,
        nitCi: data.nitCi.trim(),
        razonSocial: data.razonSocial.trim(),
        formaPago: data.formaPago,
        descuento: Number(data.descuento) || 0,
        observaciones: data.observaciones ? data.observaciones.trim() : null
      }
    });

    // 5. Ajustar Pagos / Crédito
    if (data.formaPago !== "CREDITO") {
      // Eliminar registro de deuda si antes era crédito
      await tx.deudaCredito.deleteMany({ where: { transaccionId } });

      if (currentTx.pagos.length <= 1) {
        if (currentTx.pagos.length === 1) {
          await tx.pago.update({
            where: { id: currentTx.pagos[0].id },
            data: {
              monto: totalPagado,
              fecha: parsedFecha,
              observaciones: "Pago completado al contado"
            }
          });
        } else {
          await tx.pago.create({
            data: {
              transaccionId,
              monto: totalPagado,
              fecha: parsedFecha,
              observaciones: "Pago completado al contado"
            }
          });
        }
      }
    } else {
      // Es a CRÉDITO
      const abonosActuales = currentTx.pagos.reduce((sum, p) => sum + p.monto, 0);
      const saldoPendiente = Math.max(0, totalPagado - abonosActuales);

      await tx.deudaCredito.upsert({
        where: { transaccionId },
        create: {
          transaccionId,
          montoTotal: totalPagado,
          saldoPendiente,
          estado: saldoPendiente <= 0 ? "PAGADO" : "PENDIENTE"
        },
        update: {
          montoTotal: totalPagado,
          saldoPendiente,
          estado: saldoPendiente <= 0 ? "PAGADO" : "PENDIENTE"
        }
      });
    }
  });

  revalidatePath("/historial");
  revalidatePath("/transacciones");
  revalidatePath("/productos");
  revalidatePath("/kardex");
  revalidatePath("/dashboard");

  return { success: true };
}


