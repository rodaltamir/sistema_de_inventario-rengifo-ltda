import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProveedoresClient from "./ProveedoresClient";

export default async function ProveedoresPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  const proveedores = await tenantPrisma.proveedor.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Gestión de Proveedores</h1>
      <ProveedoresClient initialProveedores={proveedores} />
    </div>
  );
}
