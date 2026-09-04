const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/useState<number>\(new Date\(\)\.getFullYear\(\)\);/, `useState<string>(new Date().toISOString().split('T')[0]);`);

content = content.replace(/<input\s*type="number"\s*required\s*value=\{importDate\}\s*onChange=\{\(e\) => setImportDate\(parseInt\(e\.target\.value\)\)\}/g, `<input
                      type="date"
                      required
                      value={importDate}
                      onChange={(e) => setImportDate(e.target.value)}`);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
