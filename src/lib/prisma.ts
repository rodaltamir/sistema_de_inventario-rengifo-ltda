import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaClient as TenantClient } from '../../prisma/generated/tenant';

// Cliente para la Base de Datos Master (Usuarios y Organizaciones)
const globalForMaster = global as unknown as { masterPrisma: MasterClient };

export const masterPrisma =
  globalForMaster.masterPrisma || new MasterClient();

if (process.env.NODE_ENV !== 'production') globalForMaster.masterPrisma = masterPrisma;

// Caché de Clientes para Bases de Datos Tenant (Empresas)
const globalForTenants = global as unknown as { tenantClients: Record<string, TenantClient> };

if (!globalForTenants.tenantClients) {
  globalForTenants.tenantClients = {};
}

export async function getTenantClient(connectionString: string): Promise<TenantClient> {
  if (!connectionString) {
    throw new Error('Connection string is required to connect to a tenant database.');
  }
  
  if (!globalForTenants.tenantClients[connectionString]) {
    globalForTenants.tenantClients[connectionString] = new TenantClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
  }
  return globalForTenants.tenantClients[connectionString];
}

export async function getSessionTenantClient(session: any): Promise<{ tenantPrisma: TenantClient; tenantId: string }> {
  let connectionString = session?.user?.currentConnectionString;
  let tenantId = session?.user?.currentTenantId;

  if (!connectionString && session?.user?.id) {
    const userWithTenants = await masterPrisma.user.findUnique({
      where: { id: session.user.id },
      include: { tenantUsers: { include: { tenant: true } } }
    });
    const fallbackTenant = userWithTenants?.tenantUsers?.[0]?.tenant || await masterPrisma.tenant.findFirst({ orderBy: { createdAt: "asc" } });
    if (fallbackTenant) {
      connectionString = fallbackTenant.connectionString;
      tenantId = fallbackTenant.id;
    }
  }

  if (!connectionString) {
    throw new Error("No hay empresa activa seleccionada en la sesión.");
  }

  const tenantPrisma = await getTenantClient(connectionString);
  return { tenantPrisma, tenantId: tenantId || "default" };
}
