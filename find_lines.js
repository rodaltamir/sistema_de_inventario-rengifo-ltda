const fs = require("fs");
const content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");
const lines = content.split('\n');
let start = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("totEntBs.toFixed(6).replace(/\\\\.?0+$/,") && lines[i].includes("<td")) {
        console.log(`Line ${i}: ${lines[i]}`);
    }
}
