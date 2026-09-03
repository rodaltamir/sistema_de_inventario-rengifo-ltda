const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/productos/ProductosClient.tsx", "utf8");

const oldCode1 = `  const toggleProductoSelection = (codigo: string) => {
    setSelectedProductos(prev =>
      prev.includes(codigo) ? prev.filter(c => c !== codigo) : [...prev, codigo]
    );
  };

  return (`;

const newCode1 = `  const toggleProductoSelection = (codigo: string) => {
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

const oldCode2 = `<button className={\`btn \${styles.btnSuccess}\`} title="Exportar a Excel/PDF">
              <Download size={18} /> Exportar
            </button>`;

const newCode2 = `<button onClick={handleExport} className={\`btn \${styles.btnSuccess}\`} title="Exportar a Excel/PDF">
              <Download size={18} /> Exportar
            </button>`;

if (content.includes(oldCode1)) {
  content = content.replace(oldCode1, newCode1);
  if (content.includes(oldCode2)) {
    content = content.replace(oldCode2, newCode2);
    fs.writeFileSync("src/app/(app)/productos/ProductosClient.tsx", content);
    console.log("Successfully replaced both blocks.");
  } else {
    console.log("Failed to find block 2.");
  }
} else {
  console.log("Failed to find block 1.");
}
