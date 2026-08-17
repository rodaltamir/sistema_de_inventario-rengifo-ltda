"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Building2, Factory, Truck, Briefcase, Package } from "lucide-react";
import { createProveedor, updateProveedor, deleteProveedor } from "./actions";
import Swal from 'sweetalert2';
import styles from "./proveedores.module.css";

const ICON_OPTIONS = [
  { id: 'building', icon: Building2, label: 'Edificio' },
  { id: 'factory', icon: Factory, label: 'Fábrica' },
  { id: 'truck', icon: Truck, label: 'Camión' },
  { id: 'briefcase', icon: Briefcase, label: 'Maletín' },
  { id: 'package', icon: Package, label: 'Paquete' }
];

export default function ProveedoresClient({ initialProveedores }: { initialProveedores: any[] }) {
  const [proveedores, setProveedores] = useState(initialProveedores);
  const [search, setSearch] = useState("");
  
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
  });

  const filtered = proveedores.filter(p => 
    p.nombre.toLowerCase().includes(search.toLowerCase()) || 
    p.nit.toLowerCase().includes(search.toLowerCase()) ||
    (p.responsable && p.responsable.toLowerCase().includes(search.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "Se eliminará este proveedor (soft delete).",
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
        Swal.fire('¡Eliminado!', 'El proveedor ha sido eliminado.', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message || "Error al eliminar proveedor", 'error');
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
      Swal.fire('¡Éxito!', 'Proveedor guardado correctamente', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || "Error al guardar proveedor", 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper to render icon
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
            <Plus size={18} /> Nuevo Proveedor
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>LOGO</th>
                <th>NOMBRE / RAZÓN SOCIAL</th>
                <th>NIT</th>
                <th>RESPONSABLE</th>
                <th>TELÉFONO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{renderIcon(p.logo || 'building')}</td>
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
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                    No se encontraron proveedores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo/Editar Proveedor */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Building2 size={20} /> {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
              </h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                
                <div className={styles.formGrid}>
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
                    <label className={styles.formLabel}>NIT *</label>
                    <input 
                      required
                      type="text" 
                      name="nit"
                      className={styles.formInput} 
                      value={formData.nit}
                      onChange={handleInputChange}
                    />
                  </div>

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
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Icono del Proveedor</label>
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
                  {loading ? "Guardando..." : "Guardar Proveedor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
