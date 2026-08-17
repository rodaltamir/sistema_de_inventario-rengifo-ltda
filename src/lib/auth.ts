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

        const allTenants = await masterPrisma.tenant.findMany();
        const userTenantIds = user.tenantUsers.map(tu => tu.tenantId);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenants: allTenants.map(t => ({
            id: t.id,
            name: t.name,
            nit: t.nit,
            casaMatriz: t.casaMatriz,
            sucursal: t.sucursal,
            telefono: t.telefono,
            logo: t.logo && t.logo.length > 255 ? "Building" : t.logo, // Prevents 431 error from base64
            connectionString: t.connectionString,
            isOwner: userTenantIds.includes(t.id)
          }))
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.tenants = user.tenants;
      }
      if (trigger === "update") {
        if (session?.tenantId) {
          token.currentTenantId = session.tenantId;
          const tenant = (token.tenants as any[]).find((t: any) => t.id === session.tenantId);
          token.currentConnectionString = tenant?.connectionString;
        } else if (session?.action === 'refreshTenants') {
          // Refetch all tenants from DB for global access
          const dbUser = await masterPrisma.user.findUnique({
            where: { id: token.id as string },
            include: { tenantUsers: true }
          });
          const allTenants = await masterPrisma.tenant.findMany();
          
          if (dbUser) {
            const userTenantIds = dbUser.tenantUsers.map(tu => tu.tenantId);
            token.tenants = allTenants.map(t => ({
              id: t.id,
              name: t.name,
              nit: t.nit,
              casaMatriz: t.casaMatriz,
              sucursal: t.sucursal,
              telefono: t.telefono,
              logo: t.logo && t.logo.length > 255 ? "Building" : t.logo, // Prevents 431 error from base64
              connectionString: t.connectionString,
              isOwner: userTenantIds.includes(t.id)
            }));
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.tenants = token.tenants as any;
        session.user.currentTenantId = token.currentTenantId as string | undefined;
        session.user.currentConnectionString = token.currentConnectionString as string | undefined;
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
