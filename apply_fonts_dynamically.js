const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

const stylingCode = `
      // ESTANDARIZAR TIPOGRAFIA (ARIAL 10) Y RESPONSIVIDAD (WRAP TEXT)
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          if (cell.value !== null && cell.value !== undefined) {
             cell.font = { ...(cell.font || {}), name: 'Arial', size: 10 };
             cell.alignment = { ...(cell.alignment || {}), wrapText: true };
          }
        });
      });
      
      // Generar nombre de archivo
`;

content = content.replace("// Generar nombre de archivo", stylingCode);

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
