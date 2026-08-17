import { execSync } from 'child_process';
import { PrismaClient } from './prisma/generated/master/index.js';

async function migrateAllTenants() {
  const masterPrisma = new PrismaClient();
  
  console.log("Fetching all tenants from Master DB...");
  const tenants = await masterPrisma.tenant.findMany();
  
  console.log(`Found ${tenants.length} tenants. Starting migration...`);
  
  for (const tenant of tenants) {
    console.log(`\nMigrating tenant: ${tenant.name} (${tenant.id})`);
    try {
      execSync('npx prisma db push --schema prisma/tenant.prisma --accept-data-loss', {
        env: {
          ...process.env,
          TENANT_DATABASE_URL: tenant.connectionString
        },
        stdio: 'inherit'
      });
      console.log(`Successfully migrated ${tenant.name}`);
    } catch (error) {
      console.error(`Failed to migrate ${tenant.name}:`, error.message);
    }
  }

  // Generate the client
  console.log("\nGenerating Prisma Tenant Client...");
  execSync('npx prisma generate --schema prisma/tenant.prisma', { stdio: 'inherit' });
  
  await masterPrisma.$disconnect();
  console.log("Migration complete!");
}

migrateAllTenants().catch(console.error);
