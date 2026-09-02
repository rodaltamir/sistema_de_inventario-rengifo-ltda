const ExcelJS = require("exceljs");
const fs = require("fs");

async function formatTemplate(file, outfile) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const worksheet = workbook.getWorksheet(1);
    
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            const font = cell.font || {};
            cell.font = {
                ...font,
                name: 'Arial',
                size: 10
            };
            
            const alignment = cell.alignment || {};
            cell.alignment = {
                ...alignment,
                wrapText: true
            };
        });
    });
    
    await workbook.xlsx.writeFile(outfile);
    console.log("Formatted to " + outfile);
}

async function main() {
    await formatTemplate("public/templates/plantilla_productos_general_o_categoria.xlsx", "public/templates/temp1.xlsx");
    await formatTemplate("public/templates/plantilla_kardex_general.xlsx", "public/templates/temp2.xlsx");
}
main().catch(console.error);
