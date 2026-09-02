const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

content = content.replace("worksheet.getColumn('B').width = Math.max(15, Math.min(maxNombre - 10, 60));", "worksheet.getColumn('B').width = Math.max(25, Math.min(maxNombre * 1.2, 100));");
content = content.replace("worksheet.getColumn('E').width = Math.max(10, Math.min(maxMarca + 4, 30));", "worksheet.getColumn('E').width = Math.max(12, Math.min(maxMarca * 1.3, 50));");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
