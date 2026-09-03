const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const oldTotalesPdfResumen = `          if (kardexData.resumenRows.length > 0) {
             body.push([
               { content: 'TOTALES', colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } as any },
               { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totSalBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any }
             ]);
          }`;

const newTotalesPdfResumen = `          if (kardexData.resumenRows.length > 0) {
             body.push([
               { content: 'TOTALES', colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } as any },
               { content: totSaldoIniCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: totEntCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSalCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totSalBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoCant.toString(), styles: { fontStyle: 'bold' } as any },
               { content: totSaldoBs.toFixed(6).replace(/\\.?0+$/, ""), styles: { fontStyle: 'bold' } as any }
             ]);
          }`;

content = content.replace(oldTotalesPdfResumen, newTotalesPdfResumen);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
