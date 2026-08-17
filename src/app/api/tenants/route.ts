import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { masterPrisma } from "@/lib/prisma";
import { exec } from "child_process";
import util from "util";
import crypto from "crypto";
import { saveBase64Image } from "@/lib/upload";

const execAsync = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    let { name, nit, casaMatriz, sucursal, telefono, logo } = body;
    if (!name) return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });

    const tenantId = crypto.randomUUID();
    
    // Si el logo es un base64, lo guardamos como archivo
    logo = await saveBase64Image(logo, `tenant-${tenantId}`);

    const schemaName = `tenant_${tenantId.replace(/-/g, '')}`;
    
    const masterUrl = process.env.DATABASE_URL || "";
    if (!masterUrl) throw new Error("DATABASE_URL no está configurado.");

    const connectionString = masterUrl.includes('?') 
      ? `${masterUrl}&schema=${schemaName}`
      : `${masterUrl}?schema=${schemaName}`;

    // 1. Registrar el tenant y asociarlo al usuario actual en Master DB
    const tenant = await masterPrisma.tenant.create({
      data: {
        id: tenantId,
        name,
        nit,
        casaMatriz,
        sucursal,
        telefono,
        logo,
        connectionString,
        users: {
          create: {
            userId: session.user.id
          }
        }
      }
    });

    // 2. Ejecutar prisma db push para crear las tablas en el nuevo esquema
    // Esto conectará a la BD con el connectionString y aplicará tenant.prisma
    await execAsync(`npx prisma db push --schema=prisma/tenant.prisma --accept-data-loss`, {
      env: {
        ...process.env,
        TENANT_DATABASE_URL: connectionString
      }
    });

    return NextResponse.json({ success: true, tenant });
  } catch (error: any) {
    console.error("Error creando tenant:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
