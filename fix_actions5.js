const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/actions.ts", "utf8");

// Fix createProducto
content = content.replace(
`export async function createProducto(data: {
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
}) {`, 
`export async function createProducto(data: {
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
  fecha?: string;
}) {`
);

content = content.replace(
`const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  const producto = await tenantPrisma.producto.create({
    data: {
      codigo: data.codigo,`,
`const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
  const dbDate = data.fecha ? new Date(data.fecha + "T12:00:00") : new Date();

  const producto = await tenantPrisma.producto.create({
    data: {
      createdAt: dbDate,
      codigo: data.codigo,`
);

// Fix importProductos
content = content.replace(
`export async function importProductos(productosData: any[], importDescription: string = "", importYear: number = new Date().getFullYear()) {`,
`export async function importProductos(productosData: any[], importDescription: string = "", importDateStr: string = new Date().toISOString().split('T')[0]) {`
);

content = content.replace(
`    const dbDate = new Date();
    if (importYear && importYear !== dbDate.getFullYear()) {
      dbDate.setFullYear(importYear);
    }`,
`    const dbDate = new Date(importDateStr + "T12:00:00");`
);

// In ProductosClient, we passed 3 params to importProductos:
// importProductos(previewData, importDescription, importDate);
// That matches the new signature: (productosData: any[], importDescription: string = "", importDateStr: string)
// We also need to fix `error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.`
// But in `ProductosClient.tsx`, I replaced `importYear` with `importDate` which is string.
// Wait, did I miss any `importYear` in ProductosClient?

fs.writeFileSync("src/app/(app)/productos/actions.ts", content);
console.log("actions.ts updated successfully");
