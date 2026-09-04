const ExcelJS = require("exceljs");
(async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/template/plantilla_exportacion_productos.xlsx");
  const ws = workbook.getWorksheet(1);
  console.log("A1:", ws.getCell("A1").value);
  console.log("B1:", ws.getCell("B1").value);
  console.log("C1:", ws.getCell("C1").value);
  console.log("B2:", ws.getCell("B2").value);
  console.log("B3:", ws.getCell("B3").value);
  console.log("B4:", ws.getCell("B4").value);
  console.log("B5:", ws.getCell("B5").value);
  
  console.log("F1:", ws.getCell("F1").value);
  console.log("G1:", ws.getCell("G1").value);
  console.log("H1:", ws.getCell("H1").value);
  console.log("F2:", ws.getCell("F2").value);
  console.log("G2:", ws.getCell("G2").value);
  console.log("H2:", ws.getCell("H2").value);
  console.log("F3:", ws.getCell("F3").value);
  console.log("H3:", ws.getCell("H3").value);
})();
