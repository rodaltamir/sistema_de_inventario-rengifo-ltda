import { NextResponse } from 'next/server';
import path from 'path';
import * as ExcelJS from 'exceljs';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      productoSeleccionado, 
      categoriaNombre,
      movimientos, 
      resumenRows,
      fechaDesde, 
      fechaHasta, 
      isTodos,
      isResumen: isResumenBody,
      mostrarSaldoInicial,
      conImportes,
      empresaNombre,
      empresaNit
    } = body;

    const isResumen = isResumenBody !== undefined ? isResumenBody : isTodos;

    // Load template
    const templateName = isResumen ? 'plantilla_productos_general_o_categoria.xlsx' : 'plantilla_kardex_general.xlsx';
    const templatePath = path.join(process.cwd(), 'public', 'templates', templateName);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);
    
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error("No se encontró la hoja 1 en la plantilla");
    }

    // Find current tenant
    const currentTenant = session.user.tenants?.find((t: any) => t.id === session.user.currentTenantId);
    let tenantInfo = { name: empresaNombre || 'Empresa', nit: empresaNit, casaMatriz: '', sucursal: '', logo: '' };
    
    if (session.user.currentTenantId) {
      const { masterPrisma } = await import("@/lib/prisma");
      const dbTenant = await masterPrisma.tenant.findUnique({ where: { id: session.user.currentTenantId } });
      if (dbTenant) {
        tenantInfo = {
          name: dbTenant.name,
          nit: dbTenant.nit || '',
          casaMatriz: dbTenant.casaMatriz || '',
          sucursal: dbTenant.sucursal || '',
          logo: dbTenant.logo || ''
        };
      }
    }

    // Insert Logo
    if (tenantInfo.logo && tenantInfo.logo.startsWith('/uploads/')) {
      const fsSync = await import('fs');
      const logoPath = path.join(process.cwd(), 'public', tenantInfo.logo.replace(/^\/+/, ''));
      if (fsSync.existsSync(logoPath)) {
        const ext = tenantInfo.logo.split('.').pop() || 'png';
        const imageId = workbook.addImage({
          filename: logoPath,
          extension: ext as any,
        });
        worksheet.addImage(imageId, {
          tl: { col: 11, row: 0 }, // L1
          ext: { width: 140, height: 70 }
        });
      }
    }

    // Fill header information
    worksheet.getCell('B1').value = tenantInfo.name;
    worksheet.getCell('B2').value = tenantInfo.nit ? `NIT: ${tenantInfo.nit}` : 'NIT: S/N';
    
    // Configurar Casa Matriz y Sucursal
    if (tenantInfo.casaMatriz) {
      worksheet.getCell('B3').value = 'CASA MATRIZ:';
      worksheet.getCell('B4').value = tenantInfo.casaMatriz;
    } else {
      worksheet.getCell('B3').value = '';
      worksheet.getCell('B4').value = '';
    }

    if (tenantInfo.sucursal) {
      worksheet.getCell('B5').value = 'SUCURSAL:';
      worksheet.getCell('B6').value = tenantInfo.sucursal;
    } else {
      worksheet.getCell('B5').value = '';
      worksheet.getCell('B6').value = '';
    }
    
    // Unir celdas B a E para la informacion de la empresa para evitar recortes
    ['1', '2', '3', '4', '5', '6'].forEach(rowNum => {
      try { worksheet.mergeCells(`B${rowNum}:E${rowNum}`); } catch(e) {}
      worksheet.getCell(`B${rowNum}`).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    });

    // Fechas Formato
    const formatDate = (isoStr: string) => {
      if (!isoStr) return '';
      const [y, m, d] = isoStr.split('-');
      return `${d}/${m}/${y}`;
    };

    if (isResumen) {
      // ===== LOGICA PARA RESUMEN GENERAL O CATEGORIA =====
      const fechaTexto = `DEL ${formatDate(fechaDesde) || '(INICIO)'} AL ${formatDate(fechaHasta) || '(ACTUALIDAD)'}`;
      worksheet.getCell('J3').value = fechaTexto;
      worksheet.getCell('F3').value = ''; // Limpiar el texto incorrecto en F3

      worksheet.getCell('E7').value = categoriaNombre || 'TODAS';
      worksheet.getCell('E9').value = 'PEPS';

      if (!conImportes) {
         // Ocultar las columnas relacionadas con importes
         worksheet.getColumn('K').hidden = true;
         worksheet.getColumn('L').hidden = true;
         worksheet.getColumn('N').hidden = true;
         worksheet.getColumn('O').hidden = true;
         worksheet.getColumn('Q').hidden = true;
      }

      let currentRow = 13;
      // We will clone the styling from row 13 if it exists, otherwise just default styles
      const styleRow = worksheet.getRow(13);

      resumenRows.forEach((r: any) => {
        const row = worksheet.getRow(currentRow);
        row.height = styleRow.height || 15;

        // Copiar estilos de la fila base
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const styleCell = styleRow.getCell(colNumber);
          if (styleCell && styleCell.style) {
            cell.style = JSON.parse(JSON.stringify(styleCell.style));
          }
        });
        
        row.getCell('A').value = r.codigo;
        // Merge cells for description like the template does (B-H)
        try {
          worksheet.mergeCells(`B${currentRow}:H${currentRow}`);
        } catch(e) { /* Ignore if already merged */ }
        row.getCell('B').value = r.descripcion;
        row.getCell('I').value = r.unidad;
        
        row.getCell('J').value = r.entradas > 0 ? Number(r.entradas) : '-';
        const puEntrada = r.entradas > 0 ? (r.entradasBs / r.entradas) : 0;
        
        row.getCell('M').value = r.salidas > 0 ? Number(r.salidas) : '-';
        const puSalida = r.salidas > 0 ? (r.salidasBs / r.salidas) : 0;
        
        row.getCell('P').value = Number(r.saldo);

        // Formato numérico entero para Cantidades
        ['J', 'M', 'P'].forEach(col => {
           if (row.getCell(col).value !== '-') {
             row.getCell(col).numFmt = '#,##0';
           }
        });

        if (conImportes) {
           row.getCell('K').value = puEntrada > 0 ? Number(puEntrada.toFixed(2)) : '-';
           row.getCell('L').value = r.entradasBs > 0 ? Number(r.entradasBs.toFixed(2)) : '-';
           
           row.getCell('N').value = puSalida > 0 ? Number(puSalida.toFixed(2)) : '-';
           row.getCell('O').value = r.salidasBs > 0 ? Number(r.salidasBs.toFixed(2)) : '-';
           
           row.getCell('Q').value = Number(r.saldoBs.toFixed(2));

           // Formats
           ['K', 'L', 'N', 'O', 'Q'].forEach(col => {
             if (row.getCell(col).value !== '-') {
               row.getCell(col).numFmt = '#,##0.00';
             }
           });
        } else {
           ['K', 'L', 'N', 'O', 'Q'].forEach(col => {
             row.getCell(col).value = '';
           });
        }

        // Borders and alignment
        ['A','B','I','J','K','L','M','N','O','P','Q'].forEach(col => {
           const cell = row.getCell(col);
           cell.border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
           };
           cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        row.getCell('B').alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

        row.commit();
        currentRow++;
      });

      // Fila de TOTALES
      if (resumenRows.length > 0) {
        const finalRow = worksheet.getRow(currentRow);
        finalRow.height = styleRow.height;
        
        // Copiar estilos de la fila base para mantener colores de columnas
        finalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const styleCell = styleRow.getCell(colNumber);
          if (styleCell && styleCell.style) {
            cell.style = JSON.parse(JSON.stringify(styleCell.style));
          }
        });

        try {
          worksheet.mergeCells(`B${currentRow}:I${currentRow}`);
        } catch(e) { /* Ignore */ }
        finalRow.getCell('B').value = 'TOTALES';
        finalRow.getCell('B').font = { bold: true };
        finalRow.getCell('B').alignment = { horizontal: 'right', vertical: 'middle' };

        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        resumenRows.forEach((r: any) => {
          totEntCant += r.entradas; totEntBs += r.entradasBs;
          totSalCant += r.salidas; totSalBs += r.salidasBs;
          totSaldoCant += r.saldo; totSaldoBs += r.saldoBs;
        });

        finalRow.getCell('J').value = totEntCant > 0 ? totEntCant : '-';
        finalRow.getCell('M').value = totSalCant > 0 ? totSalCant : '-';
        finalRow.getCell('P').value = totSaldoCant;

        // Formato numérico entero para Cantidades en Totales
        ['J', 'M', 'P'].forEach(col => {
           if (finalRow.getCell(col).value !== '-') {
             finalRow.getCell(col).numFmt = '#,##0';
           }
        });

        if (conImportes) {
          finalRow.getCell('K').value = '-';
          finalRow.getCell('L').value = Number(totEntBs.toFixed(2));
          finalRow.getCell('L').numFmt = '#,##0.00';

          finalRow.getCell('N').value = '-';
          finalRow.getCell('O').value = Number(totSalBs.toFixed(2));
          finalRow.getCell('O').numFmt = '#,##0.00';

          finalRow.getCell('Q').value = Number(totSaldoBs.toFixed(2));
          finalRow.getCell('Q').numFmt = '#,##0.00';
        }

        ['J','K','L','M','N','O','P','Q'].forEach(col => {
           finalRow.getCell(col).font = { bold: true };
           finalRow.getCell(col).alignment = { horizontal: 'center', vertical: 'middle' };
           finalRow.getCell(col).border = {
             top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
           };
        });
      }

    } else {
      // ===== LOGICA ORIGINAL PARA PRODUCTO INDIVIDUAL =====
      const fechaTexto = `DEL ${formatDate(fechaDesde) || '(INICIO)'} AL ${formatDate(fechaHasta) || '(ACTUALIDAD)'}`;
      worksheet.getCell('E5').value = fechaTexto;

      worksheet.getCell('L11').value = 'UNIDAD DE MEDIDA:';
      worksheet.getCell('L11').font = { bold: true, size: 9 };
      
      // Removed CATEGORÍA override which messed with template.
      
      if (productoSeleccionado) {
        worksheet.getCell('B9').value = 'MÉTODO DE INVENTARIO:';
        worksheet.getCell('B9').font = { bold: true };
        
        worksheet.getCell('D9').value = 'PEPS';
        worksheet.getCell('D9').font = { bold: false };
        
        worksheet.getCell('G9').value = productoSeleccionado.nombre;
        worksheet.getCell('G9').font = { bold: false };
        worksheet.getCell('G9').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        
        worksheet.getCell('N9').value = productoSeleccionado.marca || 'S/M';
        worksheet.getCell('N9').font = { bold: false };
        
        worksheet.getCell('C11').value = productoSeleccionado.codigo;
        worksheet.getCell('C11').font = { bold: false };
        
        worksheet.getCell('G11').value = productoSeleccionado.descripcion || '';
        worksheet.getCell('G11').font = { bold: false };
        worksheet.getCell('G11').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        
        worksheet.getCell('N11').value = productoSeleccionado.unidadMedida || 'Unidad';
        worksheet.getCell('N11').font = { bold: false };
        
        worksheet.getCell('C12').value = ''; // Eliminar categoría
        worksheet.getCell('B12').value = ''; // Eliminar label CATEGORIA:
        worksheet.getCell('A12').value = ''; // Eliminar label CATEGORIA (si estuviese en A)
      }

      if (!conImportes) {
        worksheet.getCell('I16').value = ''; // P/U
        worksheet.getCell('J16').value = ''; // TOTAL
        worksheet.getCell('L16').value = ''; // P/U
        worksheet.getCell('M16').value = ''; // TOTAL
        worksheet.getCell('O15').value = ''; // TOTAL BS
        worksheet.getCell('O16').value = ''; // TOTAL BS
      } else {
        // ...
      }

      // Insert movements
      let currentRow = 17;
      const styleRow = worksheet.getRow(17);

      let movimientosList = [...movimientos];
      if (mostrarSaldoInicial === false && movimientosList.length > 0 && movimientosList[0].movimiento === 'SALDO INICIAL') {
        movimientosList.shift();
      }

      movimientosList.forEach((mov: any, index: number) => {
        const row = worksheet.getRow(currentRow);
        row.height = styleRow.height;

        // Copiar estilos de la fila base
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const styleCell = styleRow.getCell(colNumber);
          if (styleCell && styleCell.style) {
            cell.style = JSON.parse(JSON.stringify(styleCell.style));
          }
        });

        // Col A is N°
        row.getCell('A').value = index + 1; // N°
        row.getCell('B').value = mov.fecha || '-'; // FECHA
        row.getCell('C').value = mov.movimiento || '-'; // MOVIMIENTO
        row.getCell('D').value = mov.nitCi || '-'; // NIT/C.I.
        row.getCell('E').value = mov.nombre || '-'; // NOMBRE
        row.getCell('F').value = mov.factura || '-'; // FACTURA
        
        // ENTRADAS
        row.getCell('G').value = mov.entradas > 0 ? Number(mov.entradas) : '-'; // CANTIDAD
        
        // SALIDAS
        row.getCell('J').value = mov.salidas > 0 ? Number(mov.salidas) : '-'; // CANTIDAD
        
        // SALDO
        row.getCell('M').value = (mov.saldoFisico !== undefined ? Number(mov.saldoFisico) : '-'); // CANTIDAD

        // Formato entero para las cantidades
        ['G', 'J', 'M'].forEach(col => {
           if (row.getCell(col).value !== '-' && row.getCell(col).value !== '') {
             row.getCell(col).numFmt = '#,##0';
           }
        });
        
        if (conImportes) {
          // Entradas P/U y Total
          if (mov.entradas > 0 || mov.movimiento === 'SALDO INICIAL') {
            row.getCell('H').value = mov.precioUnitario > 0 ? Number(Number(mov.precioUnitario).toFixed(2)) : '-';
            row.getCell('I').value = mov.ingresoBs > 0 ? Number(Number(mov.ingresoBs).toFixed(2)) : '-';
          } else {
            row.getCell('H').value = '-';
            row.getCell('I').value = '-';
          }
          
          // Salidas P/U y Total
          if (mov.salidas > 0) {
            // Calculate output unit price or use existing
            const puSalida = mov.salidas > 0 ? (mov.egresoBs / mov.salidas) : 0;
            row.getCell('K').value = puSalida > 0 ? Number(Number(puSalida).toFixed(2)) : '-';
            row.getCell('L').value = mov.egresoBs > 0 ? Number(Number(mov.egresoBs).toFixed(2)) : '-';
          } else {
            row.getCell('K').value = '-';
            row.getCell('L').value = '-';
          }
          
          // Saldo Total
          if (mov.saldoBs !== undefined) {
            row.getCell('N').value = Number(Number(mov.saldoBs).toFixed(2));
          } else {
            row.getCell('N').value = '-';
          }

          // Format P/U and Totals
          ['H', 'I', 'K', 'L', 'N'].forEach(col => {
            if (row.getCell(col).value !== '-' && row.getCell(col).value !== '') {
              row.getCell(col).numFmt = '#,##0.00';
            }
          });
        } else {
          row.getCell('H').value = '-';
          row.getCell('I').value = '-';
          row.getCell('K').value = '-';
          row.getCell('L').value = '-';
          row.getCell('N').value = '-';
        }

        if (!conImportes) {
           ['H14','I14','K14','L14','N14', 'H15','I15','K15','L15','N15', 'H16','I16','K16','L16','N16'].forEach(c => {
               const cell = worksheet.getCell(c);
               cell.value = '';
               cell.style = {}; 
           });
           worksheet.getColumn('H').hidden = true;
           worksheet.getColumn('I').hidden = true;
           worksheet.getColumn('K').hidden = true;
           worksheet.getColumn('L').hidden = true;
           worksheet.getColumn('N').hidden = true;
        }

        ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'].forEach(col => {
           const cell = row.getCell(col);
           cell.border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
           };
           if (['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].includes(col)) {
               cell.font = { bold: true, size: 8 };
           } else {
               cell.font = { bold: false, size: 8 };
           }
           cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        row.commit();
        currentRow++;
      });

      if (movimientosList.length > 0) {
        const finalRow = worksheet.getRow(currentRow);
        finalRow.height = styleRow.height;
        
        // Copiar estilos de la fila base
        finalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const styleCell = styleRow.getCell(colNumber);
          if (styleCell && styleCell.style) {
            cell.style = JSON.parse(JSON.stringify(styleCell.style));
          }
        });
        
        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;

        movimientosList.forEach((r: any) => {
          if (r.movimiento !== 'SALDO INICIAL') {
            if (r.entradas > 0) totEntCant += Number(r.entradas);
            if (r.salidas > 0) totSalCant += Number(r.salidas);
            if (r.ingresoBs > 0) totEntBs += Number(r.ingresoBs);
            if (r.egresoBs > 0) totSalBs += Number(r.egresoBs);
          } else {
            // Also include Saldo Inicial in sum if we want, or not? Usually Saldo Inicial is counted as Entrada
            if (r.entradas > 0) totEntCant += Number(r.entradas);
            if (r.ingresoBs > 0) totEntBs += Number(r.ingresoBs);
          }
        });

        // Merge first columns
        try { worksheet.mergeCells(`B${currentRow}:F${currentRow}`); } catch(e) {}
        finalRow.getCell('B').value = 'TOTALES';
        finalRow.getCell('B').font = { bold: true };
        finalRow.getCell('B').alignment = { horizontal: 'right', vertical: 'middle' };

        // Fill Cantidad totals
        finalRow.getCell('G').value = totEntCant > 0 ? totEntCant : '-';
        finalRow.getCell('G').font = { bold: true };
        finalRow.getCell('G').alignment = { horizontal: 'center', vertical: 'middle' };
        if (totEntCant > 0) finalRow.getCell('G').numFmt = '#,##0';

        finalRow.getCell('J').value = totSalCant > 0 ? totSalCant : '-';
        finalRow.getCell('J').font = { bold: true };
        finalRow.getCell('J').alignment = { horizontal: 'center', vertical: 'middle' };
        if (totSalCant > 0) finalRow.getCell('J').numFmt = '#,##0';

        if (conImportes) {
          finalRow.getCell('H').value = '-';
          finalRow.getCell('I').value = totEntBs > 0 ? Number(totEntBs.toFixed(2)) : '-';
          finalRow.getCell('I').numFmt = '#,##0.00';
          
          finalRow.getCell('K').value = '-';
          finalRow.getCell('L').value = totSalBs > 0 ? Number(totSalBs.toFixed(2)) : '-';
          finalRow.getCell('L').numFmt = '#,##0.00';
          
          finalRow.getCell('M').value = '-';
          finalRow.getCell('N').value = Number(Number(movimientosList[movimientosList.length - 1].saldoBs).toFixed(2));
          finalRow.getCell('N').numFmt = '#,##0.00';
          
          ['H','I','K','L','M','N'].forEach(c => {
             finalRow.getCell(c).font = { bold: true };
             finalRow.getCell(c).alignment = { horizontal: 'center', vertical: 'middle' };
          });
        } else {
          finalRow.getCell('M').value = movimientosList[movimientosList.length - 1].saldoFisico;
          finalRow.getCell('M').font = { bold: true };
          finalRow.getCell('M').alignment = { horizontal: 'center', vertical: 'middle' };
          finalRow.getCell('M').numFmt = '#,##0';
        }
        
        ['B','C','D','E','F','G','H','I','J','K','L','M','N'].forEach(col => {
           const cell = finalRow.getCell(col);
           cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
        });
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    
    // Generar nombre de archivo
    const now = new Date();
    const formattedDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    let fileName = 'kardex_';
    if (isResumen) {
      if (categoriaNombre) {
        fileName += `categoria_${categoriaNombre.replace(/\s+/g, '_')}_${formattedDate}.xlsx`;
      } else {
        fileName += `general_${formattedDate}.xlsx`;
      }
    } else {
      fileName += `prod_${productoSeleccionado?.codigo || 'desconocido'}_${formattedDate}.xlsx`;
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error: any) {
    console.error("Error exporting kardex:", error);
    return NextResponse.json({ error: error.message || "Error al exportar Kardex" }, { status: 500 });
  }
}
