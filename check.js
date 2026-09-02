const ExcelJS = require("exceljs");

async function checkTemplate() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("public/templates/plantilla_productos_general_o_categoria.xlsx");
    const worksheet = workbook.getWorksheet(1);
    
    // Just dump row 12 (headers usually)
    const row = worksheet.getRow(12);
    let values = [];
    row.eachCell((cell, colNumber) => {
        values.push(`${colNumber}: ${cell.value}`);
    });
    console.log("ROW 12:", values.join(", "));
}

checkTemplate();
