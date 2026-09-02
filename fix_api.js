const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

content = content.replace("worksheet.mergeCells(`B${currentRow}:E${currentRow}`);", "worksheet.mergeCells(`B${currentRow}:D${currentRow}`);");
content = content.replace("row.getCell('B').value = r.nombre;", "row.getCell('B').value = r.nombre;\n          row.getCell('E').value = r.marca || '-';");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
