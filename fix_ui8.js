const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/const newProduct = await createProducto\(\{/g, `const newProduct = await createProducto({
            fecha: fechaCreacion,`);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
