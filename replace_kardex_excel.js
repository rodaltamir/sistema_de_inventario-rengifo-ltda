const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

content = content.replace(/\.toFixed\(2\)/g, '.toFixed(6)');

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
