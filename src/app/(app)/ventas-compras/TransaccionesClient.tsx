"use client";
import { useState } from "react";
import { Plus, Eye } from "lucide-react";

export default function TransaccionesClient({ initialTransacciones }: { initialTransacciones: any[] }) {
  const [transacciones, setTransacciones] = useState(initialTransacciones);
  const [tipoFiltro, setTipoFiltro] = useState<string>("TODOS");

  const filtered = transacciones.filter(t => 
    tipoFiltro === "TODOS" ? true : t.tipoTransaccion === tipoFiltro
  );

  return (
    <div className="card glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <select 
          className="input-base" 
          value={tipoFiltro} 
          onChange={e => setTipoFiltro(e.target.value)}
          style={{ maxWidth: '200px', padding: '0.5rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)' }}
        >
          <option value="TODOS">Todas las transacciones</option>
          <option value="VENTA">Ventas</option>
          <option value="COMPRA">Compras</option>
        </select>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}><Plus size={18} /> Nueva Compra</button>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' }}><Plus size={18} /> Nueva Venta</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const total = t.detalles.reduce((acc: number, d: any) => acc + d.subtotal, 0) - t.descuento;
              return (
                <tr key={t.id}>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '1rem', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: t.tipoTransaccion === 'VENTA' ? '#dcfce7' : '#fee2e2',
                      color: t.tipoTransaccion === 'VENTA' ? 'var(--color-success)' : 'var(--color-danger)'
                    }}>
                      {t.tipoTransaccion}
                    </span>
                  </td>
                  <td>{t.documentoRelacionado || '-'}</td>
                  <td style={{ fontWeight: 'bold' }}>Bs. {total.toFixed(2)}</td>
                  <td>{t.estado}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.4rem' }} title="Ver detalles"><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  No se encontraron transacciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
