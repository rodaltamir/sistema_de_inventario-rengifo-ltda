"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Building2, Factory, Truck, Briefcase, Package, User } from "lucide-react";
import { createProveedor, updateProveedor, deleteProveedor } from "./actions";
import Swal from 'sweetalert2';
import styles from "./proveedores.module.css";

const ICON_OPTIONS = [
  { id: 'building', icon: Building2, label: 'Edificio' },
  { id: 'factory', icon: Factory, label: 'Fábrica' },
  { id: 'truck', icon: Truck, label: 'Camión' },
  { id: 'briefcase', icon: Briefcase, label: 'Maletín' },
  { id: 'package', icon: Package, label: 'Paquete' },
  { id: 'user', icon: User, label: 'Persona/Cliente' }
];

export default function ProveedoresClient({ initialProveedores }: { initialProveedores: any[] }) {
  const [proveedores, setProveedores] = useState(initialProveedores);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("TODOS"); // "TODOS", "CLIENTE", "PROVEEDOR"
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    responsable: "",
    telefono: "",
    logo: "building", // default icon
    tipo: "PROVEEDOR"
  });

  const filtered = proveedores.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          p.nit.toLowerCase().includes(search.toLowerCase()) ||
                          (p.responsable && p.responsable.toLowerCase().includes(search.toLowerCase()));
    
    if (filterTipo === "TODOS") return matchesSearch;
    return matchesSearch && p.tipo === filterTipo;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openNewModal = () => {
    setIsEditing(false);
    setEditId("");
    setFormData({
      nombre: "",
      nit: "",
      responsable: "",
      telefono: "",
      logo: "building",
      tipo: filterTipo !== "TODOS" ? filterTipo : "PROVEEDOR", // Pre-seleccionar según pestaña
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setIsEditing(true);
    setEditId(p.id);
    setFormData({
      nombre: p.nombre,
      nit: p.nit,
      responsable: p.responsable || "",
      telefono: p.telefono || "",
      logo: p.logo || "building",
      tipo: p.tipo || "PROVEEDOR"
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "Se eliminará este contacto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteProveedor(id);
        setProveedores(proveedores.filter(p => p.id !== id));
        Swal.fire('¡Eliminado!', 'El contacto ha sido eliminado.', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message || "Error al eliminar contacto", 'error');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        const updated = await updateProveedor(editId, formData);
        setProveedores(proveedores.map(p => p.id === editId ? updated : p));
      } else {
        const newProveedor = await createProveedor(formData);
        setProveedores([newProveedor, ...proveedores]);
      }
      setIsModalOpen(false);
      Swal.fire('¡Éxito!', 'Contacto guardado correctamente', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || "Error al guardar contacto", 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconId: string) => {
    const option = ICON_OPTIONS.find(o => o.id === iconId) || ICON_OPTIONS[0];
    const IconComponent = option.icon;
    return (
      <div className={styles.providerIcon}>
        <IconComponent size={20} />
      </div>
    );
  };

  return (
    <>
      {/* Pestañas de Filtro */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <button 
          onClick={() => setFilterTipo('TODOS')}
          style={{ 
            padding: '0.75rem 1rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: filterTipo === 'TODOS' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: filterTipo === 'TODOS' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: filterTipo === 'TODOS' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Todos
        </button>
        <button 
          onClick={() => setFilterTipo('CLIENTE')}
          style={{ 
            padding: '0.75rem 1rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: filterTipo === 'CLIENTE' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: filterTipo === 'CLIENTE' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: filterTipo === 'CLIENTE' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Clientes
        </button>
        <button 
          onClick={() => setFilterTipo('PROVEEDOR')}
          style={{ 
            padding: '0.75rem 1rem', 
            background: 'none', 
            border: 'none', 
            borderBottom: filterTipo === 'PROVEEDOR' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: filterTipo === 'PROVEEDOR' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: filterTipo === 'PROVEEDOR' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Proveedores
        </button>
      </div>

      <div className="card glass">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar por nombre, NIT o responsable..." 
            style={{ maxWidth: '300px' }} 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNewModal}>
            <Plus size={18} /> Nuevo Contacto
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>LOGO</th>
                <th>TIPO</th>
                <th>NOMBRE / RAZÓN SOCIAL</th>
                <th>NIT / CI</th>
                <th>RESPONSABLE</th>
                <th>TELÉFONO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{renderIcon(p.logo || 'building')}</td>
                  <td>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      background: p.tipo === 'CLIENTE' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: p.tipo === 'CLIENTE' ? '#3b82f6' : '#10b981'
                    }}>
                      {p.tipo === 'CLIENTE' ? 'Cliente' : 'Proveedor'}
                    </span>
                  </td>
                  <td style={{fontWeight: '600'}}>{p.nombre}</td>
                  <td>{p.nit}</td>
                  <td>{p.responsable || '-'}</td>
                  <td>{p.telefono || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.4rem' }} title="Editar" onClick={() => openEditModal(p)}><Edit size={16} /></button>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }} title="Eliminar" onClick={() => handleDelete(p.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                    No se encontraron contactos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo/Editar Contacto */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Building2 size={20} /> {isEditing ? "Editar Contacto" : "Nuevo Contacto"}
              </h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.formLabel}>Tipo de Contacto *</label>
                    <select 
                      name="tipo" 
                      className={styles.formInput}
                      value={formData.tipo}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="PROVEEDOR">Proveedor</option>
                      <option value="CLIENTE">Cliente</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre / Razón Social *</label>
                    <input 
                      required
                      type="text" 
                      name="nombre"
                      className={styles.formInput} 
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>NIT / CI *</label>
                    <input 
                      required
                      type="text" 
                      name="nit"
                      className={styles.formInput} 
                      value={formData.nit}
                      onChange={handleInputChange}
                    />
                  </div>

                  {formData.tipo !== 'CLIENTE' && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Responsable (Opcional)</label>
                      <input 
                        type="text" 
                        name="responsable"
                        className={styles.formInput} 
                        placeholder="Nombre del contacto principal"
                        value={formData.responsable}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Número de teléfono (Opcional)</label>
                    <input 
                      type="text" 
                      name="telefono"
                      className={styles.formInput} 
                      placeholder="Ej. +591 70012345"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.formLabel}>Icono</label>
                    <div className={styles.iconGrid}>
                      {ICON_OPTIONS.map((option) => {
                        const IconComponent = option.icon;
                        const isSelected = formData.logo === option.id;
                        return (
                          <div 
                            key={option.id}
                            className={`${styles.iconOption} ${isSelected ? styles.iconOptionSelected : ''}`}
                            onClick={() => setFormData({ ...formData, logo: option.id })}
                            title={option.label}
                          >
                            <IconComponent size={24} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSave} disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Contacto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
