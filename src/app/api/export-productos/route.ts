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

    const { search, fechaInicio, fechaFin, categoriaId, proveedorId } = await req.json();

    const tenantPrisma = await getTenantClient(session.user.currentConnectionString);
    
    // Obtener info del tenant
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

    let categoriaNombre = "TODAS";
    if (categoriaId) {
      const cat = await tenantPrisma.categoria.findUnique({ where: { id: categoriaId } });
      if (cat) categoriaNombre = cat.nombre;
    }

    let proveedorNombre = "TODOS";
    if (proveedorId) {
      const prov = await tenantPrisma.proveedor.findUnique({ where: { id: proveedorId } });
      if (prov) proveedorNombre = prov.nombre;
    }

    const productos = await tenantPrisma.producto.findMany({
      where: { activo: true },
      include: {
        categoria: true,
        proveedor: true,
        detalles: {
          include: { transaccion: true },
          orderBy: { transaccion: { fecha: 'asc' } },
        }
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

    if (categoriaId) {
      filtered = filtered.filter(p => p.categoriaId === categoriaId);
    }

    if (proveedorId) {
      filtered = filtered.filter(p => p.proveedorId === proveedorId);
    }

    if (fechaInicio || fechaFin) {
      const dInicio = fechaInicio ? new Date(fechaInicio + "T00:00:00") : null;
      const dFin = fechaFin ? new Date(fechaFin + "T23:59:59") : null;

      filtered = filtered.filter(p => {
        const prodDate = new Date(p.createdAt);
        const earliestTx = p.detalles && p.detalles.length > 0 
          ? new Date(p.detalles[0].transaccion.fecha) 
          : null;
        
        // Fecha efectiva: la fecha de su movimiento inicial si es anterior o su fecha de creación
        const effectiveDate = earliestTx && earliestTx < prodDate ? earliestTx : prodDate;

        let matchEffective = true;
        if (dInicio && effectiveDate < dInicio) matchEffective = false;
        if (dFin && effectiveDate > dFin) matchEffective = false;
        if (matchEffective) return true;

        // Si tiene movimientos dentro del rango solicitado
        if (p.detalles && p.detalles.length > 0) {
          const hasTxInRange = p.detalles.some((d: any) => {
            const txDate = new Date(d.transaccion.fecha);
            if (dInicio && txDate < dInicio) return false;
            if (dFin && txDate > dFin) return false;
            return true;
          });
          if (hasTxInRange) return true;
        }

        return false;
      });
    }

    const templatePath = path.join(process.cwd(), "public", "templates", "plantilla_exportacion_productos.xlsx");
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(templatePath)) {
      await workbook.xlsx.readFile(templatePath);
    } else {
      workbook.addWorksheet("Productos");
    }

    const ws = workbook.worksheets[0];
    
    // Limpiar celdas predefinidas de la plantilla en filas 1 a 7
    for (let r = 1; r <= 7; r++) {
      ws.getCell(`A${r}`).value = '';
      ws.getCell(`B${r}`).value = '';
      ws.getCell(`C${r}`).value = '';
      ws.getCell(`D${r}`).value = '';
      ws.getCell(`E${r}`).value = '';
    }

    // Datos de la Empresa (igual a Imagen 2 / export-kardex)
    ws.getCell('A1').value = tenantInfo.name;
    ws.getCell('A1').font = { name: 'Aptos Narrow', size: 11, bold: true };

    ws.getCell('A2').value = tenantInfo.nit ? `NIT: ${tenantInfo.nit}` : 'NIT: S/N';
    ws.getCell('A2').font = { name: 'Aptos Narrow', size: 11, bold: true };
    
    if (tenantInfo.casaMatriz) {
      ws.getCell('A3').value = 'CASA MATRIZ:';
      ws.getCell('A3').font = { name: 'Aptos Narrow', size: 11, bold: true };
      ws.getCell('A4').value = tenantInfo.casaMatriz;
      ws.getCell('A4').font = { name: 'Aptos Narrow', size: 10 };
    } else {
      ws.getCell('A3').value = '';
      ws.getCell('A4').value = '';
    }

    if (tenantInfo.sucursal) {
      ws.getCell('A5').value = 'SUCURSAL:';
      ws.getCell('A5').font = { name: 'Aptos Narrow', size: 11, bold: true };
    }

    // Fila 6 y 7: Categoria y Metodo de inventario / Proveedor
    try { ws.unMergeCells('A6:C6'); } catch(e) {}

    ws.getCell('A6').value = '';
    ws.getCell('A7').value = '';

    try { ws.mergeCells('B6:C6'); } catch(e) {}
    ws.getCell('B6').value = 'Categoria:';
    ws.getCell('B6').font = { name: 'Aptos Narrow', size: 10, bold: true };
    ws.getCell('B6').alignment = { vertical: 'middle', horizontal: 'left' };
    
    try { ws.mergeCells('D6:F6'); } catch(e) {}
    ws.getCell('D6').value = categoriaNombre;
    ws.getCell('D6').font = { name: 'Aptos Narrow', size: 10 };
    ws.getCell('D6').alignment = { vertical: 'middle', horizontal: 'left' };

    try { ws.mergeCells('B7:C7'); } catch(e) {}
    ws.getCell('B7').value = proveedorId ? 'Proveedor:' : 'Metodo de inventario:';
    ws.getCell('B7').font = { name: 'Aptos Narrow', size: 10, bold: true };
    ws.getCell('B7').alignment = { vertical: 'middle', horizontal: 'left' };

    try { ws.mergeCells('D7:F7'); } catch(e) {}
    ws.getCell('D7').value = proveedorId ? proveedorNombre : 'Promedio Ponderado';
    ws.getCell('D7').font = { name: 'Aptos Narrow', size: 10 };
    ws.getCell('D7').alignment = { vertical: 'middle', horizontal: 'left' };

    // Formatear fechas en formato DD/MM/YYYY
    const formatDate = (isoStr?: string) => {
      if (!isoStr) return '';
      const [y, m, d] = isoStr.split('-');
      return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    };

    const fi = fechaInicio ? formatDate(fechaInicio) : '(INICIO)';
    const ff = fechaFin ? formatDate(fechaFin) : '(ACTUALIDAD)';
    const fechaTexto = `DEL ${fi} AL ${ff}`;

    // Título y Rango Central (columnas F a J o K)
    try { ws.mergeCells('F2:J2'); } catch(e) {}
    try { ws.mergeCells('F3:J3'); } catch(e) {}
    try { ws.mergeCells('F4:J4'); } catch(e) {}

    const cellTitle = ws.getCell('F2');
    cellTitle.value = 'CATALOGO DE PRODUCTOS';
    cellTitle.alignment = { horizontal: 'center', vertical: 'middle' };
    cellTitle.font = { name: 'Aptos Narrow', size: 12, bold: true };

    const cellDates = ws.getCell('F3');
    cellDates.value = fechaTexto;
    cellDates.alignment = { horizontal: 'center', vertical: 'middle' };
    cellDates.font = { name: 'Aptos Narrow', size: 10, bold: true };

    const cellExp = ws.getCell('F4');
    cellExp.value = '(Expresado en Bolivianos)';
    cellExp.alignment = { horizontal: 'center', vertical: 'middle' };
    cellExp.font = { name: 'Aptos Narrow', size: 10 };

    const startRow = 10;
    const initialRowCount = ws.rowCount;

    // Deshacer merges existentes de la fila 10 de la plantilla
    try { ws.unMergeCells('B10:D10'); } catch(e) {}
    try { ws.unMergeCells('F10:H10'); } catch(e) {}

    // Limpiar filas previas y sus estilos para evitar herencias de formato
    for (let r = startRow; r <= initialRowCount; r++) {
      const row = ws.getRow(r);
      for (let c = 1; c <= 20; c++) {
        const cell = row.getCell(c);
        cell.value = null;
        cell.style = {};
      }
    }

    const fontStyle = { name: "Aptos Narrow", size: 10 };
    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    } as any;

    let currentRow = startRow;
    for (const p of filtered) {
      const row = ws.getRow(currentRow);
      
      // Merge para NOMBRE (cols 2 a 4) y DESCRIPCION (cols 6 a 8)
      try { ws.mergeCells(currentRow, 2, currentRow, 4); } catch(e) {}
      try { ws.mergeCells(currentRow, 6, currentRow, 8); } catch(e) {}

      row.getCell(1).value = p.codigo || "-";
      row.getCell(2).value = p.nombre || "-";
      row.getCell(5).value = p.marca || "-";
      row.getCell(6).value = p.descripcion || "-";
      row.getCell(9).value = p.unidadMedida || "Unidad";
      row.getCell(10).value = p.metodoInventario || "Promedio Ponderado";
      row.getCell(11).value = p.proveedor?.nombre || "-";
      row.getCell(12).value = p.categoria?.nombre || "-";
      row.getCell(13).value = p.stock || 0;
      row.getCell(14).value = p.costo || 0;
      row.getCell(15).value = p.precioVenta || 0;

      for (let i = 1; i <= 15; i++) {
        const cell = row.getCell(i);
        cell.style = {
          font: fontStyle,
          border: borderStyle
        };
        
        if ([2, 3, 4, 6, 7, 8].includes(i)) {
          cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        } else if ([13, 14, 15].includes(i)) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.numFmt = i === 13 ? '#,##0' : '#,##0.00####';
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
      }

      // Altura responsiva según texto
      const nombreLength = p.nombre ? p.nombre.length : 1;
      const descLength = p.descripcion ? p.descripcion.length : 1;
      const linesNombre = Math.ceil(nombreLength / 40);
      const linesDesc = Math.ceil(descLength / 40);
      const maxLines = Math.max(linesNombre, linesDesc, 1);
      row.height = Math.max(18, maxLines * 15);

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
