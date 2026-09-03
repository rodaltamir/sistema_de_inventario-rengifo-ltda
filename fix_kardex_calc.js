const fs = require("fs");
let content = fs.readFileSync("src/app/(app)/kardex/KardexClient.tsx", "utf8");

const oldCode1 = `      filteredMovs.forEach(m => {
        const isImportacion = m.transaccion.tipoTransaccion === 'SALDO INICIAL' || m.transaccion.tipoTransaccion === 'IMPORTACIN INICIAL';
        const isCompra = isImportacion || m.transaccion.tipoTransaccion === 'COMPRA' || m.transaccion.tipoTransaccion === 'ENTRADA';
        const date = new Date(m.transaccion.fecha);
        
        const costoMovimiento = isCompra ? m.subtotal : (m.cantidad * m.producto.costo);`;

const newCode1 = `      filteredMovs.forEach(m => {
        const isImportacion = m.transaccion.tipoTransaccion === 'SALDO INICIAL' || m.transaccion.tipoTransaccion === 'IMPORTACIN INICIAL';
        const isCompra = isImportacion || m.transaccion.tipoTransaccion === 'COMPRA' || m.transaccion.tipoTransaccion === 'ENTRADA';
        const isHistorico = m.transaccion.nroDocumento && m.transaccion.nroDocumento.startsWith('IMP-');
        const date = new Date(m.transaccion.fecha);
        
        const costoMovimiento = (isCompra || isHistorico) ? m.subtotal : (m.cantidad * m.producto.costo);`;

const oldCode2 = `          rows.push({
            id: m.id,
            fecha: date.toLocaleDateString(),
            movimiento: m.transaccion.tipoTransaccion,
            nitCi: m.transaccion.nitCi,
            nombre: m.transaccion.razonSocial,
            factura: m.transaccion.nroDocumento,
            precioUnitario: isCompra ? m.precioUnitario : m.producto.costo,`;

const newCode2 = `          rows.push({
            id: m.id,
            fecha: date.toLocaleDateString(),
            movimiento: m.transaccion.tipoTransaccion,
            nitCi: m.transaccion.nitCi,
            nombre: m.transaccion.razonSocial,
            factura: m.transaccion.nroDocumento,
            precioUnitario: (isCompra || isHistorico) ? m.precioUnitario : m.producto.costo,`;

if (content.includes(oldCode1)) {
  content = content.replace(oldCode1, newCode1);
  if (content.includes(oldCode2)) {
    content = content.replace(oldCode2, newCode2);
    fs.writeFileSync("src/app/(app)/kardex/KardexClient.tsx", content);
    console.log("Successfully replaced both blocks.");
  } else {
    console.log("Failed to find block 2.");
  }
} else {
  console.log("Failed to find block 1.");
}
