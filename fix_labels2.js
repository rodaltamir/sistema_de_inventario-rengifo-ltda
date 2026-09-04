const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

const codigoRegex = /<div className=\{styles\.formGroup\}>\s*<label className=\{styles\.formLabel\}>C[^]+digo \*<\/label>/;
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

if (content.match(codigoRegex)) {
  content = content.replace(codigoRegex, newCodigo);
  console.log("Replaced Codigo");
}

const anioRegex = /A\ufffdo \*/;
if (content.match(anioRegex)) {
  content = content.replace(anioRegex, "Fecha *");
  console.log("Replaced Anio 1");
}
const anioRegex2 = /A\u00f1o \*/;
if (content.match(anioRegex2)) {
  content = content.replace(anioRegex2, "Fecha *");
  console.log("Replaced Anio 2");
}
const anioRegex3 = /A[^]+o \*/;
if (content.match(anioRegex3)) {
  content = content.replace(anioRegex3, "Fecha *");
  console.log("Replaced Anio 3");
}

fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
