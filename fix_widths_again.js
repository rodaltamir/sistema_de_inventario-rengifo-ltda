const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

const oldWidthLogic = `
        // Ajustar columnas (con limites razonables para que no sean infinitas)
        // B, C, D estan combinadas, por lo que ajustar B afecta el total
        worksheet.getColumn('B').width = Math.max(25, Math.min(maxNombre * 1.2, 100)); 
        worksheet.getColumn('E').width = Math.max(12, Math.min(maxMarca * 1.3, 50));
        worksheet.getColumn('F').width = Math.max(15, Math.min(maxDesc - 10, 60));
`;

// Remove aggressive width expansion completely. Let the template's default width dictate, 
// and we'll use row height auto-adjustment instead.
content = content.replace(oldWidthLogic, `
        // Usar anchos ligeramente ajustados para que no sean exagerados.
        // La responsividad principal la haremos con el alto de la fila.
        worksheet.getColumn('B').width = 18; // Default ancho base
        worksheet.getColumn('E').width = Math.max(12, Math.min(maxMarca + 2, 25));
        worksheet.getColumn('F').width = 18; 
`);

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
