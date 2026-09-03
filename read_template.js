const ExcelJS = require('exceljs');
async function readTemplate() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('public/templates/plantilla_exportacion_productos.xlsx');
  const ws = workbook.worksheets[0];
  const headers = [];
  ws.getRow(1).eachCell((cell, colNumber) => {
    headers.push({col: colNumber, val: cell.value});
  });
  console.log("Row 1: ", headers);
  
  const headers2 = [];
  ws.getRow(2).eachCell((cell, colNumber) => {
    headers2.push({col: colNumber, val: cell.value});
  });
  console.log("Row 2: ", headers2);
}
readTemplate();
