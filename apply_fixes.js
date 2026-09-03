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

content = content.replace(oldHandleSearch, newHandleSearch);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);

let apiContent = fs.readFileSync("src/app/api/export-kardex/route.ts", "utf8");
apiContent = apiContent.replace("worksheet.getColumn('F').width = 18;", "worksheet.getColumn('F').width = 14;");
fs.writeFileSync("src/app/api/export-kardex/route.ts", apiContent);
