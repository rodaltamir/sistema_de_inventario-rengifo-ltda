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

  // Cargar TODOS los productos de la empresa para reutilización y mapeo por código o nombre
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
  const mapaPorNombre = new Map<string, typeof todosLosProductos[0]>();

  for (const p of todosLosProductos) {
    if (p.codigo) mapaPorCodigo.set(p.codigo.trim().toLowerCase(), p);
    if (p.nombre) mapaPorNombre.set(p.nombre.trim().toLowerCase(), p);
  }

  // Reutilizar productos existentes por coincidencia de código o de nombre
  const productosReutilizadosSet = new Set<string>();

  for (const m of movimientosValidos) {
    const codKey = m.productoCodigo.trim().toLowerCase();
    const nomKey = m.productoNombre.trim().toLowerCase();

    const prodExistente = (codKey ? mapaPorCodigo.get(codKey) : undefined) || (nomKey ? mapaPorNombre.get(nomKey) : undefined);

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

  // 2. Identificar productos auténticamente nuevos y crearlos si faltan
  let productosCreadosCount = 0;
  const codigosEnMovimientos = Array.from(new Set(movimientosValidos.map((m) => m.productoCodigo.trim()))).filter(Boolean);

  if (opciones.crearProductosFaltantes !== false) {
    for (const cod of codigosEnMovimientos) {
      const codLower = cod.toLowerCase();
      // Si ya existe por código en los mapas, no recrear
      if (!mapaPorCodigo.has(codLower)) {
        const movsDelProd = movimientosValidos.filter((m) => m.productoCodigo.trim() === cod);
        const muestra = movsDelProd[0];
        const nom = (muestra?.productoNombre || `Producto ${cod}`).trim();
        const nomLower = nom.toLowerCase();

        // Verificar una vez más si existe por nombre
        if (mapaPorNombre.has(nomLower)) {
          const prodExistente = mapaPorNombre.get(nomLower)!;
          // Asignar el código existente a todos los movimientos con este código
          for (const m of movimientosValidos) {
            if (m.productoCodigo.trim() === cod) {
              m.productoCodigo = prodExistente.codigo;
            }
          }
          productosReutilizadosSet.add(prodExistente.codigo);
          continue;
        }

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
        mapaPorNombre.set(nuevoProd.nombre.trim().toLowerCase(), nuevoProd);
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

    gruposMap.get(claveGrupo)!.detalles.push({
      productoCodigo: cod,
      cantidad: m.cantidad,
      precioUnitario: m.precioUnitario,
      subtotal: m.subtotal
    });
  }

  const listaTransacciones = Array.from(gruposMap.values());
  let transaccionesCreadasCount = 0;
  let transaccionesOmitidasDuplicadasCount = 0;

  // 4. Insertar transacciones y pagos en lotes (chunks) evitando duplicados
  const CHUNK_SIZE = 30;
  for (let i = 0; i < listaTransacciones.length; i += CHUNK_SIZE) {
    const chunk = listaTransacciones.slice(i, i + CHUNK_SIZE);

    await tenantPrisma.$transaction(async (tx) => {
      for (const tData of chunk) {
        // DEDUPLICACIÓN: Comprobar si ya existe una transacción idéntica en el mismo día con el mismo N° documento y tipo
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
          }
        });

        if (txExistente) {
          transaccionesOmitidasDuplicadasCount++;
          continue; // Ya existe en la base de datos, omitir para no duplicar ventas/compras ni stock
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

      const stockFinal = Math.max(0, Math.round(stockCalculado));

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
    transactionsSkippedDuplicate: transaccionesOmitidasDuplicadasCount,
    productsCreated: productosCreadosCount,
    productsReused: productosReutilizadosSet.size,
    clientsCreated: clientesCreadosCount,
    providersCreated: proveedoresCreadosCount
  };
}

