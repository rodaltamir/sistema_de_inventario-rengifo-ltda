const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

const autoFitLogic = `
      if (isResumen) {
        let maxNombre = 15;
        let maxMarca = 10;
        let maxDesc = 15;
        
        resumenRows.forEach((r) => {
          if (r.nombre && r.nombre.length > maxNombre) maxNombre = r.nombre.length;
          if (r.marca && r.marca.length > maxMarca) maxMarca = r.marca.length;
          if (r.descripcion && r.descripcion.length > maxDesc) maxDesc = r.descripcion.length;
        });
        
        // Ajustar columnas (con limites razonables para que no sean infinitas)
        // B, C, D estan combinadas, por lo que ajustar B afecta el total
        worksheet.getColumn('B').width = Math.max(15, Math.min(maxNombre - 10, 60)); 
        worksheet.getColumn('E').width = Math.max(10, Math.min(maxMarca + 4, 30));
        worksheet.getColumn('F').width = Math.max(15, Math.min(maxDesc - 10, 60));
`;

content = content.replace("if (isResumen) {", autoFitLogic);

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
