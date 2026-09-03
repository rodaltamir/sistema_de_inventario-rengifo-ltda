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

    const { filterCategoria, search } = await req.json();

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
    ws.spliceRows(startRow, ws.rowCount - startRow + 1);

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
        
        // Formato número para P/U y Precio Venta y Stock
        if (colNumber === 9 || colNumber === 10 || colNumber === 11) {
          cell.numFmt = '#,##0.00####';
        }
      });

      // Calcular altura aproximada por "NOMBRE" y "DESCRIPCION" responsivos
      const nombreLength = p.nombre ? p.nombre.length : 1;
      const descLength = p.descripcion ? p.descripcion.length : 1;
      // Anchos aprox de las columnas en la plantilla
      const nombreColWidth = ws.getColumn(2).width || 30;
      const descColWidth = ws.getColumn(3).width || 30;

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
