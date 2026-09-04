const fs = require("fs");
let content = fs.readFileSync("src/app/api/export-productos/route.ts", "utf8");

const oldCode1 = `    const { filterCategoria, search } = await req.json();

    const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
    const productos = await tenantPrisma.producto.findMany({
      include: {
        categoria: true,
        proveedor: true,
      },
      orderBy: { codigo: 'asc' }
    });

    let filtered = productos;
    if (filterCategoria && filterCategoria !== "TODAS") {
      filtered = filtered.filter(p => p.categoriaId === filterCategoria);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q) || p.marca?.toLowerCase().includes(q)
      );
    }

    const templatePath = path.join(process.cwd(), "public", "templates", "plantilla_exportacion_productos.xlsx");
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(templatePath)) {
      await workbook.xlsx.readFile(templatePath);
    } else {
      // Fallback si no existe la plantilla
      const sheet = workbook.addWorksheet("Productos");
      sheet.addRow(["COD. ITEM", "NOMBRE", "DESCRIPCIÓN", "MARCA", "UNIDAD", "METODO DE INVENTARIO", "PROVEEDOR", "CATEGORIA", "STOCK", "P/U", "PRECIO DE VENTA"]);
    }

    const ws = workbook.worksheets[0];
    const startRow = 2;
    // Clear rows if there's any sample data
    ws.spliceRows(startRow, ws.rowCount - startRow + 1);`;

const newCode1 = `    const { search, fechaInicio, fechaFin } = await req.json();

    const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
    
    // Obtener info del tenant si est en la DB master (opcional) o hardcodear como Casa Matriz
    let tenantName = "Casa Matriz";
    let tenantNit = "0000000000";
    let tenantUbicacion = "La Paz - Bolivia";

    const productos = await tenantPrisma.producto.findMany({
      include: {
        categoria: true,
        proveedor: true,
      },
      orderBy: { codigo: 'asc' }
    });

    let filtered = productos;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q) || p.marca?.toLowerCase().includes(q)
      );
    }

    if (fechaInicio) {
      const d = new Date(fechaInicio + "T00:00:00");
      filtered = filtered.filter(p => new Date(p.createdAt) >= d);
    }
    if (fechaFin) {
      const d = new Date(fechaFin + "T23:59:59");
      filtered = filtered.filter(p => new Date(p.createdAt) <= d);
    }

    const templatePath = path.join(process.cwd(), "public", "templates", "plantilla_exportacion_productos.xlsx");
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(templatePath)) {
      await workbook.xlsx.readFile(templatePath);
    } else {
      const sheet = workbook.addWorksheet("Productos");
    }

    const ws = workbook.worksheets[0];
    
    // Llenar datos de la empresa y fechas
    ws.getCell('D1').value = tenantName; // C1/D1/E1 son Nombre
    ws.getCell('D2').value = tenantNit;  // C2/D2/E2 son NIT
    
    const fi = fechaInicio ? new Date(fechaInicio + "T12:00:00").toLocaleDateString() : "INICIO";
    const ff = fechaFin ? new Date(fechaFin + "T12:00:00").toLocaleDateString() : "ACTUALIDAD";
    ws.getCell('H3').value = \`DEL \${fi} AL \${ff}\`; // Fecha

    const startRow = 10;
    // Clear rows if there's any sample data below startRow
    if (ws.rowCount >= startRow) {
      ws.spliceRows(startRow, ws.rowCount - startRow + 1);
    }`;

const oldCode2 = `    let currentRow = startRow;
    for (const p of filtered) {
      const row = ws.getRow(currentRow);
      row.getCell(1).value = p.codigo || "-";
      row.getCell(2).value = p.nombre || "-";
      row.getCell(3).value = p.descripcion || "-";
      row.getCell(4).value = p.marca || "-";
      row.getCell(5).value = p.unidadMedida || "-";
      row.getCell(6).value = p.metodoInventario || "-";
      row.getCell(7).value = p.proveedor?.nombre || "-";
      row.getCell(8).value = p.categoria?.nombre || "-";
      row.getCell(9).value = p.stock || 0;
      row.getCell(10).value = p.costo || 0;
      row.getCell(11).value = p.precioVenta || 0;

      row.eachCell((cell, colNumber) => {
        cell.font = fontStyle;
        cell.border = borderStyle;
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        
        // Formato nmero para P/U y Precio Venta y Stock
        if (colNumber === 9 || colNumber === 10 || colNumber === 11) {
          cell.numFmt = '#,##0.00####';
        }
      });

      // Calcular altura aproximada por "NOMBRE" y "DESCRIPCION" responsivos
      const nombreLength = p.nombre ? p.nombre.length : 1;
      const descLength = p.descripcion ? p.descripcion.length : 1;
      // Anchos aprox de las columnas en la plantilla
      const nombreColWidth = ws.getColumn(2).width || 30;
      const descColWidth = ws.getColumn(3).width || 30;`;

const newCode2 = `    let currentRow = startRow;
    for (const p of filtered) {
      const row = ws.getRow(currentRow);
      
      // Aplicar merge para NOMBRE (cols 2 a 4) y DESCRIPCION (cols 6 a 8)
      ws.mergeCells(currentRow, 2, currentRow, 4);
      ws.mergeCells(currentRow, 6, currentRow, 8);

      row.getCell(1).value = p.codigo || "-";
      row.getCell(2).value = p.nombre || "-";
      row.getCell(5).value = p.marca || "-";
      row.getCell(6).value = p.descripcion || "-";
      row.getCell(9).value = p.unidadMedida || "-";
      row.getCell(10).value = p.metodoInventario || "-";
      row.getCell(11).value = p.proveedor?.nombre || "-";
      row.getCell(12).value = p.categoria?.nombre || "-";
      row.getCell(13).value = p.stock || 0;
      row.getCell(14).value = p.costo || 0;
      row.getCell(15).value = p.precioVenta || 0;

      for(let i=1; i<=15; i++) {
        const cell = row.getCell(i);
        cell.font = fontStyle;
        cell.border = borderStyle;
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        
        // Formato numrico
        if (i >= 13 && i <= 15) {
          cell.numFmt = '#,##0.00####';
        }
      }

      // Calcular altura aproximada por "NOMBRE" y "DESCRIPCION" responsivos
      const nombreLength = p.nombre ? p.nombre.length : 1;
      const descLength = p.descripcion ? p.descripcion.length : 1;
      
      // La columna nombre abarca 3 columnas, y descripcion tambin
      const nombreColWidth = 40; 
      const descColWidth = 40;`;

if (content.includes("    const { filterCategoria, search } = await req.json();")) {
  content = content.replace(oldCode1, newCode1);
  content = content.replace(oldCode2, newCode2);
  fs.writeFileSync("src/app/api/export-productos/route.ts", content);
  console.log("Updated api/export-productos/route.ts");
} else {
  console.log("Could not find block 1");
}
