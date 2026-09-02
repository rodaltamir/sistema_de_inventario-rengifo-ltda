const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");

// Fix style cloning
content = content.replace(/cell\.style = JSON\.parse\(JSON\.stringify\(styleCell\.style\)\);/g, "cell.style = { ...styleCell.style };");

// Fix typography override
content = content.replace(/name: 'Arial', size: 10/g, "name: 'Aptos Narrow', size: 11");

fs.writeFileSync("src/app/api/export-kardex/route.ts", content);
