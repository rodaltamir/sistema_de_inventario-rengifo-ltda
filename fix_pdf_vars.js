const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const oldVarsPdf = `        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        kardexData.resumenRows.forEach(r => {
          totEntCant += r.entradas; totEntBs += r.entradasBs;`;

const newVarsPdf = `        let totSaldoIniCant = 0;
        let totEntCant = 0, totEntBs = 0;
        let totSalCant = 0, totSalBs = 0;
        let totSaldoCant = 0, totSaldoBs = 0;

        kardexData.resumenRows.forEach(r => {
          totSaldoIniCant += r.saldoInicial;
          totEntCant += r.entradas; totEntBs += r.entradasBs;`;

content = content.replace(oldVarsPdf, newVarsPdf);
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
