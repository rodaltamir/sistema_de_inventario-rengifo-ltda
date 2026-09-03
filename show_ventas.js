const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8").split("\n");
let start = lines.findIndex(l => l.includes("const ventas = productos.filter"));
for(let i = start; i < start + 30 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
