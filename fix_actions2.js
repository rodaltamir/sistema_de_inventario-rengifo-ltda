const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/export async function createProducto\(data: \{/g, `export async function createProducto(data: {\n  fecha?: string;`);

// And where it uses data, let's pass data.fecha
content = content.replace(/const dbDate = data\.fecha \? new Date\(data\.fecha \+ "T12:00:00"\) : new Date\(\);/g, ""); // clear if existed
content = content.replace(/const tenantPrisma = await getTenantClient\(session\.user\.currentConnectionString\);/g, `const tenantPrisma = await getTenantClient(session.user.currentConnectionString);\n  const dbDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();`);

content = content.replace(/data: \{\s*codigo: data\.codigo,/g, `data: {\n      createdAt: dbDate,\n      codigo: data.codigo,`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
