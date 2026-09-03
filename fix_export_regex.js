const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

const regex1 = /const toggleProductoSelection = \(codigo: string\) => \{\s*setSelectedProductos\(prev =>\s*prev\.includes\(codigo\) \? prev\.filter\(c => c !== codigo\) : \[\.\.\.prev, codigo\]\s*\);\s*\};\s*return \(/;

const replace1 = `const toggleProductoSelection = (codigo: string) => {
    setSelectedProductos(prev =>
      prev.includes(codigo) ? prev.filter(c => c !== codigo) : [...prev, codigo]
    );
  };

  const handleExport = async () => {
    try {
      Swal.fire({
        title: 'Exportando...',
        text: 'Por favor espere mientras se genera el archivo.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const res = await fetch("/api/export-productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filterCategoria, search })
      });

      if (!res.ok) throw new Error("Error al exportar");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Productos_Exportados.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      Swal.close();
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Hubo un error al exportar', 'error');
    }
  };

  return (`;

const regex2 = /<button className=\{`btn \$\{styles\.btnSuccess\}`\} title="Exportar a Excel\/PDF">\s*<Download size=\{18\} \/> Exportar\s*<\/button>/;

const replace2 = `<button onClick={handleExport} className={\`btn \${styles.btnSuccess}\`} title="Exportar a Excel/PDF">
              <Download size={18} /> Exportar
            </button>`;

let changed = false;
if (regex1.test(content)) {
  content = content.replace(regex1, replace1);
  changed = true;
  console.log("Replaced regex 1");
}
if (regex2.test(content)) {
  content = content.replace(regex2, replace2);
  changed = true;
  console.log("Replaced regex 2");
}

if(changed) fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
