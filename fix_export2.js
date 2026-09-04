const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-productos/route.ts", "utf8");

content = content.replace(/let tenantName = "Casa Matriz";\n\s*let tenantNit = "0000000000";/, 
`let tenantInfo = { name: "Casa Matriz", nit: "0000000000", casaMatriz: "", sucursal: "" };
    if (session.user.currentTenantId) {
      const { masterPrisma } = await import("@/lib/prisma");
      const dbTenant = await masterPrisma.tenant.findUnique({
        where: { id: session.user.currentTenantId }
      });
      if (dbTenant) {
        tenantInfo = {
          name: dbTenant.name,
          nit: dbTenant.nit || "0000000000",
          casaMatriz: dbTenant.casaMatriz || "",
          sucursal: dbTenant.sucursal || ""
        };
      }
    }`);

fs.writeFileSync("src/app/api/export-productos/route.ts", content);
console.log("Done");
