const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/importYear/g, "importDate");

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Global replace importYear -> importDate");
