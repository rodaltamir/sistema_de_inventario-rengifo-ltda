import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTenantClient } from "@/lib/prisma";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.currentConnectionString) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { search, fechaInicio, fechaFin } = await req.json();

    const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
    
    // Obtener info del tenant si est en la DB master (opcional) o hardcodear como Casa Matriz
    let tenantInfo = { name: "Casa Matriz", nit: "0000000000", casaMatriz: "", sucursal: "" };
    if (session.user.currentTenantId) {
      const { masterPrisma } = await import("@/lib/prisma");
      const dbTenant = await masterPrisma.tenant.findUnique({
        where: { id: session.user.currentTenantId }
      });
      if (dbTenant) {
        tenantInfo = {
          name: dbTenant.name,
          nit: dbTenant.nit || "0000000000",
          casaMatriz: dbTenant.casaMatriz || "",
          sucursal: dbTenant.sucursal || ""
        };
      }
    }

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
    
    // Escribir datos de la empresa (segun plantilla, en la columna B o 2)
    // Para asegurarse, si B1 est merged, escribir en la celda master (que es la superior izquierda)
    const cellA1 = ws.getCell(1, 1);
    if (cellA1) cellA1.value = tenantInfo.name;
    const cellA2 = ws.getCell(2, 1);
    if (cellA2) cellA2.value = `NIT: ${tenantInfo.nit}`;
    const cellA3 = ws.getCell(3, 1);
    if (cellA3) cellA3.value = tenantInfo.casaMatriz ? `Casa Matriz: ${tenantInfo.casaMatriz}` : "Casa Matriz:";

    const fi = fechaInicio ? new Date(fechaInicio + "T12:00:00").toLocaleDateString() : "INICIO";
    const ff = fechaFin ? new Date(fechaFin + "T12:00:00").toLocaleDateString() : "ACTUALIDAD";
    const cellF3 = ws.getCell(3, 6);
    if (cellF3) cellF3.value = `DEL ${fi} AL ${ff}`;

    const startRow = 10;
    // Clear rows if there's any sample data below startRow
    if (ws.rowCount >= startRow) {
      ws.spliceRows(startRow, ws.rowCount - startRow + 1);
    }

    const fontStyle = { name: "Aptos Narrow", size: 11 };
    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    } as any;

    let currentRow = startRow;
    for (const p of filtered) {
      const row = ws.getRow(currentRow);
      
      // Aplicar merge para NOMBRE (cols 2 a 4) y DESCRIPCION (cols 6 a 8)
      // ExcelJS mergeCells es (topRow, leftCol, bottomRow, rightCol)
      try { ws.mergeCells(currentRow, 2, currentRow, 4); } catch(e) {}
      try { ws.mergeCells(currentRow, 6, currentRow, 8); } catch(e) {}

      row.getCell(1).value = p.codigo || "-";
      row.getCell(2).value = p.nombre || "-";
      // La celda 3 y 4 estn merged con la 2
      row.getCell(5).value = p.marca || "-";
      row.getCell(6).value = p.descripcion || "-";
      // La celda 7 y 8 estn merged con la 6
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
        
        if (i >= 13 && i <= 15) {
          cell.numFmt = '#,##0.00####';
        }
      }

      // Calcular altura aproximada por "NOMBRE" y "DESCRIPCION" responsivos
      const nombreLength = p.nombre ? p.nombre.length : 1;
      const descLength = p.descripcion ? p.descripcion.length : 1;
      
      // Anchos aprox de las columnas fusionadas
      const nombreColWidth = 45;
      const descColWidth = 45;

      const linesNombre = Math.ceil(nombreLength / nombreColWidth);
      const linesDesc = Math.ceil(descLength / descColWidth);
      const maxLines = Math.max(linesNombre, linesDesc, 1);
      row.height = maxLines * 15;

      currentRow++;
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=Productos_Exportados.xlsx"
      }
    });

  } catch (error: any) {
    console.error("Error exportando productos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
