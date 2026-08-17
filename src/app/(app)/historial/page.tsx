import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import HistorialClient from "./HistorialClient";

export default async function HistorialPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  
  // Fetch all transactions with details
  const transacciones = await tenantPrisma.transaccion.findMany({
    include: {
      detalles: {
        include: {
          producto: true
        }
      },
      pagos: true,
      deudaCredito: true
    },
    orderBy: { fecha: 'desc' }
  });

  return (
    <div className="page-container">
      <HistorialClient transacciones={transacciones} />
    </div>
  );
}
