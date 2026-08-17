import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { masterPrisma } from "@/lib/prisma";
import { saveBase64Image } from "@/lib/upload";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id: tenantId } = await params;
    const body = await request.json();
    let { name, nit, casaMatriz, sucursal, telefono, logo } = body;

    // Si el logo es un base64, lo guardamos como archivo
    logo = await saveBase64Image(logo, `tenant-${tenantId}`);

    if (!name) {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 });
    }

    // Verify the user owns this tenant
    const tenantUser = await masterPrisma.tenantUser.findUnique({
      where: {
        userId_tenantId: {
          userId: session.user.id,
          tenantId: tenantId
        }
      }
    });

    if (!tenantUser) {
      return NextResponse.json({ error: "No tienes permiso para editar esta empresa" }, { status: 403 });
    }

    const updatedTenant = await masterPrisma.tenant.update({
      where: { id: tenantId },
      data: {
        name,
        nit,
        casaMatriz,
        sucursal,
        telefono,
        logo
      }
    });

    return NextResponse.json(updatedTenant);
  } catch (error: any) {
    console.error("Error actualizando tenant:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor", details: error.toString() }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id: tenantId } = await params;

    // Verify the user owns this tenant
    const tenantUser = await masterPrisma.tenantUser.findUnique({
      where: {
        userId_tenantId: {
          userId: session.user.id,
          tenantId: tenantId
        }
      }
    });

    if (!tenantUser) {
      return NextResponse.json({ error: "No tienes permiso para eliminar esta empresa" }, { status: 403 });
    }

    // First delete the relations
    await masterPrisma.tenantUser.deleteMany({
      where: { tenantId: tenantId }
    });

    // Then delete the tenant itself
    await masterPrisma.tenant.delete({
      where: { id: tenantId }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error eliminando tenant:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor", details: error.toString() }, { status: 500 });
  }
}
