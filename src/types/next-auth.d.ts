import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      tenants: any[];
      currentTenantId?: string;
      currentConnectionString?: string;
      currentTenant?: any;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    tenants?: any[];
  }
}
