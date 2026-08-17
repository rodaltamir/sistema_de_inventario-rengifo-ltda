const { PrismaClient } = require('./prisma/generated/master');
const { execSync } = require('child_process');

async function main() {
  const prisma = new PrismaClient();
  const tenants = await prisma.tenant.findMany();
  
  for (const tenant of tenants) {
    console.log(`Pushing schema for tenant: ${tenant.name}`);
    try {
      execSync(`npx prisma db push --schema=prisma/tenant.prisma`, {
        env: {
          ...process.env,
          TENANT_DATABASE_URL: tenant.connectionString
        },
        stdio: 'inherit'
      });
      console.log(`Successfully pushed for ${tenant.name}`);
    } catch (e) {
      console.error(`Error pushing for ${tenant.name}:`, e.message);
    }
  }
}

main().catch(console.error);
