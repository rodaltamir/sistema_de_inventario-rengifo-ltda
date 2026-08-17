"use client";

import { useState } from "react";
import { CheckCircle2, ArrowUpRight, ArrowDownRight, Clock, FileText, X } from "lucide-react";
import { registrarAbono } from "./actions";
import styles from "./creditos.module.css";

export default function CreditosClient({ deudas }: { deudas: any[] }) {
  const [tab, setTab] = useState<"COBRAR" | "PAGAR">("COBRAR");
  
  // Abonar Modal State
  const [isAbonoModalOpen, setIsAbonoModalOpen] = useState(false);
  const [selectedDeuda, setSelectedDeuda] = useState<any>(null);
  const [montoAbono, setMontoAbono] = useState<string | number>("");
  const [obsAbono, setObsAbono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // History Modal State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const filterDeudas = (tipo: "VENTA" | "COMPRA", pagado: boolean) => {
    return deudas.filter(d => 
      d.tipoTransaccion === tipo && 
      (pagado ? d.deudaCredito.estado === "PAGADO" : d.deudaCredito.estado === "PENDIENTE")
    );
  };

  const cobrarPendientes = filterDeudas("VENTA", false);
  const cobrarPagadas = filterDeudas("VENTA", true);
  
  const pagarPendientes = filterDeudas("COMPRA", false);
  const pagarPagadas = filterDeudas("COMPRA", true);

  const currentPendientes = tab === "COBRAR" ? cobrarPendientes : pagarPendientes;
  const currentPagadas = tab === "COBRAR" ? cobrarPagadas : pagarPagadas;

  const openAbonoModal = (deuda: any) => {
    setSelectedDeuda(deuda);
    setMontoAbono("");
    setObsAbono("");
    setError("");
    setIsAbonoModalOpen(true);
  };

  const openHistoryModal = (deuda: any) => {
    setSelectedDeuda(deuda);
    setIsHistoryModalOpen(true);
  };

  const handleAbonar = async () => {
    setError("");
    const monto = parseFloat(montoAbono as string);
    if (isNaN(monto) || monto <= 0) return setError("El monto debe ser mayor a 0");
    if (monto > selectedDeuda.deudaCredito.saldoPendiente) {
      return setError(`No puedes abonar más del saldo pendiente (Bs. ${selectedDeuda.deudaCredito.saldoPendiente.toFixed(2)})`);
    }

    setLoading(true);
    try {
      await registrarAbono(selectedDeuda.id, monto, obsAbono);
      setIsAbonoModalOpen(false);
      // Data will refresh via revalidatePath
    } catch (err: any) {
      setError(err.message || "Error al registrar el abono");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cuentas por Cobrar y Pagar</h1>
        <p className={styles.subtitle}>Gestión de créditos, deudas y registro de abonos</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${tab === "COBRAR" ? styles.tabBtnCobrar : ""} ${tab === "COBRAR" ? styles.active : ""}`}
          onClick={() => setTab("COBRAR")}
        >
          <CheckCircle2 size={18} /> Cuentas por Cobrar (Ventas)
        </button>
        <button 
          className={`${styles.tabBtn} ${tab === "PAGAR" ? styles.tabBtnPagar : ""} ${tab === "PAGAR" ? styles.active : ""}`}
          onClick={() => setTab("PAGAR")}
        >
          <ArrowUpRight size={18} /> Cuentas por Pagar (Compras)
        </button>
      </div>

      <div className={styles.sectionBox}>
        <div className={styles.sectionHeaderRed}>
          Pendientes de {tab === "COBRAR" ? "Cobro" : "Pago"}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>N° Factura</th>
              <th>Cliente / Proveedor</th>
              <th>Total (Bs.)</th>
              <th>Pagado (Bs.)</th>
              <th>Saldo Pendiente</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentPendientes.map(d => {
              const total = d.deudaCredito.montoTotal;
              const pendiente = d.deudaCredito.saldoPendiente;
              const pagado = total - pendiente;
              return (
                <tr key={d.id}>
                  <td>{new Date(d.fecha).toLocaleDateString()}</td>
                  <td style={{fontWeight: '700'}}>{d.nroDocumento}</td>
                  <td>
                    {d.razonSocial}<br/>
                    <small style={{color: '#6b7280'}}>NIT/CI: {d.nitCi}</small>
                  </td>
                  <td style={{fontWeight: '700'}}>{total.toFixed(2)}</td>
                  <td style={{color: '#15803d'}}>{pagado.toFixed(2)}</td>
                  <td style={{color: '#b91c1c', fontWeight: '700'}}>{pendiente.toFixed(2)}</td>
                  <td><span className={styles.statusBadgeRed}>Por {tab === "COBRAR" ? "Cobrar" : "Pagar"}</span></td>
                  <td>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      <button className={styles.btnOrange} onClick={() => openAbonoModal(d)}>
                        <FileText size={16} /> Abonar
                      </button>
                      <button className={styles.btnOutline} onClick={() => openHistoryModal(d)}>
                        <Clock size={16} /> Historial
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {currentPendientes.length === 0 && (
              <tr><td colSpan={8} style={{textAlign: 'center'}}>No hay cuentas pendientes.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.sectionBox}>
        <div className={styles.sectionHeaderGreen}>
          <CheckCircle2 size={18} /> Cuentas Finalizadas (Pagadas en su totalidad)
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>N° Factura</th>
              <th>Cliente / Proveedor</th>
              <th>Total (Bs.)</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentPagadas.map(d => (
              <tr key={d.id} className={styles.rowCompleted}>
                <td>{new Date(d.fecha).toLocaleDateString()}</td>
                <td style={{fontWeight: '700'}}>{d.nroDocumento}</td>
                <td>
                  {d.razonSocial}<br/>
                  <small style={{color: '#6b7280'}}>NIT/CI: {d.nitCi}</small>
                </td>
                <td style={{fontWeight: '700'}}>{d.deudaCredito.montoTotal.toFixed(2)}</td>
                <td><span className={styles.statusBadgeGreen}>Finalizado</span></td>
                <td>
                  <button className={styles.btnOutline} onClick={() => openHistoryModal(d)}>
                    <Clock size={16} /> Ver Historial
                  </button>
                </td>
              </tr>
            ))}
            {currentPagadas.length === 0 && (
              <tr><td colSpan={6} style={{textAlign: 'center'}}>No hay cuentas finalizadas.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Abonar */}
      {isAbonoModalOpen && selectedDeuda && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>Registrar Nuevo Abono</h2>
              <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setIsAbonoModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
              <div className={styles.inputGroup}>
                <label>Saldo Pendiente (Bs.)</label>
                <input type="text" value={selectedDeuda.deudaCredito.saldoPendiente.toFixed(2)} disabled style={{ background: '#f3f4f6', fontWeight: 'bold' }} />
              </div>
              <div className={styles.inputGroup}>
                <label>Monto a Abonar (Bs.)</label>
                <input type="number" min="0.01" step="0.01" value={montoAbono} onChange={e => setMontoAbono(e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Observaciones / Método</label>
                <input type="text" value={obsAbono} onChange={e => setObsAbono(e.target.value)} placeholder="Ej: Efectivo, Transferencia QR..." />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsAbonoModalOpen(false)}>Cancelar</button>
              <button className={styles.btnOrange} onClick={handleAbonar} disabled={loading}>
                {loading ? "Procesando..." : "Confirmar Abono"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Historial Detallado */}
      {isHistoryModalOpen && selectedDeuda && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeaderTitle}>
                <FileText size={20} /> Historial de Pagos (Factura Detallada)
              </h2>
              <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setIsHistoryModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.historyHeaderInfo}>
                <div>
                  <div style={{color: 'var(--color-text-muted)', fontSize: '0.875rem'}}>Transacción / Factura N°</div>
                  <div style={{fontSize: '1.25rem', fontWeight: '800'}}>{selectedDeuda.nroDocumento}</div>
                  
                  <div style={{color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '1rem'}}>Fecha de Emisión</div>
                  <div style={{fontWeight: '600'}}>{new Date(selectedDeuda.fecha).toLocaleDateString()}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{color: 'var(--color-text-muted)', fontSize: '0.875rem'}}>Cliente / Proveedor</div>
                  <div style={{fontSize: '1.1rem', fontWeight: '800'}}>{selectedDeuda.razonSocial}</div>
                  <div style={{color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem'}}>NIT/CI: {selectedDeuda.nitCi}</div>
                  {selectedDeuda.deudaCredito.estado === "PAGADO" ? (
                    <span className={styles.statusBadgeGreen}>COMPLETADA</span>
                  ) : (
                    <span style={{background: '#facc15', color: '#854d0e', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold'}}>
                      <Clock size={12} style={{display: 'inline', marginRight: '4px'}}/> PENDIENTE
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.metricsBox}>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>Monto Total</div>
                  <div className={styles.metricValue}>Bs. {selectedDeuda.deudaCredito.montoTotal.toFixed(2)}</div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>Total Abonado</div>
                  <div className={styles.metricValue} style={{color: '#15803d'}}>Bs. {(selectedDeuda.deudaCredito.montoTotal - selectedDeuda.deudaCredito.saldoPendiente).toFixed(2)}</div>
                </div>
                <div className={styles.metricItem}>
                  <div className={styles.metricLabel}>Saldo Pendiente</div>
                  <div className={styles.metricValue} style={{color: '#b91c1c'}}>Bs. {selectedDeuda.deudaCredito.saldoPendiente.toFixed(2)}</div>
                </div>
              </div>

              <div style={{fontWeight: '700', marginBottom: '0.5rem'}}>Detalle de Pagos Realizados</div>
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th style={{width: '30px'}}>#</th>
                    <th>Fecha</th>
                    <th style={{textAlign: 'right'}}>Monto Abonado (Bs.)</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDeuda.pagos.map((p: any, i: number) => (
                    <tr key={p.id}>
                      <td style={{fontWeight: 'bold'}}>{i + 1}</td>
                      <td>{new Date(p.fecha).toLocaleDateString()}</td>
                      <td style={{textAlign: 'right', color: '#15803d', fontWeight: '700'}}>{p.monto.toFixed(2)}</td>
                      <td>{p.observaciones}</td>
                    </tr>
                  ))}
                  {selectedDeuda.pagos.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign: 'center'}}>No hay pagos registrados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} style={{background: '#6b7280', color: 'white', border: 'none'}} onClick={() => setIsHistoryModalOpen(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
