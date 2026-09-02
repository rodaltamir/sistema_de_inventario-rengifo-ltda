const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

content = content.replace("resumenRows.forEach((r) => {", "resumenRows.forEach((r: any) => {");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
