const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

content = content.replace(/\s*\}\);\s*\}\);/g, "\n                    });");

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
