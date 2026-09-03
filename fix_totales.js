const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const oldTotalesImportes = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;

const newTotalesImportes = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td></td> {/* Empty P/U */}
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td></td> {/* Empty P/U */}
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;

content = content.replace(oldTotalesImportes, newTotalesImportes);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
