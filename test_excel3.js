const ExcelJS = require("exceljs");
(async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/templates/plantilla_exportacion_productos.xlsx");
  const ws = workbook.getWorksheet(1);
  for (let r = 1; r <= 8; r++) {
    for (let c = 1; c <= 10; c++) {
      let val = ws.getCell(r, c).value;
      if (val) console.log(`R${r}C${c}:`, val);
    }
  }
})();
