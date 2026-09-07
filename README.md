# 📦 Sistema de Gestión de Inventario Multi-Empresa — Rengifo Ltda.

Sistema empresarial completo para la gestión de inventarios, compras, ventas, control de créditos/deudas y valuación contable de inventarios (Kardex Físico-Valorado) con arquitectura **Multi-Tenant** aislada por base de datos.

---

## 🚀 Tecnologías Principales

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- **Frontend**: [React 19](https://react.dev/), TypeScript, Tailwind CSS v4, Lucide Icons, Chart.js
- **ORM & Base de Datos**: [Prisma ORM 5](https://www.prisma.io/), [PostgreSQL 15](https://www.postgresql.org/)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/) con encriptación bcryptjs
- **Reportes**: [ExcelJS](https://github.com/exceljs/exceljs) (plantillas contables XLSX) y [jsPDF](https://github.com/parallax/jsPDF)
- **Contenedores**: Docker & Docker Compose con builds optimizados multi-stage (`node:20-alpine`)

---

## 🏛️ Arquitectura del Sistema

### Arquitectura Multi-Tenant (Database-per-Tenant)
El sistema implementa una separación estricta de datos:
1. **Base de Datos Master (`inventario_master_db`)**:
   - Gestiona las cuentas de usuarios globales, roles y credenciales.
   - Almacena el catálogo de empresas registradas (Tenants) y sus cadenas de conexión independientes (`connectionString`).
2. **Bases de Datos de Tenants (`tenant_<empresa>`)**:
   - Cada empresa cuenta con una base de datos PostgreSQL completamente independiente.
   - Aloja el catálogo de productos, categorías, proveedores, clientes, transacciones de compra/venta, líneas de detalle y registros contables de Kardex.
   - Garantiza aislamiento total de información entre sucursales o empresas asociadas.

```
                  ┌───────────────────────────────┐
                  │    Next.js 16 Application     │
                  │   (NextAuth + Server Actions) │
                  └──────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
        ┌────────▼────────┐             ┌────────▼────────┐
        │  Master DB      │             │ Dynamic Tenants │
        │  (Users/Tenants)│             │ (ConnectionPool)│
        └─────────────────┘             └────────┬────────┘
                                                 │
                        ┌────────────────────────┼────────────────────────┐
                        │                        │                        │
                 ┌──────▼──────┐          ┌──────▼──────┐          ┌──────▼──────┐
                 │  Empresa 1  │          │  Empresa 2  │          │  Empresa N  │
                 │  (Tenant DB)│          │  (Tenant DB)│          │  (Tenant DB)│
                 └─────────────┘          └─────────────┘          └─────────────┘
```

---

## 🌟 Módulos y Funcionalidades

### 1. 📊 Dashboard Gerencial
- Métricas clave en tiempo real: Total de productos, valor del inventario, ventas y compras del periodo.
- Gráficos interactivos de movimientos e indicadores de stock crítico o agotado.

### 2. 🛒 Módulo Transaccional Híbrido (Compras y Ventas)
- Registro ágil de ventas y compras con actualización automática del stock en bodega.
- Soporte para ventas y compras con factura o sin factura ("Sin factura / Sin nombre").
- Múltiples formas de pago: **Efectivo**, **Tarjeta**, **Transferencia** y **Crédito** (con registro de abono inicial y generación de saldos pendientes).
- Calculadora integrada para **DIM (Declaración de Importación de Mercancías)**.
- Creación rápida de productos desde el mismo formulario de compra con asignación de fecha de registro.

### 3. 📦 Catálogo de Productos y Categorías
- Ficha técnica completa de productos: Código, nombre, descripción, marca, unidad de medida, proveedor, categoría, costos y precios de venta.
- **Filtro temporal inteligente**: Filtros con presets intuitivos (**Anual**, **Semestral**, **Mensual** y **Personalizado**).
- **Importación Masiva desde Excel**: Carga masiva de inventarios iniciales o productos desde hojas de cálculo, con vista previa interactiva y editable antes de consolidar la importación.
- **Exportación a Excel Profesional**: Generación de reportes XLSX en formato estándar con filtros combinables (por categoría, proveedor y rango de fechas).
- **Diseño Responsivo**: Modales flotantes optimizados con encabezado y pie de acción fijos y cuerpo desplazable en cualquier resolución.

### 4. 📈 Kardex Físico-Valorado Oficial
- Valuación contable de inventario conforme a normas contables.
- Métodos soportados:
  - **Promedio Ponderado (PP)**
  - **Primeras Entradas, Primeras Salidas (PEPS)**
  - **Últimas Entradas, Primeras Salidas (UEPS)**
- Exportación en planillas Excel idénticas a los formatos contables vigentes (cabeceras de empresa, NIT, Casa Matriz, detalle físico y valorado).
- Generación de reportes en PDF con resúmenes de movimiento.

### 5. 👥 Contactos, Proveedores y Clientes
- Gestión unificada de clientes y proveedores con NIT/CI, razón social, teléfonos y direcciones.
- Búsqueda rápida predictiva durante el registro transaccional.

### 6. 💳 Cuentas por Cobrar y por Pagar (Créditos y Deudas)
- Panel de seguimiento de compras y ventas a crédito.
- Registro de amortizaciones, cuotas y abonos parciales o liquidación total.

### 7. 📜 Historial y Trazabilidad de Auditoría
- Bitácora cronológica con filtros de búsqueda por documento, cliente/proveedor, rango de fechas y tipo de transacción.

### 8. 🏢 Gestión Multi-Empresa
- Creación de nuevas empresas con provisión automática de su esquema de base de datos PostgreSQL.
- Selector de empresa activa y personalización de datos fiscales (NIT, Razón Social, Casa Matriz, Sucursales, Logotipo).

---

## 📂 Estructura del Proyecto

```plaintext
sistema_de_inventario-rengifo-ltda/
├── prisma/
│   ├── master.prisma             # Esquema de la base de datos Master (Users, Tenants)
│   └── tenant.prisma             # Esquema de las bases de datos de Tenants (Inventario, Kardex, Ventas)
├── public/
│   ├── templates/                # Plantillas oficiales de exportación Excel (.xlsx)
│   └── uploads/                  # Directorio para logotipos de empresas
├── scripts/
│   ├── create-superadmin.js      # Script de inyección del usuario SUPERADMIN en Master
│   └── update-all-tenants.js     # Script para sincronizar el esquema Prisma en todos los tenants
├── src/
│   ├── app/
│   │   ├── (app)/                # Rutas protegidas del sistema (Layout con Sidebar)
│   │   │   ├── configuracion/    # Configuración de empresa activa
│   │   │   ├── creditos-deudas/  # Cuentas por cobrar y cuentas por pagar
│   │   │   ├── dashboard/        # Métricas y gráficas del inventario
│   │   │   ├── historial/        # Bitácora de auditoría y transacciones
│   │   │   ├── kardex/           # Kardex Físico-Valorado y reportes
│   │   │   ├── productos/        # Catálogo de productos, importación y exportación
│   │   │   ├── proveedores/      # Gestión de proveedores y clientes
│   │   │   ├── transacciones/    # Módulo transaccional (Venta / Compra)
│   │   │   └── ventas-compras/   # Listado y detalle de operaciones comerciales
│   │   ├── api/                  # Endpoints REST y Server Handlers
│   │   │   ├── auth/             # NextAuth y registro de usuarios
│   │   │   ├── export-kardex/    # Generador Excel/PDF de Kardex
│   │   │   ├── export-productos/ # Generador Excel de catálogo de productos
│   │   │   └── tenants/          # Creación y administración dinámica de empresas
│   │   ├── login/                # Pantalla de inicio de sesión
│   │   ├── register/             # Pantalla de registro
│   │   └── select-company/       # Selector de empresa activa al iniciar sesión
│   ├── components/               # Componentes UI reutilizables (Sidebar, Providers, etc.)
│   ├── lib/
│   │   ├── auth.ts               # Configuración de sesiones NextAuth
│   │   ├── prisma.ts             # Factoría de clientes Prisma (Master y Tenant dinámico)
│   │   └── upload.ts             # Utilidades de subida de archivos
│   └── types/                    # Tipado global de TypeScript y extensiones NextAuth
├── Dockerfile                    # Configuración de compilación y ejecución en Docker
├── docker-compose.yml            # Orquestación de contenedores (app + db PostgreSQL)
├── iniciar_servidor.bat          # Acceso directo para levantar y compartir en red LAN (Windows)
└── package.json                  # Dependencias y scripts de mantenimiento
```

---

## 🛠️ Guía de Instalación y Puesta en Marcha

### Opción A: Despliegue con Docker (Recomendado)

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/sistema_de_inventario-rengifo-ltda.git
   cd sistema_de_inventario-rengifo-ltda
   ```

2. **Levantar los servicios**:
   ```bash
   docker compose up -d --build
   ```
   Esto compilará la aplicación Next.js en producción e iniciará el contenedor de la aplicación (`inventario_app`) y la base de datos PostgreSQL (`inventario_db`).

3. **Inyectar el usuario Superadministrador inicial**:
   ```bash
   docker exec inventario_app npm run db:superadmin
   ```

4. **Acceder a la plataforma**:
   - Abrir en el navegador: [http://localhost:8080](http://localhost:8080)
   - Iniciar sesión con las credenciales por defecto (ver sección inferior).

---

### Opción B: Ejecución en Red Local (Windows)

Si deseas compartir el sistema en tu red local (oficina o negocio) para que otras computadoras o tablets puedan ingresar mediante tu dirección IP local:

1. Ejecuta haciendo doble clic en el archivo **`iniciar_servidor.bat`**.
2. El script detectará automáticamente la dirección IP local de tu máquina (ej. `192.168.1.50`), configurará el entorno y levantará los contenedores de Docker.
3. Cualquier dispositivo conectado a la misma red WiFi o cableada podrá ingresar a través de:
   ```plaintext
   http://TU_IP_LOCAL:8080
   ```

---

### Opción C: Ejecución Local en Desarrollo (Sin Docker)

1. **Requisitos**:
   - Node.js 20 o superior
   - Instancia de PostgreSQL en ejecución

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (`.env`)**:
   Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/inventario_master_db?schema=public"
   NEXTAUTH_SECRET="tu-clave-secreta-super-segura-de-al-menos-32-caracteres"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generar clientes y aplicar esquema**:
   ```bash
   npx prisma generate --schema=prisma/master.prisma
   npx prisma generate --schema=prisma/tenant.prisma
   npx prisma db push --schema=prisma/master.prisma
   npm run db:superadmin
   ```

5. **Iniciar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   Acceder a [http://localhost:3000](http://localhost:3000).

---

## 🔧 Comandos Útiles de Mantenimiento

| Comando | Descripción |
|---|---|
| `npm run build` | Compila y optimiza la aplicación para producción. |
| `npm run db:superadmin` | Inyecta o actualiza las credenciales del SUPERADMIN en la base de datos master. |
| `npm run db:migrate-tenants` | Aplica cambios del esquema `prisma/tenant.prisma` a todas las bases de datos de empresas registradas. |
| `docker compose logs -f app` | Muestra los registros en tiempo real del contenedor de la aplicación. |
| `docker compose restart app` | Reinicia el contenedor de la aplicación. |

---

## 🔑 Credenciales por Defecto

- **Usuario**: `audirengifo.ltda@gmail.com`
- **Contraseña**: `inventario18`
- **Rol**: `SUPERADMIN`

> ⚠️ **Nota de Seguridad**: Se recomienda cambiar la contraseña desde el módulo de configuración o mediante script tras el primer despliegue en un entorno productivo.

---

## 📄 Licencia

Desarrollado para **Rengifo Ltda.** Todos los derechos reservados.
