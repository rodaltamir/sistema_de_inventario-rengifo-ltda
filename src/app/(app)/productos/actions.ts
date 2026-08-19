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

export async function importProductos(productos: any[], descripcion?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Identificar qué productos ya existen para no insertarlos
  const existingProducts = await tenantPrisma.producto.findMany({
    where: { 
      codigo: { in: productos.map(p => p.codigo) },
      activo: true
    },
    select: { codigo: true }
  });
  
  const existingCodes = new Set(existingProducts.map(p => p.codigo));
  const productsToInsert = productos.filter(p => !existingCodes.has(p.codigo));

  if (productsToInsert.length === 0) {
    return 0; // Nada nuevo que importar
  }

  await tenantPrisma.producto.createMany({
    data: productsToInsert.map(p => ({
      codigo: p.codigo,
      nombre: p.nombre,
      descripcion: p.descripcion || "",
      marca: p.marca || "",
      unidadMedida: p.unidadMedida || "Unidad",
      stock: parseInt(p.stock) || 0,
      costo: parseFloat(p.costo) || 0,
      precioVenta: parseFloat(p.precioVenta) || 0,
      metodoInventario: p.metodoInventario || "Promedio Ponderado",
      proveedorId: null
    }))
  });

  const productsWithStock = productsToInsert.filter(p => (parseInt(p.stock) || 0) > 0);

  if (productsWithStock.length > 0) {
    const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const desc = descripcion || "Saldo inicial de inventario";
    
    await tenantPrisma.transaccion.create({
      data: {
        tipoTransaccion: "SALDO INICIAL", // Importación inicial como SALDO INICIAL
        nroDocumento: "IMP-" + ts,
        nitCi: "0",
        razonSocial: "SISTEMA - IMPORTACIÓN INICIAL",
        observaciones: desc,
        formaPago: "NINGUNO",
        detalles: {
          create: productsWithStock.map(p => {
            const qty = parseInt(p.stock) || 0;
            const cost = parseFloat(p.costo) || 0;
            return {
              productoCodigo: p.codigo,
              cantidad: qty,
              precioUnitario: cost,
              subtotal: qty * cost
            };
          })
        }
      }
    });
  }

  revalidatePath("/productos");
  return productsToInsert.length;
}
