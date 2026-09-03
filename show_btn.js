const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8").split("\n");
let start = lines.findIndex(l => l.includes("<Download size={18} /> Exportar"));
for(let i = start - 5; i < start + 5 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
