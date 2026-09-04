const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/export async function importProductos\(productos: any\[\], descripcion\?: string, importYear\?: number\) \{/g, `export async function importProductos(productos: any[], descripcion?: string, importDateStr?: string) {`);

content = content.replace(/const dbDate = importYear/g, `const dbDate = importDateStr ? new Date(importDateStr + "T12:00:00")`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
