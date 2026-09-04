const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-productos/route.ts", "utf8");

content = content.replace(/ws\.mergeCells\(currentRow, 2, currentRow, 4\);/g, `try { ws.mergeCells(currentRow, 2, currentRow, 4); } catch(e) {}`);
content = content.replace(/ws\.mergeCells\(currentRow, 6, currentRow, 8\);/g, `try { ws.mergeCells(currentRow, 6, currentRow, 8); } catch(e) {}`);

fs.writeFileSync("src/app/api/export-productos/route.ts", content);
console.log("Updated api/export-productos/route.ts to ignore merge errors");
