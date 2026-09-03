const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const bad = `                            <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                          </>
                      )}
                    </tr>`;

const good = `                            <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
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

content = content.replace(bad, good);

// Also let's fix that extra duplicate `});` in the diff above:
const duplicateEnd = `                      totSaldoCant += r.saldo; totSaldoBs += r.saldoBs;
                    });
                    });

                  return (`;
const singleEnd = `                      totSaldoCant += r.saldo; totSaldoBs += r.saldoBs;
                    });

                  return (`;

content = content.replace(duplicateEnd, singleEnd);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
