import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { masterPrisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await masterPrisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenantUsers: { include: { tenant: true } } }
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenants: []
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // Auto-seleccionar la empresa inicial para que el usuario siempre tenga conexión válida
        try {
          const userWithTenants = await masterPrisma.user.findUnique({
            where: { id: user.id },
            include: { tenantUsers: { include: { tenant: true } } }
          });
          const initialTenant = userWithTenants?.tenantUsers?.[0]?.tenant || await masterPrisma.tenant.findFirst({ orderBy: { createdAt: "asc" } });
          if (initialTenant) {
            token.currentTenantId = initialTenant.id;
            token.currentConnectionString = initialTenant.connectionString;
            token.currentTenant = {
              id: initialTenant.id,
              name: initialTenant.name,
              nit: initialTenant.nit,
              casaMatriz: initialTenant.casaMatriz,
              sucursal: initialTenant.sucursal,
              telefono: initialTenant.telefono,
              logo: initialTenant.logo && initialTenant.logo.length > 255 ? "Building" : initialTenant.logo,
              connectionString: initialTenant.connectionString,
              isOwner: true
            };
          }
        } catch (e) {
          console.error("Error inicializando tenant en JWT:", e);
        }
      }

      if (trigger === "update" && session?.tenantId) {
        token.currentTenantId = session.tenantId;
        try {
          const tenantDb = await masterPrisma.tenant.findUnique({
            where: { id: session.tenantId }
          });
          if (tenantDb) {
            token.currentConnectionString = tenantDb.connectionString;
            token.currentTenant = {
              id: tenantDb.id,
              name: tenantDb.name,
              nit: tenantDb.nit,
              casaMatriz: tenantDb.casaMatriz,
              sucursal: tenantDb.sucursal,
              telefono: tenantDb.telefono,
              logo: tenantDb.logo && tenantDb.logo.length > 255 ? "Building" : tenantDb.logo,
              connectionString: tenantDb.connectionString,
              isOwner: true
            };
          }
        } catch (e) {
          console.error("Error actualizando tenant en JWT:", e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.currentTenantId = token.currentTenantId as string | undefined;
        session.user.currentConnectionString = token.currentConnectionString as string | undefined;
        const currentTenantObj = (token.currentTenant as any) || null;
        session.user.tenants = currentTenantObj ? [currentTenantObj] : [];
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-dev-123456789"
};
