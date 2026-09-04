const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-productos/route.ts", "utf8");

content = content.replace(/let tenantName = "Empresa";\s*let tenantNit = "0000000000";\s*if \(session\.user\.currentTenantId\) \{[\s\S]*?tenantNit = dbTenant\.nit \|\| "0000000000";\s*\}\s*\}/, 
`let tenantInfo = { name: "Empresa", nit: "0000000000", casaMatriz: "", sucursal: "", ciudad: "" };
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
          sucursal: dbTenant.sucursal || "",
          ciudad: "La Paz - Bolivia" // TODO: Add city to tenant model if needed
        };
      }
    }`);

content = content.replace(/const cellB1 = ws\.getCell\(1, 2\);\s*if \(cellB1\) cellB1\.value = tenantName;\s*const cellB2 = ws\.getCell\(2, 2\);\s*if \(cellB2\) cellB2\.value = \`NIT: \$\{tenantNit\}\`;/g, 
`const cellA1 = ws.getCell(1, 1);
    if (cellA1) cellA1.value = tenantInfo.name;
    const cellA2 = ws.getCell(2, 1);
    if (cellA2) cellA2.value = \`NIT: \${tenantInfo.nit}\`;
    const cellA3 = ws.getCell(3, 1);
    if (cellA3) cellA3.value = tenantInfo.casaMatriz ? \`Casa Matriz: \${tenantInfo.casaMatriz}\` : "Casa Matriz:";`);

content = content.replace(/const cellH3 = ws\.getCell\(3, 8\); \/\/ H3 = Col 8, Row 3\s*if \(cellH3\) cellH3\.value = \`DEL \$\{fi\} AL \$\{ff\}\`;/g,
`const cellF3 = ws.getCell(3, 6);
    if (cellF3) cellF3.value = \`DEL \${fi} AL \${ff}\`;`);

fs.writeFileSync("src/app/api/export-productos/route.ts", content);
console.log("Done");
