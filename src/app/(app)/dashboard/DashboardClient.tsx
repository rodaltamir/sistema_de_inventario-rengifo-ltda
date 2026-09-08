'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Users, TrendingUp, ShoppingCart, Banknote, Download, FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import styles from './dashboard.module.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Add type for autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

type Producto = {
  codigo: string;
  nombre: string;
  stock: number;
  costo: number;
};

type Transaccion = {
  id: string;
  tipoTransaccion: string;
  fecha: Date | string;
  razonSocial: string;
  descuento: number;
  detalles: { subtotal: number }[];
};

type Proveedor = {
  id: string;
  tipo?: string;
};

interface DashboardClientProps {
  productos: Producto[];
  proveedores: Proveedor[];
  transacciones: Transaccion[];
}

export default function DashboardClient({ productos, proveedores, transacciones }: DashboardClientProps) {
  const router = useRouter();

  // Elegir por defecto el año de la transacción más reciente si hay transacciones
  const defaultYear = useMemo(() => {
    if (transacciones && transacciones.length > 0) {
      return new Date(transacciones[0].fecha).getFullYear();
    }
    return new Date().getFullYear();
  }, [transacciones]);

  const [tipoPeriodo, setTipoPeriodo] = useState<'Anual' | 'Historico' | 'Semestral' | 'Mensual'>('Anual');
  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const [semester, setSemester] = useState(new Date().getMonth() < 6 ? 1 : 2);

  // Sincronizar año cuando se reciban transacciones
  useEffect(() => {
    if (transacciones && transacciones.length > 0) {
      const latestY = new Date(transacciones[0].fecha).getFullYear();
      setYear(latestY);
    }
  }, [transacciones]);

  // Available years based on transactions or just recent ones
  const availableYears = useMemo(() => {
    const years = transacciones.map(t => new Date(t.fecha).getFullYear());
    years.push(new Date().getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [transacciones]);

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const periodoLabel = useMemo(() => {
    if (tipoPeriodo === 'Historico') return 'Histórico Total';
    if (tipoPeriodo === 'Anual') return `Año ${year}`;
    if (tipoPeriodo === 'Semestral') return `${semester === 1 ? '1er' : '2do'} Sem. ${year}`;
    return `${meses[month]} ${year}`;
  }, [tipoPeriodo, year, month, semester, meses]);

  // Filter transactions by period
  const transaccionesFiltradas = useMemo(() => {
    return transacciones.filter(t => {
      if (tipoPeriodo === 'Historico') return true;

      const d = new Date(t.fecha);
      const tYear = d.getFullYear();
      const tMonth = d.getMonth();

      if (tipoPeriodo === 'Anual') {
        return tYear === year;
      } else if (tipoPeriodo === 'Semestral') {
        if (tYear !== year) return false;
        if (semester === 1) return tMonth >= 0 && tMonth <= 5;
        return tMonth >= 6 && tMonth <= 11;
      } else if (tipoPeriodo === 'Mensual') {
        return tYear === year && tMonth === month;
      }
      return true;
    });
  }, [transacciones, tipoPeriodo, year, month, semester]);

  // Calculate Metrics
  const totalProductos = productos.length;
  const totalContactos = proveedores.length;
  const countProveedores = proveedores.filter(p => p.tipo !== 'CLIENTE').length;
  const countClientes = proveedores.filter(p => p.tipo === 'CLIENTE').length;
  const valorTotalInventario = productos.reduce((sum, p) => sum + (p.stock * p.costo), 0);

  const totalVentas = transaccionesFiltradas
    .filter(t => t.tipoTransaccion === 'VENTA')
    .reduce((sum, t) => sum + t.detalles.reduce((acc, d) => acc + d.subtotal, 0) - t.descuento, 0);

  // Incluir compras e inventario inicial en las entradas
  const totalCompras = transaccionesFiltradas
    .filter(t => t.tipoTransaccion === 'COMPRA' || t.tipoTransaccion === 'INVENTARIO INICIAL' || t.tipoTransaccion === 'SALDO INICIAL')
    .reduce((sum, t) => sum + t.detalles.reduce((acc, d) => acc + d.subtotal, 0) - t.descuento, 0);

  // Sorting latest transactions
  const ultimosMovimientos = [...transacciones]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  // Stock alert
  const productosBajoStock = productos.filter(p => p.stock <= 0);

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Reporte de Sistema - ${periodoLabel}`, 14, 20);
    
    doc.setFontSize(11);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Summary
    doc.text(`Total Productos: ${totalProductos}`, 14, 40);
    doc.text(`Valor Inventario: Bs. ${valorTotalInventario.toFixed(2)}`, 14, 46);
    doc.text(`Proveedores: ${countProveedores} | Clientes: ${countClientes}`, 14, 52);
    doc.text(`Ventas (${periodoLabel}): Bs. ${totalVentas.toFixed(2)}`, 100, 40);
    doc.text(`Compras (${periodoLabel}): Bs. ${totalCompras.toFixed(2)}`, 100, 46);

    // Table of movements
    doc.text('Últimos Movimientos:', 14, 65);
    
    const tableData = ultimosMovimientos.map(t => [
      t.tipoTransaccion,
      new Date(t.fecha).toLocaleDateString(),
      t.razonSocial || 'S/N',
      `Bs. ${(t.detalles.reduce((acc, d) => acc + d.subtotal, 0) - t.descuento).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 70,
      head: [['TIPO', 'FECHA', 'CLIENTE/PROVEEDOR', 'TOTAL']],
      body: tableData,
    });

    doc.save(`Reporte_Dashboard_${periodoLabel.replace(/ /g, '_')}.pdf`);
  };

  // Export Excel
  const handleExportExcel = () => {
    const data = transaccionesFiltradas.map(t => ({
      'TIPO': t.tipoTransaccion,
      'FECHA': new Date(t.fecha).toLocaleDateString(),
      'CLIENTE/PROVEEDOR': t.razonSocial || 'S/N',
      'TOTAL (Bs.)': t.detalles.reduce((acc, d) => acc + d.subtotal, 0) - t.descuento
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Movimientos");
    XLSX.writeFile(wb, `Reporte_Dashboard_${periodoLabel.replace(/ /g, '_')}.xlsx`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <select 
              value={tipoPeriodo} 
              onChange={(e) => setTipoPeriodo(e.target.value as any)}
              className={styles.periodSelect}
            >
              <option value="Anual">Anual</option>
              <option value="Historico">Todo el Historial</option>
              <option value="Semestral">Semestral</option>
              <option value="Mensual">Mensual</option>
            </select>

            {tipoPeriodo === 'Mensual' && (
              <select 
                value={month} 
                onChange={(e) => setMonth(Number(e.target.value))}
                className={styles.periodSelect}
              >
                {meses.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>
            )}

            {tipoPeriodo === 'Semestral' && (
              <select 
                value={semester} 
                onChange={(e) => setSemester(Number(e.target.value))}
                className={styles.periodSelect}
              >
                <option value={1}>1er Semestre</option>
                <option value={2}>2do Semestre</option>
              </select>
            )}

            {tipoPeriodo !== 'Historico' && (
              <select 
                value={year} 
                onChange={(e) => setYear(Number(e.target.value))}
                className={styles.periodSelect}
              >
                {availableYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            )}
          </div>

          <button onClick={handleExportPDF} className={`${styles.exportBtn} ${styles.pdfBtn}`}>
            <FileText size={16} /> PDF
          </button>
          <button onClick={handleExportExcel} className={`${styles.exportBtn} ${styles.excelBtn}`}>
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      <div className={styles.gridRowTop}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>TOTAL PRODUCTOS</p>
              <h2 className={styles.cardValueMain}>{totalProductos}</h2>
              <span className={styles.cardTag}>Registrados en sistema</span>
            </div>
            <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
              <Package size={28} color="white" />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>VENTAS ({periodoLabel.toUpperCase()})</p>
              <h2 className={styles.cardValueSuccess}>Bs. {totalVentas.toFixed(2)}</h2>
              <span className={styles.cardTagSuccess}>Ingresos en {periodoLabel}</span>
            </div>
            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
              <TrendingUp size={28} color="white" />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>COMPRAS / ENTRADAS ({periodoLabel.toUpperCase()})</p>
              <h2 className={styles.cardValueDanger}>Bs. {totalCompras.toFixed(2)}</h2>
              <span className={styles.cardTagDanger}>Egresos e inicial en {periodoLabel}</span>
            </div>
            <div className={`${styles.iconWrapper} ${styles.iconGrey}`}>
              <ShoppingCart size={28} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gridRowMiddle}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>VALOR TOTAL INVENTARIO</p>
              <h2 className={styles.cardValuePrimary}>Bs. {valorTotalInventario.toFixed(2)}</h2>
              <span className={styles.cardTagPrimary}>Valorización a costo actual</span>
            </div>
            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
              <Banknote size={28} color="white" />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>
                {countClientes > 0 ? "CONTACTOS (PROV. / CLIENTES)" : "TOTAL PROVEEDORES"}
              </p>
              <h2 className={styles.cardValueCyan}>
                {countClientes > 0 ? `${countProveedores} / ${countClientes}` : totalContactos}
              </h2>
              <span className={styles.cardTagCyan}>
                {countClientes > 0
                  ? `${countProveedores} prov. · ${countClientes} clientes`
                  : "Aliados comerciales"}
              </span>
            </div>
            <div className={`${styles.iconWrapper} ${styles.iconCyan}`}>
              <Users size={28} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gridRowBottom}>
        <div className={`${styles.card} ${styles.cardTable}`}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <Clock size={20} />
              <h3>Últimos Movimientos</h3>
            </div>
            <button onClick={() => router.push('/historial')} className={styles.linkAction}>Ver Todo</button>
          </div>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>TIPO</th>
                  <th>FECHA</th>
                  <th>CLIENTE/PROVEEDOR</th>
                  <th style={{textAlign: 'right'}}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {ultimosMovimientos.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <span className={`${styles.badge} ${
                        m.tipoTransaccion === 'VENTA'
                          ? styles.badgeSuccess
                          : m.tipoTransaccion === 'INVENTARIO INICIAL'
                          ? styles.badgePrimary
                          : styles.badgeDanger
                      }`}>
                        {m.tipoTransaccion === 'INVENTARIO INICIAL' ? 'INV. INICIAL' : m.tipoTransaccion}
                      </span>
                    </td>
                    <td>{new Date(m.fecha).toLocaleDateString()}</td>
                    <td>{m.razonSocial || 'S/N'}</td>
                    <td style={{textAlign: 'right', fontWeight: '800'}}>
                      Bs. {(m.detalles.reduce((acc, d) => acc + d.subtotal, 0) - m.descuento).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {ultimosMovimientos.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>No hay movimientos recientes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardAlerts}`}>
          <div className={styles.alertHeader}>
            <div className={styles.alertTitle}>
              <AlertTriangle size={18} />
              <h3>Alerta Bajo Stock ({productosBajoStock.length})</h3>
            </div>
            <button onClick={() => router.push('/productos')} className={styles.linkActionWarning}>Ir a Productos</button>
          </div>
          
          <div className={styles.alertContent}>
            {productosBajoStock.length > 0 ? (
              <table className={styles.tableAlert}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th style={{textAlign: 'center'}}>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productosBajoStock.slice(0, 5).map(p => (
                    <tr key={p.codigo}>
                      <td>{p.nombre}</td>
                      <td style={{textAlign: 'center', color: '#ef4444', fontWeight: 'bold'}}>{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.alertSuccess}>
                <CheckCircle2 size={32} color="#22c55e" />
                <p>Todos los productos tienen buen stock.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
