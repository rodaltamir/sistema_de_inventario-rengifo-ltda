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
      id: true
    }
  });

  // Only fetch transactions from the last 2 years to avoid memory bloat
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear - 2}-01-01T00:00:00.000Z`);

  const transacciones = await tenantPrisma.transaccion.findMany({
    where: {
      fecha: {
        gte: startDate
      }
    },
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
