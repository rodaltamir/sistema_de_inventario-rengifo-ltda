const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

// State changes
const stateRegex = /const \[importYear, setImportYear\] = useState<number>\(new Date\(\)\.getFullYear\(\)\);/;
const newState = `const [importDate, setImportDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [fechaCreacion, setFechaCreacion] = useState<string>(new Date().toISOString().split('T')[0]);`;
content = content.replace(stateRegex, newState);

// filtering logic changes
const filterRegex = /const filteredProductos = productos.filter\(p => \{\n\s*if \(search\) \{\n\s*const q = search\.toLowerCase\(\);\n\s*return p\.nombre\.toLowerCase\(\)\.includes\(q\) \|\| p\.codigo\.toLowerCase\(\)\.includes\(q\) \|\| p\.marca\?\.toLowerCase\(\)\.includes\(q\);\n\s*\}\n\s*return true;\n\s*\}\);/;
const newFilter = `const filteredProductos = productos.filter(p => {
    if (fechaInicio) {
      if (new Date(p.createdAt) < new Date(fechaInicio + "T00:00:00")) return false;
    }
    if (fechaFin) {
      if (new Date(p.createdAt) > new Date(fechaFin + "T23:59:59")) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q) || p.marca?.toLowerCase().includes(q);
    }
    return true;
  });`;
content = content.replace(filterRegex, newFilter);

// handleExport payload
const exportPayloadRegex = /body: JSON\.stringify\(\{ search \}\)/;
const newExportPayload = `body: JSON.stringify({ search, fechaInicio, fechaFin })`;
content = content.replace(exportPayloadRegex, newExportPayload);

// Import Modal input
const importYearInput = /<input\s*type="number"\s*value=\{importYear\}\s*onChange=\{e => setImportYear\(parseInt\(e\.target\.value\)\)\}\s*style=\{\{ padding: '0\.5rem', borderRadius: '0\.5rem', border: '1px solid #d1d5db' \}\}\s*\/>/g;
const newImportInput = `<input
                    type="date"
                    value={importDate}
                    onChange={e => setImportDate(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                  />`;
content = content.replace(importYearInput, newImportInput);

// Update importProductos call
const importCallRegex = /await importProductos\(previewData, importDescription, importYear\);/;
const newImportCall = `await importProductos(previewData, importDescription, importDate);`;
content = content.replace(importCallRegex, newImportCall);

// Create Producto form date picker - insert before Codigo
const formGroupCodigo = /<div className=\{`\$\{styles\.formGroup\} \$\{styles\.formGroupFull\}`\}>\s*<label className=\{styles\.formLabel\}>C\u00f3digo del Producto<\/label>/;
const formGroupDate = `<div className={\`\${styles.formGroup} \${styles.formGroupFull}\`}>
                      <label className={styles.formLabel}>Fecha de Registro</label>
                      <input
                        type="date"
                        className={styles.formInput}
                        value={fechaCreacion}
                        onChange={e => setFechaCreacion(e.target.value)}
                      />
                    </div>
                    
                    <div className={\`\${styles.formGroup} \${styles.formGroupFull}\`}>
                      <label className={styles.formLabel}>C\u00f3digo del Producto</label>`;
content = content.replace(formGroupCodigo, formGroupDate);

// Update submit handler to pass fechaCreacion to createProducto
const submitRegex = /const newProduct = await createProducto\(formData\);/;
const newSubmit = `const newProduct = await createProducto({ ...formData, fechaCreacion });`;
content = content.replace(submitRegex, newSubmit);

// Add date filters to UI (next to search bar)
const searchInput = /<input\s*type="text"\s*placeholder="Buscar producto\.\.\."/;
const dateFilters = `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
          <input
            type="text"
            placeholder="Buscar producto..."`;
content = content.replace(searchInput, dateFilters);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Updated ProductosClient.tsx");
