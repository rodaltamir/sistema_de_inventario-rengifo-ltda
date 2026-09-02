const ExcelJS = require("exceljs");

async function formatTemplate(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const worksheet = workbook.getWorksheet(1);
    
    // Apply Arial 10 to all cells and wrapText
    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            // Keep existing font properties (like bold, color) but change name and size
            const font = cell.font || {};
            cell.font = {
                ...font,
                name: 'Arial',
                size: 10
            };
            
            // Keep existing alignment but add wrapText
            const alignment = cell.alignment || {};
            cell.alignment = {
                ...alignment,
                wrapText: true
            };
        });
    });
    
    await workbook.xlsx.writeFile(file);
    console.log("Formatted " + file);
}

async function main() {
    await formatTemplate("public/templates/plantilla_productos_general_o_categoria.xlsx");
    await formatTemplate("public/templates/plantilla_kardex_general.xlsx");
}

main().catch(console.error);
