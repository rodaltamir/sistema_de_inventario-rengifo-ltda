const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const regex1 = /const date = new Date\(m\.transaccion\.fecha\);\s*const costoMovimiento = isCompra \? m\.subtotal : \(m\.cantidad \* m\.producto\.costo\);/;
const replace1 = `const isHistorico = m.transaccion.nroDocumento && m.transaccion.nroDocumento.startsWith('IMP-');
        const date = new Date(m.transaccion.fecha);
        
        const costoMovimiento = (isCompra || isHistorico) ? m.subtotal : (m.cantidad * m.producto.costo);`;

const regex2 = /factura: m\.transaccion\.nroDocumento,\s*precioUnitario: isCompra \? m\.precioUnitario : m\.producto\.costo,/;
const replace2 = `factura: m.transaccion.nroDocumento,
            precioUnitario: (isCompra || isHistorico) ? m.precioUnitario : m.producto.costo,`;

let changed = false;
if (regex1.test(content)) {
  content = content.replace(regex1, replace1);
  changed = true;
  console.log("Replaced regex 1");
}
if (regex2.test(content)) {
  content = content.replace(regex2, replace2);
  changed = true;
  console.log("Replaced regex 2");
}

if(changed) fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
