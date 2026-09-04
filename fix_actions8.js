const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/export async function importProductos\(productos: any\[\], descripcion\?: string, importYear\?: number\) \{/g, `export async function importProductos(productos: any[], descripcion?: string, importDateStr?: string) {`);

content = content.replace(/if \(importYear && importYear !== dbDate\.getFullYear\(\)\) \{\s*dbDate\.setFullYear\(importYear\);\s*\}/g, ``);
content = content.replace(/const dbDate = new Date\(\);/g, `const dbDate = importDateStr ? new Date(importDateStr + "T12:00:00") : new Date();`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
