# Guía de Instalación - LuckFeer

## Instalación del Proyecto Next.js

### Prerrequisitos
\`\`\`bash
# Verificar versiones
node --version  # Debe ser 18.0 o superior
npm --version   # Debe ser 9.0 o superior
\`\`\`

### Paso 1: Descargar e Instalar Dependencias
\`\`\`bash
# Descomprimir el proyecto
unzip luckfeer-system.zip
cd luckfeer-system

# Instalar dependencias
npm install
\`\`\`

### Paso 2: Configurar Variables de Entorno
\`\`\`bash
# Crear archivo .env.local
cp .env.example .env.local

# Editar con tus datos
nano .env.local
\`\`\`

Contenido del `.env.local`:
\`\`\`env
# Base de datos
DATABASE_URL="mysql://usuario:password@localhost:3306/luckfeer"

# O para PostgreSQL
# DATABASE_URL="postgresql://usuario:password@localhost:5432/luckfeer"

# Configuración de sesión
SESSION_SECRET="tu-secreto-super-seguro-aqui-cambiar-en-produccion"

# Entorno
NODE_ENV="development"
\`\`\`

### Paso 3: Configurar Base de Datos
\`\`\`bash
# Opción A: Desde terminal MySQL
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed_data.sql
mysql -u root -p < database/views_and_procedures.sql

# Opción B: Desde el código
npm run db:setup
\`\`\`

### Paso 4: Iniciar el Proyecto
\`\`\`bash
# Modo desarrollo
npm run dev

# El proyecto estará en http://localhost:3000
\`\`\`

### Paso 5: Acceder al Sistema
\`\`\`
URL: http://localhost:3000
Usuario: admin@luckfeer.com
Contraseña: admin123
\`\`\`

---

## Instalación de la Base de Datos

### Opción 1: MySQL desde Terminal

\`\`\`bash
# 1. Conectar a MySQL
mysql -u root -p

# 2. Crear la base de datos
CREATE DATABASE luckfeer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 3. Usar la base de datos
USE luckfeer;

# 4. Ejecutar schema
SOURCE /ruta/a/database/schema.sql;

# 5. Ejecutar datos de prueba
SOURCE /ruta/a/database/seed_data.sql;

# 6. Crear vistas y procedimientos
SOURCE /ruta/a/database/views_and_procedures.sql;

# 7. Verificar instalación
SHOW TABLES;
\`\`\`

### Opción 2: phpMyAdmin

1. Abrir phpMyAdmin en tu navegador
2. Click en "Nueva" para crear base de datos
3. Nombre: `luckfeer`
4. Cotejamiento: `utf8mb4_unicode_ci`
5. Click en "Crear"
6. Seleccionar la base de datos `luckfeer`
7. Click en la pestaña "Importar"
8. Seleccionar archivo `database/schema.sql`
9. Click en "Continuar"
10. Repetir pasos 7-9 con `seed_data.sql` y `views_and_procedures.sql`

### Opción 3: MySQL Workbench

1. Abrir MySQL Workbench
2. Conectar a tu servidor MySQL
3. File → Run SQL Script
4. Seleccionar `database/schema.sql`
5. Ejecutar
6. Repetir con `seed_data.sql` y `views_and_procedures.sql`

---

## Configuración de Producción

### 1. Variables de Entorno de Producción
\`\`\`env
DATABASE_URL="mysql://usuario:password@tu-servidor:3306/luckfeer?ssl=true"
SESSION_SECRET="usa-un-secreto-muy-largo-y-aleatorio-en-produccion"
NODE_ENV="production"
\`\`\`

### 2. Build del Proyecto
\`\`\`bash
# Compilar para producción
npm run build

# Iniciar en modo producción
npm start
\`\`\`

### 3. Optimizaciones
\`\`\`bash
# Habilitar compresión
npm install compression

# Configurar Nginx como reverse proxy (opcional)
sudo nano /etc/nginx/sites-available/luckfeer
\`\`\`

Configuración de Nginx:
\`\`\`nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

---

## Solución de Problemas Comunes

### Error: "Cannot find module 'next'"
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Error: "Database connection failed"
\`\`\`bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Verificar credenciales en .env.local
# Verificar que la base de datos exista
mysql -u root -p -e "SHOW DATABASES;"
\`\`\`

### Error: "Port 3000 already in use"
\`\`\`bash
# Cambiar puerto en package.json
"dev": "next dev -p 3001"

# O matar el proceso en el puerto
lsof -ti:3000 | xargs kill -9
\`\`\`

### Datos de prueba no aparecen
\`\`\`bash
# Volver a ejecutar seed
mysql -u root -p luckfeer < database/seed_data.sql
\`\`\`

---

## Scripts Útiles

\`\`\`bash
# Desarrollo
npm run dev              # Iniciar en modo desarrollo
npm run build            # Compilar para producción
npm start                # Iniciar en modo producción
npm run lint             # Verificar código

# Base de datos
npm run db:reset         # Resetear base de datos
npm run db:seed          # Cargar datos de prueba
npm run db:backup        # Crear backup
npm run db:restore       # Restaurar backup
\`\`\`

---

## Próximos Pasos

1. ✅ Cambiar contraseñas por defecto
2. ✅ Configurar backups automáticos
3. ✅ Revisar permisos de usuarios
4. ✅ Personalizar datos de la empresa
5. ✅ Agregar productos reales
6. ✅ Capacitar usuarios del sistema

---

**¿Necesitas ayuda?**  
Consulta la documentación completa en `/docs`
