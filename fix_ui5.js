const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

content = content.replace(/<input\s*type="text"\s*placeholder="Buscar c.digo o nombre\.\.\."\s*style=\{\{\s*maxWidth:\s*'300px'\s*\}\}\s*value=\{search\}\s*onChange=\{e\s*=>\s*setSearch\(e\.target\.value\)\}\s*className="input-base"\s*\/>/g, `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Buscar código o nombre..."
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
            </div>`);

content = content.replace(/<div className=\{styles\.formGroup\}>\s*<label className=\{styles\.formLabel\}>C.digo \*<\/label>/g, `<div className={styles.formGroup}>
                      <label className={styles.formLabel}>Fecha de Registro</label>
                      <input
                        type="date"
                        className={styles.formInput}
                        value={fechaCreacion}
                        onChange={e => setFechaCreacion(e.target.value)}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Código *</label>`);

content = content.replace(/A.o \*/g, "Fecha *");
content = content.replace(/<input\s*type="number"\s*className=\{styles\.formInput\}\s*placeholder="202[34]"\s*value=\{importDate\}\s*onChange=\{e\s*=>\s*setImportDate\(e\.target\.value\)\}\s*\/>/g, `<input
                      type="date"
                      className={styles.formInput}
                      value={importDate}
                      onChange={e => setImportDate(e.target.value)}
                    />`);

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
console.log("Done");
