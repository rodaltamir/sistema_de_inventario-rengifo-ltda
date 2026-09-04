const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

// 1. modify createProducto signature and create
const createProductoRegex = /export async function createProducto\(data: \{\n\s*codigo: string;\n\s*nombre: string;\n\s*descripcion: string;\n\s*marca: string;\n\s*unidadMedida: string;\n\s*metodoInventario: string;\n\s*proveedorId: string \| null;\n\s*categoriaId: string \| null;\n\s*stock: number;\n\s*costo: number;\n\s*precioVenta: number;\n\}\) \{/;
const newCreateProducto = `export async function createProducto(data: {
  codigo: string;
  nombre: string;
  descripcion: string;
  marca: string;
  unidadMedida: string;
  metodoInventario: string;
  proveedorId: string | null;
  categoriaId: string | null;
  stock: number;
  costo: number;
  precioVenta: number;
  fechaCreacion?: string;
}) {`;
content = content.replace(createProductoRegex, newCreateProducto);

const createPrismaRegex = /const newProduct = await tenantPrisma\.producto\.create\(\{\n\s*data: \{\n\s*codigo: data\.codigo,\n\s*nombre: data\.nombre,\n\s*descripcion: data\.descripcion \|\| "",\n\s*marca: data\.marca \|\| "",\n\s*unidadMedida: data\.unidadMedida \|\| "Unidad",\n\s*stock: data\.stock \|\| 0,\n\s*costo: data\.costo \|\| 0,\n\s*precioVenta: data\.precioVenta \|\| 0,\n\s*metodoInventario: data\.metodoInventario \|\| "Promedio Ponderado",\n\s*proveedorId: data\.proveedorId \|\| null,\n\s*categoriaId: data\.categoriaId \|\| null,\n\s*\}\n\s*\}\);/;
const newCreatePrisma = `const newProduct = await tenantPrisma.producto.create({
    data: {
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion || "",
      marca: data.marca || "",
      unidadMedida: data.unidadMedida || "Unidad",
      stock: data.stock || 0,
      costo: data.costo || 0,
      precioVenta: data.precioVenta || 0,
      metodoInventario: data.metodoInventario || "Promedio Ponderado",
      proveedorId: data.proveedorId || null,
      categoriaId: data.categoriaId || null,
      createdAt: data.fechaCreacion ? new Date(data.fechaCreacion + "T12:00:00Z") : undefined
    }
  });`;
content = content.replace(createPrismaRegex, newCreatePrisma);

// 2. modify importProductos signature and logic
const importSignatureRegex = /export async function importProductos\(productos: any\[\], descripcion\?: string, importYear\?: number\) \{/;
const newImportSignature = `export async function importProductos(productos: any[], descripcion?: string, importDate?: string) {`;
content = content.replace(importSignatureRegex, newImportSignature);

const importDatesRegex = /const ts = new Date\(\)\.toISOString\(\)\.replace\(\/\[-:T\]\/g, ""\)\.slice\(0, 14\);\n\s*const desc = descripcion \|\| `Importaci\u00f3n Hist\u00f3rica \$\{importYear \|\| ""\}`\.trim\(\);\n\s*\/\/ Utilizar UTC a mediod\u00eda para evitar que la conversi\u00f3n de zonas horarias retrase la fecha al a\u00f1o anterior \(ej\. 31\/12\/2024 en vez de 01\/01\/2025\)\n\s*const yearDateStart = importYear \? new Date\(Date\.UTC\(importYear, 11, 30, 12, 0, 0\)\) : new Date\(\);\n\s*const yearDateEnd = importYear \? new Date\(Date\.UTC\(importYear, 11, 30, 12, 0, 0\)\) : new Date\(\);/g;

const newImportDates = `const ts = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const desc = descripcion || \`Importaci\u00f3n Hist\u00f3rica \${importDate || ""}\`.trim();
  
  const yearDateStart = importDate ? new Date(importDate + "T12:00:00Z") : new Date();
  const yearDateEnd = yearDateStart;`;
content = content.replace(importDatesRegex, newImportDates);

// We should also set the createdAt of the imported products?
// Yes! Let's find the `create` logic for imported products.
const importCreateRegex = /await tenantPrisma\.producto\.create\(\{\n\s*data: \{\n\s*codigo: p\.codigo,\n\s*nombre: p\.nombre,\n\s*descripcion: p\.descripcion \|\| "",\n\s*marca: p\.marca \|\| "",\n\s*unidadMedida: p\.unidadMedida \|\| "Unidad",\n\s*stock: qtyStock,\n\s*costo: cost,\n\s*precioVenta: pVenta,\n\s*metodoInventario: p\.metodoInventario \|\| "Promedio Ponderado",\n\s*proveedorId: null\n\s*\}\n\s*\}\);/g;
const newImportCreate = `await tenantPrisma.producto.create({
        data: {
          codigo: p.codigo,
          nombre: p.nombre,
          descripcion: p.descripcion || "",
          marca: p.marca || "",
          unidadMedida: p.unidadMedida || "Unidad",
          stock: qtyStock,
          costo: cost,
          precioVenta: pVenta,
          metodoInventario: p.metodoInventario || "Promedio Ponderado",
          proveedorId: null,
          createdAt: yearDateStart
        }
      });`;
content = content.replace(importCreateRegex, newImportCreate);

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("Updated actions.ts");
