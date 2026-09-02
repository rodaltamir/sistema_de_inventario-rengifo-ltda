const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

// We can replace `.toFixed(2)` with `? Number(X).toFixed(6)...` wait, it's easier to just do:
// Number((expr).toFixed(6)).toString()
// A regex replacement for `.toFixed(2)` -> `.toFixed(6).replace(/\.?0+$/, '')` isn't always safe if it's like 100.00 -> 100, wait, it IS safe!
// 100.000000 -> "100"
// 10.500000 -> "10.5"
// "10.050000".replace(/\.?0+$/, '') -> "10.05"
content = content.replace(/\.toFixed\(2\)/g, '.toFixed(6).replace(/\\.?0+$/, "")');

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
