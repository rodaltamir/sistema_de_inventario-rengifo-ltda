const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(
  /value=\{importYear\}/g,
  `value={importDate}`
);
content = content.replace(
  /onChange=\{\(e\) => setImportYear\(parseInt\(e\.target\.value\)\)\}/g,
  `onChange={(e) => setImportDate(e.target.value)}`
);
content = content.replace(
  /type="number"/,
  `type="date"`
);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Fixed importYear in ProductosClient.tsx");
