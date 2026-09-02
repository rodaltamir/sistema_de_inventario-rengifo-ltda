const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

// Fix the borders for all columns in isResumen
content = content.replace(
    "['A','B','I','J','K','L','M','N','O','P','Q'].forEach(col => {",
    "['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'].forEach(col => {"
);

// Fix the dynamic styling at the end to include empty cells and enforce Arial 10 properly
const newStylingCode = `
      // ESTANDARIZAR TIPOGRAFIA (ARIAL 10) Y RESPONSIVIDAD (WRAP TEXT)
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
           const currentFont = cell.font || {};
           cell.font = { ...currentFont, name: 'Arial', size: 10 };
           
           const currentAlignment = cell.alignment || {};
           cell.alignment = { ...currentAlignment, wrapText: true, vertical: 'middle' };
        });
      });
      
      // Generar nombre de archivo
`;

content = content.replace(/ \/\/ ESTANDARIZAR TIPOGRAFIA[\s\S]*?\/\/ Generar nombre de archivo/, newStylingCode.trim() + "\n      // Generar nombre de archivo");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
