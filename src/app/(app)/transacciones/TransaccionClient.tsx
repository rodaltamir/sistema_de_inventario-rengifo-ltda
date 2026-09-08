"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ShoppingCart, Download, FileText, Plus, Trash2, Calculator, Package, X, Upload } from "lucide-react";
import { procesarTransaccion } from "./actions";
import { createProducto } from "../productos/actions";
import { createProveedor } from "../proveedores/actions";
import Swal from 'sweetalert2';
import styles from "./transacciones.module.css";

function SearchableProductSelect({ value, onChange, productos, onAddNewProduct }: { value: string, onChange: (val: string) => void, productos: any[], onAddNewProduct?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ left: 0, top: 0, width: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
       const target = event.target as Node;
       if (wrapperRef.current && !wrapperRef.current.contains(target) &&
           dropdownRef.current && !dropdownRef.current.contains(target)) {
         setIsOpen(false);
       }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateCoords = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        left: rect.left,
        top: rect.bottom + window.scrollY,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
      return () => {
        window.removeEventListener('scroll', updateCoords, true);
        window.removeEventListener('resize', updateCoords);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      updateCoords();
    }
    setIsOpen(!isOpen);
  };

  const selectedProd = productos.find(p => p.codigo === value);
  const filtered = productos.filter(p => 
      p.nombre.toLowerCase().includes(search.toLowerCase()) || 
      p.codigo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', minWidth: '250px' }}>
      <div 
        onClick={handleToggle}
        style={{
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          padding: '0.6rem 0.75rem',
          cursor: 'pointer',
          background: '#fff',
          minHeight: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.9rem'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedProd ? `${selectedProd.codigo} - ${selectedProd.nombre}` : "Seleccione un producto..."}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '8px' }}>▼</span>
      </div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div ref={dropdownRef} style={{
          position: 'absolute',
          top: coords.top,
          left: coords.left,
          width: Math.max(coords.width, 350),
          zIndex: 999,
          background: '#fff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          marginTop: '4px',
          maxHeight: '350px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
            <input 
              type="text"
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por código o nombre..."
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
              onFocus={e => Object.assign(e.target.style, { borderColor: '#f97316', boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)' })}
              onBlur={e => Object.assign(e.target.style, { borderColor: '#cbd5e1', boxShadow: 'none' })}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                No se encontraron productos
                {onAddNewProduct && (
                  <div style={{ marginTop: '1rem' }}>
                    <button 
                      type="button" 
                      onClick={() => { setIsOpen(false); setSearch(''); onAddNewProduct(); }} 
                      style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      + Crear Producto
                    </button>
                  </div>
                )}
              </div>
            ) : (
              filtered.map(p => (
                <div 
                  key={p.codigo}
                  onClick={() => {
                    onChange(p.codigo);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    background: p.codigo === value ? '#fff7ed' : '#fff',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = p.codigo === value ? '#fff7ed' : '#f8fafc'}
                  onMouseOut={e => e.currentTarget.style.background = p.codigo === value ? '#fff7ed' : '#fff'}
                >
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#0f172a' }}>
                    <span style={{ color: '#ea580c', marginRight: '4px' }}>{p.codigo}</span> - {p.nombre}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.descripcion || 'Sin descripción'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 'bold', marginTop: '0.3rem' }}>
                    Stock Disponible: {p.stock} {p.unidadMedida || 'Unidad(es)'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function TransaccionClient({
  productos: initialProductos,
  proveedores: initialProveedores,
  tenantData,
  idUser
}: {
  productos: any[],
  proveedores: any[],
  tenantData?: any,
  idUser?: string
}) {
  const [productos, setProductos] = useState(initialProductos);
  const [proveedores, setProveedores] = useState(initialProveedores);

  // Modal Nuevo Producto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState("");
  const [productFormData, setProductFormData] = useState({
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

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
  };

  const calcularDIMProduct = async () => {
    const { value: formValues } = await Swal.fire({
      title: '<strong>Calcular DIM</strong>',
      html: `
        <div style="text-align: left; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 15px;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 6px; text-transform: uppercase;">Importe Total a Pagar</label>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 11px; color: #f97316; font-weight: bold;">Bs.</span>
              <input id="swal-importe-prod" type="number" step="0.01" placeholder="Ej. 1000" style="width: 100%; padding: 12px 12px 12px 40px; box-sizing: border-box; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 1rem; color: #1e293b; outline: none; transition: all 0.2s;" onfocus="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 0 3px rgba(249, 115, 22, 0.1)';" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 6px; text-transform: uppercase;">Cantidad / Stock a Ingresar</label>
            <div style="position: relative;">
              <span style="position: absolute; left: 12px; top: 11px; color: #f97316;">📦</span>
              <input id="swal-cantidad-prod" type="number" step="1" placeholder="Ej. 50" style="width: 100%; padding: 12px 12px 12px 40px; box-sizing: border-box; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 1rem; color: #1e293b; outline: none; transition: all 0.2s;" onfocus="this.style.borderColor='#f97316'; this.style.boxShadow='0 0 0 3px rgba(249, 115, 22, 0.1)';" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: '✓ Aplicar Cálculo',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const importe = (document.getElementById('swal-importe-prod') as HTMLInputElement).value;
        const cantidad = (document.getElementById('swal-cantidad-prod') as HTMLInputElement).value;
        if (!importe || !cantidad || Number(cantidad) <= 0) {
          Swal.showValidationMessage('Debe ingresar un importe válido y una cantidad mayor a cero');
          return false;
        }
        return { importe: Number(importe), cantidad: Number(cantidad) };
      }
    });

    if (formValues) {
      const { importe, cantidad } = formValues;
      const intermedio = importe / 0.13;
      const precioUnitario = intermedio / cantidad;
      const parsedPrecio = parseFloat(precioUnitario.toFixed(5));

      setProductFormData(prev => ({
        ...prev,
        precioVenta: parsedPrecio.toString()
      }));

      Swal.fire({
        title: '¡DIM Aplicado!',
        html: `
          <div style="font-size: 1rem; color: #475569; margin-top: 10px;">
            <p>Se actualizó el Precio de Venta con:</p>
            <p><strong>Precio Calculado:</strong> Bs. ${parsedPrecio}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#f97316'
      });
    }
  };

  // Preset de fecha de registro para nuevo producto
  const today = new Date();
  const [prodPreset, setProdPreset] = useState("anual");
  const [prodAnio, setProdAnio] = useState(today.getFullYear());
  const [prodMes, setProdMes] = useState(today.getMonth());
  const [prodSemestre, setProdSemestre] = useState(today.getMonth() < 6 ? 1 : 2);
  const [productFechaCreacion, setProductFechaCreacion] = useState<string>(`${today.getFullYear()}-01-01`);

  useEffect(() => {
    if (prodPreset === "personalizado") return;
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (prodPreset === "anual") {
      setProductFechaCreacion(`${prodAnio}-01-01`);
    } else if (prodPreset === "semestral") {
      const m = prodSemestre === 1 ? '01' : '07';
      setProductFechaCreacion(`${prodAnio}-${m}-01`);
    } else if (prodPreset === "mensual") {
      setProductFechaCreacion(`${prodAnio}-${pad(prodMes + 1)}-01`);
    }
  }, [prodPreset, prodAnio, prodMes, prodSemestre]);

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductLoading(true);
    setProductError("");
    try {
      const newProduct = await createProducto({
        ...productFormData,
        stock: parseInt(productFormData.stock) || 0,
        costo: parseFloat(productFormData.costo) || 0,
        precioVenta: parseFloat(productFormData.precioVenta) || 0,
        fecha: productFechaCreacion,
      });
      setProductos([newProduct, ...productos]);
      setIsProductModalOpen(false);
      Swal.fire('Éxito', 'Producto creado correctamente', 'success');
    } catch (err: any) {
      setProductError(err.message || "Error al crear producto");
    } finally {
      setProductLoading(false);
    }
  };
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
    const exists = proveedores.some(p => p.nit === nitCi && p.tipo === (modo === 'VENTA' ? 'CLIENTE' : 'PROVEEDOR'));
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
        const nuevoProv = await createProveedor({
            nombre: razonSocial,
            nit: nitCi,
            tipo: modo === "VENTA" ? "CLIENTE" : "PROVEEDOR",
            logo: modo === "VENTA" ? "user" : "truck"
          });
          setProveedores([...proveedores, nuevoProv]);
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
            return { ...d, cantidad: cantidad, precioUnitario: parseFloat(precioUnitario.toFixed(5)) };
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

    if (formaPago === "CREDITO" && (Number(abonoInicial) || 0) < 1) {
      return Swal.fire('Error', "Para pagos a CRÉDITO, debe de haner un abono inicial minimo", 'warning');
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/historial?openImport=true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#059669',
                color: '#ffffff',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              title="Importar transacciones masivamente desde plantilla Excel"
            >
              <Upload size={17} /> Importar desde Excel
            </Link>

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
          <div className={styles.sectionBody} style={{ padding: 0, overflow: 'visible' }}>
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
                      <SearchableProductSelect value={d.productoCodigo} onChange={(val) => updateDetalle(d.id, "productoCodigo", val)} productos={productos} onAddNewProduct={modo === 'COMPRA' ? () => { setProductFormData({ codigo: "", nombre: "", descripcion: "", marca: "", unidadMedida: "Unidad", metodoInventario: "Promedio Ponderado", proveedorId: "", categoriaId: "", stock: "0", costo: "0.00", precioVenta: "0.00" }); setProdPreset("anual"); setProdAnio(new Date().getFullYear()); setProductFechaCreacion(`${new Date().getFullYear()}-01-01`); setIsProductModalOpen(true); } : undefined} />
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
                          step="0.00001"
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
    
      {/* Modal Nuevo Producto */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1050,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              background: 'var(--color-primary)',
              color: 'white',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.15rem',
                fontWeight: 700,
                margin: 0,
                color: 'white'
              }}>
                <Package size={20} /> Nuevo Producto
              </h2>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem'
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '1.5rem',
                overflowY: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                {productError && (
                  <div style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '0.75rem', borderRadius: '6px', fontSize: '0.875rem' }}>
                    {productError}
                  </div>
                )}

                {/* Fecha de Registro con Presets */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                    Fecha de Registro
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Tipo</label>
                      <select
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                        value={prodPreset}
                        onChange={e => setProdPreset(e.target.value)}
                      >
                        <option value="anual">Anual</option>
                        <option value="semestral">Semestral</option>
                        <option value="mensual">Mensual</option>
                        <option value="personalizado">Personalizado</option>
                      </select>
                    </div>

                    {prodPreset === "anual" && (
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Año</label>
                        <input
                          type="number"
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                          value={prodAnio}
                          onChange={e => setProdAnio(parseInt(e.target.value) || today.getFullYear())}
                        />
                      </div>
                    )}

                    {prodPreset === "semestral" && (
                      <>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Semestre</label>
                          <select
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                            value={prodSemestre}
                            onChange={e => setProdSemestre(parseInt(e.target.value))}
                          >
                            <option value={1}>1er Semestre (Ene-Jun)</option>
                            <option value={2}>2do Semestre (Jul-Dic)</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Año</label>
                          <input
                            type="number"
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                            value={prodAnio}
                            onChange={e => setProdAnio(parseInt(e.target.value) || today.getFullYear())}
                          />
                        </div>
                      </>
                    )}

                    {prodPreset === "mensual" && (
                      <>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Mes</label>
                          <select
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                            value={prodMes}
                            onChange={e => setProdMes(parseInt(e.target.value))}
                          >
                            {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"].map((m, i) => (
                              <option key={i} value={i}>{m}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Año</label>
                          <input
                            type="number"
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                            value={prodAnio}
                            onChange={e => setProdAnio(parseInt(e.target.value) || today.getFullYear())}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Fecha Asignada</label>
                      <input
                        type="date"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                        value={productFechaCreacion}
                        onChange={e => {
                          setProductFechaCreacion(e.target.value);
                          setProdPreset("personalizado");
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Campos Código & Nombre */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Código *</label>
                    <input
                      required
                      type="text"
                      name="codigo"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      placeholder="PROD-006"
                      value={productFormData.codigo}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Nombre *</label>
                    <input
                      required
                      type="text"
                      name="nombre"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      placeholder="Nombre del producto"
                      value={productFormData.nombre}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                    placeholder="Ej: Caramelo duro..."
                    value={productFormData.descripcion}
                    onChange={handleProductInputChange}
                  />
                </div>

                {/* Marca & Stock Inicial */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Marca</label>
                    <input
                      type="text"
                      name="marca"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      placeholder="Ej: Arcor"
                      value={productFormData.marca}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Stock Inicial *</label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      name="stock"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      value={productFormData.stock}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                {/* Costo & Precio de Venta */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Costo (Bs) *</label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      name="costo"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      value={productFormData.costo}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155', margin: 0 }}>Precio de Venta (Bs) *</label>
                      <button
                        type="button"
                        onClick={calcularDIMProduct}
                        style={{
                          background: '#fff7ed',
                          color: '#ea580c',
                          border: '1px solid #fed7aa',
                          borderRadius: '4px',
                          padding: '0.15rem 0.45rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 600
                        }}
                      >
                        <Calculator size={12} /> Calc. DIM
                      </button>
                    </div>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      name="precioVenta"
                      style={{ padding: '0.65rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', outline: 'none' }}
                      value={productFormData.precioVenta}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Footer: fixed / flexShrink 0 */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                background: '#f8fafc',
                flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#475569'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={productLoading}
                  style={{
                    padding: '0.6rem 1.25rem',
                    border: 'none',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {productLoading ? "Guardando..." : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}









