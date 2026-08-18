const { PrismaClient } = require('./prisma/generated/master/index.js');
const bcrypt = require('bcryptjs');

async function createSuperAdmin() {
  const masterPrisma = new PrismaClient();
  try {
    const email = 'audirengifo.ltda@gmail.com';
    const plainPassword = 'inventario18';
    
    console.log(`Verificando o creando superusuario para: ${email}`);
    
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const user = await masterPrisma.user.upsert({
      where: { email: email },
      update: { 
        password: hashedPassword, 
        role: 'SUPERADMIN',
        name: 'Super Administrador'
      },
      create: {
        email: email,
        password: hashedPassword,
        name: 'Super Administrador',
        role: 'SUPERADMIN'
      }
    });

    console.log('');
    console.log('✅ ¡SUPERUSUARIO INYECTADO CON ÉXITO!');
    console.log(`Email: ${user.email}`);
    console.log(`Rol: ${user.role}`);
    console.log('==========================================');
  } catch (error) {
    console.error('❌ Error inyectando el superusuario:', error);
  } finally {
    await masterPrisma.$disconnect();
  }
}

createSuperAdmin();
