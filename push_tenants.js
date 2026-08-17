const { PrismaClient } = require('./prisma/generated/master');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function main() {
  const master = new PrismaClient();
  const tenants = await master.tenant.findMany();
  console.log(`Found ${tenants.length} tenants`);
  for (const t of tenants) {
    console.log(`Pushing schema to ${t.name} (${t.connectionString})...`);
    try {
      const { stdout, stderr } = await execAsync(`npx prisma db push --schema=prisma/tenant.prisma`, {
        env: { ...process.env, TENANT_DATABASE_URL: t.connectionString }
      });
      console.log(stdout);
      if (stderr) console.error(stderr);
    } catch(e) {
      console.error(`Error pushing to ${t.name}:`, e.message);
    }
  }
  
  console.log("Generating tenant client...");
  try {
     const { stdout } = await execAsync(`npx prisma generate --schema=prisma/tenant.prisma`, {
        env: { ...process.env, TENANT_DATABASE_URL: 'postgresql://postgres:admin@localhost:5432/inventario_master?schema=public' }
      });
      console.log(stdout);
  } catch (e) {
      console.error("Error generating client", e.message);
  }
  
  process.exit(0);
}
main();
