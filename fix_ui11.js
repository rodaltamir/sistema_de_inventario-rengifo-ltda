const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/const \[fechaFin, setFechaFin\] = useState<string>\(""\);/,
`const [fechaFin, setFechaFin] = useState<string>("");
  const today = new Date();
  const [selectedPreset, setSelectedPreset] = useState("mes");
  const [selectedAnio, setSelectedAnio] = useState(today.getFullYear());
  const [selectedMes, setSelectedMes] = useState(today.getMonth());
  const [selectedSemestre, setSelectedSemestre] = useState(today.getMonth() < 6 ? 1 : 2);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFechaInicio, setAppliedFechaInicio] = useState("");
  const [appliedFechaFin, setAppliedFechaFin] = useState("");

  // Update date inputs on preset change
  useEffect(() => {
    if (selectedPreset === "personalizado" || selectedPreset === "todos") {
      if (selectedPreset === "todos") {
        setFechaInicio("");
        setFechaFin("");
      }
      return;
    }

    let start = new Date();
    let end = new Date();

    if (selectedPreset === "hoy") {
      start = new Date();
      end = new Date();
    } else if (selectedPreset === "mes") {
      start = new Date(selectedAnio, selectedMes, 1);
      end = new Date(selectedAnio, selectedMes + 1, 0);
    } else if (selectedPreset === "semestre") {
      const startMonth = selectedSemestre === 1 ? 0 : 6;
      start = new Date(selectedAnio, startMonth, 1);
      end = new Date(selectedAnio, startMonth + 6, 0);
    } else if (selectedPreset === "anual") {
      start = new Date(selectedAnio, 0, 1);
      end = new Date(selectedAnio, 11, 31);
    }

    const formatLocal = (d: Date) => {
       const pad = (n: number) => n.toString().padStart(2, '0');
       return \`\${d.getFullYear()}-\${pad(d.getMonth() + 1)}-\${pad(d.getDate())}\`;
    };

    setFechaInicio(formatLocal(start));
    setFechaFin(formatLocal(end));
  }, [selectedPreset, selectedAnio, selectedMes, selectedSemestre]);

  const handleFilter = () => {
    setAppliedSearch(search);
    setAppliedFechaInicio(fechaInicio);
    setAppliedFechaFin(fechaFin);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Datos actualizados'
    });
  };`);

// Also need to import useEffect if not imported
if (!content.includes("import { useState, useRef, useEffect }")) {
  content = content.replace(/import \{ useState, useRef \} from "react";/, `import { useState, useRef, useEffect } from "react";`);
}

// Now replace the filtering logic inside useMemo:
// Wait, currently ProductosClient uses `search`, `fechaInicio` directly in filteredProductos
content = content.replace(/const filteredProductos = productos\.filter\(p => \{/,
`const filteredProductos = productos.filter(p => {
    const s = appliedSearch.toLowerCase();
    const matchesSearch = p.codigo.toLowerCase().includes(s) || p.nombre.toLowerCase().includes(s);
    let matchesDate = true;
    if (appliedFechaInicio || appliedFechaFin) {
      const pDate = new Date(p.createdAt);
      if (appliedFechaInicio) {
        matchesDate = matchesDate && pDate >= new Date(appliedFechaInicio + "T00:00:00");
      }
      if (appliedFechaFin) {
        matchesDate = matchesDate && pDate <= new Date(appliedFechaFin + "T23:59:59");
      }
    }
    return matchesSearch && matchesDate;
  }); // original logic bypassed`);
  
content = content.replace(/const matchesSearch = p\.codigo\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\) \|\|[\s\S]*?return matchesSearch && matchesDate;/g, `return true;`); // remove original filter lines

// And replace the UI for search
// Currently it is: <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
// We need to inject the preset selectors and a "Filtrar Datos" button.

const uiReplacement = `<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: '1', minWidth: '200px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Buscar</label>
                <input
                  type="text"
                  placeholder="Buscar código o nombre..."
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleFilter()}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Período</label>
                <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} value={selectedPreset} onChange={e => setSelectedPreset(e.target.value)}>
                  <option value="todos">Todos los tiempos</option>
                  <option value="hoy">Hoy</option>
                  <option value="mes">Mensual</option>
                  <option value="semestre">Semestral</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              {(selectedPreset === 'mes' || selectedPreset === 'semestre' || selectedPreset === 'anual') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Año</label>
                  <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} value={selectedAnio} onChange={e => setSelectedAnio(Number(e.target.value))}>
                    {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPreset === 'mes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Mes</label>
                  <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} value={selectedMes} onChange={e => setSelectedMes(Number(e.target.value))}>
                    {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => (
                      <option key={i} value={i}>{m}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPreset === 'semestre' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Semestre</label>
                  <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} value={selectedSemestre} onChange={e => setSelectedSemestre(Number(e.target.value))}>
                    <option value={1}>1er Semestre</option>
                    <option value={2}>2do Semestre</option>
                  </select>
                </div>
              )}

              {(selectedPreset === 'personalizado') && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Desde</label>
                    <input 
                      type="date" 
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
                      value={fechaInicio} 
                      onChange={e => setFechaInicio(e.target.value)} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Hasta</label>
                    <input 
                      type="date" 
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} 
                      value={fechaFin} 
                      onChange={e => setFechaFin(e.target.value)} 
                    />
                  </div>
                </>
              )}

              <button 
                onClick={handleFilter} 
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '38px'
                }}
              >
                <Search size={18} /> Filtrar Datos
              </button>
            </div>
          </div>`;

content = content.replace(/<div style=\{\{ display: 'flex', gap: '0\.5rem', alignItems: 'center', flexWrap: 'wrap' \}\}>[\s\S]*?<\/div>\s*<div className=\{styles\.actions\}>/, uiReplacement + `\n<div className={styles.actions}>`);

// Update exportProductos to use appliedFechaInicio / appliedFechaFin instead of fechaInicio/fechaFin directly
content = content.replace(/body: JSON\.stringify\(\{ search, fechaInicio, fechaFin \}\)/g, `body: JSON.stringify({ search: appliedSearch, fechaInicio: appliedFechaInicio, fechaFin: appliedFechaFin })`);


fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
