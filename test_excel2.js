const ExcelJS = require("exceljs");
(async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/templates/plantilla_exportacion_productos.xlsx");
  const ws = workbook.getWorksheet(1);
  console.log("A1:", ws.getCell("A1").value);
  console.log("B1:", ws.getCell("B1").value);
  console.log("C1:", ws.getCell("C1").value);
  console.log("B2:", ws.getCell("B2").value);
  console.log("B3:", ws.getCell("B3").value);
  console.log("B4:", ws.getCell("B4").value);
  console.log("B5:", ws.getCell("B5").value);
  console.log("E2:", ws.getCell("E2").value);
  console.log("E3:", ws.getCell("E3").value);
})();
