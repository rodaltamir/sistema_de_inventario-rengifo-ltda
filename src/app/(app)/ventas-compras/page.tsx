import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TransaccionesClient from "./TransaccionesClient";

export default async function TransaccionesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  const transacciones = await tenantPrisma.transaccion.findMany({
    include: { detalles: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Ventas y Compras</h1>
      <TransaccionesClient initialTransacciones={transacciones} />
    </div>
  );
}
