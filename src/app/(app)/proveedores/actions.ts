"use server";

import { getTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProveedor(data: {
  nombre: string;
  nit: string;
  responsable?: string;
  telefono?: string;
  logo?: string;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa o falta la conexión de la empresa");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validate if NIT exists
  const exists = await tenantPrisma.proveedor.findFirst({
    where: { nit: data.nit }
  });

  if (exists) {
    throw new Error("Ya existe un proveedor con ese NIT");
  }

  const newProveedor = await tenantPrisma.proveedor.create({
    data: {
      nombre: data.nombre,
      nit: data.nit,
      responsable: data.responsable || null,
      telefono: data.telefono || null,
      logo: data.logo || null,
    }
  });

  revalidatePath("/proveedores");
  return newProveedor;
}

export async function updateProveedor(id: string, data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validate if NIT exists and is not this same provider
  const exists = await tenantPrisma.proveedor.findFirst({
    where: { 
      nit: data.nit,
      id: { not: id } 
    }
  });

  if (exists) throw new Error("Ya existe otro proveedor con ese NIT");

  const updated = await tenantPrisma.proveedor.update({
    where: { id },
    data: {
      nombre: data.nombre,
      nit: data.nit,
      responsable: data.responsable || null,
      telefono: data.telefono || null,
      logo: data.logo || null,
    }
  });

  revalidatePath("/proveedores");
  return updated;
}

export async function deleteProveedor(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) throw new Error("No hay sesión activa");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

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
}
