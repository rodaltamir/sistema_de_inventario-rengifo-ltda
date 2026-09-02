const ExcelJS = require("exceljs");
async function checkTemplate2() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("public/templates/plantilla_kardex_general.xlsx");
    const worksheet = workbook.getWorksheet(1);
    
    for(let i=10; i<=14; i++) {
        const row = worksheet.getRow(i);
        let values = [];
        row.eachCell((cell, colNumber) => {
            values.push(`${colNumber}: ${cell.value}`);
        });
        console.log(`ROW ${i}:`, values.join(", "));
    }
}
checkTemplate2();
