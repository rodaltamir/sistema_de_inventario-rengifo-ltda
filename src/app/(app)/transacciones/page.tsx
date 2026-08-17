import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TransaccionClient from "./TransaccionClient";

export default async function TransaccionesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  
  const productos = await tenantPrisma.producto.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });

  const proveedores = await tenantPrisma.proveedor.findMany({
    orderBy: { nombre: 'asc' }
  });

  return (
    <div className="page-container">
      <TransaccionClient productos={productos} proveedores={proveedores} />
    </div>
  );
}
