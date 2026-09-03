const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const oldHandleSearch = `  const handleSearch = () => {
    setAppliedFilters({
      producto: productoUI,
      categoria: categoriaUI,
      movimiento: movimientoUI,
      fechaInicio: fechaInicioUI,
      fechaFin: fechaFinUI
    });
  };`;

const newHandleSearch = `  const handleSearch = () => {
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

if (content.includes(oldHandleSearch)) {
  content = content.replace(oldHandleSearch, newHandleSearch);
  fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
  console.log("Toast added.");
} else {
  console.log("Could not find old handleSearch.");
}
