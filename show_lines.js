const fs = require("fs");
const lines = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8").split("\n");
for(let i = 940; i <= 970; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
