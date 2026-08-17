"use server";

import { getTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function procesarTransaccion(data: {
  tipoTransaccion: "VENTA" | "COMPRA";
  nroDocumento: string;
  fecha: string;
  nitCi: string;
  razonSocial: string;
  formaPago: string;
  descuento: number;
  abonoInicial?: number;
  observaciones: string;
  detalles: Array<{
    productoCodigo: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }>;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.currentConnectionString) {
    throw new Error("No hay sesión activa");
  }

  const tenantPrisma = await getTenantClient(session.user.currentConnectionString);

  // Validate stock if VENTA
  if (data.tipoTransaccion === "VENTA") {
    for (const d of data.detalles) {
      const p = await tenantPrisma.producto.findUnique({ where: { codigo: d.productoCodigo } });
      if (!p) throw new Error(`Producto ${d.productoCodigo} no encontrado.`);
      if (p.stock < d.cantidad) {
        throw new Error(`Stock insuficiente para el producto ${p.nombre}. Disponible: ${p.stock}`);
      }
    }
  }

  // Calculate total
  const totalDetalles = data.detalles.reduce((acc, curr) => acc + curr.subtotal, 0);
  const totalPagado = totalDetalles - data.descuento;

  // Use a transaction
  const result = await tenantPrisma.$transaction(async (tx) => {
    // 1. Crear Transaccion
    const t = await tx.transaccion.create({
      data: {
        tipoTransaccion: data.tipoTransaccion,
        nroDocumento: data.nroDocumento,
        fecha: new Date(data.fecha),
        nitCi: data.nitCi,
        razonSocial: data.razonSocial,
        formaPago: data.formaPago,
        descuento: data.descuento,
        observaciones: data.observaciones,
        detalles: {
          create: data.detalles.map(d => ({
            productoCodigo: d.productoCodigo,
            cantidad: d.cantidad,
            precioUnitario: d.precioUnitario,
            subtotal: d.subtotal
          }))
        }
      }
    });

    // 2. Adjust Stock
    for (const d of data.detalles) {
      if (data.tipoTransaccion === "VENTA") {
        await tx.producto.update({
          where: { codigo: d.productoCodigo },
          data: { stock: { decrement: d.cantidad } }
        });
      } else {
        // COMPRA
        await tx.producto.update({
          where: { codigo: d.productoCodigo },
          data: { stock: { increment: d.cantidad } }
        });
      }
    }

    // 3. Create Pago if not CREDITO, or handle Abono Inicial
    if (data.formaPago !== "CREDITO") {
      await tx.pago.create({
        data: {
          transaccionId: t.id,
          monto: totalPagado,
          fecha: new Date(data.fecha),
          observaciones: "Pago completado al contado"
        }
      });
    } else {
      const abono = data.abonoInicial || 0;
      const saldoPendiente = totalPagado - abono;
      
      // Create DeudaCredito
      await tx.deudaCredito.create({
        data: {
          transaccionId: t.id,
          montoTotal: totalPagado,
          saldoPendiente: saldoPendiente,
          estado: saldoPendiente <= 0 ? "PAGADO" : "PENDIENTE"
        }
      });

      if (abono > 0) {
        await tx.pago.create({
          data: {
            transaccionId: t.id,
            monto: abono,
            fecha: new Date(data.fecha),
            observaciones: "Pago Inicial al registrar transacción"
          }
        });
      }
    }

    return t;
  });

  revalidatePath("/transacciones");
  revalidatePath("/productos"); // since stock changed
  return result;
}
