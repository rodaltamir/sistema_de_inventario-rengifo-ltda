import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreditosClient from "./CreditosClient";

export default async function CreditosDeudasPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  
  // Fetch transactions that have DeudaCredito
  const deudas = await tenantPrisma.transaccion.findMany({
    where: {
      deudaCredito: {
        isNot: null
      }
    },
    include: {
      deudaCredito: true,
      pagos: {
        orderBy: { fecha: 'asc' }
      }
    },
    orderBy: { fecha: 'desc' }
  });

  return (
    <div className="page-container">
      <CreditosClient deudas={deudas} />
    </div>
  );
}
