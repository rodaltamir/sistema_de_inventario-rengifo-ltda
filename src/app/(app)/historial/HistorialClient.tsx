"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { 
  Search, ShoppingCart, Download, Eye, X, Upload, 
  Package, Trash2, Check, FileSpreadsheet,
  ChevronDown, ChevronUp, Layers, Filter, Sparkles
} from "lucide-react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import styles from "./historial.module.css";
import { importarTransacciones, MovimientoImportado } from "./actions";

export interface DetectedProductInfo {
  codigo: string;
  nombre: string;
  marca: string;
  descripcion: string;
  unidadMedida: string;
  movCount: number;
  esExistente?: boolean;
}

export interface MovimientoConMetadatos extends MovimientoImportado {
  _id: string;
  _rawCodigo: string;
}

export default function HistorialClient({ 
  transacciones, 
  productos = [] 
}: { 
  transacciones: any[]; 
  productos?: any[]; 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTx, setSelectedTx] = useState<any>(null);

  // Estados de Importación
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [previewMovements, setPreviewMovements] = useState<MovimientoConMetadatos[]>([]);
  const [detectedProducts, setDetectedProducts] = useState<DetectedProductInfo[]>([]);
  const [selectedProductGlobal, setSelectedProductGlobal] = useState<string>("AUTO");
  const [showProductMappingDrawer, setShowProductMappingDrawer] = useState<boolean>(false);
  const rawParsedMovementsRef = useRef<MovimientoConMetadatos[]>([]);

  const [crearProductosFaltantes, setCrearProductosFaltantes] = useState(true);
  const [actualizarStock, setActualizarStock] = useState(true);
  const [crearContactosFaltantes, setCrearContactosFaltantes] = useState(true);
  const [previewSearch, setPreviewSearch] = useState("");
  const [previewFilterTipo, setPreviewFilterTipo] = useState<string>("TODOS");
  const [previewFilterProducto, setPreviewFilterProducto] = useState<string>("TODOS");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detectar si se abrió con ?openImport=true
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("openImport") === "true") {
        fileInputRef.current?.click();
      }
    }
  }, []);

  const filteredTransacciones = transacciones.filter((tx) =>
    tx.nroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.nitCi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Parseador de fechas ultra robusto (serials de Excel, DD/MM/YYYY, ISO, Date instances)
  const parseDateString = (rawVal: any, fmtVal: any): string => {
    // 1. Número serial nativo de Excel (ej. 45817 = 09/06/2025)
    if (typeof rawVal === "number" && rawVal > 20000 && rawVal < 80000) {
      const d = XLSX.SSF.parse_date_code(rawVal);
      if (d && d.y && d.m && d.d) {
        return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
      }
    }

    // 2. Si ya es una instancia de Date válida
    if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
      const y = rawVal.getUTCFullYear();
      const m = String(rawVal.getUTCMonth() + 1).padStart(2, "0");
      const d = String(rawVal.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    const str = String(fmtVal || rawVal || "").trim();
    if (!str) return "";

    // 3. Formato Latinoamericano: DD/MM/YYYY o DD-MM-YYYY
    const dmYMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (dmYMatch) {
      const d = dmYMatch[1].padStart(2, "0");
      const m = dmYMatch[2].padStart(2, "0");
      let y = dmYMatch[3];
      if (y.length === 2) y = "20" + y;
      return `${y}-${m}-${d}`;
    }

    // 4. Formato ISO: YYYY-MM-DD o YYYY/MM/DD
    const yMDMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
    if (yMDMatch) {
      const y = yMDMatch[1];
      const m = yMDMatch[2].padStart(2, "0");
      const d = yMDMatch[3].padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    // 5. Fallback si contiene formato ISO timestamp con T
    if (str.includes("T")) {
      return str.slice(0, 10);
    }

    return "";
  };

  // Formatear ISO (YYYY-MM-DD) a formato visual amigable (DD/MM/YYYY)
  const formatDateDisplay = (isoStr: string): string => {
    if (!isoStr) return "";
    if (isoStr.includes("-")) {
      const parts = isoStr.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return isoStr;
  };

  const parseNumber = (rawVal: any, fmtVal?: any): number => {
    if (typeof rawVal === "number" && !isNaN(rawVal)) return rawVal;
    const val = rawVal != null && rawVal !== "" ? rawVal : fmtVal;
    if (val == null) return 0;
    if (typeof val === "number") return val;
    const str = String(val).trim();
    const isNegative = str.startsWith("-") || (str.startsWith("(") && str.endsWith(")"));
    const cleaned = str.replace(/[^0-9.]/g, "").trim();
    const num = parseFloat(cleaned) || 0;
    return isNegative ? -num : num;
  };

  // Procesar archivo Excel con detección multiproducto optimizada
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: false });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const dataFmt: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      const dataRaw: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

      if (!dataFmt || dataFmt.length === 0) {
        Swal.fire("Archivo Vacío", "El archivo Excel seleccionado no contiene datos.", "warning");
        return;
      }

      const parsedItems: MovimientoConMetadatos[] = [];
      const detectedProdsMap = new Map<string, DetectedProductInfo>();
      let currentProd: DetectedProductInfo | null = null;

      for (let i = 0; i < dataFmt.length; i++) {
        const row = dataFmt[i];
        if (!row || row.length === 0) continue;

        // 1. Detectar cabeceras de producto (ej. CODIGO:, CÓDIGO:, etc.)
        for (let c = 0; c < row.length; c++) {
          const cellVal = String(row[c] || "").trim().toUpperCase();
          if (cellVal === "CODIGO:" || cellVal === "CÓDIGO:") {
            let code = "";
            for (let nextC = c + 1; nextC < row.length; nextC++) {
              if (row[nextC] && String(row[nextC]).trim() !== "") {
                code = String(row[nextC]).trim();
                break;
              }
            }

            let prodName = "";
            let marca = "";
            let desc = "";
            let unidad = "Unidad";

            for (let rOffset = -4; rOffset <= 3; rOffset++) {
              const targetRow = dataFmt[i + rOffset];
              if (!targetRow) continue;
              for (let tc = 0; tc < targetRow.length; tc++) {
                const tVal = String(targetRow[tc] || "").trim().toUpperCase();
                if (tVal.includes("PRODUCTO:")) {
                  prodName = String(targetRow[tc + 1] || targetRow[tc + 2] || "").trim();
                }
                if (tVal.includes("MARCA:")) {
                  marca = String(targetRow[tc + 1] || (dataFmt[i + rOffset + 1] && dataFmt[i + rOffset + 1][tc]) || "").trim();
                }
                if (tVal.includes("DESCRIPCIÓN:") || tVal.includes("DESCRIPCION:")) {
                  desc = String(targetRow[tc + 1] || targetRow[tc + 2] || "").trim();
                }
                if (tVal.includes("UND. MEDIDA") || tVal.includes("UNIDAD")) {
                  unidad = String(targetRow[tc + 1] || (dataFmt[i + rOffset + 1] && dataFmt[i + rOffset + 1][tc]) || "").trim() || "Unidad";
                }
              }
            }

            if (code) {
              const codeTrim = code.trim();
              const prodNameTrim = prodName.trim();

              // Buscar si ya existe en la base de datos por código o por nombre
              const prodExistente = (productos || []).find((p: any) => {
                const dbCode = (p.codigo || "").trim().toLowerCase();
                const dbNom = (p.nombre || "").trim().toLowerCase();
                if (dbCode === codeTrim.toLowerCase()) return true;
                if (prodNameTrim && dbNom === prodNameTrim.toLowerCase()) return true;
                return false;
              });

              const finalCode = prodExistente ? prodExistente.codigo : codeTrim;
              const finalNombre = prodExistente?.nombre || prodNameTrim || `Producto ${finalCode}`;
              const finalMarca = prodExistente?.marca || marca || "";
              const finalDesc = prodExistente?.descripcion || desc || "";
              const finalUnd = prodExistente?.unidadMedida || unidad || "Unidad";

              const newProdInfo: DetectedProductInfo = {
                codigo: finalCode,
                nombre: finalNombre,
                marca: finalMarca,
                descripcion: finalDesc,
                unidadMedida: finalUnd,
                movCount: detectedProdsMap.get(finalCode)?.movCount || 0,
                esExistente: Boolean(prodExistente),
              };
              currentProd = newProdInfo;
              if (!detectedProdsMap.has(finalCode)) {
                detectedProdsMap.set(finalCode, newProdInfo);
              }
            }
          }
        }

        // 2. Comprobar si la fila es un movimiento válido
        const movCell = String(row[2] || "").trim().toUpperCase();
        if (
          !movCell ||
          movCell === "MOVIMIENTO" ||
          movCell.includes("SALDO") ||
          movCell.includes("SUBTOTAL") ||
          movCell.includes("TOTAL")
        ) {
          continue;
        }

        const isInicial = movCell.includes("INICIAL") || movCell.includes("INICUAL");
        const isVenta = /\bVENTAS?\b/i.test(movCell);
        const isCompra = /\bCOMPRAS?\b/i.test(movCell);
        const isAjuste = movCell.includes("AJUSTE");

        if (!isInicial && !isVenta && !isCompra && !isAjuste) continue;

        const rawRow = dataRaw[i] || [];
        const fechaIso = parseDateString(rawRow[1], row[1]);
        if (!fechaIso) continue;

        // Validar rango razonable de año
        const [yStr] = fechaIso.split("-");
        const anio = parseInt(yStr, 10);
        if (isNaN(anio) || anio < 1990 || anio > 2100) continue;

        const entradaCant = parseNumber(rawRow[6], row[6]);
        const salidaCant = parseNumber(rawRow[7], row[7]);
        const saldoStock = parseNumber(rawRow[8], row[8]);
        const pu = parseNumber(rawRow[9], row[9]);
        const entradaBs = parseNumber(rawRow[10], row[10]);
        const salidaBs = parseNumber(rawRow[11], row[11]);

        let tipo: "VENTA" | "COMPRA" | "INVENTARIO INICIAL" = "VENTA";
        let cant = 1;
        let subtotal = 0;

        if (isInicial) {
          tipo = "INVENTARIO INICIAL";
          cant = entradaCant > 0 ? entradaCant : (salidaCant > 0 ? salidaCant : 1);
          subtotal = entradaBs > 0 ? entradaBs : cant * pu;
        } else if (entradaCant > 0 && salidaCant === 0) {
          // Si la cantidad está registrada en la columna ENTRADAS, es una ENTRADA (Compra o Ajuste Positivo)
          tipo = "COMPRA";
          cant = entradaCant;
          subtotal = entradaBs > 0 ? entradaBs : cant * pu;
        } else if (salidaCant > 0 && entradaCant === 0) {
          // Si la cantidad está registrada en la columna SALIDAS, es una SALIDA (Venta o Ajuste Negativo)
          tipo = "VENTA";
          cant = salidaCant;
          subtotal = salidaBs > 0 ? salidaBs : cant * pu;
        } else if (isCompra) {
          tipo = "COMPRA";
          cant = entradaCant > 0 ? entradaCant : 1;
          subtotal = entradaBs > 0 ? entradaBs : cant * pu;
        } else if (isVenta) {
          tipo = "VENTA";
          cant = salidaCant > 0 ? salidaCant : 1;
          subtotal = salidaBs > 0 ? salidaBs : cant * pu;
        } else if (isAjuste) {
          tipo = entradaCant > 0 ? "COMPRA" : "VENTA";
          cant = entradaCant > 0 ? entradaCant : (salidaCant > 0 ? salidaCant : 1);
          subtotal = (entradaCant > 0 ? entradaBs : salidaBs) || cant * pu;
        }

        let finalPu = Math.abs(pu);
        cant = Math.max(1, Math.abs(cant));
        subtotal = Math.abs(subtotal);

        if (finalPu === 0 && cant > 0 && subtotal > 0) finalPu = subtotal / cant;
        if (subtotal === 0 && cant > 0 && finalPu > 0) subtotal = cant * finalPu;

        const prodCod = currentProd ? currentProd.codigo : "";
        if (prodCod && detectedProdsMap.has(prodCod)) {
          detectedProdsMap.get(prodCod)!.movCount += 1;
        }

        parsedItems.push({
          _id: `mov-${i}-${parsedItems.length}`,
          _rawCodigo: prodCod,
          productoCodigo: prodCod,
          productoNombre: currentProd ? currentProd.nombre : "",
          marca: currentProd ? currentProd.marca : "",
          descripcion: currentProd ? currentProd.descripcion : "",
          unidadMedida: currentProd ? currentProd.unidadMedida : "Unidad",
          fecha: fechaIso,
          tipoTransaccion: tipo,
          nitCi: String(row[3] || "").trim() || "0",
          razonSocial: String(row[4] || "").trim() || (tipo === "VENTA" ? "CLIENTE GENERAL" : "PROVEEDOR GENERAL"),
          nroDocumento: String(row[5] || "").trim() || `DOC-${fechaIso.replace(/-/g, "")}-${i + 1}`,
          cantidad: cant,
          precioUnitario: finalPu,
          subtotal: subtotal,
          saldoStock: saldoStock,
        });
      }

      if (parsedItems.length === 0) {
        Swal.fire(
          "Sin Movimientos Válidos",
          "No se pudieron detectar movimientos en el formato esperado. Asegúrate de usar la plantilla con columnas: FECHA, MOVIMIENTO, NIT/C.I., CLIENTE/PROVEEDOR, Nro. FACTURA, CANTIDADES, P/U, IMPORTES.",
          "info"
        );
        return;
      }

      const prodsList = Array.from(detectedProdsMap.values());
      setDetectedProducts(prodsList);

      // Guardar copia original para restaurar
      rawParsedMovementsRef.current = parsedItems;
      setPreviewMovements(parsedItems);
      setPreviewFilterProducto("TODOS");
      setPreviewFilterTipo("TODOS");
      setPreviewSearch("");
      setShowProductMappingDrawer(false);

      // Si el Excel tiene un único producto detectado y coincide con un producto de la base de datos, preseleccionarlo
      if (prodsList.length === 1 && productos.some((p) => p.codigo === prodsList[0].codigo)) {
        setSelectedProductGlobal(prodsList[0].codigo);
      } else {
        setSelectedProductGlobal("AUTO");
      }

      setIsImportModalOpen(true);
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error al leer el archivo Excel.", "error");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Mapeo masivo por producto detectado específico
  const handleMapDetectedProduct = (detectedCode: string, targetSystemCode: string) => {
    if (targetSystemCode === "ORIGINAL") {
      const originalProd = detectedProducts.find((p) => p.codigo === detectedCode);
      setPreviewMovements((prev) =>
        prev.map((m) => {
          if (m._rawCodigo === detectedCode) {
            return {
              ...m,
              productoCodigo: detectedCode,
              productoNombre: originalProd ? originalProd.nombre : m.productoNombre,
              marca: originalProd ? originalProd.marca : m.marca,
              descripcion: originalProd ? originalProd.descripcion : m.descripcion,
              unidadMedida: originalProd ? originalProd.unidadMedida : m.unidadMedida,
            };
          }
          return m;
        })
      );
    } else {
      const targetProd = productos.find((p) => p.codigo === targetSystemCode);
      if (!targetProd) return;
      setPreviewMovements((prev) =>
        prev.map((m) => {
          if (m.productoCodigo === detectedCode || m._rawCodigo === detectedCode) {
            return {
              ...m,
              productoCodigo: targetProd.codigo,
              productoNombre: targetProd.nombre,
              marca: targetProd.marca || m.marca,
              descripcion: targetProd.descripcion || m.descripcion,
              unidadMedida: targetProd.unidadMedida || m.unidadMedida,
            };
          }
          return m;
        })
      );
    }
  };

  // Cambio global de producto (para forzar todos los movimientos a 1 solo producto si se desea)
  const handleGlobalProductChange = (prodCode: string) => {
    setSelectedProductGlobal(prodCode);
    if (prodCode === "AUTO") {
      setPreviewMovements([...rawParsedMovementsRef.current]);
    } else {
      const targetProd = productos.find((p) => p.codigo === prodCode);
      if (targetProd) {
        setPreviewMovements((prev) =>
          prev.map((m) => ({
            ...m,
            productoCodigo: targetProd.codigo,
            productoNombre: targetProd.nombre,
            marca: targetProd.marca || m.marca,
            descripcion: targetProd.descripcion || m.descripcion,
            unidadMedida: targetProd.unidadMedida || m.unidadMedida,
          }))
        );
      }
    }
  };

  // Cambio de producto por fila individual seguro por ID
  const handleRowProductChange = (rowId: string, newCode: string) => {
    const targetProd = productos.find((p) => p.codigo === newCode);
    if (!targetProd) return;

    setPreviewMovements((prev) =>
      prev.map((m) => {
        if (m._id === rowId) {
          return {
            ...m,
            productoCodigo: targetProd.codigo,
            productoNombre: targetProd.nombre,
            marca: targetProd.marca || m.marca,
            descripcion: targetProd.descripcion || m.descripcion,
            unidadMedida: targetProd.unidadMedida || m.unidadMedida,
          };
        }
        return m;
      })
    );
  };

  // Eliminar una fila individual de la importación por ID
  const handleRemoveRow = (rowId: string) => {
    setPreviewMovements((prev) => prev.filter((m) => m._id !== rowId));
  };

  const handleImportConfirm = async () => {
    if (previewMovements.length === 0) return;

    // Validación estricta: Cada movimiento DEBE tener un producto asignado
    const sinProducto = previewMovements.filter(
      (m) => !m.productoCodigo || m.productoCodigo.trim() === ""
    );
    if (sinProducto.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Producto Requerido",
        html: `
          <p>Se detectaron <strong>${sinProducto.length}</strong> movimientos sin un producto asignado.</p>
          <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #4b5563;">
            Por favor, asigna un producto a los movimientos antes de guardar.
          </p>
        `,
      });
      return;
    }

    setIsImporting(true);
    try {
      const res = await importarTransacciones(previewMovements, {
        crearProductosFaltantes,
        actualizarStock,
        crearContactosFaltantes,
      });

      setIsImportModalOpen(false);
      setPreviewMovements([]);

      await Swal.fire({
        icon: "success",
        title: "¡Importación Exitosa!",
        html: `
          <p>Se procesaron correctamente <strong>${res.count}</strong> movimientos en el sistema.</p>
          <div style="margin-top: 0.75rem; font-size: 0.9rem; color: #334155; text-align: left; background: #f8fafc; padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #e2e8f0; line-height: 1.6;">
            <div>• Facturas / Transacciones registradas: <strong>${res.transactionsCreated}</strong></div>
            ${res.transactionsSkippedDuplicate && res.transactionsSkippedDuplicate > 0 ? `<div style="color: #d97706; font-weight: 600;">• Transacciones omitidas (ya existían): <strong>${res.transactionsSkippedDuplicate}</strong></div>` : ""}
            <div>• Productos existentes reutilizados: <strong style="color: #16a34a;">${res.productsReused || 0}</strong></div>
            <div>• Nuevos productos creados: <strong>${res.productsCreated}</strong></div>
            <div>• Nuevos clientes registrados: <strong>${res.clientsCreated || 0}</strong></div>
            <div>• Nuevos proveedores registrados: <strong>${res.providersCreated || 0}</strong></div>
          </div>
        `,
        confirmButtonText: "Ver Historial Actualizado",
      });

      window.location.reload();
    } catch (err: any) {
      Swal.fire("Error al Importar", err.message || "Ocurrió un error al registrar las transacciones.", "error");
    } finally {
      setIsImporting(false);
    }
  };

  // Filtrar filas en la vista previa
  const previewFiltrada = useMemo(() => {
    return previewMovements.filter((m) => {
      const matchesSearch =
        previewSearch === "" ||
        m.productoCodigo.toLowerCase().includes(previewSearch.toLowerCase()) ||
        m.productoNombre.toLowerCase().includes(previewSearch.toLowerCase()) ||
        m.nroDocumento.toLowerCase().includes(previewSearch.toLowerCase()) ||
        m.razonSocial.toLowerCase().includes(previewSearch.toLowerCase()) ||
        m.nitCi.toLowerCase().includes(previewSearch.toLowerCase());

      const matchesTipo =
        previewFilterTipo === "TODOS" || m.tipoTransaccion === previewFilterTipo;

      const matchesProducto =
        previewFilterProducto === "TODOS" ||
        m.productoCodigo === previewFilterProducto ||
        m._rawCodigo === previewFilterProducto;

      return matchesSearch && matchesTipo && matchesProducto;
    });
  }, [previewMovements, previewSearch, previewFilterTipo, previewFilterProducto]);

  // Resumen estadístico de la vista previa
  const stats = useMemo(() => {
    const totalMovs = previewMovements.length;
    const codigosDistintos = Array.from(new Set(previewMovements.map((m) => m.productoCodigo).filter(Boolean)));
    const prodsUnicos = codigosDistintos.length;
    const sinProducto = previewMovements.filter((m) => !m.productoCodigo).length;
    const totalVentas = previewMovements
      .filter((m) => m.tipoTransaccion === "VENTA")
      .reduce((acc, curr) => acc + curr.subtotal, 0);
    const totalEntradas = previewMovements
      .filter((m) => m.tipoTransaccion !== "VENTA")
      .reduce((acc, curr) => acc + curr.subtotal, 0);

    return { totalMovs, prodsUnicos, sinProducto, totalVentas, totalEntradas };
  }, [previewMovements]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Historial General de Transacciones</h1>
          <p className={styles.subtitle}>Listado completo de ventas, compras e inventario inicial</p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por N° Documento, Cliente o NIT..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />

          <button
            className={styles.btnImport}
            onClick={() => fileInputRef.current?.click()}
            title="Importar movimientos y transacciones desde plantilla Excel"
          >
            <Upload size={18} /> Importar Transacciones
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>N° Documento</th>
              <th>Cliente / Proveedor</th>
              <th>NIT/CI</th>
              <th>Forma de Pago</th>
              <th>Total (Bs.)</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransacciones.map((tx) => {
              const total = tx.detalles.reduce((acc: number, d: any) => acc + d.subtotal, 0) - tx.descuento;
              return (
                <tr key={tx.id}>
                  <td>{new Date(tx.fecha).toLocaleDateString()}</td>
                  <td>
                    {tx.tipoTransaccion === "VENTA" ? (
                      <span className={styles.badgeVenta}>
                        <ShoppingCart size={14} /> VENTA
                      </span>
                    ) : tx.tipoTransaccion === "INVENTARIO INICIAL" || tx.tipoTransaccion === "SALDO INICIAL" ? (
                      <span className={styles.badgeInicial}>
                        <Package size={14} /> INV. INICIAL
                      </span>
                    ) : (
                      <span className={styles.badgeCompra}>
                        <Download size={14} /> COMPRA
                      </span>
                    )}
                  </td>
                  <td style={{ fontWeight: "bold" }}>{tx.nroDocumento}</td>
                  <td>{tx.razonSocial}</td>
                  <td>{tx.nitCi}</td>
                  <td>
                    <span className={styles.badgePayment}>{tx.formaPago}</span>
                  </td>
                  <td style={{ fontWeight: "bold" }}>Bs. {total.toFixed(2)}</td>
                  <td>
                    <button className={styles.btnView} onClick={() => setSelectedTx(tx)}>
                      <Eye size={16} /> Ver Items
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredTransacciones.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                  No se encontraron transacciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detalle de Factura / Transacción */}
      {selectedTx && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>
                Detalle de Documento {selectedTx.nroDocumento}
              </h2>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setSelectedTx(null)}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div
                style={{
                  marginBottom: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                  background: "#f8fafc",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <span style={{ color: "#64748b", fontSize: "0.75rem", display: "block", textTransform: "uppercase" }}>
                    {selectedTx.tipoTransaccion === "VENTA" ? "Cliente" : "Proveedor / Origen"}
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{selectedTx.razonSocial}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b", fontSize: "0.75rem", display: "block", textTransform: "uppercase" }}>
                    NIT / CI
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{selectedTx.nitCi}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b", fontSize: "0.75rem", display: "block", textTransform: "uppercase" }}>
                    Forma de Pago
                  </span>
                  <span
                    style={{
                      background: "#e2e8f0",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedTx.formaPago}
                  </span>
                </div>
                <div>
                  <span style={{ color: "#64748b", fontSize: "0.75rem", display: "block", textTransform: "uppercase" }}>
                    Fecha
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>
                    {new Date(selectedTx.fecha).toLocaleDateString()}
                  </strong>
                </div>
                {selectedTx.observaciones && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ color: "#64748b", fontSize: "0.75rem", display: "block", textTransform: "uppercase" }}>
                      Observaciones
                    </span>
                    <span style={{ fontSize: "0.85rem" }}>{selectedTx.observaciones}</span>
                  </div>
                )}
              </div>

              <table className={styles.tableDetail}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>P. Unit. (Bs.)</th>
                    <th>Subtotal (Bs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTx.detalles.map((d: any) => (
                    <tr key={d.id}>
                      <td>{d.productoCodigo}</td>
                      <td>{d.producto?.nombre || "Producto Desconocido"}</td>
                      <td>{d.cantidad}</td>
                      <td>{parseFloat(d.precioUnitario.toFixed(5))}</td>
                      <td style={{ fontWeight: "bold" }}>{d.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ textAlign: "right", marginTop: "1rem", fontSize: "1.1rem" }}>
                <div>
                  <strong>Descuento: </strong> Bs. {selectedTx.descuento.toFixed(2)}
                </div>
                <div style={{ fontSize: "1.25rem", color: "#16a34a", marginTop: "0.5rem" }}>
                  <strong>Total Pagado / Valor: </strong> Bs.{" "}
                  {(
                    selectedTx.detalles.reduce((acc: number, d: any) => acc + d.subtotal, 0) -
                    selectedTx.descuento
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vista Previa de Importación */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalLarge}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalHeaderTitle} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileSpreadsheet size={22} color="#059669" /> Vista Previa de Importación de Transacciones
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0.2rem 0 0" }}>
                  Revisa los movimientos y asegúrate de que estén asignados al producto correcto antes de guardar.
                </p>
              </div>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setIsImportModalOpen(false)}
                disabled={isImporting}
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* BANNER INTELIGENTE DE PRODUCTOS DETECTADOS */}
              {detectedProducts.length > 0 && (
                <div className={styles.detectedBanner}>
                  <div className={styles.detectedHeaderRow}>
                    <div className={styles.detectedTitle}>
                      <Package size={20} color="#16a34a" />
                      <span>
                        Detección Multiproducto Inteligente:{" "}
                        <strong style={{ color: "#15803d" }}>{detectedProducts.length} productos</strong> detectados ({stats.totalMovs} movimientos)
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <button
                        type="button"
                        className={styles.btnToggleDrawer}
                        onClick={() => setShowProductMappingDrawer(!showProductMappingDrawer)}
                        title="Ver listado y mapeo de productos detectados"
                      >
                        <Layers size={14} />
                        {showProductMappingDrawer ? "Ocultar Productos" : "Administrar Productos Detectados"}
                        {showProductMappingDrawer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* CAJÓN EXPANDIBLE DE PRODUCTOS DETECTADOS */}
                  {showProductMappingDrawer && (
                    <div className={styles.detectedGrid}>
                      {detectedProducts.map((p) => {
                        const existsInDb = p.esExistente || productos.some((dbP) => 
                          dbP.codigo.trim().toLowerCase() === p.codigo.trim().toLowerCase() || 
                          dbP.nombre.trim().toLowerCase() === p.nombre.trim().toLowerCase()
                        );
                        return (
                          <div key={p.codigo} className={styles.detectedCard}>
                            <div className={styles.detectedCardHeader}>
                              <span className={styles.detectedCodeBadge}>Cód: {p.codigo}</span>
                              <span className={styles.detectedMovCount}>
                                {p.movCount} movimientos
                              </span>
                            </div>
                            <div className={styles.detectedCardName} title={p.nombre}>
                              {p.nombre}
                            </div>
                            <div className={styles.detectedCardMeta}>
                              <span>Marca: <strong>{p.marca || "N/A"}</strong></span>
                              <span>Und: <strong>{p.unidadMedida || "Unidad"}</strong></span>
                              <span style={{ 
                                background: existsInDb ? "#dcfce7" : "#e0f2fe",
                                color: existsInDb ? "#15803d" : "#0369a1", 
                                fontWeight: 700,
                                padding: "0.15rem 0.4rem",
                                borderRadius: "4px",
                                fontSize: "0.75rem"
                              }}>
                                {existsInDb ? "● Reutilizado de BD" : "✨ Nuevo a crear"}
                              </span>
                            </div>

                            <div style={{ marginTop: "0.35rem" }}>
                              <select
                                className={styles.detectedCardSelect}
                                onChange={(e) => handleMapDetectedProduct(p.codigo, e.target.value)}
                                defaultValue="ORIGINAL"
                                title="Asociar este producto detectado a otro producto del sistema"
                              >
                                <option value="ORIGINAL">
                                  {existsInDb ? `✓ Reutilizar producto existente [${p.codigo}]` : `✨ Crear como nuevo producto [${p.codigo}]`}
                                </option>
                                <optgroup label="O reasignar a otro producto existente:">
                                  {productos.map((dbP) => (
                                    <option key={dbP.codigo} value={dbP.codigo}>
                                      [{dbP.codigo}] {dbP.nombre} (Stock: {dbP.stock})
                                    </option>
                                  ))}
                                </optgroup>
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Selector Global Opcional (si se quiere forzar todo a 1 solo producto) */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.8rem", color: "#475569" }}>
                    <span>Forzar todos los movimientos a un único producto (opcional):</span>
                    <select
                      value={selectedProductGlobal}
                      onChange={(e) => handleGlobalProductChange(e.target.value)}
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.8rem",
                        background: "#fff",
                        color: "#1e293b",
                        fontWeight: 600,
                      }}
                    >
                      <option value="AUTO">-- Automático (Respetar productos detectados) --</option>
                      {productos.map((p) => (
                        <option key={p.codigo} value={p.codigo}>
                          [{p.codigo}] {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Tarjetas de Estadísticas */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Movimientos</span>
                  <div className={styles.statValue}>{stats.totalMovs}</div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Productos Involucrados</span>
                  <div className={styles.statValue}>{stats.prodsUnicos}</div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Ventas (Salidas)</span>
                  <div className={styles.statValue} style={{ color: "#16a34a" }}>
                    Bs. {stats.totalVentas.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Entradas / Inicial</span>
                  <div className={styles.statValue} style={{ color: "#2563eb" }}>
                    Bs. {stats.totalEntradas.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Opciones de Configuración */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                  fontSize: "0.85rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={crearProductosFaltantes}
                    onChange={(e) => setCrearProductosFaltantes(e.target.checked)}
                  />
                  <span>Crear productos nuevos si no existen en el sistema</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={actualizarStock}
                    onChange={(e) => setActualizarStock(e.target.checked)}
                  />
                  <span>Actualizar stock y costos automáticamente en inventario</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={crearContactosFaltantes}
                    onChange={(e) => setCrearContactosFaltantes(e.target.checked)}
                  />
                  <span>Agregar automáticamente clientes y proveedores nuevos al sistema</span>
                </label>
              </div>

              {/* Filtros dentro de la vista previa */}
              <div className={styles.filterControlsRow}>
                <div className={styles.filterGroup}>
                  <input
                    type="text"
                    placeholder="Buscar por código, doc, cliente..."
                    value={previewSearch}
                    onChange={(e) => setPreviewSearch(e.target.value)}
                    className={styles.filterInput}
                  />

                  {/* FILTRO POR PRODUCTO ESPECÍFICO */}
                  <select
                    value={previewFilterProducto}
                    onChange={(e) => setPreviewFilterProducto(e.target.value)}
                    className={styles.filterSelect}
                    title="Filtrar vista previa por producto"
                  >
                    <option value="TODOS">📦 Todos los productos ({detectedProducts.length})</option>
                    {detectedProducts.map((p) => (
                      <option key={p.codigo} value={p.codigo}>
                        [{p.codigo}] {p.nombre.slice(0, 32)}... ({p.movCount} movs)
                      </option>
                    ))}
                  </select>

                  {/* FILTRO POR TIPO */}
                  <select
                    value={previewFilterTipo}
                    onChange={(e) => setPreviewFilterTipo(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="TODOS">Todos los tipos</option>
                    <option value="VENTA">Solo Ventas</option>
                    <option value="COMPRA">Solo Compras</option>
                    <option value="INVENTARIO INICIAL">Solo Inventario Inicial</option>
                  </select>
                </div>

                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Mostrando <strong>{previewFiltrada.length}</strong> de {previewMovements.length} movimientos
                </span>
              </div>

              {/* Tabla de Vista Previa */}
              <div className={styles.previewTableWrapper}>
                <table className={styles.previewTable}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fecha</th>
                      <th>Tipo</th>
                      <th>N° Doc.</th>
                      <th>Cliente / Proveedor</th>
                      <th>NIT/CI</th>
                      <th style={{ minWidth: "240px" }}>Producto Asignado</th>
                      <th>Cant.</th>
                      <th>P/U (Bs.)</th>
                      <th>Subtotal (Bs.)</th>
                      <th style={{ textAlign: "center" }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewFiltrada.map((item, idx) => (
                      <tr key={item._id || idx}>
                        <td>{idx + 1}</td>
                        <td style={{ fontWeight: 600 }}>{formatDateDisplay(item.fecha)}</td>
                        <td>
                          {item.tipoTransaccion === "VENTA" ? (
                            <span className={styles.badgeVenta}>
                              <ShoppingCart size={13} /> VENTA
                            </span>
                          ) : item.tipoTransaccion === "INVENTARIO INICIAL" ? (
                            <span className={styles.badgeInicial}>
                              <Package size={13} /> INV. INICIAL
                            </span>
                          ) : (
                            <span className={styles.badgeCompra}>
                              <Download size={13} /> COMPRA
                            </span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{item.nroDocumento}</td>
                        <td>{item.razonSocial}</td>
                        <td>{item.nitCi}</td>
                        <td>
                          <select
                            value={item.productoCodigo}
                            onChange={(e) => handleRowProductChange(item._id, e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.35rem 0.5rem",
                              borderRadius: "4px",
                              border: item.productoCodigo ? "1px solid #cbd5e1" : "2px solid #ef4444",
                              fontSize: "0.8rem",
                              background: item.productoCodigo ? "#fff" : "#fee2e2",
                              color: "#1e293b",
                            }}
                            title="Selecciona o cambia el producto asignado a este movimiento"
                          >
                            {!item.productoCodigo && (
                              <option value="">-- ⚠️ SELECCIONAR PRODUCTO --</option>
                            )}
                            {item.productoCodigo && !productos.some((p) => p.codigo === item.productoCodigo) && (
                              <option value={item.productoCodigo}>
                                ✨ [{item.productoCodigo}] {item.productoNombre} (Nuevo)
                              </option>
                            )}
                            {productos.map((p) => (
                              <option key={p.codigo} value={p.codigo}>
                                [{p.codigo}] {p.nombre} ({p.stock} disp.)
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={{ fontWeight: 600 }}>
                          {item.cantidad}
                          {item.saldoStock != null && item.saldoStock < 0 && (
                            <span
                              style={{
                                display: "block",
                                fontSize: "0.7rem",
                                color: "#dc2626",
                                fontWeight: 700,
                                marginTop: "2px",
                              }}
                              title="El saldo físico en Kardex fue temporalmente negativo por venta previa al registro de compra (sobreventa)"
                            >
                              ⚠️ Saldo: {item.saldoStock}
                            </span>
                          )}
                        </td>
                        <td>{item.precioUnitario.toFixed(2)}</td>
                        <td style={{ fontWeight: 700 }}>{item.subtotal.toFixed(2)}</td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className={styles.btnTrash}
                            onClick={() => handleRemoveRow(item._id)}
                            title="Quitar esta fila de la importación"
                            disabled={isImporting}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {previewFiltrada.length === 0 && (
                      <tr>
                        <td colSpan={11} style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                          No hay movimientos que coincidan con los filtros seleccionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <a
                href="/templates/plantilla_importacion_transacciones.xlsx"
                download="plantilla_importacion_transacciones.xlsx"
                className={styles.btnDownload}
                title="Descargar archivo Excel con el formato requerido"
              >
                <Download size={15} /> Descargar Plantilla Excel
              </a>

              <button
                type="button"
                className={styles.btnCancel}
                onClick={() => setIsImportModalOpen(false)}
                disabled={isImporting}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.btnSave}
                onClick={handleImportConfirm}
                disabled={isImporting || previewMovements.length === 0}
              >
                {isImporting ? (
                  <>Guardando transacciones...</>
                ) : (
                  <>
                    <Check size={16} /> Proceder con Importación ({previewMovements.length})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
