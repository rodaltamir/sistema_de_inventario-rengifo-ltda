const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace("precioVenta: number;", "precioVenta: number;\n  fecha?: string;");

content = content.replace(`const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validate if code exists`,
`const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  const dbDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();

  // Validate if code exists`);

content = content.replace(`const newProduct = await tenantPrisma.producto.create({
    data: {
      codigo: data.codigo,`,
`const newProduct = await tenantPrisma.producto.create({
    data: {
      createdAt: dbDate,
      fecha: dbDate,
      codigo: data.codigo,`);

content = content.replace(`export async function importProductos(productos: any[], descripcion?: string, importYear?: number) {`, 
`export async function importProductos(productos: any[], descripcion?: string, importDateStr?: string) {`);

content = content.replace(`const desc = descripcion || \`Importación Histórica \${importYear || ""}\`.trim();`,
`const desc = descripcion || \`Importación Histórica\`.trim();`);

content = content.replace(`const yearDateStart = importYear ? new Date(Date.UTC(importYear, 11, 30, 12, 0, 0)) : new Date();`,
`const yearDateStart = importDateStr ? new Date(importDateStr + "T12:00:00") : new Date();`);

content = content.replace(`const yearDateEnd = importYear ? new Date(Date.UTC(importYear, 11, 30, 12, 0, 0)) : new Date();`,
`const yearDateEnd = importDateStr ? new Date(importDateStr + "T12:00:00") : new Date();`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
