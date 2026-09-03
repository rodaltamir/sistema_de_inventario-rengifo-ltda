const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const trans = await prisma.transaccion.findMany({
    take: 5
  });
  console.log(trans);
}

main().catch(console.error).finally(() => prisma.$disconnect());
