"use server";

import { getSessionTenantClient } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function registrarAbono(transaccionId: string, monto: number, observaciones: string) {
  try {
    const session = await getServerSession(authOptions);
    const { tenantPrisma } = await getSessionTenantClient(session);

    // Get the debt
    const deuda = await tenantPrisma.deudaCredito.findUnique({
      where: { transaccionId }
    });

    if (!deuda) throw new Error("No se encontró la deuda especificada");

    if (monto > deuda.saldoPendiente) {
      throw new Error(`El abono no puede ser mayor al saldo pendiente (Bs. ${deuda.saldoPendiente.toFixed(2)})`);
    }

    const result = await tenantPrisma.$transaction(async (tx) => {
      // 1. Create the payment
      const pago = await tx.pago.create({
        data: {
          transaccionId,
          monto,
          observaciones: observaciones || "Abono a deuda"
        }
      });

      // 2. Update the debt
      const nuevoSaldo = deuda.saldoPendiente - monto;
      await tx.deudaCredito.update({
        where: { transaccionId },
        data: {
          saldoPendiente: nuevoSaldo,
          estado: nuevoSaldo <= 0.01 ? "PAGADO" : "PENDIENTE"
        }
      });

      return pago;
    });

    revalidatePath("/creditos-deudas");
    return result;
  } catch (err: any) {
    console.error("[registrarAbono Error]:", err);
    throw new Error(err.message || "Error al registrar abono");
  }
}
