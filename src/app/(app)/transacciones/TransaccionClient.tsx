"use client";

import { useState } from "react";
import { ShoppingCart, Download, FileText, Plus, Trash2 } from "lucide-react";
import { procesarTransaccion } from "./actions";
import Swal from 'sweetalert2';
import styles from "./transacciones.module.css";

export default function TransaccionClient({ 
  productos, 
  proveedores 
}: { 
  productos: any[], 
  proveedores: any[] 
}) {
  const [modo, setModo] = useState<"VENTA" | "COMPRA">("VENTA");
  
  // General Data
  const [nroDocumento, setNroDocumento] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [nitCi, setNitCi] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [formaPago, setFormaPago] = useState("EFECTIVO");
  const [observaciones, setObservaciones] = useState("");
  const [sinFactura, setSinFactura] = useState(false);
  
  const [descuento, setDescuento] = useState<string | number>("");
  const [abonoInicial, setAbonoInicial] = useState<string | number>("");
  
  // Details
  const [detalles, setDetalles] = useState<Array<{ id: number; productoCodigo: string; cantidad: string | number; precioUnitario: string | number }>>([
    { id: 1, productoCodigo: "", cantidad: 1, precioUnitario: 0 }
  ]);

  const [loading, setLoading] = useState(false);

  // Computed totals
  const subtotalNeto = detalles.reduce((acc, curr) => acc + ((Number(curr.cantidad) || 0) * (Number(curr.precioUnitario) || 0)), 0);
  const totalGeneral = subtotalNeto - (Number(descuento) || 0);

  const handleProveedorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provId = e.target.value;
    const prov = proveedores.find(p => p.id === provId);
    if (prov) {
      setRazonSocial(prov.nombre);
      setNitCi(prov.nit);
    } else {
      setRazonSocial("");
      setNitCi("");
    }
  };

  const handleSinFacturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSinFactura(checked);
    if (checked) {
      setNitCi("0");
      setRazonSocial("S/N");
    } else {
      setNitCi("");
      setRazonSocial("");
    }
  };

  const agregarFila = () => {
    setDetalles([...detalles, { id: Date.now(), productoCodigo: "", cantidad: 1, precioUnitario: 0 }]);
  };

  const eliminarFila = (id: number) => {
    if (detalles.length === 1) return;
    setDetalles(detalles.filter(d => d.id !== id));
  };

  const updateDetalle = (id: number, field: string, value: any) => {
    setDetalles(detalles.map(d => {
      if (d.id === id) {
        const newData = { ...d, [field]: value };
        if (field === "productoCodigo" && modo === "VENTA") {
          const prod = productos.find(p => p.codigo === value);
          if (prod) newData.precioUnitario = prod.precioVenta;
        }
        if (field === "productoCodigo" && modo === "COMPRA") {
          const prod = productos.find(p => p.codigo === value);
          if (prod) newData.precioUnitario = prod.costo;
        }
        return newData;
      }
      return d;
    }));
  };

  const handleSubmit = async () => {
    if (!nroDocumento) return Swal.fire('Error', "El número de documento es requerido.", 'warning');
    if (!razonSocial || !nitCi) return Swal.fire('Error', "NIT y Razón Social son requeridos.", 'warning');
    if (detalles.some(d => !d.productoCodigo)) return Swal.fire('Error', "Todas las filas deben tener un producto seleccionado.", 'warning');
    if (detalles.some(d => Number(d.cantidad) <= 0)) return Swal.fire('Error', "Las cantidades deben ser mayores a cero.", 'warning');

    if (formaPago === "CREDITO" && (Number(abonoInicial) || 0) > totalGeneral) {
      return Swal.fire('Error', "El abono inicial no puede ser mayor al total general.", 'warning');
    }

    // Stock validation check in UI
    if (modo === "VENTA") {
      for (const d of detalles) {
        const p = productos.find(prod => prod.codigo === d.productoCodigo);
        if (p && p.stock < Number(d.cantidad)) {
          return Swal.fire('Error', `El producto ${p.nombre} no tiene suficiente stock (${p.stock} disponibles).`, 'warning');
        }
      }
    }

    // UI State for rendering is removed, we'll use Swal directly
    setLoading(true);
    try {
      await procesarTransaccion({
        tipoTransaccion: modo,
        nroDocumento,
        fecha,
        nitCi,
        razonSocial,
        formaPago,
        descuento: Number(descuento) || 0,
        abonoInicial: Number(abonoInicial) || 0,
        observaciones,
        detalles: detalles.map(d => ({
          productoCodigo: d.productoCodigo,
          cantidad: Number(d.cantidad) || 0,
          precioUnitario: Number(d.precioUnitario) || 0,
          subtotal: (Number(d.cantidad) || 0) * (Number(d.precioUnitario) || 0)
        }))
      });

      Swal.fire('¡Éxito!', '¡Transacción procesada con éxito! El stock ha sido actualizado.', 'success');
      
      // Reset form
      setNroDocumento("");
      setDetalles([{ id: Date.now(), productoCodigo: "", cantidad: 1, precioUnitario: 0 }]);
      setDescuento("");
      setAbonoInicial("");
      setSinFactura(false);
      setNitCi("");
      setRazonSocial("");
      setObservaciones("");
    } catch (err: any) {
      Swal.fire('Error', err.message || "Error al procesar la transacción.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <ShoppingCart size={24} /> Módulo Transaccional Híbrido
            </h1>
            <p className={styles.subtitle}>Registra compras y ventas con actualización de stock en tiempo real</p>
          </div>
          
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleBtn} ${modo === "VENTA" ? styles.ventaActive : styles.inactive}`}
              onClick={() => { setModo("VENTA"); setSinFactura(false); setNitCi(""); setRazonSocial(""); }}
            >
              <ShoppingCart size={18} /> REGISTRAR VENTA
            </button>
            <button 
              className={`${styles.toggleBtn} ${modo === "COMPRA" ? styles.compraActive : styles.inactive}`}
              onClick={() => { setModo("COMPRA"); setSinFactura(false); setNitCi(""); setRazonSocial(""); }}
            >
              <Download size={18} /> REGISTRAR COMPRA
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FileText size={18} /> Datos de Factura / {modo === "VENTA" ? "Venta" : "Compra"}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {modo === "VENTA" && (
                <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={sinFactura} onChange={handleSinFacturaChange} />
                  Sin factura
                </label>
              )}
              <span style={{ 
                border: `1px solid ${modo === 'VENTA' ? 'var(--color-primary)' : '#3b82f6'}`,
                color: modo === 'VENTA' ? 'var(--color-primary)' : '#3b82f6',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                MODO: {modo}
              </span>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Número de Factura</label>
                <input type="text" className={styles.formInput} value={nroDocumento} onChange={e => setNroDocumento(e.target.value)} placeholder="DOC-128232" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Fecha</label>
                <input type="date" className={styles.formInput} value={fecha} onChange={e => setFecha(e.target.value)} />
              </div>
              
              {modo === "VENTA" ? (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>NIT / CI</label>
                    <input type="text" className={styles.formInput} value={nitCi} onChange={e => setNitCi(e.target.value)} disabled={sinFactura} placeholder="Ej: 1234567" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre / Razón Social</label>
                    <input type="text" className={styles.formInput} value={razonSocial} onChange={e => setRazonSocial(e.target.value)} disabled={sinFactura} placeholder="Ej: Juan Perez" />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Proveedor</label>
                    <select className={styles.formSelect} onChange={handleProveedorChange} defaultValue="">
                      <option value="" disabled>Seleccione un proveedor</option>
                      {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>
            
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <ShoppingCart size={18} /> Detalles de {modo === "VENTA" ? "Venta" : "Compra"}
            </div>
            <button className="btn btn-primary" onClick={agregarFila} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
              <Plus size={16} /> Agregar Producto
            </button>
          </div>
          <div className={styles.sectionBody} style={{ padding: 0, overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario (Bs)</th>
                  <th>Subtotal (Bs)</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <select 
                        className={styles.formSelect} 
                        value={d.productoCodigo} 
                        onChange={(e) => updateDetalle(d.id, "productoCodigo", e.target.value)}
                      >
                        <option value="" disabled>Seleccione un producto...</option>
                        {productos.map(p => (
                          <option key={p.codigo} value={p.codigo}>{p.nombre} ({p.codigo}) - Stock: {p.stock}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className={styles.formInput} 
                        value={d.cantidad} 
                        onChange={(e) => updateDetalle(d.id, "cantidad", e.target.value)}
                        min="1"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className={styles.formInput} 
                        value={d.precioUnitario} 
                        onChange={(e) => updateDetalle(d.id, "precioUnitario", e.target.value)}
                        step="0.01"
                        min="0"
                        disabled={modo === "VENTA"}
                      />
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {((Number(d.cantidad) || 0) * (Number(d.precioUnitario) || 0)).toFixed(2)}
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => eliminarFila(d.id)}
                        style={{ padding: '0.25rem' }}
                        title="Eliminar fila"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FileText size={18} /> Resumen y Pago
            </div>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.totalsGrid}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Forma de Pago</label>
                  <select className={styles.formSelect} value={formaPago} onChange={e => setFormaPago(e.target.value)}>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="TARJETA">Tarjeta</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                    <option value="CREDITO">Crédito</option>
                  </select>
                </div>
                {formaPago === "CREDITO" && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Abono Inicial (Bs)</label>
                    <input type="number" className={styles.formInput} value={abonoInicial} onChange={e => setAbonoInicial(e.target.value)} min="0" step="0.01" />
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Descuento (Bs)</label>
                  <input type="number" className={styles.formInput} value={descuento} onChange={e => setDescuento(e.target.value)} min="0" step="0.01" />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.formLabel}>Observaciones</label>
                  <input type="text" className={styles.formInput} value={observaciones} onChange={e => setObservaciones(e.target.value)} placeholder="Notas adicionales..." />
                </div>
              </div>
              
              <div className={styles.totalsCard}>
                <div className={styles.totalRow}>
                  <span>SUBTOTAL:</span>
                  <span>Bs. {subtotalNeto.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span style={{ color: 'var(--color-danger)' }}>DESCUENTO:</span>
                  <strong style={{ color: 'var(--color-danger)' }}>Bs. {(Number(descuento) || 0).toFixed(2)}</strong>
                </div>
                <div className={`${styles.totalGeneral} ${modo === 'VENTA' ? styles.venta : styles.compra}`}>
                  <span>TOTAL GENERAL:</span>
                  <span>Bs. {totalGeneral.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                Swal.fire({
                  title: '¿Limpiar formulario?',
                  text: '¿Seguro que desea limpiar todo el formulario?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Sí, limpiar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }}
            >
              Cancelar
            </button>
          <button 
            className={modo === 'VENTA' ? styles.btnProcesarVenta : styles.btnProcesarCompra}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "PROCESANDO..." : "✔ PROCESAR TRANSACCIÓN"}
          </button>
        </div>
      </div>
    </>
  );
}
