const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

content = content.replace("nombre: p.nombre,", "nombre: p.nombre,\n            marca: p.marca || '-',");

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
