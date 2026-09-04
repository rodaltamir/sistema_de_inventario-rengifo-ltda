const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/const desc = descripcion \|\| `Importacin Histrica \$\{importYear \|\| ""\}`\.trim\(\);/,
  `const desc = descripcion || \`Importacion Historica \${importDate || ""}\`.trim();`);
content = content.replace(/const yearDateStart = importYear \? new Date\(Date\.UTC\(importYear, 11, 30, 12, 0, 0\)\) : new Date\(\);/,
  `const yearDateStart = importDate ? new Date(importDate + "T12:00:00Z") : new Date();`);
content = content.replace(/const yearDateEnd = importYear \? new Date\(Date\.UTC\(importYear, 11, 30, 12, 0, 0\)\) : new Date\(\);/,
  `const yearDateEnd = yearDateStart;`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Fixed importYear in actions.ts");
