import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      tenants: { id: string; name: string; connectionString: string }[];
      currentTenantId?: string;
      currentConnectionString?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    tenants: { id: string; name: string; connectionString: string }[];
  }
}
