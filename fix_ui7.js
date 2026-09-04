const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/const \[search, setSearch\] = useState\(""\);/, `const [search, setSearch] = useState("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [fechaCreacion, setFechaCreacion] = useState<string>(new Date().toISOString().split('T')[0]);`);

content = content.replace(/importYear: number;/g, `importDate: string;`);
content = content.replace(/const \[importYear, setImportYear\] = useState\(new Date\(\)\.getFullYear\(\)\);/g, `const [importDate, setImportDate] = useState<string>(new Date().toISOString().split('T')[0]);`);

content = content.replace(/setImportYear/g, `setImportDate`);
content = content.replace(/importYear/g, `importDate`);

content = content.replace(/body: JSON\.stringify\(\{ search \}\)/g, `body: JSON.stringify({ search, fechaInicio, fechaFin })`);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
