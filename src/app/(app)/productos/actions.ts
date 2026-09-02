"use server";

import { getTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function crearCategoriaConProductos(nombre: string, productosCodigos: string[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Crear la categoría y actualizar los productos en una transacción (o de forma secuencial)
  // Usaremos secuencial para mayor simplicidad
  const nuevaCategoria = await tenantPrisma.categoria.create({
    data: {
      nombre,
      tenantId: session.user.currentTenantId || "default",
    }
  });

  if (productosCodigos.length > 0) {
    await tenantPrisma.producto.updateMany({
      where: {
        codigo: { in: productosCodigos }
      },
      data: {
        categoriaId: nuevaCategoria.id
      }
    });
  }

  revalidatePath("/productos");
  return nuevaCategoria;
}

export async function createProducto(data: {
  codigo: string;
  nombre: string;
  descripcion: string;
  marca: string;
  unidadMedida: string;
  metodoInventario: string;
  proveedorId: string | null;
  categoriaId: string | null;
  stock: number;
  costo: number;
  precioVenta: number;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa o falta la conexión de la empresa");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validate if code exists
  const exists = await tenantPrisma.producto.findUnique({
    where: { codigo: data.codigo }
  });

  if (exists) {
    throw new Error("Ya existe un producto con ese código");
  }

  const newProduct = await tenantPrisma.producto.create({
    data: {
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      marca: data.marca || "",
      unidadMedida: data.unidadMedida || "Unidad",
      stock: data.stock || 0,
      costo: data.costo || 0,
      precioVenta: data.precioVenta || 0,
      metodoInventario: data.metodoInventario || "Promedio Ponderado",
      proveedorId: data.proveedorId || null,
      categoriaId: data.categoriaId || null,
    }
  });

  revalidatePath("/productos");
  return newProduct;
}

export async function updateProducto(codigo: string, data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  const updatedProduct = await tenantPrisma.producto.update({
    where: { codigo },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      marca: data.marca || "",
      unidadMedida: data.unidadMedida || "Unidad",
      stock: data.stock || 0,
      costo: data.costo || 0,
      precioVenta: data.precioVenta || 0,
      metodoInventario: data.metodoInventario || "Promedio Ponderado",
      proveedorId: data.proveedorId || null,
      categoriaId: data.categoriaId || null,
    }
  });

  revalidatePath("/productos");
  return updatedProduct;
}

export async function deleteProducto(codigo: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Soft delete: Ocultar producto de la vista y liberar su código original
  // Esto mantiene intacto el historial de Kardex y transacciones previas
  await tenantPrisma.producto.update({
    where: { codigo },
    data: { 
      activo: false,
      codigo: `DEL-${Date.now()}-${codigo}` 
    }
  });

  revalidatePath("/productos");
}

export async function importProductos(productos: any[], descripcion?: string, importYear?: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  if (productos.length === 0) {
    return 0; // Nada nuevo que importar
  }

  // Upsert products to update existing ones and create new ones
  for (const p of productos) {
    const qtyStock = parseInt(p.stock) || 0;
    const cost = parseFloat(p.costo) || 0;
    const pVenta = parseFloat(p.precioVenta) || 0;
    
    const exists = await tenantPrisma.producto.findUnique({
      where: { codigo: p.codigo }
    });

    if (exists) {
      await tenantPrisma.producto.update({
        where: { codigo: p.codigo },
        data: {
          nombre: p.nombre,
          descripcion: p.descripcion || "",
          marca: p.marca || "",
          unidadMedida: p.unidadMedida || "Unidad",
          stock: qtyStock,
          costo: cost,
          precioVenta: pVenta,
        }
      });
    } else {
      await tenantPrisma.producto.create({
        data: {
          codigo: p.codigo,
          nombre: p.nombre,
          descripcion: p.descripcion || "",
          marca: p.marca || "",
          unidadMedida: p.unidadMedida || "Unidad",
          stock: qtyStock,
          costo: cost,
          precioVenta: pVenta,
          metodoInventario: p.metodoInventario || "Promedio Ponderado",
          proveedorId: null
        }
      });
    }
  }

  const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const desc = descripcion || `Importación Histórica ${importYear || ""}`.trim();
  
  // Utilizar UTC a mediodía para evitar que la conversión de zonas horarias retrase la fecha al año anterior (ej. 31/12/2024 en vez de 01/01/2025)
  const yearDateStart = importYear ? new Date(Date.UTC(importYear, 11, 30, 12, 0, 0)) : new Date();
  const yearDateEnd = importYear ? new Date(Date.UTC(importYear, 11, 30, 12, 0, 0)) : new Date();

  // 1. Transaction for COMPRAS (Entradas)
  const compras = productos.filter(p => (parseInt(p.entradaCant) || 0) > 0);
  if (compras.length > 0) {
    await tenantPrisma.transaccion.create({
      data: {
        tipoTransaccion: "COMPRA",
        nroDocumento: "IMP-COMPRA-" + ts,
        nitCi: "0",
        razonSocial: "SISTEMA - HISTÓRICO",
        observaciones: desc,
        formaPago: "NINGUNO",
        fecha: yearDateStart,
        createdAt: yearDateStart,
        detalles: {
          create: compras.map(p => {
            const qty = parseInt(p.entradaCant) || 0;
            const unitCost = parseFloat(p.costo) || 0;
            return {
              productoCodigo: p.codigo,
              cantidad: qty,
              precioUnitario: unitCost,
              subtotal: qty * unitCost
            };
          })
        }
      }
    });
  }

  // 2. Transaction for VENTAS (Salidas)
  const ventas = productos.filter(p => (parseInt(p.salidaCant) || 0) > 0);
  if (ventas.length > 0) {
    await tenantPrisma.transaccion.create({
      data: {
        tipoTransaccion: "VENTA",
        nroDocumento: "IMP-VENTA-" + ts,
        nitCi: "0",
        razonSocial: "SISTEMA - HISTÓRICO",
        observaciones: desc,
        formaPago: "NINGUNO",
        fecha: yearDateEnd,
        createdAt: yearDateEnd,
        detalles: {
          create: ventas.map(p => {
            const qty = parseInt(p.salidaCant) || 0;
            const unitSale = parseFloat(p.precioVenta) || 0;
            return {
              productoCodigo: p.codigo,
              cantidad: qty,
              precioUnitario: unitSale,
              subtotal: qty * unitSale
            };
          })
        }
      }
    });
  }

  revalidatePath("/productos");
  return productos.length;
}


