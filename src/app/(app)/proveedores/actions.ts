"use server";

import { getSessionTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProveedor(data: {
  nombre: string;
  nit: string;
  responsable?: string;
  telefono?: string;
  logo?: string;
  tipo?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    // Validate if NIT exists
    const exists = await tenantPrisma.proveedor.findFirst({
      where: { nit: data.nit }
    });

    if (exists) {
      throw new Error(`Ya existe un ${exists.tipo === 'CLIENTE' ? 'cliente' : 'proveedor'} con ese NIT`);
    }

    const newProveedor = await tenantPrisma.proveedor.create({
      data: {
        nombre: data.nombre,
        nit: data.nit,
        responsable: data.responsable || null,
        telefono: data.telefono || null,
        logo: data.logo || null,
        tipo: data.tipo || 'PROVEEDOR'
      }
    });

    revalidatePath("/proveedores");
    return newProveedor;
  } catch (err: any) {
    console.error("[createProveedor Error]:", err);
    throw new Error(err.message || "Error al crear proveedor");
  }
}

export async function updateProveedor(id: string, data: any) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    // Validate if NIT exists and is not this same provider
    const exists = await tenantPrisma.proveedor.findFirst({
      where: { 
        nit: data.nit,
        id: { not: id } 
      }
    });

    if (exists) throw new Error(`Ya existe otro ${exists.tipo === 'CLIENTE' ? 'cliente' : 'proveedor'} con ese NIT`);

    const updated = await tenantPrisma.proveedor.update({
      where: { id },
      data: {
        nombre: data.nombre,
        nit: data.nit,
        responsable: data.responsable || null,
        telefono: data.telefono || null,
        logo: data.logo || null,
        tipo: data.tipo || 'PROVEEDOR'
      }
    });

    revalidatePath("/proveedores");
    return updated;
  } catch (err: any) {
    console.error("[updateProveedor Error]:", err);
    throw new Error(err.message || "Error al actualizar proveedor");
  }
}

export async function deleteProveedor(id: string) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    // Comprobar si tiene productos asociados
    const hasProductos = await tenantPrisma.producto.findFirst({
      where: { proveedorId: id }
    });

    if (hasProductos) {
      throw new Error("No se puede eliminar el proveedor porque tiene productos asociados a él. Elimine o asigne los productos a otro proveedor primero.");
    }

    await tenantPrisma.proveedor.delete({
      where: { id }
    });

    revalidatePath("/proveedores");
  } catch (err: any) {
    console.error("[deleteProveedor Error]:", err);
    throw new Error(err.message || "Error al eliminar proveedor");
  }
}
