const { PrismaClient } = require('./prisma/generated/master');
const { execSync } = require('child_process');

const masterPrisma = new PrismaClient();

async function updateTenants() {
  try {
    console.log("Obteniendo tenants desde la base de datos master...");
    const tenants = await masterPrisma.tenant.findMany();
    
    if (tenants.length === 0) {
      console.log("No hay tenants registrados. No hay nada que actualizar.");
      return;
    }

    console.log(`Se encontraron ${tenants.length} tenant(s). Empezando actualización...`);

    for (const tenant of tenants) {
      console.log(`\n===========================================`);
      console.log(`Actualizando esquema para la empresa: ${tenant.name}`);
      console.log(`===========================================`);
      
      try {
        // Ejecutar prisma db push configurando la variable de entorno
        execSync('npx prisma db push --schema=prisma/tenant.prisma --accept-data-loss', {
          env: {
            ...process.env,
            TENANT_DATABASE_URL: tenant.connectionString
          },
          stdio: 'inherit'
        });
        console.log(`✅ ¡Esquema de ${tenant.name} actualizado con éxito!`);
      } catch (error) {
        console.error(`❌ Error al actualizar el tenant ${tenant.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error global:", error);
  } finally {
    await masterPrisma.$disconnect();
    console.log("\nProceso finalizado.");
  }
}

updateTenants();
