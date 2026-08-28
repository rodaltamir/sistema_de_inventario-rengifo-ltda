import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';

export default function SearchableProductSelect({ value, onChange, productos }: { value: string, onChange: (val: string) => void, productos: any[] }) {
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
          {selectedProd ? (selectedProd.codigo === 'TODOS' ? 'TODOS LOS PRODUCTOS' : (selectedProd.codigo + ' - ' + selectedProd.nombre)) : "Seleccione un producto..."}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '8px' }}>▼</span>
      </div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div ref={dropdownRef} style={{
          position: 'absolute',
          top: coords.top,
          left: coords.left,
          width: Math.max(coords.width, 350),
          zIndex: 99999,
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
              placeholder="Buscar por codigo o nombre..."
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
              onFocus={e => Object.assign(e.target.style, { borderColor: '#f97316', boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)' })}
              onBlur={e => Object.assign(e.target.style, { borderColor: '#cbd5e1', boxShadow: 'none' })}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>No se encontraron productos</div>
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
                    {p.codigo === 'TODOS' ? 'TODOS LOS PRODUCTOS' : <><span style={{ color: '#ea580c', marginRight: '4px' }}>{p.codigo}</span> - {p.nombre}</>}
                  </div>
                  {p.codigo !== 'TODOS' && (
                    <>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.descripcion || 'Sin descripcion'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 'bold', marginTop: '0.3rem' }}>
                        Stock Disponible: {p.stock || 0} {p.unidadMedida || 'Unidad(es)'}
                      </div>
                    </>
                  )}
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
