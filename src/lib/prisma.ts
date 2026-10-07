import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaClient as TenantClient } from '../../prisma/generated/tenant';

function formatConnectionUrl(rawUrl: string, limit = 15): string {
  if (!rawUrl) return rawUrl;
  if (!rawUrl.includes("connection_limit=")) {
    const separator = rawUrl.includes("?") ? "&" : "?";
    return `${rawUrl}${separator}connection_limit=${limit}&pool_timeout=30`;
  }
  return rawUrl;
}

// Cliente para la Base de Datos Master (Usuarios y Organizaciones)
const globalForMaster = global as unknown as { masterPrisma: MasterClient };

const masterUrl = process.env.DATABASE_URL ? formatConnectionUrl(process.env.DATABASE_URL, 15) : undefined;

export const masterPrisma =
  globalForMaster.masterPrisma ||
  new MasterClient({
    datasources: masterUrl ? { db: { url: masterUrl } } : undefined
  });

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
  
  const tunedUrl = formatConnectionUrl(connectionString, 10);

  if (!globalForTenants.tenantClients[tunedUrl]) {
    globalForTenants.tenantClients[tunedUrl] = new TenantClient({
      datasources: {
        db: {
          url: tunedUrl,
        },
      },
    });
  }
  return globalForTenants.tenantClients[tunedUrl];
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
