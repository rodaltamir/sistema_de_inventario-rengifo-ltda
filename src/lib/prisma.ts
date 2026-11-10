import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaClient as TenantClient } from '../../prisma/generated/tenant';

function formatConnectionUrl(rawUrl: string, limit = 20): string {
  if (!rawUrl) return rawUrl;
  let url = rawUrl;
  if (!url.includes("connection_limit=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}connection_limit=${limit}&pool_timeout=30&connect_timeout=15`;
  }
  return url;
}

// Cliente global para la Base de Datos Master (Usuarios y Organizaciones)
const globalForPrisma = globalThis as unknown as {
  masterPrisma?: MasterClient;
  tenantClients?: Record<string, TenantClient>;
};

if (!globalForPrisma.tenantClients) {
  globalForPrisma.tenantClients = {};
}

const masterUrl = process.env.DATABASE_URL ? formatConnectionUrl(process.env.DATABASE_URL, 20) : undefined;

export const masterPrisma =
  globalForPrisma.masterPrisma ||
  new MasterClient({
    datasources: masterUrl ? { db: { url: masterUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

// Siempre fijar en globalThis para evitar fugas de conexiones en Server Actions y SSR
globalForPrisma.masterPrisma = masterPrisma;

export async function getTenantClient(connectionString: string): Promise<TenantClient> {
  if (!connectionString) {
    throw new Error('Connection string is required to connect to a tenant database.');
  }
  
  const tunedUrl = formatConnectionUrl(connectionString, 20);

  if (!globalForPrisma.tenantClients![tunedUrl]) {
    globalForPrisma.tenantClients![tunedUrl] = new TenantClient({
      datasources: {
        db: {
          url: tunedUrl,
        },
      },
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
    });
  }
  return globalForPrisma.tenantClients![tunedUrl];
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
