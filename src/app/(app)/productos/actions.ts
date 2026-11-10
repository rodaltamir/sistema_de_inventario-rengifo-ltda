"use server";

import { getSessionTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function crearCategoriaConProductos(nombre: string, productosCodigos: string[]) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma, tenantId } = await getSessionTenantClient(session);

    const nuevaCategoria = await tenantPrisma.categoria.create({
      data: {
        nombre,
        tenantId,
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
  } catch (err: any) {
    console.error("[crearCategoriaConProductos Error]:", err);
    throw new Error(err.message || "Error al crear categoría");
  }
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
  fecha?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    const cleanCodigo = String(data.codigo || '').trim();
    if (!cleanCodigo) throw new Error("El código de producto es obligatorio.");
    if (!data.nombre?.trim()) throw new Error("El nombre de producto es obligatorio.");

    // Validate if code exists
    const exists = await tenantPrisma.producto.findUnique({
      where: { codigo: cleanCodigo }
    });

    if (exists) {
      throw new Error(`Ya existe un producto con el código "${cleanCodigo}"`);
    }

    const regDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();
    const cleanStock = parseInt(String(data.stock)) || 0;
    const cleanCosto = Math.round(Number(data.costo || 0) * 1e6) / 1e6;
    const cleanPrecioVenta = Math.round(Number(data.precioVenta || 0) * 1e6) / 1e6;

    const newProduct = await tenantPrisma.producto.create({
      data: {
        codigo: cleanCodigo,
        nombre: data.nombre.trim(),
        descripcion: data.descripcion || "",
        marca: data.marca || "",
        unidadMedida: data.unidadMedida || "Unidad",
        stock: cleanStock,
        costo: cleanCosto,
        precioVenta: cleanPrecioVenta,
        metodoInventario: data.metodoInventario || "Promedio Ponderado",
        proveedorId: data.proveedorId || null,
        categoriaId: data.categoriaId || null,
        createdAt: regDate,
      }
    });

    if (cleanStock !== 0) {
      const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
      await tenantPrisma.transaccion.create({
        data: {
          tipoTransaccion: "SALDO INICIAL",
          nroDocumento: "INI-" + ts,
          nitCi: "0",
          razonSocial: "SISTEMA - SALDO INICIAL",
          observaciones: "Registro inicial de producto",
          formaPago: "NINGUNO",
          fecha: regDate,
          createdAt: regDate,
          detalles: {
            create: [{
              productoCodigo: cleanCodigo,
              cantidad: cleanStock,
              precioUnitario: cleanCosto,
              subtotal: Math.round(cleanStock * cleanCosto * 1e6) / 1e6
            }]
          }
        }
      });
    }

    revalidatePath("/productos");
    revalidatePath("/kardex");
    revalidatePath("/historial");
    revalidatePath("/dashboard");
    return newProduct;
  } catch (err: any) {
    console.error("[createProducto Error]:", err);
    throw new Error(err.message || "Error al crear producto");
  }
}

export async function updateProducto(codigo: string, data: any) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    const cleanCodigo = String(codigo || '').trim();
    if (!cleanCodigo) throw new Error("Código de producto inválido");
    if (!data.nombre?.trim()) throw new Error("El nombre de producto es obligatorio.");

    const cleanStock = parseInt(String(data.stock)) || 0;
    const cleanCosto = Math.round(Number(data.costo || 0) * 1e6) / 1e6;
    const cleanPrecioVenta = Math.round(Number(data.precioVenta || 0) * 1e6) / 1e6;

    const updatedProduct = await tenantPrisma.producto.update({
      where: { codigo: cleanCodigo },
      data: {
        nombre: data.nombre.trim(),
        descripcion: data.descripcion || "",
        marca: data.marca || "",
        unidadMedida: data.unidadMedida || "Unidad",
        stock: cleanStock,
        costo: cleanCosto,
        precioVenta: cleanPrecioVenta,
        metodoInventario: data.metodoInventario || "Promedio Ponderado",
        proveedorId: data.proveedorId || null,
        categoriaId: data.categoriaId || null,
      }
    });

    revalidatePath("/productos");
    revalidatePath("/kardex");
    revalidatePath("/historial");
    revalidatePath("/dashboard");
    return updatedProduct;
  } catch (err: any) {
    console.error("[updateProducto Error]:", err);
    throw new Error(err.message || "Error al actualizar producto");
  }
}

