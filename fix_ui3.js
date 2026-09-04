const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

// Fix search bar
const searchRegex = /<input[\s\S]*?placeholder="Buscar cdigo o nombre\.\.\."[\s\S]*?\/>/;
if (content.match(searchRegex)) {
  const replaceStr = `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Buscar c\u00f3digo o nombre..."
                style={{ maxWidth: '300px' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-base"
              />
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
            </div>`;
  content = content.replace(searchRegex, replaceStr);
} else {
  console.log("Could not find searchRegex");
}

// Fix Codigo field
const codigoRegex = /<div className=\{styles\.formGroup\}>\s*<label className=\{styles\.formLabel\}>C\ufffdigo \*<\/label>/;
if (content.match(codigoRegex)) {
  const newCodigo = `<div className={styles.formGroup}>
                      <label className={styles.formLabel}>Fecha de Registro</label>
                      <input
                        type="date"
                        className={styles.formInput}
                        value={fechaCreacion}
                        onChange={e => setFechaCreacion(e.target.value)}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>C\u00f3digo *</label>`;
  content = content.replace(codigoRegex, newCodigo);
} else {
  console.log("Could not find Codigo label");
}

// Fix Anio field
const anioRegex = /<label style=\{\{ display: 'block', fontWeight: 'bold', marginBottom: '0\.5rem', fontSize: '0\.85rem', color: '#374151' \}\}>\s*A\ufffdo \*\s*<\/label>\s*<input\s*type="number"/;
if (content.match(anioRegex)) {
  const newAnio = `<label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#374151' }}>
                      Fecha *
                    </label>
                    <input
                      type="date"`;
  content = content.replace(anioRegex, newAnio);
} else {
  console.log("Could not find Anio label");
}

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
