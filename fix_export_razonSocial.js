const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-productos/route.ts", "utf8");

content = content.replace("p.proveedor?.razonSocial ||", "p.proveedor?.nombre ||");

fs.writeFileSync("src/app/api/export-productos/route.ts", content);
console.log("Fixed razonSocial to nombre.");
