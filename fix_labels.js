const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

const codigoRegex = /<div className=\{`\$\{styles\.formGroup\} \$\{styles\.formGroupFull\}`\}>\s*<label className=\{styles\.formLabel\}>C[^]+digo \*<\/label>/;
const newCodigo = `<div className={\`\${styles.formGroup} \${styles.formGroupFull}\`}>
                      <label className={styles.formLabel}>Fecha de Registro</label>
                      <input
                        type="date"
                        className={styles.formInput}
                        value={fechaCreacion}
                        onChange={e => setFechaCreacion(e.target.value)}
                      />
                    </div>
                    <div className={\`\${styles.formGroup} \${styles.formGroupFull}\`}>
                      <label className={styles.formLabel}>C\u00f3digo *</label>`;

if (content.match(codigoRegex)) {
  content = content.replace(codigoRegex, newCodigo);
  console.log("Replaced Codigo");
}

const anioRegex = /<label style=\{\{ display: 'block', fontWeight: 'bold', marginBottom: '0\.5rem', fontSize: '0\.85rem', color: '#374151' \}\}>\s*A[^]+o \*\s*<\/label>\s*<input\s*type="date"/;
const newAnio = `<label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#374151' }}>
                      Fecha *
                    </label>
                    <input
                      type="date"`;

if (content.match(anioRegex)) {
  content = content.replace(anioRegex, newAnio);
  console.log("Replaced Anio");
}

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
