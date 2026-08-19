"use client";

import { useState, useRef } from "react";
import { Plus, Edit, Trash2, X, Package, Download, Upload, Check } from "lucide-react";
import { createProducto, updateProducto, deleteProducto, importProductos, crearCategoriaConProductos } from "./actions";
import ExcelJS from "exceljs";
import Swal from 'sweetalert2';
import styles from "./productos.module.css";

export default function ProductosClient({ initialProductos, proveedores, initialCategorias }: { initialProductos: any[], proveedores: any[], initialCategorias?: any[] }) {
  const [productos, setProductos] = useState(initialProductos);
  const [categorias, setCategorias] = useState(initialCategorias || []);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Import Preview State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importDescription, setImportDescription] = useState("");

  // Categoria Modal State
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [categoriaSearch, setCategoriaSearch] = useState("");
  const [selectedProductos, setSelectedProductos] = useState<string[]>([]);
  const [isSavingCategoria, setIsSavingCategoria] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    marca: "",
    unidadMedida: "Unidad",
    metodoInventario: "Promedio Ponderado",
    proveedorId: "",
    categoriaId: "",
    stock: "0",
    costo: "0.00",
    precioVenta: "0.00",
  });

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const filteredForCategoria = productos.filter(p =>
    !p.categoriaId &&
    (p.nombre.toLowerCase().includes(categoriaSearch.toLowerCase()) ||
      p.codigo.toLowerCase().includes(categoriaSearch.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openNewModal = () => {
    setIsEditing(false);
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      marca: "",
      unidadMedida: "Unidad",
      metodoInventario: "Promedio Ponderado",
      proveedorId: "",
      categoriaId: "",
      stock: "0",
      costo: "0.00",
      precioVenta: "0.00",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setIsEditing(true);
    setFormData({
      codigo: p.codigo,
      nombre: p.nombre,
      descripcion: p.descripcion || "",
      marca: p.marca || "",
      unidadMedida: p.unidadMedida || "Unidad",
      metodoInventario: p.metodoInventario || "Promedio Ponderado",
      proveedorId: p.proveedorId || "",
      categoriaId: p.categoriaId || "",
      stock: p.stock.toString(),
      costo: p.costo.toString(),
      precioVenta: p.precioVenta.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (codigo: string) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: "Se eliminará este producto (soft delete).",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteProducto(codigo);
        setProductos(productos.filter(p => p.codigo !== codigo));
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message || "Error al eliminar producto", 'error');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        const updated = await updateProducto(formData.codigo, {
          ...formData,
          stock: parseInt(formData.stock),
          costo: parseFloat(formData.costo),
          precioVenta: parseFloat(formData.precioVenta),
        });
        setProductos(productos.map(p => p.codigo === updated.codigo ? updated : p));
      } else {
        const newProduct = await createProducto({
          ...formData,
          stock: parseInt(formData.stock),
          costo: parseFloat(formData.costo),
          precioVenta: parseFloat(formData.precioVenta),
        });
        setProductos([newProduct, ...productos]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      const headerRow = worksheet.getRow(1);
      const colMap: Record<string, number> = {};

      headerRow.eachCell((cell, colNumber) => {
        const val = cell.value?.toString().toUpperCase().trim() || "";
        if (val.includes("CODIGO") || val.includes("CÓDIGO")) colMap.codigo = colNumber;
        else if (val.includes("NOMBRE")) colMap.nombre = colNumber;
        else if (val.includes("DESCRIPCION") || val.includes("DESCRIPCIÓN")) colMap.descripcion = colNumber;
        else if (val.includes("STOCK")) colMap.stock = colNumber;
        else if (val.includes("PRECIO")) colMap.precio = colNumber;
      });

      // Fallback if headers are not perfectly matched
      if (!colMap.codigo) colMap.codigo = 1;
      if (!colMap.nombre) colMap.nombre = 2;
      if (!colMap.descripcion) colMap.descripcion = 3;
      if (!colMap.stock) colMap.stock = 4;
      if (!colMap.precio) colMap.precio = 5;

      const imported: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip headers

        const rawCodigo = row.getCell(colMap.codigo).value;
        const rawNombre = row.getCell(colMap.nombre).value;
        const rawDesc = row.getCell(colMap.descripcion).value;
        const rawStock = row.getCell(colMap.stock).value;
        const rawPrecio = row.getCell(colMap.precio).value;

        // Si la fila está completamente vacía (sin código ni nombre relevante), se salta
        if (rawCodigo == null && rawNombre == null) return;

        const codigo = rawCodigo?.toString() || `PROD-${Date.now()}-${rowNumber}`;
        const nombre = rawNombre?.toString() || "Sin Nombre";
        const descripcion = rawDesc?.toString() || "";
        const stockStr = rawStock?.toString() || "0";
        const precioStr = rawPrecio?.toString() || "0";

        imported.push({
          id: Date.now() + Math.random(), // id temporal para la UI
          codigo,
          nombre,
          descripcion,
          marca: "",
          unidadMedida: "Unidad",
          stock: stockStr,
          costo: precioStr,
          precioVenta: precioStr,
          metodoInventario: "Promedio Ponderado"
        });
      });

      setPreviewData(imported);
      setIsPreviewModalOpen(true);
    } catch (err) {
      Swal.fire('Error', "Error al leer el archivo Excel. Asegúrese de que sea un archivo válido.", 'error');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImportConfirm = async () => {
    setIsImporting(true);
    try {
      // El array que mandamos debe coincidir con lo que espera el server action
      await importProductos(previewData, importDescription);
      setIsPreviewModalOpen(false);
      setPreviewData([]);
      setImportDescription("");
      // Recargar la página para obtener los datos actualizados desde el servidor
      window.location.reload();
    } catch (err: any) {
      Swal.fire('Error', err.message || "Error al importar productos", 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const updatePreviewCell = (id: number, field: string, value: string) => {
    setPreviewData(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePreviewRow = (id: number) => {
    setPreviewData(prev => prev.filter(p => p.id !== id));
  };

  const handleCreateCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoriaNombre.trim()) {
      Swal.fire('Atención', 'El nombre de la categoría es requerido', 'warning');
      return;
    }

    setIsSavingCategoria(true);
    try {
      const nuevaCategoria = await crearCategoriaConProductos(categoriaNombre, selectedProductos);
      setCategorias([...categorias, nuevaCategoria]);

      // Update local products state
      if (selectedProductos.length > 0) {
        setProductos(prev => prev.map(p =>
          selectedProductos.includes(p.codigo)
            ? { ...p, categoriaId: nuevaCategoria.id, categoria: nuevaCategoria }
            : p
        ));
      }

      Swal.fire('¡Éxito!', 'Categoría creada y productos asignados correctamente.', 'success');
      setIsCategoriaModalOpen(false);
      setCategoriaNombre("");
      setSelectedProductos([]);
      setCategoriaSearch("");
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error al crear la categoría', 'error');
    } finally {
      setIsSavingCategoria(false);
    }
  };

  const toggleProductoSelection = (codigo: string) => {
    setSelectedProductos(prev =>
      prev.includes(codigo) ? prev.filter(c => c !== codigo) : [...prev, codigo]
    );
  };

  return (
    <>
      <div className="card glass">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Buscar código o nombre..."
            style={{ maxWidth: '300px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className={styles.headerActions}>
            <button className={`btn ${styles.btnSuccess}`} title="Exportar a Excel/PDF">
              <Download size={18} /> Exportar
            </button>
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              className={`btn ${styles.btnSuccess}`}
              style={{ backgroundColor: '#059669' }}
              title="Importar desde Excel"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={18} /> Importar Excel
            </button>
            <button
              className="btn btn-outline"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              onClick={() => setIsCategoriaModalOpen(true)}
            >
              <Plus size={18} /> Añadir Categoría
            </button>
            <button className="btn btn-primary" onClick={openNewModal}>
              <Plus size={18} /> Nuevo Producto
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>NOMBRE</th>
                <th>CATEGORÍA</th>
                <th>STOCK</th>
                <th>PRECIO VENTA</th>
                <th>PROVEEDOR</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.codigo}>
                  <td style={{ fontWeight: '600' }}>{p.codigo}</td>
                  <td style={{ fontWeight: '600' }}>{p.nombre}</td>
                  <td>
                    {p.categoria ? (
                      <span style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem', color: '#4b5563' }}>
                        {p.categoria.nombre}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <span style={{
                      color: p.stock <= 5 ? 'var(--color-danger)' : 'inherit',
                      fontWeight: p.stock <= 5 ? 'bold' : 'normal'
                    }}>
                      {p.stock} {p.unidadMedida}
                    </span>
                  </td>
                  <td>Bs. {p.precioVenta.toFixed(2)}</td>
                  <td>{p.proveedor?.nombre || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.4rem' }} title="Editar" onClick={() => openEditModal(p)}><Edit size={16} /></button>
                      <button className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }} title="Eliminar" onClick={() => handleDelete(p.codigo)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo/Editar Producto */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Package size={20} /> {isEditing ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                {error && <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Código *</label>
                    <input
                      required
                      type="text"
                      name="codigo"
                      className={styles.formInput}
                      placeholder="PROD-006"
                      value={formData.codigo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre *</label>
                    <input
                      required
                      type="text"
                      name="nombre"
                      className={styles.formInput}
                      placeholder="Nombre del producto"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Descripción</label>
                    <input
                      type="text"
                      name="descripcion"
                      className={styles.formInput}
                      placeholder="Ej: Caramelo duro sabor fresa (1 Caja x 35 unidades)..."
                      value={formData.descripcion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Marca</label>
                    <input
                      type="text"
                      name="marca"
                      className={styles.formInput}
                      placeholder="Ej: Columbia"
                      value={formData.marca}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Unidad de Medida</label>
                    <input
                      type="text"
                      name="unidadMedida"
                      className={styles.formInput}
                      placeholder="Unidad"
                      value={formData.unidadMedida}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Método Inventario</label>
                    <select
                      name="metodoInventario"
                      className={styles.formInput}
                      value={formData.metodoInventario}
                      onChange={handleInputChange}
                    >
                      <option value="Primeras Entradas, Primeras Salidas (PEPS)">Primeras Entradas, Primeras Salidas (PEPS)</option>
                      <option value="Promedio Ponderado">Promedio Ponderado</option>
                      <option value="Últimas Entradas, Primeras Salidas (UEPS)">Últimas Entradas, Primeras Salidas (UEPS)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Proveedor</label>
                    <select
                      name="proveedorId"
                      className={styles.formInput}
                      value={formData.proveedorId}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Sin Proveedor --</option>
                      {proveedores.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Categoría</label>
                    <select
                      name="categoriaId"
                      className={styles.formInput}
                      value={formData.categoriaId}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Sin Categoría --</option>
                      {categorias.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Stock Inicial *</label>
                    <input
                      required
                      type="number"
                      name="stock"
                      min="0"
                      className={styles.formInput}
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Costo Unitario (Bs.)</label>
                    <input
                      type="number"
                      name="costo"
                      min="0"
                      step="0.01"
                      className={styles.formInput}
                      value={formData.costo}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Precio Venta (Bs.)</label>
                    <input
                      type="number"
                      name="precioVenta"
                      min="0"
                      step="0.01"
                      className={styles.formInput}
                      value={formData.precioVenta}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSave} disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Vista Previa Importación */}
      {isPreviewModalOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 1000 }}>
          <div className={styles.modalContent} style={{ maxWidth: '900px', width: '90%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Check size={20} /> Vista Previa de Importación
              </h2>
              <button className={styles.closeButton} onClick={() => setIsPreviewModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody} style={{ padding: '1rem', overflowX: 'auto' }}>
              <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Revisa los datos leídos del Excel. Puedes editar cualquier campo directamente en esta tabla o eliminar las filas que no desees importar.
                Se importarán <strong>{previewData.length}</strong> productos.
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#374151' }}>
                  Descripción de la Importación (Opcional, e.g. "Saldo inicial de stock año pasado")
                </label>
                <input
                  type="text"
                  placeholder="Ej: Saldo de stock del año pasado"
                  value={importDescription}
                  onChange={(e) => setImportDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '0.5rem', textAlign: 'left', minWidth: '120px' }}>CÓDIGO</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', minWidth: '180px' }}>NOMBRE</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', minWidth: '150px' }}>DESCRIPCIÓN</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', width: '100px' }}>U. MEDIDA</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', width: '120px' }}>MÉTODO INV.</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', width: '80px' }}>STOCK</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', width: '90px' }}>COSTO (Bs)</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left', width: '90px' }}>PRECIO (Bs)</th>
                    <th style={{ padding: '0.5rem', textAlign: 'center', width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="text"
                          value={row.codigo}
                          onChange={(e) => updatePreviewCell(row.id, 'codigo', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="text"
                          value={row.nombre}
                          onChange={(e) => updatePreviewCell(row.id, 'nombre', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="text"
                          value={row.descripcion}
                          onChange={(e) => updatePreviewCell(row.id, 'descripcion', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="text"
                          value={row.unidadMedida}
                          onChange={(e) => updatePreviewCell(row.id, 'unidadMedida', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <select
                          value={row.metodoInventario}
                          onChange={(e) => updatePreviewCell(row.id, 'metodoInventario', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.8rem' }}
                        >
                          <option value="Primeras Entradas, Primeras Salidas (PEPS)">PEPS</option>
                          <option value="Promedio Ponderado">Promedio Ponderado</option>
                          <option value="Últimas Entradas, Primeras Salidas (UEPS)">UEPS</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="number"
                          value={row.stock}
                          onChange={(e) => updatePreviewCell(row.id, 'stock', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={row.costo}
                          onChange={(e) => updatePreviewCell(row.id, 'costo', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={row.precioVenta}
                          onChange={(e) => updatePreviewCell(row.id, 'precioVenta', e.target.value)}
                          style={{ width: '100%', padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '0.25rem', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => removePreviewRow(row.id)}
                          style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                          title="Quitar de importación"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {previewData.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                        No hay productos para importar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.btnCancel} onClick={() => setIsPreviewModalOpen(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className={styles.btnSave}
                onClick={handleImportConfirm}
                disabled={isImporting || previewData.length === 0}
              >
                {isImporting ? "Importando..." : "Proceder con Importación"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Añadir Categoría */}
      {isCategoriaModalOpen && (
        <div className={styles.modalOverlay} style={{ zIndex: 1100 }}>
          <div className={styles.modalContent} style={{ maxWidth: '700px', width: '90%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <Plus size={20} /> Añadir Nueva Categoría
              </h2>
              <button className={styles.closeButton} onClick={() => setIsCategoriaModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCategoria}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nombre de la Categoría *</label>
                  <input
                    required
                    type="text"
                    className={styles.formInput}
                    placeholder="Ej: Goma de mascar"
                    value={categoriaNombre}
                    onChange={e => setCategoriaNombre(e.target.value)}
                    style={{ fontSize: '1.1rem' }}
                  />
                </div>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem', color: '#374151' }}>Seleccionar Productos para esta Categoría</h3>

                <input
                  type="text"
                  placeholder="Buscar producto a incluir..."
                  value={categoriaSearch}
                  onChange={e => setCategoriaSearch(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '1rem' }}
                />

                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#f9fafb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                      <tr>
                        <th style={{ padding: '0.5rem', textAlign: 'center', width: '50px' }}>
                          <input
                            type="checkbox"
                            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                            title="Seleccionar todos los filtrados"
                            checked={filteredForCategoria.length > 0 && selectedProductos.length === filteredForCategoria.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProductos(filteredForCategoria.map(p => p.codigo));
                              } else {
                                setSelectedProductos([]);
                              }
                            }}
                          />
                        </th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>CÓDIGO</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>NOMBRE</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>CATEGORÍA ACTUAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredForCategoria.map(p => (
                        <tr key={p.codigo} style={{ borderBottom: '1px solid #f3f4f6', background: selectedProductos.includes(p.codigo) ? '#f0fdf4' : 'transparent' }}>
                          <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={selectedProductos.includes(p.codigo)}
                              onChange={() => toggleProductoSelection(p.codigo)}
                              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                          </td>
                          <td style={{ padding: '0.5rem', fontWeight: '500' }} onClick={() => toggleProductoSelection(p.codigo)}>{p.codigo}</td>
                          <td style={{ padding: '0.5rem' }} onClick={() => toggleProductoSelection(p.codigo)}>{p.nombre}</td>
                          <td style={{ padding: '0.5rem', color: '#6b7280', fontSize: '0.85rem' }} onClick={() => toggleProductoSelection(p.codigo)}>
                            {p.categoria?.nombre || '-'}
                          </td>
                        </tr>
                      ))}
                      {filteredForCategoria.length === 0 && (
                        <tr>
                          <td colSpan={4} style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
                            No se encontraron productos
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4b5563' }}>
                  Productos seleccionados: <strong>{selectedProductos.length}</strong>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsCategoriaModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSave} disabled={isSavingCategoria}>
                  {isSavingCategoria ? "Guardando..." : "Crear Categoría y Asignar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
