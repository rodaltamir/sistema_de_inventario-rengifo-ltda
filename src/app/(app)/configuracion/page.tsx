import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ConfiguracionClient from "./ConfiguracionClient";

export default async function ConfiguracionPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.currentConnectionString) {
    redirect("/select-company");
  }

  // Get current tenant info from session
  const currentTenant = session.user.tenants?.find(
    (t: any) => t.id === session.user.currentTenantId
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Configuración del Sistema</h1>
      <ConfiguracionClient currentTenant={currentTenant} />
    </div>
  );
}
