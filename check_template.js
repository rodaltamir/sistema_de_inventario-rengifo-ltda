const ExcelJS = require("exceljs");
async function checkTemplate() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/templates/plantilla_exportacion_productos.xlsx");
  const ws = workbook.worksheets[0];
  
  for(let i=1; i<=10; i++) {
    const row = ws.getRow(i);
    let rowData = [];
    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      rowData.push(`Col ${colNumber}: ${cell.value}`);
    });
    console.log(`Row ${i}:`, rowData.join(" | "));
  }
}
checkTemplate();
