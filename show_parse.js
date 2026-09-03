const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8").split("\n");
let start = lines.findIndex(l => l.includes("const rawEntradaCosto = "));
for(let i = start; i < start + 30 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
