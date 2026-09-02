const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

const autoFitRow = `
          // Auto-ajuste manual de la altura de la fila
          let lines = 1;
          if (r.nombre && r.nombre.length > 55) {
              lines = Math.max(lines, Math.ceil(r.nombre.length / 55));
          }
          if (r.descripcion && r.descripcion.length > 55) {
              lines = Math.max(lines, Math.ceil(r.descripcion.length / 55));
          }
          if (r.marca && r.marca.length > 25) {
              lines = Math.max(lines, Math.ceil(r.marca.length / 25));
          }
          
          if (lines > 1) {
              row.height = 15 * lines;
          }
`;

content = content.replace(/row\.getCell\('F'\)\.value = r\.descripcion;\s*/g, "row.getCell('F').value = r.descripcion;\n" + autoFitRow);

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
