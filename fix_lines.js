const fs = require("fs");
let lines = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8").split("\n");

const correctBlock = `                      <td colSpan={4} style={{ textAlign: 'right' }}>TOTALES</td>
                          {conImportes ? (
                            <>
                              <td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                            </>
                          ) : (
                            <>
                              <td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                            </>
                          )}
                    </tr>`;

// Replace lines 945 to 959 (indices 945 to 959)
lines.splice(945, 15, correctBlock);

fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", lines.join("\n"));
