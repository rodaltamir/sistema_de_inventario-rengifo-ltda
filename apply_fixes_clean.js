const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

// 1. Toast
content = content.replace(
  "fechaFin: fechaFinUI\n    });\n  };",
  "fechaFin: fechaFinUI\n    });\n    const Toast = Swal.mixin({ toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); } }); Toast.fire({ icon: 'success', title: 'Datos actualizados' });\n  };"
);

// 2. Web UI TOTALES fixing
const oldWebTotales = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;
const newWebTotales = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;
content = content.replace(oldWebTotales, newWebTotales);

// 3. PDF Variables fix
const oldPdfVars = `        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        kardexData.resumenRows.forEach(r => {
          totEntCant += r.entradas; totEntBs += r.entradasBs;`;
const newPdfVars = `        let totSaldoIniCant = 0;
        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        kardexData.resumenRows.forEach(r => {
          totSaldoIniCant += r.saldoInicial;
          totEntCant += r.entradas; totEntBs += r.entradasBs;`;
content = content.replace(oldPdfVars, newPdfVars);

// 4. PDF body TOTALES fix
const oldPdfTotales = `             body.push([
               { content: 'TOTALES', colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } as any },
               { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totSalBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any }
             ]);`;
const newPdfTotales = `             body.push([
               { content: 'TOTALES', colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } as any },
               { content: typeof totSaldoIniCant !== 'undefined' ? totSaldoIniCant.toString() : '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totSalBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any }
             ]);`;
content = content.replace(oldPdfTotales, newPdfTotales);

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
console.log("Done.");
