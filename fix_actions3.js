const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

// For createProducto
content = content.replace(/export async function createProducto\(data: \{([\s\S]*?)precioVenta: number;\s*\}\) \{/g, `export async function createProducto(data: {$1precioVenta: number; fecha?: string; }) {`);
content = content.replace(/const tenantPrisma = await getTenantClient\(session\.user\.currentConnectionString\);\s*const dbDate = new Date\(\);/g, `const tenantPrisma = await getTenantClient(session.user.currentConnectionString);\n  const dbDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();`);
content = content.replace(/await tenantPrisma\.producto\.create\(\{[\s\S]*?data: \{/g, `await tenantPrisma.producto.create({\n      data: {\n        createdAt: dbDate,`);

// For importProductos
content = content.replace(/export async function importProductos\(productosData: any\[\], importDescription: string = "", importYear: number = new Date\(\)\.getFullYear\(\)\) \{/g, `export async function importProductos(productosData: any[], importDescription: string = "", importDateStr: string = new Date().toISOString().split('T')[0]) {`);
content = content.replace(/const dbDate = new Date\(\);/g, `const dbDate = new Date(importDateStr + "T12:00:00");`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
