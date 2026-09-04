const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/precioVenta:\s*number;\s*\}/g, `precioVenta: number;\n  fecha?: string;\n}`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
