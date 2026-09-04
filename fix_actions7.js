const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

content = content.replace(/const producto = await tenantPrisma\.producto\.create\(\{/g, `const dbDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();\n  const producto = await tenantPrisma.producto.create({`);
content = content.replace(/data: \{\s*codigo: data\.codigo,/g, `data: {\n      createdAt: dbDate,\n      codigo: data.codigo,`);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Done");
