const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

// Fix Web UI TOTALES conImportes
const regexWeb = /<td style={{ textAlign: 'center' }}>\{totEntCant\}<\/td>[\s\n]*<td style={{ textAlign: 'right' }}>\{totEntBs\.toFixed\(6\)\.replace\(\/\\\\\.?0\+\$\/, ""\)\}<\/td>/g;
content = content.replace(regexWeb, `<td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`);

const regexWeb2 = /<td style={{ textAlign: 'center' }}>\{totSalCant\}<\/td>[\s\n]*<td style={{ textAlign: 'right' }}>\{totSalBs\.toFixed\(6\)\.replace\(\/\\\\\.?0\+\$\/, ""\)\}<\/td>/g;
content = content.replace(regexWeb2, `<td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`);

// Fix PDF Export TOTALES conImportes
const regexPdf = /\{ content: 'TOTALES', colSpan: 4, styles: \{ fontStyle: 'bold', halign: 'right' \} as any \},[\s\n]*\{ content: totEntCant\.toString\(\), styles: \{ fontStyle: 'bold' \} as any \}/g;
content = content.replace(regexPdf, `{ content: 'TOTALES', colSpan: 4, styles: { fontStyle: 'bold', halign: 'right' } as any },
               { content: typeof totSaldoIniCant !== 'undefined' ? totSaldoIniCant.toString() : '-', styles: { fontStyle: 'bold', halign: 'center' } as any },
               { content: totEntCant.toString(), styles: { fontStyle: 'bold', halign: 'center' } as any }`);

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
