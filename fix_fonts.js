const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

content = content.replace(/(\w+)\.getCell\((.*?)\)\.font\s*=\s*\{([^}]+)\}/g, (match, obj, cellId, inner) => {
    return `${obj}.getCell(${cellId}).font = { ...${obj}.getCell(${cellId}).font, ${inner} }`;
});

// Also replace `.alignment = {` with `.alignment = { ...cell.alignment,` to preserve wrapText
content = content.replace(/(\w+)\.getCell\((.*?)\)\.alignment\s*=\s*\{([^}]+)\}/g, (match, obj, cellId, inner) => {
    return `${obj}.getCell(${cellId}).alignment = { ...${obj}.getCell(${cellId}).alignment, ${inner} }`;
});

// Also there was `cell.font = { bold: true, size: 8 };` inside a forEach loop. Let's fix that manually.
content = content.replace(/cell\.font\s*=\s*\{\s*bold:\s*true,\s*size:\s*8\s*\}/g, 'cell.font = { ...cell.font, bold: true, size: 10 }');
content = content.replace(/cell\.font\s*=\s*\{\s*bold:\s*false,\s*size:\s*8\s*\}/g, 'cell.font = { ...cell.font, bold: false, size: 10 }');
content = content.replace(/cell\.alignment\s*=\s*\{\s*vertical:\s*'middle',\s*horizontal:\s*'center'\s*\}/g, "cell.alignment = { ...cell.alignment, vertical: 'middle', horizontal: 'center' }");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
