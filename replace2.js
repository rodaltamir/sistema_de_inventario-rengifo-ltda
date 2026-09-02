const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/\.toFixed\(2\)/g, '.toFixed(6).replace(/\\.?0+$/, "")');

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
