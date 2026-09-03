const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(
  `body: JSON.stringify({ filterCategoria, search })`,
  `body: JSON.stringify({ search })`
);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Updated handleExport search payload.");
