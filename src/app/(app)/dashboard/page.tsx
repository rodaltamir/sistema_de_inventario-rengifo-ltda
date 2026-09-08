import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.currentConnectionString) {
    redirect("/select-company");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Fetch only what's needed for the dashboard metrics
  const productos = await tenantPrisma.producto.findMany({
    where: { activo: true },
    select: {
      codigo: true,
      nombre: true,
      stock: true,
      costo: true
    }
  });
  
  const proveedores = await tenantPrisma.proveedor.findMany({
    select: {
      id: true,
      tipo: true
    }
  });

  const transacciones = await tenantPrisma.transaccion.findMany({
    select: {
      id: true,
      tipoTransaccion: true,
      fecha: true,
      razonSocial: true,
      descuento: true,
      detalles: {
        select: {
          subtotal: true
        }
      }
    },
    orderBy: { fecha: 'desc' }
  });

  return (
    <DashboardClient 
      productos={productos}
      proveedores={proveedores}
      transacciones={transacciones}
    />
  );
}
