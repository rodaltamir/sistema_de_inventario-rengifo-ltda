import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductosClient from "./ProductosClient";

export default async function ProductosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.currentConnectionString) redirect("/select-company");

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  const productos = await tenantPrisma.producto.findMany({
    where: { activo: true },
    include: { proveedor: true, categoria: true },
    orderBy: { createdAt: 'desc' }
  });
  
  const proveedores = await tenantPrisma.proveedor.findMany();
  const categorias = await tenantPrisma.categoria.findMany({
    orderBy: { nombre: 'asc' }
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Gestión de Productos</h1>
      <ProductosClient initialProductos={productos} proveedores={proveedores} initialCategorias={categorias} />
    </div>
  );
}
