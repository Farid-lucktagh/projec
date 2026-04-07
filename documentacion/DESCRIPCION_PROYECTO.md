# LuckFeer - Sistema de Gestión de Ferretería

## Descripción General del Proyecto

LuckFeer es un sistema web completo de gestión para ferreterías que permite administrar inventario, clientes, ventas, reportes y usuarios. El sistema está diseñado con una interfaz moderna, intuitiva y optimizada para uso en PC y tablet.

## Especificaciones Técnicas

### Stack Tecnológico
- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** React 19 con Inertia.js 2.0
- **UI Framework:** TypeScript
- **Styling:** Tailwind CSS v4
- **Componentes:** shadcn/ui (Radix UI)
- **Gráficos:** Recharts
- **Base de Datos:** MySQL
- **Autenticación:** Laravel Fortify con 2FA

## Funcionalidades Principales

### 1. Sistema de Autenticación
**Ubicación:** `/login`

**Características:**
- Login con email y contraseña.
- Autenticación de dos factores (2FA) integrada.
- Gestión de sesiones segura con Laravel.
- Diseño moderno y responsive.

### 2. Dashboard y Reportes
**Ubicación:** `/reports`

**Elementos:**
- **Métricas en tiempo real:** Ventas totales, dinero en caja hoy, clientes atendidos y productos vendidos.
- **Gráfica de Ventas:** Visualización de tendencias con filtros de rango de fechas personalizados.
- **Búsqueda Global:** Buscador integrado en todas las tablas principales.

### 3. Gestión de Productos
**Ubicación:** `/products`

**Funcionalidades:**
- **Listado avanzado:** Muestra nombres de categorías y proveedores.
- **Búsqueda inteligente:** Filtra por nombre de producto, categoría o proveedor simultáneamente.
- **Control de Stock:** Seguimiento automático con estados (Disponible, Bajo, Sin Stock).

### 4. Gestión de Ventas y Facturación
**Ubicación:** `/sales` y `/invoices`

**Funcionalidades:**
- **Búsqueda por Cliente:** Filtrado por nombre o número de documento.
- **Facturación:** Generación de códigos únicos (FAC-XXXXXX) y cálculo automático de impuestos/descuentos.
- **Integridad:** Transacciones de base de datos para asegurar que el stock siempre sea consistente.

## Diseño y UX

### Layout
- **Sidebar fijo** en escritorio
- **Menú hamburguesa** en tablet
- **Header** con breadcrumbs y usuario
- **Contenido principal** con padding consistente
- **Responsive design** para 1024px+ (tablet) y 1440px+ (desktop)

### Componentes Reutilizables
- Buttons con estados (default, hover, disabled)
- Cards con shadow y border
- Dialogs modales para formularios
- Alerts para notificaciones
- Badges para estados
- Tables con pagination
- Select y Input con validación
- Date Pickers
- Search bars
- Dropdowns con iconos

### Animaciones
- Transiciones suaves en hover (200ms)
- Fade in para modales
- Skeleton loaders para carga
- Toast notifications
- Smooth scroll

### Accesibilidad
- Contraste WCAG AA
- Navegación por teclado
- ARIA labels
- Focus visible
- Mensajes de error claros

## Flujos de Usuario

### Flujo de Venta Completa
1. Login al sistema
2. Navegar a Ventas
3. Seleccionar cliente (o crear nuevo)
4. Buscar y agregar productos
5. Ajustar cantidades
6. Revisar cálculos automáticos
7. Seleccionar método de pago
8. Procesar venta
9. Ver confirmación
10. Imprimir ticket (opcional)

### Flujo de Reabastecimiento
1. Revisar Dashboard → Alertas de stock bajo
2. O ir a Reportes → Stock bajo
3. Identificar productos críticos
4. Clic en "Reordenar"
5. Ir a Productos → Editar
6. Actualizar cantidad de stock
7. Registrar proveedor y costo

### Flujo de Registro de Cliente
1. Navegar a Clientes
2. Clic en "Agregar Cliente"
3. Llenar formulario
4. Validar documento único
5. Guardar cliente
6. Ver en listado
7. Usar en próxima venta

## Datos de Ejemplo

### Categorías
- Herramientas Manuales
- Herramientas Eléctricas
- Materiales de Construcción
- Plomería
- Electricidad
- Pinturas
- Ferretería General
- Seguridad

### Productos (ejemplos)
- Martillo de garra 16oz - $12.50
- Taladro Dewalt 20V - $145.00
- Cemento Holcim 50kg - $8.75
- Pintura Latex Blanco 4L - $22.50
- Cable eléctrico #12 AWG - $1.85/m
- Tubo PVC 1/2" - $3.25

### Métodos de Pago
- Efectivo
- Tarjeta de Crédito
- Tarjeta de Débito
- Transferencia Bancaria

## Notas Técnicas

### Seguridad
- Passwords hasheados
- Validación de sesiones
- CSRF protection
- Input sanitization
- SQL injection prevention
- XSS protection

### Performance
- Code splitting por ruta
- Lazy loading de componentes
- Optimización de imágenes
- Caché de datos estáticos
- Debounce en búsquedas

### Mantenimiento
- Código modular y reutilizable
- Componentes documentados
- Tipado estricto con TypeScript
- Naming conventions consistentes
- Git workflow establecido

## Próximas Funcionalidades (Roadmap)

### Fase 2
- Generación de facturas PDF
- Sistema de notificaciones
- Dashboard de análisis avanzado
- Gestión de proveedores
- Control de cuentas por cobrar

### Fase 3
- App móvil (React Native)
- Lector de códigos de barras
- Integración con POS físico
- Multi-sucursal
- API REST pública

### Fase 4
- Sistema de fidelización
- Promociones y descuentos
- Inventario por lotes
- Trazabilidad completa
- BI y predicción de ventas
