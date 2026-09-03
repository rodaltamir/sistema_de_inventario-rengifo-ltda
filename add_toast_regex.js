const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const regex = /const handleSearch = \(\) => \{\s*setAppliedFilters\(\{\s*producto: productoUI,\s*categoria: categoriaUI,\s*movimiento: movimientoUI,\s*fechaInicio: fechaInicioUI,\s*fechaFin: fechaFinUI\s*\}\);\s*\};/;

const newHandleSearch = `const handleSearch = () => {
    setAppliedFilters({
      producto: productoUI,
      categoria: categoriaUI,
      movimiento: movimientoUI,
      fechaInicio: fechaInicioUI,
      fechaFin: fechaFinUI
    });
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Datos actualizados'
    });
  };`;

content = content.replace(regex, newHandleSearch);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
console.log("Replaced using regex.");
