"use client";
import { useState, useMemo, useEffect } from "react";
import { FileDown, FileText, Settings2, Search, Download, Filter } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Swal from 'sweetalert2';
import styles from "./kardex.module.css";

export default function KardexClient({ initialMovimientos, productos, categorias = [], currentTenant }: { initialMovimientos: any[], productos: any[], categorias?: any[], currentTenant?: any }) {
  const [movimientos] = useState(initialMovimientos);
  
  const today = new Date();
  
  // UI State for Filters
  const [selectedPreset, setSelectedPreset] = useState("mes");
  const [selectedAnio, setSelectedAnio] = useState(today.getFullYear());
  const [selectedMes, setSelectedMes] = useState(today.getMonth());
  const [selectedSemestre, setSelectedSemestre] = useState(today.getMonth() < 6 ? 1 : 2);
  
  const [productoUI, setProductoUI] = useState<string>("TODOS");
  const [categoriaUI, setCategoriaUI] = useState<string>("TODAS");
  const [movimientoUI, setMovimientoUI] = useState<string>("TODOS");
  const [fechaInicioUI, setFechaInicioUI] = useState("");
  const [fechaFinUI, setFechaFinUI] = useState("");
  const [conImportes, setConImportes] = useState(false);
  const [mostrarSaldoInicial, setMostrarSaldoInicial] = useState(true);

  // Applied Filters State (Updates only when clicking "Buscar")
  const [appliedFilters, setAppliedFilters] = useState({
    producto: "TODOS",
    categoria: "TODAS",
    movimiento: "TODOS",
    fechaInicio: "",
    fechaFin: ""
  });

  const isTodos = appliedFilters.producto === "TODOS";

  // Handle Preset Changes
  useEffect(() => {
    if (selectedPreset === "personalizado") return;

    let start = new Date();
    let end = new Date();

    if (selectedPreset === "hoy") {
      start = new Date();
      end = new Date();
    } else if (selectedPreset === "mes") {
      start = new Date(selectedAnio, selectedMes, 1);
      end = new Date(selectedAnio, selectedMes + 1, 0);
    } else if (selectedPreset === "semestre") {
      const startMonth = selectedSemestre === 1 ? 0 : 6;
      start = new Date(selectedAnio, startMonth, 1);
      end = new Date(selectedAnio, startMonth + 6, 0);
    } else if (selectedPreset === "anual") {
      start = new Date(selectedAnio, 0, 1);
      end = new Date(selectedAnio, 11, 31);
    }

    // Adjust for local timezone to prevent off-by-one errors in toISOString
    const formatLocal = (d: Date) => {
       const pad = (n: number) => n.toString().padStart(2, '0');
       return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    setFechaInicioUI(formatLocal(start));
    setFechaFinUI(formatLocal(end));
  }, [selectedPreset, selectedAnio, selectedMes, selectedSemestre]);

  const handleSearch = () => {
    setAppliedFilters({
      producto: productoUI,
      categoria: categoriaUI,
      movimiento: movimientoUI,
      fechaInicio: fechaInicioUI,
      fechaFin: fechaFinUI
    });
  };

  // Compute Kardex rows
  const kardexData = useMemo(() => {
    const pFiltro = appliedFilters.producto;
    const cFiltro = appliedFilters.categoria;
    const mFiltro = appliedFilters.movimiento;
    const fInicio = appliedFilters.fechaInicio;
    const fFin = appliedFilters.fechaFin;

    // We pre-filter products based on category (if applicable)
    const validProductos = productos.filter(p => cFiltro === "TODAS" || p.categoriaId === cFiltro);
    const validProductIds = new Set(validProductos.map(p => p.codigo));

    // Filter movements
    const filteredMovs = movimientos
      .filter(m => validProductIds.has(m.productoCodigo))
      .filter(m => pFiltro === "TODOS" || m.productoCodigo === pFiltro)
      .filter(m => mFiltro === "TODOS" || m.transaccion.tipoTransaccion === mFiltro)
      .sort((a, b) => new Date(a.transaccion.createdAt).getTime() - new Date(b.transaccion.createdAt).getTime());

    let saldoInicialFisico = 0;
    let saldoInicialValorado = 0;

    const rows: any[] = [];
    let currentFisico = 0;
    let currentValorado = 0;
    
    let totalEntradas = 0;
    let totalSalidas = 0;
    
    let hasImportacion = false;
    let importacionDesc = '-';

    // Map for Resumen por Producto
    const resumenMap = new Map();
    validProductos.forEach(p => {
      if (pFiltro !== "TODOS" && p.codigo !== pFiltro) return;
      resumenMap.set(p.codigo, {
        codigo: p.codigo,
        descripcion: p.nombre,
        unidad: p.unidadMedida || 'Unidad',
        entradas: 0,
        entradasBs: 0,
        salidas: 0,
        salidasBs: 0,
        saldo: 0,
        saldoBs: 0
      });
    });

    filteredMovs.forEach(m => {
      const isImportacion = m.transaccion.tipoTransaccion === 'SALDO INICIAL' || m.transaccion.tipoTransaccion === 'IMPORTACIÓN INICIAL';
      const isCompra = isImportacion || m.transaccion.tipoTransaccion === 'COMPRA' || m.transaccion.tipoTransaccion === 'ENTRADA';
      const date = new Date(m.transaccion.createdAt);
      
      const costoMovimiento = isCompra ? m.subtotal : (m.cantidad * m.producto.costo);

      let isBeforeRange = false;
      if (isImportacion) {
        isBeforeRange = true;
        hasImportacion = true;
        if (m.transaccion.razonSocial) {
          importacionDesc = m.transaccion.razonSocial;
        }
      } else {
        if (fInicio) {
          const [y, mm, d] = fInicio.split('-');
          const start = new Date(Number(y), Number(mm) - 1, Number(d), 0, 0, 0, 0);
          if (date < start) isBeforeRange = true;
        }
        if (fFin) {
          const [y, mm, d] = fFin.split('-');
          const end = new Date(Number(y), Number(mm) - 1, Number(d), 23, 59, 59, 999);
          if (date > end) return; 
        }
      }

      // Track per-product summary
      const pSummary = resumenMap.get(m.productoCodigo);

      // Accumulate for summary (all history up to fechaHasta, ignoring fechaDesde)
      if (pSummary) {
        if (isCompra) {
          pSummary.entradas += m.cantidad;
          pSummary.entradasBs += costoMovimiento;
          pSummary.saldo += m.cantidad;
          pSummary.saldoBs += costoMovimiento;
        } else {
          pSummary.salidas += m.cantidad;
          pSummary.salidasBs += costoMovimiento;
          pSummary.saldo -= m.cantidad;
          pSummary.saldoBs -= costoMovimiento;
        }
      }

      if (isBeforeRange) {
        if (isCompra) {
          saldoInicialFisico += m.cantidad;
          saldoInicialValorado += costoMovimiento;
        } else {
          saldoInicialFisico -= m.cantidad;
          saldoInicialValorado -= costoMovimiento;
        }
      } else {
        if (rows.length === 0) {
          currentFisico = saldoInicialFisico;
          currentValorado = saldoInicialValorado;
        }

        let entradaFisica = 0, salidaFisica = 0;
        let entradaValor = 0, salidaValor = 0;

        if (isCompra) {
          entradaFisica = m.cantidad;
          entradaValor = costoMovimiento;
          currentFisico += entradaFisica;
          currentValorado += entradaValor;
          totalEntradas += entradaFisica;
        } else {
          salidaFisica = m.cantidad;
          salidaValor = costoMovimiento;
          currentFisico -= salidaFisica;
          currentValorado -= salidaValor;
          totalSalidas += salidaFisica;
        }

        rows.push({
          id: m.id,
          fecha: date.toLocaleDateString(),
          movimiento: m.transaccion.tipoTransaccion,
          nitCi: m.transaccion.nitCi,
          nombre: m.transaccion.razonSocial,
          factura: m.transaccion.nroDocumento,
          precioUnitario: isCompra ? m.precioUnitario : m.producto.costo,
          entradas: entradaFisica,
          salidas: salidaFisica,
          saldoFisico: currentFisico,
          ingresoBs: entradaValor,
          egresoBs: salidaValor,
          saldoBs: currentValorado,
          isCompra
        });
      }
    });

    const resumenRows = Array.from(resumenMap.values());

    return { rows, resumenRows, saldoInicialFisico, saldoInicialValorado, totalEntradas, totalSalidas, hasImportacion, importacionDesc };
  }, [movimientos, appliedFilters, productos]);

  const exportPDF = async () => {
    const doc = new jsPDF('landscape');
    const selectedProd = isTodos ? null : productos.find(p => p.codigo === appliedFilters.producto);

    // 1. Company Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(currentTenant?.name || 'EMPRESA', 14, 15);
    
    doc.setFontSize(10);
    doc.text(`NIT: ${currentTenant?.nit || 'S/N'}`, 14, 22);
    
    if (currentTenant?.casaMatriz) {
      doc.text('CASA MATRIZ:', 14, 29);
      doc.setFont("helvetica", "normal");
      doc.text(currentTenant.casaMatriz, 14, 34);
    }
    
    if (currentTenant?.sucursal) {
      doc.setFont("helvetica", "bold");
      doc.text('SUCURSAL:', 14, 41);
      doc.setFont("helvetica", "normal");
      doc.text(currentTenant.sucursal, 14, 46);
    }

    // Attempt to add Logo if it exists
    if (currentTenant?.logo && currentTenant.logo.startsWith('/')) {
      try {
        const logoUrl = currentTenant.logo; // This would be fetched or loaded
        // For jsPDF, loading images from URL can be tricky if cross-origin or if it needs base64. 
        // We will skip drawing the logo image if it's complex, but let's try to add a placeholder or rely on it failing silently if not loaded.
        // To do this properly in browser, we'd need a base64 string. 
      } catch (e) {}
    }

    // Helper for date format
    const formatDate = (isoStr: string) => {
      if (!isoStr) return '';
      const [y, m, d] = isoStr.split('-');
      return `${d}/${m}/${y}`;
    };

    // 2. Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text('KARDEX FÍSICO VALORADO', 148, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const fechaTexto = `DEL ${formatDate(appliedFilters.fechaInicio) || '(INICIO)'} AL ${formatDate(appliedFilters.fechaFin) || '(ACTUALIDAD)'}`;
    doc.text(fechaTexto, 148, 31, { align: 'center' });
    doc.text('(Expresado en Bolivianos)', 148, 36, { align: 'center' });

    // 3. Metadata Box (AutoTable handles wrapping gracefully)
    if (isTodos) {
      autoTable(doc, {
        startY: 42,
        theme: 'grid',
        body: [
          [
            { content: 'MÉTODO DE INVENTARIO:', styles: { fontStyle: 'bold' } },
            { content: 'PEPS' },
            { content: 'CATEGORÍA:', styles: { fontStyle: 'bold' } },
            { content: appliedFilters.categoria || 'TODAS' }
          ]
        ],
        styles: { fontSize: 8, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1, valign: 'middle' },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 35 },
          2: { cellWidth: 25 },
          3: { cellWidth: 'auto' }
        }
      });
    } else {
      autoTable(doc, {
        startY: 42,
        theme: 'grid',
        body: [
          [
            { content: 'MÉTODO DE INVENTARIO:', styles: { fontStyle: 'bold' } },
            { content: 'PEPS' },
            { content: 'PRODUCTO:', styles: { fontStyle: 'bold' } },
            { content: selectedProd ? selectedProd.nombre : 'TODOS LOS PRODUCTOS' },
            { content: 'MARCA:', styles: { fontStyle: 'bold' } },
            { content: selectedProd?.marca || 'S/M' }
          ],
          [
            { content: 'CÓDIGO:', styles: { fontStyle: 'bold' } },
            { content: selectedProd ? selectedProd.codigo : 'S/C' },
            { content: 'DESCRIPCIÓN:', styles: { fontStyle: 'bold' } },
            { content: selectedProd?.descripcion || 'S/D' },
            { content: 'UNIDAD DE MEDIDA:', styles: { fontStyle: 'bold' } },
            { content: selectedProd?.unidadMedida || 'Unidad' }
          ]
        ],
        styles: { fontSize: 8, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1, valign: 'middle' },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 35 },
          2: { cellWidth: 25 },
          3: { cellWidth: 'auto' }, // Wraps long product names
          4: { cellWidth: 20 },
          5: { cellWidth: 30 }
        }
      });
    }

    const finalY = (doc as any).lastAutoTable.finalY || 65;
    
    // 4. Table
    const head: any[] = [];
    const body: any[] = [];

    if (isTodos) {
      // RESUMEN FORMAT
      if (conImportes) {
        head.push([
          { content: 'CÓD. ITEM', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'DESCRIPCIÓN', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'UNIDAD', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'ENTRADA', colSpan: 3, styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'SALIDA', colSpan: 3, styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO', colSpan: 2, styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);
        head.push([
          { content: 'CANTIDAD', styles: { fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'P/U', styles: { fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'TOTAL', styles: { fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'CANTIDAD', styles: { fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'P/U', styles: { fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'TOTAL', styles: { fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO', styles: { fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } },
          { content: 'TOTAL', styles: { fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);

        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        kardexData.resumenRows.forEach(r => {
          totEntCant += r.entradas; totEntBs += r.entradasBs;
          totSalCant += r.salidas; totSalBs += r.salidasBs;
          totSaldoCant += r.saldo; totSaldoBs += r.saldoBs;

          const puEntrada = r.entradas > 0 ? (r.entradasBs / r.entradas).toFixed(2) : '-';
          const puSalida = r.salidas > 0 ? (r.salidasBs / r.salidas).toFixed(2) : '-';

          body.push([
            r.codigo, r.descripcion, r.unidad,
            r.entradas || '-', puEntrada, r.entradasBs ? r.entradasBs.toFixed(2) : '-',
            r.salidas || '-', puSalida, r.salidasBs ? r.salidasBs.toFixed(2) : '-',
            r.saldo || '-', r.saldoBs ? r.saldoBs.toFixed(2) : '-'
          ]);
        });

        if (kardexData.resumenRows.length > 0) {
           body.push([
             { content: 'TOTALES', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right' } as any },
             { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
             { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
             { content: totEntBs.toFixed(2), styles: { fontStyle: 'bold' } as any },
             { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
             { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
             { content: totSalBs.toFixed(2), styles: { fontStyle: 'bold' } as any },
             { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any },
             { content: totSaldoBs.toFixed(2), styles: { fontStyle: 'bold' } as any }
           ]);
        }
      } else {
        head.push([
          { content: 'COD. ITEM', styles: { fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'DESCRIPCIÓN', styles: { fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'UNIDAD', styles: { fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'ENTRADAS', styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'SALIDAS', styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO', styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);

        let totEntCant = 0, totSalCant = 0, totSaldoCant = 0;
        kardexData.resumenRows.forEach(r => {
          totEntCant += r.entradas;
          totSalCant += r.salidas;
          totSaldoCant += r.saldo;
          body.push([
            r.codigo, r.descripcion, r.unidad,
            r.entradas || '-', r.salidas || '-', r.saldo || '-'
          ]);
        });
        
        if (kardexData.resumenRows.length > 0) {
           body.push([
             { content: 'TOTALES', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right' } as any },
             { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
             { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
             { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any }
           ]);
        }
      }
    } else {
      // INDIVIDUAL PRODUCT FORMAT
      if (conImportes) {
        head.push([
          { content: 'N°', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'FECHA', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'MOVIMIENTO', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'NIT/C.I.', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'NOMBRE PROVEEDOR / CLIENTE', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'Nro. Factura Compra -\nVenta Orden de Salida', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'ENTRADAS', colSpan: 3, styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'SALIDAS', colSpan: 3, styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO', colSpan: 2, styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);
        head.push([
          { content: 'CANTIDAD', styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'P/U', styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'TOTAL', styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'CANTIDAD', styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'P/U', styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'TOTAL', styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO', styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } },
          { content: 'TOTAL', styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);
      } else {
        head.push([
          { content: 'N°', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'FECHA', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'MOVIMIENTO', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'NIT/C.I.', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'NOMBRE PROVEEDOR / CLIENTE', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'Nro. Factura Compra -\nVenta Orden de Salida', rowSpan: 2, styles: { valign: 'middle', halign: 'center', fillColor: [235, 235, 235] as any, textColor: [0, 0, 0] as any } },
          { content: 'CANTIDADES', colSpan: 3, styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } }
        ]);
        head.push([
          { content: 'ENTRADAS', styles: { halign: 'center', fillColor: [11, 58, 90] as any, textColor: [255, 255, 255] as any } },
          { content: 'SALIDAS', styles: { halign: 'center', fillColor: [219, 229, 241] as any, textColor: [0, 0, 0] as any } },
          { content: 'SALDO STOCK', styles: { halign: 'center', fillColor: [242, 242, 242] as any, textColor: [0, 0, 0] as any } }
        ]);
      }

      if (mostrarSaldoInicial) {
        const rowData = [
          '-', '-', 'SALDO INICIAL', '-', kardexData.hasImportacion ? kardexData.importacionDesc : '-', '-'
        ];
        if (conImportes) {
          const puInicial = kardexData.saldoInicialFisico > 0 ? (kardexData.saldoInicialValorado / kardexData.saldoInicialFisico) : 0;
          rowData.push(
            '-', '-', '-', 
            '-', '-', '-', 
            kardexData.saldoInicialFisico.toString(),
            kardexData.saldoInicialValorado.toFixed(2)
          );
        } else {
          rowData.push(
            '-', '-', kardexData.saldoInicialFisico.toString()
          );
        }
        body.push(rowData);
      }

      let lastFisico = kardexData.saldoInicialFisico;
      let lastValorado = kardexData.saldoInicialValorado;
      let totEntradas = 0, totSalidas = 0, totEntradasBs = 0, totSalidasBs = 0;

      kardexData.rows.forEach((r, idx) => {
        lastFisico = r.saldoFisico;
        lastValorado = r.saldoBs;
        if (r.entradas > 0) totEntradas += r.entradas;
        if (r.salidas > 0) totSalidas += r.salidas;
        if (r.ingresoBs > 0) totEntradasBs += r.ingresoBs;
        if (r.egresoBs > 0) totSalidasBs += r.egresoBs;
        
        const rowData = [
          (idx + 1).toString(),
          r.fecha,
          r.movimiento,
          r.nitCi,
          r.nombre,
          r.factura
        ];

        if (conImportes) {
          rowData.push(
            r.entradas ? r.entradas.toString() : '-',
            r.entradas ? (r.precioUnitario ? Number(r.precioUnitario).toFixed(2) : '-') : '-',
            r.ingresoBs ? Number(r.ingresoBs).toFixed(2) : '-',
            r.salidas ? r.salidas.toString() : '-',
            r.salidas ? (r.precioUnitario ? Number(r.precioUnitario).toFixed(2) : '-') : '-',
            r.egresoBs ? Number(r.egresoBs).toFixed(2) : '-',
            r.saldoFisico.toString(),
            Number(r.saldoBs).toFixed(2)
          );
        } else {
          rowData.push(
            r.entradas ? r.entradas.toString() : '-',
            r.salidas ? r.salidas.toString() : '-',
            r.saldoFisico.toString()
          );
        }
        body.push(rowData);
      });

      if (kardexData.rows.length > 0) {
        if (conImportes) {
          body.push([
            { content: 'TOTALES', colSpan: 6, styles: { fontStyle: 'bold', halign: 'right' } as any },
            { content: totEntradas > 0 ? totEntradas.toString() : '-', styles: { fontStyle: 'bold' } as any },
            { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
            { content: totEntradasBs > 0 ? totEntradasBs.toFixed(2) : '-', styles: { fontStyle: 'bold' } as any },
            { content: totSalidas > 0 ? totSalidas.toString() : '-', styles: { fontStyle: 'bold' } as any },
            { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
            { content: totSalidasBs > 0 ? totSalidasBs.toFixed(2) : '-', styles: { fontStyle: 'bold' } as any },
            { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
            { content: lastValorado.toFixed(2), styles: { fontStyle: 'bold' } as any }
          ]);
        } else {
          body.push([
            { content: 'TOTALES', colSpan: 6, styles: { fontStyle: 'bold', halign: 'right' } as any },
            { content: totEntradas > 0 ? totEntradas.toString() : '-', styles: { fontStyle: 'bold' } as any },
            { content: totSalidas > 0 ? totSalidas.toString() : '-', styles: { fontStyle: 'bold' } as any },
            { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any }
          ]);
        }
      }
    }

    autoTable(doc, {
      startY: finalY + 5,
      head,
      body,
      theme: 'grid',
      styles: { fontSize: 7, halign: 'center', valign: 'middle' },
      headStyles: { 
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      columnStyles: {
        3: { halign: 'left' },
        4: { halign: 'left' },
        5: { halign: 'left' },
        6: { fontStyle: 'bold' },
        7: { fontStyle: 'bold' },
        8: { fontStyle: 'bold' },
        ...(conImportes ? {
          10: { fontStyle: 'bold' },
          11: { fontStyle: 'bold' },
          12: { fontStyle: 'bold' }
        } : {})
      }
    });

    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    const fileName = `kardex_${isTodos ? 'todos' : 'prod_' + appliedFilters.producto}_${formattedDate}.pdf`;

    doc.save(fileName);
  };

  const exportExcel = async () => {
    try {
      const selectedProdData = isTodos ? null : productos.find(p => p.codigo === appliedFilters.producto);
      
      // Preparar movimientos (inyectar saldo inicial si aplica)
      const exportRows = [...kardexData.rows];
      if (mostrarSaldoInicial) {
        const puInicial = kardexData.saldoInicialFisico > 0 ? (kardexData.saldoInicialValorado / kardexData.saldoInicialFisico) : 0;
        exportRows.unshift({
          id: 'saldo-inicial',
          fecha: '-',
          movimiento: 'SALDO INICIAL',
          nitCi: '-',
          nombre: kardexData.hasImportacion ? kardexData.importacionDesc : '-',
          factura: '-',
          precioUnitario: puInicial,
          entradas: '',
          salidas: '',
          saldoFisico: kardexData.saldoInicialFisico,
          ingresoBs: '',
          egresoBs: '',
          saldoBs: kardexData.saldoInicialValorado
        });
      }

      const cat = categorias?.find(c => c.id === appliedFilters.categoria);
      const payload = {
        productoSeleccionado: selectedProdData,
        categoriaNombre: cat ? cat.nombre : "TODAS",
        movimientos: exportRows,
        resumenRows: kardexData.resumenRows,
        fechaDesde: appliedFilters.fechaInicio,
        fechaHasta: appliedFilters.fechaFin,
        isTodos,
        isResumen: isTodos,
        mostrarSaldoInicial,
        conImportes,
        empresaNombre: '', // Taken from session in backend
        empresaNit: ''     // Taken from session in backend
      };

      const res = await fetch('/api/export-kardex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al generar Excel");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const now = new Date();
      const formattedDate = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
      const fileName = `kardex_${isTodos ? 'todos' : 'prod_' + appliedFilters.producto}_${formattedDate}.xlsx`;
      
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <>
      <div className="card glass">
        <div style={{ background: 'var(--color-background)', padding: '1.5rem', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} /> Filtros de Búsqueda
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Tipo de Movimiento</label>
              <select className="input-base" value={movimientoUI} onChange={e => setMovimientoUI(e.target.value)}>
                <option value="TODOS">-- TODOS --</option>
                <option value="VENTA">VENTAS</option>
                <option value="COMPRA">COMPRAS</option>
                <option value="SALDO INICIAL">SALDO INICIAL / IMPORTACIÓN</option>
                <option value="ENTRADA">OTRAS ENTRADAS</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Categoría</label>
              <select 
                className="input-base" 
                value={categoriaUI} 
                onChange={e => {
                  setCategoriaUI(e.target.value);
                  setProductoUI("TODOS");
                }}
              >
                <option value="TODAS">-- TODAS LAS CATEGORÍAS --</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Producto</label>
              <select className="input-base" value={productoUI} onChange={e => setProductoUI(e.target.value)}>
                <option value="TODOS">-- TODOS LOS PRODUCTOS --</option>
                {productos.filter(p => categoriaUI === "TODAS" || p.categoriaId === categoriaUI).map(p => (
                  <option key={p.codigo} value={p.codigo}>{p.codigo} - {p.nombre}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Período de Tiempo</label>
              <select className="input-base" value={selectedPreset} onChange={e => setSelectedPreset(e.target.value)}>
                <option value="hoy">Hoy</option>
                <option value="mes">Mensual</option>
                <option value="semestre">Semestral</option>
                <option value="anual">Anual</option>
                <option value="personalizado">Rango Personalizado</option>
              </select>
            </div>

            {(selectedPreset === 'mes' || selectedPreset === 'semestre' || selectedPreset === 'anual') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Año</label>
                <select className="input-base" value={selectedAnio} onChange={e => setSelectedAnio(Number(e.target.value))}>
                  {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedPreset === 'mes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Mes</label>
                <select className="input-base" value={selectedMes} onChange={e => setSelectedMes(Number(e.target.value))}>
                  {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => (
                    <option key={i} value={i}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedPreset === 'semestre' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Semestre</label>
                <select className="input-base" value={selectedSemestre} onChange={e => setSelectedSemestre(Number(e.target.value))}>
                  <option value={1}>1er Semestre</option>
                  <option value={2}>2do Semestre</option>
                </select>
              </div>
            )}

            {selectedPreset === 'personalizado' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Desde Fecha</label>
                  <input type="date" className="input-base" value={fechaInicioUI} onChange={e => setFechaInicioUI(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Hasta Fecha</label>
                  <input type="date" className="input-base" value={fechaFinUI} onChange={e => setFechaFinUI(e.target.value)} />
                </div>
              </>
            )}
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: 'var(--color-border)', opacity: 0.5 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: '500' }}>
                <input type="checkbox" checked={conImportes} onChange={(e) => setConImportes(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }} />
                Mostrar Importes (Valores Bs.)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: '500' }}>
                <input type="checkbox" checked={mostrarSaldoInicial} onChange={(e) => setMostrarSaldoInicial(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }} />
                Incluir Fila de Saldo Inicial
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleSearch} style={{ minWidth: '120px' }}>
                <Search size={18} /> Filtrar Datos
              </button>
              <button className="btn btn-outline" onClick={exportPDF} style={{ color: '#ef4444', borderColor: '#ef4444', minWidth: '140px' }}>
                <FileText size={18} /> Exportar PDF
              </button>
              <button className="btn btn-outline" onClick={exportExcel} style={{ color: '#10b981', borderColor: '#10b981', minWidth: '140px' }}>
                <FileDown size={18} /> Exportar Excel
              </button>
            </div>
          </div>
        </div>

        <div className="table-container" style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <style>{`
            .compact-table th, .compact-table td {
              padding: 0.35rem 0.25rem !important;
              word-break: break-word;
              white-space: normal;
            }
          `}</style>
          {isTodos ? (
            <table className="compact-table" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.75rem', tableLayout: 'auto' }}>
              <thead>
                {conImportes ? (
                  <>
                    <tr>
                      <th rowSpan={2}>COD. ITEM</th>
                      <th rowSpan={2}>DESCRIPCIÓN</th>
                      <th rowSpan={2}>UNIDAD</th>
                      <th colSpan={3} style={{ textAlign: 'center', background: '#fee2e2' }}>ENTRADA</th>
                      <th colSpan={3} style={{ textAlign: 'center', background: '#fee2e2' }}>SALIDA</th>
                      <th colSpan={2} style={{ textAlign: 'center', background: '#fee2e2' }}>SALDO</th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>CANTIDAD</th>
                      <th style={{ textAlign: 'right', background: '#fef2f2' }}>P/U</th>
                      <th style={{ textAlign: 'right', background: '#fef2f2' }}>TOTAL</th>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>CANTIDAD</th>
                      <th style={{ textAlign: 'right', background: '#fef2f2' }}>P/U</th>
                      <th style={{ textAlign: 'right', background: '#fef2f2' }}>TOTAL</th>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>SALDO</th>
                      <th style={{ textAlign: 'right', background: '#fef2f2' }}>TOTAL</th>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th>COD. ITEM</th>
                    <th>DESCRIPCIÓN</th>
                    <th>UNIDAD</th>
                    <th style={{ textAlign: 'center' }}>ENTRADAS</th>
                    <th style={{ textAlign: 'center' }}>SALIDAS</th>
                    <th style={{ textAlign: 'center' }}>SALDO</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {kardexData.resumenRows.map((r) => {
                  const puEntrada = r.entradas > 0 ? (r.entradasBs / r.entradas).toFixed(2) : '-';
                  const puSalida = r.salidas > 0 ? (r.salidasBs / r.salidas).toFixed(2) : '-';

                  return (
                    <tr key={r.codigo}>
                      <td>{r.codigo}</td>
                      <td>{r.descripcion}</td>
                      <td>{r.unidad}</td>
                      {conImportes ? (
                        <>
                          <td style={{ textAlign: 'center', color: 'var(--color-success)', fontWeight: 'bold' }}>{r.entradas || '-'}</td>
                          <td style={{ textAlign: 'right' }}>{puEntrada}</td>
                          <td style={{ textAlign: 'right' }}>{r.entradasBs ? r.entradasBs.toFixed(2) : '-'}</td>
                          
                          <td style={{ textAlign: 'center', color: 'var(--color-danger)', fontWeight: 'bold' }}>{r.salidas || '-'}</td>
                          <td style={{ textAlign: 'right' }}>{puSalida}</td>
                          <td style={{ textAlign: 'right' }}>{r.salidasBs ? r.salidasBs.toFixed(2) : '-'}</td>
                          
                          <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{r.saldo || '-'}</td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{r.saldoBs ? r.saldoBs.toFixed(2) : '-'}</td>
                        </>
                      ) : (
                        <>
                          <td style={{ textAlign: 'center', color: 'var(--color-success)', fontWeight: 'bold' }}>{r.entradas || '-'}</td>
                          <td style={{ textAlign: 'center', color: 'var(--color-danger)', fontWeight: 'bold' }}>{r.salidas || '-'}</td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{r.saldo || '-'}</td>
                        </>
                      )}
                    </tr>
                  );
                })}

                {kardexData.resumenRows.length === 0 && (
                  <tr>
                    <td colSpan={conImportes ? 11 : 6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                      No hay productos para mostrar.
                    </td>
                  </tr>
                )}

                {/* Totales Resumen */}
                {kardexData.resumenRows.length > 0 && (() => {
                  let totEntCant = 0, totEntBs = 0;
                  let totSalCant = 0, totSalBs = 0;
                  let totSaldoCant = 0, totSaldoBs = 0;

                  kardexData.resumenRows.forEach(r => {
                    totEntCant += r.entradas; totEntBs += r.entradasBs;
                    totSalCant += r.salidas; totSalBs += r.salidasBs;
                    totSaldoCant += r.saldo; totSaldoBs += r.saldoBs;
                  });

                  return (
                    <tr style={{ background: '#f9fafb', fontWeight: 'bold' }}>
                      <td colSpan={3} style={{ textAlign: 'right' }}>TOTALES</td>
                      {conImportes ? (
                        <>
                          <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                          <td style={{ textAlign: 'center' }}>-</td>
                          <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(2)}</td>
                          <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                          <td style={{ textAlign: 'center' }}>-</td>
                          <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(2)}</td>
                          <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                          <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(2)}</td>
                        </>
                      ) : (
                        <>
                          <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                          <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                          <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                        </>
                      )}
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          ) : (
            <table className="compact-table" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.75rem', tableLayout: 'auto' }}>
              <thead>
                {conImportes ? (
                  <>
                    <tr>
                      <th rowSpan={2}>N°</th>
                      <th rowSpan={2}>FECHA</th>
                      <th rowSpan={2}>MOVIMIENTO</th>
                      <th rowSpan={2}>NIT/C.I.</th>
                      <th rowSpan={2}>NOMBRE PROVEEDOR / CLIENTE</th>
                      <th rowSpan={2}>FACTURA / ORDEN</th>
                      <th colSpan={3} style={{ textAlign: 'center', background: '#fee2e2' }}>CANTIDADES</th>
                      <th rowSpan={2} style={{ textAlign: 'right' }}>P/U</th>
                      <th colSpan={3} style={{ textAlign: 'center', background: '#dbeafe' }}>IMPORTES Bs.</th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>ENTRADAS</th>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>SALIDAS</th>
                      <th style={{ textAlign: 'center', background: '#fef2f2' }}>SALDO STOCK</th>
                      <th style={{ textAlign: 'right', background: '#eff6ff' }}>ENTRADAS Bs.</th>
                      <th style={{ textAlign: 'right', background: '#eff6ff' }}>SALIDAS Bs.</th>
                      <th style={{ textAlign: 'right', background: '#eff6ff' }}>SUBTOTAL Bs.</th>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th>N°</th>
                    <th>FECHA</th>
                    <th>MOVIMIENTO</th>
                    <th>NIT/C.I.</th>
                    <th>NOMBRE PROVEEDOR / CLIENTE</th>
                    <th>FACTURA / ORDEN</th>
                    <th style={{ textAlign: 'center' }}>ENTRADAS</th>
                    <th style={{ textAlign: 'center' }}>SALIDAS</th>
                    <th style={{ textAlign: 'center' }}>SALDO STOCK</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {/* Saldo Inicial Row */}
                {mostrarSaldoInicial && (
                  <tr style={{ background: '#f9fafb', fontWeight: 'bold' }}>
                    <td>-</td>
                    <td>-</td>
                    <td>SALDO INICIAL</td>
                    <td>-</td>
                    <td>{kardexData.hasImportacion ? kardexData.importacionDesc : '-'}</td>
                    <td>-</td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>-</td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>-</td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: kardexData.saldoInicialFisico < 0 ? 'red' : 'inherit' }}>
                      {kardexData.saldoInicialFisico}
                    </td>
                    {conImportes && (
                      <>
                        <td style={{ textAlign: 'right' }}>
                          {kardexData.saldoInicialFisico > 0 
                            ? (kardexData.saldoInicialValorado / kardexData.saldoInicialFisico).toFixed(2) 
                            : '-'}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>-</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>-</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: kardexData.saldoInicialValorado < 0 ? 'red' : 'inherit' }}>
                          {kardexData.saldoInicialValorado.toFixed(2)}
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {/* Movimientos Rows */}
                {kardexData.rows.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.fecha}</td>
                  <td>
                    <span style={{ color: r.isCompra ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 'bold', marginRight: '0.2rem' }}>
                      {r.isCompra ? '↑' : '↓'}
                    </span>
                    {r.movimiento}
                  </td>
                  <td>{r.nitCi}</td>
                  <td>{r.nombre}</td>
                  <td>{r.factura || 'S/N'}</td>
                  
                  <td style={{ textAlign: 'center', color: 'var(--color-success)', fontWeight: 'bold' }}>{r.entradas || ''}</td>
                  <td style={{ textAlign: 'center', color: 'var(--color-danger)', fontWeight: 'bold' }}>{r.salidas || ''}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{r.saldoFisico}</td>

                  {conImportes && (
                    <>
                      <td style={{ textAlign: 'right' }}>{r.precioUnitario.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>{r.ingresoBs ? r.ingresoBs.toFixed(2) : ''}</td>
                      <td style={{ textAlign: 'right', color: 'var(--color-danger)', fontWeight: 'bold' }}>{r.egresoBs ? r.egresoBs.toFixed(2) : ''}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Bs. {r.saldoBs.toFixed(2)}</td>
                    </>
                  )}
                </tr>
              ))}

              {kardexData.rows.length === 0 && (
                <tr>
                  <td colSpan={conImportes ? 13 : 9} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                    No hay movimientos para los filtros seleccionados.
                  </td>
                </tr>
              )}

              {/* Fila TOTAL */}
              {kardexData.rows.length > 0 && (
                <tr style={{ background: '#f9fafb', fontWeight: 'bold' }}>
                  {conImportes ? (
                    <>
                      <td colSpan={10} style={{ textAlign: 'right' }}>TOTAL</td>
                      <td colSpan={2} style={{ textAlign: 'center' }}>-</td>
                      <td style={{ textAlign: 'right' }}>
                        {kardexData.rows[kardexData.rows.length - 1].saldoBs?.toFixed(2)}
                      </td>
                    </>
                  ) : (
                    <>
                      <td colSpan={7} style={{ textAlign: 'right' }}>TOTAL</td>
                      <td colSpan={1} style={{ textAlign: 'center' }}>-</td>
                      <td style={{ textAlign: 'center' }}>
                        {kardexData.rows[kardexData.rows.length - 1].saldoFisico}
                      </td>
                    </>
                  )}
                </tr>
              )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
