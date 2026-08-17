"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import styles from "./select.module.css";
import { 
  Building, Plus, Package, Store, Factory, ShoppingCart, 
  Coffee, Laptop, Briefcase, Camera, Music, Book, Edit2, Trash2, Upload, Search
} from "lucide-react";
import Swal from 'sweetalert2';

const ICON_OPTIONS = [
  { name: 'Building', icon: Building },
  { name: 'Store', icon: Store },
  { name: 'Factory', icon: Factory },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Coffee', icon: Coffee },
  { name: 'Laptop', icon: Laptop },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Camera', icon: Camera },
  { name: 'Music', icon: Music },
  { name: 'Book', icon: Book },
];

export default function SelectCompanyPage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultForm = {
    name: "",
    nit: "",
    casaMatriz: "",
    sucursal: "",
    telefono: "",
    logo: "", 
    icon: "Building"
  };

  const [formData, setFormData] = useState(defaultForm);

  if (status === "loading") return <p style={{textAlign: 'center', marginTop: '5rem'}}>Cargando...</p>;
  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSelect = async (tenantId: string) => {
    await update({ tenantId });
    router.push("/dashboard");
  };

  const handleEdit = (tenant: any) => {
    setFormData({
      name: tenant.name || "",
      nit: tenant.nit || "",
      casaMatriz: tenant.casaMatriz || "",
      sucursal: tenant.sucursal || "",
      telefono: tenant.telefono || "",
      logo: tenant.logo?.startsWith('data:image') || tenant.logo?.startsWith('http') || tenant.logo?.startsWith('/') ? tenant.logo : "",
      icon: tenant.logo?.startsWith('data:image') || tenant.logo?.startsWith('http') || tenant.logo?.startsWith('/') ? "Building" : (tenant.logo || "Building")
    });
    setEditingId(tenant.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (tenantId: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esto eliminará todos los datos asociados a la empresa y no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    
    if (!result.isConfirmed) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/tenants/${tenantId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        await update({ action: 'refreshTenants' });
        Swal.fire('¡Eliminado!', 'La empresa ha sido eliminada.', 'success');
      } else {
        let errMsg = "Error desconocido";
        try {
          const errData = await res.json();
          errMsg = errData.error || errMsg;
        } catch(e) {}
        Swal.fire('Error', `Error al eliminar la empresa: ${errMsg}`, 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', "Excepción de red al eliminar.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalLogo = formData.logo.trim() || formData.icon;
      const payload = { ...formData, logo: finalLogo };
      
      const url = editingId ? `/api/tenants/${editingId}` : "/api/tenants";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await update({ action: 'refreshTenants' });
        setIsFormOpen(false);
        setEditingId(null);
        setFormData(defaultForm);
        Swal.fire('¡Éxito!', editingId ? 'Empresa actualizada.' : 'Empresa creada.', 'success');
      } else {
        const err = await res.json();
        Swal.fire('Error', "Error: " + (err.error || "Algo salió mal"), 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', "Ocurrió un error inesperado.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openFormNew = () => {
    setFormData(defaultForm);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const filteredTenants = session?.user?.tenants?.filter((tenant: any) => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className={styles.container}>
      <div className={`card ${styles.mainCard}`}>
        <h1 className={styles.title}>Selecciona la Empresa</h1>
        
        {!isFormOpen && session?.user?.tenants && session.user.tenants.length > 0 && (
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Buscar empresa..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        )}
        
        {filteredTenants.length > 0 && !isFormOpen ? (
          <div className={styles.tenantList}>
            {filteredTenants.map((tenant: any) => {
              const isUrl = tenant.logo && (tenant.logo.startsWith('http') || tenant.logo.startsWith('data:image') || tenant.logo.startsWith('/'));
              const IconComp = isUrl ? Building : (ICON_OPTIONS.find(i => i.name === tenant.logo)?.icon || Building);
              
              return (
                <div key={tenant.id} className={styles.tenantCardContainer}>
                  {(tenant.isOwner || session.user.role === 'SUPERADMIN') && (
                    <div className={styles.tenantCardActions}>
                      <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); handleEdit(tenant); }} title="Editar"><Edit2 size={16}/></button>
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={(e) => { e.stopPropagation(); handleDelete(tenant.id); }} title="Eliminar"><Trash2 size={16}/></button>
                    </div>
                  )}
                  <button 
                    className={styles.tenantBtn}
                    onClick={() => handleSelect(tenant.id)}
                    style={{width: '100%', height: '100%', outline: 'none'}}
                  >
                    {isUrl ? (
                      <img src={tenant.logo} alt={tenant.name} style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '14px', background: 'transparent' }} />
                    ) : (
                      <IconComp className={styles.icon} />
                    )}
                    <span>{tenant.name}</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          !isFormOpen && (
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              {searchTerm ? "No se encontraron empresas con ese nombre." : "No estás asignado a ninguna empresa todavía."}
            </p>
          )
        )}

        {!isFormOpen && <div className={styles.divider}>o</div>}

        {!isFormOpen ? (
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '15px' }}
            onClick={openFormNew}
          >
            <Plus size={20} /> Crear Nueva Empresa
          </button>
        ) : (
          <form onSubmit={handleCreateOrUpdate} className={styles.createForm}>
            <h2 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>{editingId ? "Editar Empresa" : "Nueva Empresa"}</h2>
            <div className={styles.inputGroup}>
              <label>Nombre de la Empresa *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className={styles.inputGroup}>
                <label>NIT *</label>
                <input type="text" name="nit" value={formData.nit} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Teléfono *</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className={styles.inputGroup}>
                <label>Casa Matriz *</label>
                <input type="text" name="casaMatriz" value={formData.casaMatriz} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Sucursal (Opcional)</label>
                <input type="text" name="sucursal" value={formData.sucursal} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Logo de la Empresa (Opcional)</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
              />
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={18} /> Subir Imagen
                </button>
                {formData.logo && formData.logo.startsWith('data:image') && (
                  <img src={formData.logo} alt="Preview" style={{width: 40, height: 40, objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--color-border)'}} />
                )}
                {formData.logo && formData.logo.startsWith('http') && (
                  <span style={{fontSize: '0.8rem', color: 'var(--color-primary)'}}>Imagen actual (URL)</span>
                )}
              </div>
            </div>

            {!formData.logo && (
              <div className={styles.inputGroup}>
                <label>O selecciona un ícono representativo:</label>
                <div className={styles.iconGrid}>
                  {ICON_OPTIONS.map(opt => (
                    <button 
                      key={opt.name}
                      type="button"
                      className={`${styles.iconBtn} ${formData.icon === opt.name ? styles.selected : ''}`}
                      onClick={() => setFormData({...formData, icon: opt.name})}
                    >
                      <opt.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="button" className="btn btn-outline" onClick={() => setIsFormOpen(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={loading || !formData.name}>
                {loading ? 'Guardando...' : (editingId ? 'Actualizar Empresa' : 'Crear Empresa')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