export async function deleteProducto(codigo: string) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    // Soft delete: Ocultar producto de la vista y liberar su código original
    await tenantPrisma.producto.update({
      where: { codigo },
      data: { 
        activo: false,
        codigo: `DEL-${Date.now()}-${codigo}` 
      }
    });

    revalidatePath("/productos");
    revalidatePath("/kardex");
    revalidatePath("/historial");
    revalidatePath("/dashboard");
  } catch (err: any) {
    console.error("[deleteProducto Error]:", err);
    throw new Error(err.message || "Error al eliminar producto");
  }
}

export async function importProductos(productos: any[], descripcion?: string, importDateStr?: string) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    const productosValidos = productos.filter((p: any) => {
      const cod = (p.codigo || "").trim();
      const nom = (p.nombre || "").trim();
      if (!cod && !nom) return false;
      if (
        cod.length > 45 ||
        /^(?:TOTAL|TOTALES|SUBTOTAL|RESUMEN|NOTA|OBSERVACI|METODO|CATEGORIA|FORMULARIO|IFICACION)/i.test(cod) ||
        /FORMULARIO|PLANTILLA/i.test(cod)
      ) {
        return false;
      }
      return true;
    });

    if (productosValidos.length === 0) {
      return 0;
    }

    const yearDateStart = importDateStr ? new Date(importDateStr + "T12:00:00") : new Date();
    const yearDateEnd = importDateStr ? new Date(importDateStr + "T12:00:00") : new Date();

    for (const p of productosValidos) {
      const qtyStock = parseInt(p.stock) || 0;
      const cost = Math.round(Number(p.costo || 0) * 1e6) / 1e6;
      const pVenta = Math.round(Number(p.precioVenta || 0) * 1e6) / 1e6;
      
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
            createdAt: yearDateStart,
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
            proveedorId: null,
            createdAt: yearDateStart,
          }
        });
      }
    }

    const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const desc = descripcion || `Importación Histórica`.trim();

    // 1. Transaction for COMPRAS (Entradas)
    const compras = productosValidos.filter(p => (parseInt(p.entradaCant) || 0) !== 0);
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
              const unitCost = Math.round(Number(p.costo || 0) * 1e6) / 1e6;
              return {
                productoCodigo: p.codigo,
                cantidad: qty,
                precioUnitario: unitCost,
                subtotal: Math.round(qty * unitCost * 1e6) / 1e6
              };
            })
          }
        }
      });
    }

    // 2. Transaction for VENTAS (Salidas)
    const ventas = productosValidos.filter(p => (parseInt(p.salidaCant) || 0) !== 0);
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
              const unitSale = Math.round(Number(p.precioVenta || 0) * 1e6) / 1e6;
              return {
                productoCodigo: p.codigo,
                cantidad: qty,
                precioUnitario: unitSale,
                subtotal: Math.round(qty * unitSale * 1e6) / 1e6
              };
            })
          }
        }
      });
    }

    // 3. Fallback for products with initial stock but neither entradaCant nor salidaCant
    const saldosIniciales = productosValidos.filter(p => {
      const ec = parseInt(p.entradaCant) || 0;
      const sc = parseInt(p.salidaCant) || 0;
      const stk = parseInt(p.stock) || 0;
      return ec === 0 && sc === 0 && stk !== 0;
    });
    if (saldosIniciales.length > 0) {
      await tenantPrisma.transaccion.create({
        data: {
          tipoTransaccion: "SALDO INICIAL",
          nroDocumento: "IMP-INI-" + ts,
          nitCi: "0",
          razonSocial: "SISTEMA - SALDO INICIAL",
          observaciones: desc,
          formaPago: "NINGUNO",
          fecha: yearDateStart,
          createdAt: yearDateStart,
          detalles: {
            create: saldosIniciales.map(p => {
              const qty = parseInt(p.stock) || 0;
              const unitCost = Math.round(Number(p.costo || 0) * 1e6) / 1e6;
              return {
                productoCodigo: p.codigo,
                cantidad: qty,
                precioUnitario: unitCost,
                subtotal: Math.round(qty * unitCost * 1e6) / 1e6
              };
            })
          }
        }
      });
    }

    revalidatePath("/productos");
    revalidatePath("/kardex");
    revalidatePath("/historial");
    revalidatePath("/dashboard");
    return productosValidos.length;
  } catch (err: any) {
    console.error("[importProductos Error]:", err);
    throw new Error(err.message || "Error al importar productos");
  }
}
