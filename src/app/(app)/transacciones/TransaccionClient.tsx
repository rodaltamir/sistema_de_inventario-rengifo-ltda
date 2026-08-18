"use client";

import { useState } from "react";
import { ShoppingCart, Download, FileText, Plus, Trash2, Calculator } from "lucide-react";
import { procesarTransaccion } from "./actions";
import { createProveedor } from "../proveedores/actions";
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

  const handleNitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNitCi(val);
    if (sinFactura) return;
    
    // Autocompletado si encuentra
    const match = proveedores.find(p => p.nit === val && p.tipo === (modo === 'VENTA' ? 'CLIENTE' : 'PROVEEDOR'));
    if (match) setRazonSocial(match.nombre);
  };

  const handleRazonSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRazonSocial(val);
    if (sinFactura) return;

    // Autocompletado si encuentra
    const match = proveedores.find(p => p.nombre.toLowerCase() === val.toLowerCase() && p.tipo === (modo === 'VENTA' ? 'CLIENTE' : 'PROVEEDOR'));
    if (match) setNitCi(match.nit);
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

  const resetForm = () => {
    setNroDocumento("");
    setDetalles([{ id: Date.now(), productoCodigo: "", cantidad: 1, precioUnitario: 0 }]);
    setDescuento("");
    setAbonoInicial("");
    setSinFactura(false);
    setNitCi("");
    setRazonSocial("");
    setObservaciones("");
  };

  const preguntarGuardarContacto = async () => {
    if (sinFactura || !nitCi || !razonSocial || nitCi === "0" || razonSocial === "S/N") return;

    // Ver si ya existe
    const exists = proveedores.some(p => p.nit === nitCi);
    if (exists) return; // Si ya existe, no preguntamos

    const tipoContacto = modo === "VENTA" ? "Cliente" : "Proveedor";
    const result = await Swal.fire({
      title: `¿Guardar ${tipoContacto}?`,
      text: `El ${tipoContacto.toLowerCase()} "${razonSocial}" (NIT: ${nitCi}) no está guardado. ¿Desea guardarlo para futuras transacciones?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, gracias'
    });

    if (result.isConfirmed) {
      try {
        await createProveedor({
          nombre: razonSocial,
          nit: nitCi,
          tipo: modo === "VENTA" ? "CLIENTE" : "PROVEEDOR",
          logo: modo === "VENTA" ? "user" : "truck"
        });
        Swal.fire('Guardado', `${tipoContacto} guardado con éxito.`, 'success');
        // NOTA: Para que el nuevo cliente aparezca instantáneamente en la lista actual 
        // sin recargar, tendríamos que actualizar el estado 'proveedores', pero como 
        // viene por props en este caso simple haremos un reload o dejaremos que 
        // la navegación futura lo recargue.
      } catch (e: any) {
        Swal.fire('Error', `No se pudo guardar el ${tipoContacto.toLowerCase()}: ${e.message}`, 'error');
      }
    }
  };

  const calcularDIM = async (detalleId: number) => {
    const { value: formValues } = await Swal.fire({
      title: '<strong>Calcular DIM</strong>',
      html: `
        <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 15px;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 6px; text-transform: uppercase;">Importe Total a Pagar</label>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 11px; color: #f97316; font-weight: bold;">Bs.</span>
              <input id="swal-importe" type="number" step="0.01" placeholder="Ej. 1000" style="width: 100%; padding: 12px 12px 12px 40px; box-sizing: border-box; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 1rem; color: #1e293b; outline: none; transition: all 0.2s;" onfocus="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 0 3px rgba(249, 115, 22, 0.1)';" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
            </div>
          </div>
          
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 6px; text-transform: uppercase;">Cantidad / Stock a Ingresar</label>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 11px; color: #f97316;">📦</span>
              <input id="swal-cantidad" type="number" step="1" placeholder="Ej. 50" style="width: 100%; padding: 12px 12px 12px 40px; box-sizing: border-box; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 1rem; color: #1e293b; outline: none; transition: all 0.2s;" onfocus="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 0 3px rgba(249, 115, 22, 0.1)';" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: '✔ Aplicar Cálculo',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const importe = (document.getElementById('swal-importe') as HTMLInputElement).value;
        const cantidad = (document.getElementById('swal-cantidad') as HTMLInputElement).value;
        if (!importe || !cantidad || Number(cantidad) <= 0) {
          Swal.showValidationMessage('Debe ingresar un importe válido y una cantidad mayor a cero');
          return false;
        }
        return { importe: Number(importe), cantidad: Number(cantidad) };
      }
    });

    if (formValues) {
      const { importe, cantidad } = formValues;
      // Lógica solicitada: importe dividido entre 0.13, luego dividido entre cantidad
      const intermedio = importe / 0.13;
      const precioUnitario = intermedio / cantidad;

      // Actualizar la fila correspondiente
      setDetalles(prev => prev.map(d => {
        if (d.id === detalleId) {
          return { ...d, cantidad: cantidad, precioUnitario: precioUnitario.toFixed(2) };
        }
        return d;
      }));

      Swal.fire({
        title: '¡DIM Aplicado!',
        html: `
          <div style="font-size: 1rem; color: #475569; margin-top: 10px;">
            <p>Se actualizó la fila con:</p>
            <p><strong>Cantidad:</strong> ${cantidad} unidades</p>
            <p><strong>Precio Unitario:</strong> <span style="color: #f97316; font-size: 1.2rem; font-weight: bold;">Bs. ${precioUnitario.toFixed(2)}</span></p>
          </div>
        `,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    }
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

      await Swal.fire('¡Éxito!', '¡Transacción procesada con éxito! El stock ha sido actualizado.', 'success');
      
      // Preguntar si quiere guardar cliente/proveedor
      await preguntarGuardarContacto();

      // Reset form
      resetForm();
    } catch (err: any) {
      Swal.fire('Error', err.message || "Error al procesar la transacción.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const clientesList = proveedores.filter(p => p.tipo === 'CLIENTE');
  const proveedoresList = proveedores.filter(p => p.tipo === 'PROVEEDOR');

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
              <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={sinFactura} onChange={handleSinFacturaChange} />
                Sin factura / Sin nombre
              </label>
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
                <label className={styles.formLabel}>Número de Factura / Doc.</label>
                <input type="text" className={styles.formInput} value={nroDocumento} onChange={e => setNroDocumento(e.target.value)} placeholder="DOC-128232" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Fecha</label>
                <input type="date" className={styles.formInput} value={fecha} onChange={e => setFecha(e.target.value)} />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>NIT / CI del {modo === "VENTA" ? "Cliente" : "Proveedor"}</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  value={nitCi} 
                  onChange={handleNitChange} 
                  disabled={sinFactura} 
                  placeholder="Ej: 1234567" 
                  list="nits-list"
                />
                <datalist id="nits-list">
                  {(modo === 'VENTA' ? clientesList : proveedoresList).map(c => (
                    <option key={c.id} value={c.nit}>{c.nombre}</option>
                  ))}
                </datalist>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre / Razón Social</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  value={razonSocial} 
                  onChange={handleRazonSocialChange} 
                  disabled={sinFactura} 
                  placeholder="Ej: Juan Perez" 
                  list="nombres-list"
                />
                <datalist id="nombres-list">
                  {(modo === 'VENTA' ? clientesList : proveedoresList).map(c => (
                    <option key={c.id} value={c.nombre}>{c.nit}</option>
                  ))}
                </datalist>
              </div>

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
                      />
                      {modo === "COMPRA" && (
                        <button
                          type="button"
                          onClick={() => calcularDIM(d.id)}
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.35rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.3rem',
                            background: '#fff7ed',
                            color: '#ea580c',
                            border: '1px solid #fed7aa',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = '#ffedd5'; e.currentTarget.style.borderColor = '#fdba74'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = '#fff7ed'; e.currentTarget.style.borderColor = '#fed7aa'; }}
                        >
                          <Calculator size={14} /> Calcular DIM
                        </button>
                      )}
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
                    resetForm();
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
