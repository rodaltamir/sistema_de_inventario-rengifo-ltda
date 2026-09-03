const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8").split("\n");
let start = lines.findIndex(l => l.includes("export async function importProductos"));
for(let i = start; i < start + 100 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
