const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const target = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;

const replacement = `<td style={{ textAlign: 'center' }}>{totSaldoIniCant}</td>
                              <td style={{ textAlign: 'center' }}>{totEntCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totEntBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSalCant}</td>
                              <td></td>
                              <td style={{ textAlign: 'right' }}>{totSalBs.toFixed(6).replace(/\\.?0+$/, "")}</td>
                              <td style={{ textAlign: 'center' }}>{totSaldoCant}</td>
                              <td style={{ textAlign: 'right' }}>{totSaldoBs.toFixed(6).replace(/\\.?0+$/, "")}</td>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    console.log("Replaced target.");
} else {
    // Let's try flexible whitespace
    const flexTarget = /<td style={{ textAlign: 'center' }}>\{totSaldoIniCant\}<\/td>\s*<td style={{ textAlign: 'center' }}>\{totEntCant\}<\/td>\s*<td style={{ textAlign: 'right' }}>\{totEntBs\.toFixed\(6\)\.replace\(\/\\\\\.?0\+\$\/, ""\)\}<\/td>\s*<td style={{ textAlign: 'center' }}>\{totSalCant\}<\/td>\s*<td style={{ textAlign: 'right' }}>\{totSalBs\.toFixed\(6\)\.replace\(\/\\\\\.?0\+\$\/, ""\)\}<\/td>\s*<td style={{ textAlign: 'center' }}>\{totSaldoCant\}<\/td>\s*<td style={{ textAlign: 'right' }}>\{totSaldoBs\.toFixed\(6\)\.replace\(\/\\\\\.?0\+\$\/, ""\)\}<\/td>/;
    if (flexTarget.test(content)) {
        content = content.replace(flexTarget, replacement);
        console.log("Replaced flex target.");
    } else {
        console.log("Target not found at all.");
    }
}
fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
