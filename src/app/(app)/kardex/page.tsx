import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import KardexClient from "./KardexClient";

export default async function KardexPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  
  const productos = await tenantPrisma.producto.findMany({
    where: { activo: true },
    include: { categoria: true },
    orderBy: { nombre: 'asc' }
  });

  const categorias = await tenantPrisma.categoria.findMany({
    orderBy: { nombre: 'asc' }
  });

  const movimientos = await tenantPrisma.detalleTransaccion.findMany({
    include: {
      transaccion: true,
      producto: { include: { categoria: true } }
    },
    orderBy: {
      transaccion: { createdAt: 'desc' }
    }
  });

  const currentTenant = session.user.tenants?.find((t: any) => t.id === session.user.currentTenantId);

  return (
    <div className="page-container">
      <h1 className="page-title">Kardex de Productos</h1>
      <KardexClient 
        initialMovimientos={movimientos} 
        productos={productos} 
        categorias={categorias}
        currentTenant={currentTenant}
      />
    </div>
  );
}
