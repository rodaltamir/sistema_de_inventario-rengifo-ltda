const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/ventas-compras/TransaccionesClient.tsx", "utf8");

// State
const stateRegex = /const \[tipoFiltro, setTipoFiltro\] = useState<string>\("TODOS"\);/;
const newState = `const [tipoFiltro, setTipoFiltro] = useState<string>("TODOS");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");`;
content = content.replace(stateRegex, newState);

// Filter logic
const filterRegex = /const filtered = transacciones\.filter\(t => \n\s*tipoFiltro === "TODOS" \? true : t\.tipoTransaccion === tipoFiltro\n\s*\);/;
const newFilter = `const filtered = transacciones.filter(t => {
    if (tipoFiltro !== "TODOS" && t.tipoTransaccion !== tipoFiltro) return false;
    const td = new Date(t.createdAt);
    if (fechaInicio && td < new Date(fechaInicio + "T00:00:00")) return false;
    if (fechaFin && td > new Date(fechaFin + "T23:59:59")) return false;
    return true;
  });`;
content = content.replace(filterRegex, newFilter);

// UI Inputs
const uiRegex = /<select \n\s*className="input-base" \n\s*value=\{tipoFiltro\} \n\s*onChange=\{e => setTipoFiltro\(e\.target\.value\)\}\n\s*style=\{\{ maxWidth: '200px', padding: '0\.5rem', borderRadius: 'var\(--border-radius-sm\)', border: '1px solid var\(--color-border\)' \}\}\n\s*>\n\s*<option value="TODOS">Todas las transacciones<\/option>\n\s*<option value="VENTA">Ventas<\/option>\n\s*<option value="COMPRA">Compras<\/option>\n\s*<\/select>/;
const newUI = `<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Desde:</label>
            <input 
              type="date" 
              className="input-base" 
              value={fechaInicio} 
              onChange={e => setFechaInicio(e.target.value)} 
            />
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Hasta:</label>
            <input 
              type="date" 
              className="input-base" 
              value={fechaFin} 
              onChange={e => setFechaFin(e.target.value)} 
            />
          </div>
        </div>`;
content = content.replace(uiRegex, newUI);

fs.writeFileSync("src/app/(app)/ventas-compras/TransaccionesClient.tsx", content);
console.log("Updated TransaccionesClient.tsx");
