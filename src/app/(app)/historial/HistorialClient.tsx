"use client";

import { useState } from "react";
import { Search, ShoppingCart, Download, Eye, X } from "lucide-react";
import styles from "./historial.module.css";

export default function HistorialClient({ transacciones }: { transacciones: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const filteredTransacciones = transacciones.filter(tx => 
    tx.nroDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.nitCi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Historial General de Transacciones</h1>
          <p className={styles.subtitle}>Listado completo de ventas y compras realizadas en el sistema</p>
        </div>
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
            {filteredTransacciones.map(tx => {
              const total = tx.detalles.reduce((acc: number, d: any) => acc + d.subtotal, 0) - tx.descuento;
              return (
                <tr key={tx.id}>
                  <td>{new Date(tx.fecha).toLocaleDateString()}</td>
                  <td>
                    {tx.tipoTransaccion === "VENTA" ? (
                      <span className={styles.badgeVenta}><ShoppingCart size={14}/> VENTA</span>
                    ) : (
                      <span className={styles.badgeCompra}><Download size={14}/> COMPRA</span>
                    )}
                  </td>
                  <td style={{fontWeight: 'bold'}}>{tx.nroDocumento}</td>
                  <td>{tx.razonSocial}</td>
                  <td>{tx.nitCi}</td>
                  <td>
                    <span className={styles.badgePayment}>{tx.formaPago}</span>
                  </td>
                  <td style={{fontWeight: 'bold'}}>Bs. {total.toFixed(2)}</td>
                  <td>
                    <button className={styles.btnView} onClick={() => setSelectedTx(tx)}>
                      <Eye size={16} /> Ver Items
                    </button>
                  </td>
                </tr>
              )
            })}
            {filteredTransacciones.length === 0 && (
              <tr>
                <td colSpan={8} style={{textAlign: 'center'}}>No se encontraron transacciones.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTx && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>
                Detalle de Factura {selectedTx.nroDocumento}
              </h2>
              <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setSelectedTx(null)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{marginBottom: '1rem'}}>
                <strong>{selectedTx.tipoTransaccion === "VENTA" ? "Cliente: " : "Proveedor: "}</strong> {selectedTx.razonSocial} <br/>
                <strong>NIT/CI: </strong> {selectedTx.nitCi} <br/>
                <strong>Forma de Pago: </strong> {selectedTx.formaPago} <br/>
                <strong>Fecha: </strong> {new Date(selectedTx.fecha).toLocaleDateString()}
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
                      <td>{d.producto?.nombre || 'Producto Desconocido'}</td>
                      <td>{d.cantidad}</td>
                      <td>{d.precioUnitario.toFixed(2)}</td>
                      <td style={{fontWeight: 'bold'}}>{d.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{textAlign: 'right', marginTop: '1rem', fontSize: '1.1rem'}}>
                <div><strong>Descuento: </strong> Bs. {selectedTx.descuento.toFixed(2)}</div>
                <div style={{fontSize: '1.25rem', color: '#16a34a', marginTop: '0.5rem'}}>
                  <strong>Total Pagado/Deuda: </strong> Bs. {(selectedTx.detalles.reduce((acc: number, d: any) => acc + d.subtotal, 0) - selectedTx.descuento).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
