const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8").split("\n");
let start = lines.findIndex(l => l.includes("return ("));
for(let i = start - 10; i < start + 5 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
