const ExcelJS = require("exceljs");

async function checkTemplate2() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("public/templates/plantilla_kardex_general.xlsx");
    const worksheet = workbook.getWorksheet(1);
    
    const row = worksheet.getRow(13); // the header row
    let values = [];
    row.eachCell((cell, colNumber) => {
        values.push(`${colNumber}: ${cell.value}`);
    });
    console.log("ROW 13:", values.join(", "));
}

checkTemplate2();
