# Matriz de Trazabilidad - Sistema LuckFeer

Este documento establece la relacion entre los requisitos funcionales, los modulos del sistema, las tablas de base de datos, los archivos de codigo fuente y los criterios de aceptacion del proyecto LuckFeer.

---

## 1. Identificacion de Requisitos Funcionales

| ID | Requisito | Prioridad | Estado |
|----|-----------|:---------:|:------:|
| RF-001 | El sistema debe permitir el inicio de sesion con correo y contrasena | Alta | Implementado |
| RF-002 | El sistema debe manejar 3 roles: Administrador, Vendedor, Cajero | Alta | Implementado |
| RF-003 | El sistema debe redirigir al dashboard segun el rol del usuario | Alta | Implementado |
| RF-004 | El sistema debe mostrar un dashboard con metricas de ventas | Alta | Implementado |
| RF-005 | El sistema debe mostrar alertas de stock bajo en el dashboard | Media | Implementado |
| RF-006 | El sistema debe permitir la gestion completa de productos (CRUD) | Alta | Implementado |
| RF-007 | El sistema debe validar que el nombre del producto no contenga numeros | Media | Implementado |
| RF-008 | El sistema debe permitir subir imagenes al registrar productos | Media | Implementado |
| RF-009 | El sistema debe permitir la gestion completa de categorias (CRUD) | Alta | Implementado |
| RF-010 | El sistema debe permitir la gestion completa de clientes (CRUD) | Alta | Implementado |
| RF-011 | El sistema debe clasificar clientes como VIP, Regular o Inactivo | Media | Implementado |
| RF-012 | El sistema debe permitir registrar ventas con seleccion de cliente y productos | Alta | Implementado |
| RF-013 | El sistema debe calcular automaticamente subtotal, IVA (12%) y total | Alta | Implementado |
| RF-014 | El sistema debe permitir facturacion rapida para el cajero sin cliente registrado | Alta | Implementado |
| RF-015 | El sistema debe permitir ingresar nombre y documento del cliente manualmente en facturacion | Alta | Implementado |
| RF-016 | El sistema debe generar un codigo unico por factura (FAC-YYYY-NNNNNN) | Alta | Implementado |
| RF-017 | El sistema debe permitir descargar facturas en PDF | Alta | Implementado |
| RF-018 | El sistema debe permitir descargar facturas en Excel | Alta | Implementado |
| RF-019 | El sistema debe permitir imprimir facturas | Alta | Implementado |
| RF-020 | El sistema debe mostrar reportes de ventas por dia con graficos | Media | Implementado |
| RF-021 | El sistema debe mostrar los productos mas vendidos | Media | Implementado |
| RF-022 | El sistema debe generar reportes de stock bajo | Media | Implementado |
| RF-023 | El sistema debe permitir la gestion de usuarios del sistema (CRUD) | Alta | Implementado |
| RF-024 | El sistema debe validar contrasenas seguras al crear usuarios | Alta | Implementado |
| RF-025 | El sistema debe mostrar un indicador de fortaleza de contrasena | Baja | Implementado |
| RF-026 | El sistema debe mostrar preview de imagen al seleccionar producto en ventas | Baja | Implementado |
| RF-027 | El sistema debe restringir acceso a modulos segun el rol del usuario | Alta | Implementado |
| RF-028 | El sistema debe permitir busqueda en tiempo real de productos | Media | Implementado |
| RF-029 | El sistema debe permitir filtrar productos por categoria | Media | Implementado |
| RF-030 | El sistema debe mostrar el logotipo de LuckFeer en el menu lateral | Baja | Implementado |
| RF-031 | El sistema debe guardar las facturas en la base de datos | Alta | Implementado |
| RF-032 | El sistema debe guardar el detalle de productos de cada factura | Alta | Implementado |

---

## 2. Requisitos No Funcionales

| ID | Requisito | Prioridad | Estado |
|----|-----------|:---------:|:------:|
| RNF-001 | El sistema debe ser responsive para PC y tablet (1024px+) | Alta | Implementado |
| RNF-002 | El sistema debe usar esquema de colores azul oscuro y naranja | Media | Implementado |
| RNF-003 | El sistema debe tener tiempos de respuesta menores a 2 segundos | Alta | Implementado |
| RNF-004 | Las contrasenas deben almacenarse cifradas con bcrypt | Alta | Implementado |
| RNF-005 | El sistema debe prevenir inyeccion SQL con consultas parametrizadas | Alta | Implementado |
| RNF-006 | El sistema debe cumplir con contraste WCAG AA | Media | Implementado |
| RNF-007 | El sistema debe funcionar en navegadores Chrome, Firefox y Edge | Alta | Implementado |
| RNF-008 | El codigo debe estar comentado en espanol | Media | Implementado |
| RNF-009 | Las imagenes de productos no deben exceder 5MB | Media | Implementado |
| RNF-010 | El sistema debe soportar formatos JPG, PNG, WebP y GIF para imagenes | Baja | Implementado |

---

## 3. Matriz de Trazabilidad: Requisitos vs Modulos

| Requisito | Autenticacion | Dashboard | Productos | Categorias | Clientes | Ventas | Facturacion | Reportes | Usuarios |
|:---------:|:------------:|:---------:|:---------:|:----------:|:--------:|:------:|:-----------:|:--------:|:--------:|
| RF-001 | X | | | | | | | | |
| RF-002 | X | X | | | | | | | |
| RF-003 | X | X | | | | | | | |
| RF-004 | | X | | | | | | | |
| RF-005 | | X | | | | | | | |
| RF-006 | | | X | | | | | | |
| RF-007 | | | X | | | | | | |
| RF-008 | | | X | | | | | | |
| RF-009 | | | | X | | | | | |
| RF-010 | | | | | X | | | | |
| RF-011 | | | | | X | | | | |
| RF-012 | | | | | | X | | | |
| RF-013 | | | | | | X | X | | |
| RF-014 | | | | | | | X | | |
| RF-015 | | | | | | | X | | |
| RF-016 | | | | | | | X | | |
| RF-017 | | | | | | | X | | |
| RF-018 | | | | | | | X | | |
| RF-019 | | | | | | | X | | |
| RF-020 | | | | | | | | X | |
| RF-021 | | | | | | | | X | |
| RF-022 | | | | | | | | X | |
| RF-023 | | | | | | | | | X |
| RF-024 | | | | | | | | | X |
| RF-025 | | | | | | | | | X |
| RF-026 | | | | | | X | X | | |
| RF-027 | X | X | X | X | X | X | X | X | X |
| RF-028 | | | X | | | X | X | | |
| RF-029 | | | X | | | | | | |
| RF-030 | | X | | | | | | | |
| RF-031 | | | | | | | X | | |
| RF-032 | | | | | | | X | | |

---

## 4. Matriz de Trazabilidad: Requisitos vs Tablas de Base de Datos

| Requisito | users | categories | suppliers | products | customers | sales | sale_items | facturas | factura_items | activity_logs |
|:---------:|:-----:|:----------:|:---------:|:--------:|:---------:|:-----:|:----------:|:--------:|:-------------:|:-------------:|
| RF-001 | X | | | | | | | | | |
| RF-002 | X | | | | | | | | | |
| RF-006 | | | | X | | | | | | |
| RF-009 | | X | | | | | | | | |
| RF-010 | | | | | X | | | | | |
| RF-011 | | | | | X | | | | | |
| RF-012 | | | | X | X | X | X | | | |
| RF-013 | | | | | | X | X | X | X | |
| RF-014 | X | | | X | | | | X | X | |
| RF-015 | | | | | | | | X | | |
| RF-016 | | | | | | | | X | | |
| RF-023 | X | | | | | | | | | |
| RF-031 | | | | | | | | X | | |
| RF-032 | | | | X | | | | | X | |

---

## 5. Matriz de Trazabilidad: Requisitos vs Archivos del Sistema

| Requisito | Archivos Principales |
|:---------:|---------------------|
| RF-001 | `components/login-form.tsx`, `contexts/auth-context.tsx`, `app/login/page.tsx` |
| RF-002 | `contexts/auth-context.tsx`, `components/sidebar.tsx` |
| RF-003 | `contexts/auth-context.tsx`, `app/dashboard/page.tsx` |
| RF-004 | `components/dashboard-stats.tsx`, `components/dashboard-layout.tsx` |
| RF-005 | `components/low-stock-alert.tsx`, `components/dashboard-stats.tsx` |
| RF-006 | `components/products-table.tsx`, `components/add-product-dialog.tsx`, `components/edit-product-dialog.tsx` |
| RF-007 | `components/add-product-dialog.tsx`, `components/edit-product-dialog.tsx` |
| RF-008 | `components/add-product-dialog.tsx`, `components/edit-product-dialog.tsx` |
| RF-009 | `components/categories-table.tsx`, `components/add-category-dialog.tsx`, `components/edit-category-dialog.tsx` |
| RF-010 | `components/customers-table.tsx`, `components/add-customer-dialog.tsx`, `components/edit-customer-dialog.tsx` |
| RF-011 | `components/customers-table.tsx` |
| RF-012 | `components/sales-form.tsx`, `components/product-selector.tsx` |
| RF-013 | `components/sales-form.tsx`, `components/cashier-billing.tsx` |
| RF-014 | `components/cashier-billing.tsx`, `app/dashboard/facturacion/page.tsx` |
| RF-015 | `components/cashier-billing.tsx` |
| RF-016 | `components/cashier-billing.tsx` |
| RF-017 | `components/cashier-billing.tsx` (funcion generarPDF) |
| RF-018 | `components/cashier-billing.tsx` (funcion descargarExcel) |
| RF-019 | `components/cashier-billing.tsx` (funcion imprimirFactura) |
| RF-020 | `components/sales-chart.tsx`, `app/dashboard/reportes/page.tsx` |
| RF-021 | `components/top-products-chart.tsx` |
| RF-022 | `components/low-stock-report.tsx` |
| RF-023 | `components/users-table.tsx`, `components/add-user-dialog.tsx`, `components/edit-user-dialog.tsx` |
| RF-024 | `components/add-user-dialog.tsx` |
| RF-025 | `components/add-user-dialog.tsx` |
| RF-026 | `components/product-selector.tsx`, `components/cashier-billing.tsx` |
| RF-027 | `contexts/auth-context.tsx`, `components/sidebar.tsx`, `components/dashboard-layout.tsx` |
| RF-028 | `components/products-header.tsx`, `components/product-selector.tsx`, `components/cashier-billing.tsx` |
| RF-029 | `components/products-header.tsx`, `app/dashboard/productos/page.tsx` |
| RF-030 | `components/sidebar.tsx`, `public/images/luckfeer-logo.jpg` |
| RF-031 | `base-de-datos/esquema.sql` (tabla facturas) |
| RF-032 | `base-de-datos/esquema.sql` (tabla factura_items) |

---

## 6. Matriz de Trazabilidad: Requisitos vs Roles

| Requisito | Administrador | Vendedor | Cajero |
|:---------:|:------------:|:--------:|:------:|
| RF-001 | X | X | X |
| RF-002 | X | X | X |
| RF-003 | X | X | X |
| RF-004 | X | X | X |
| RF-005 | X | | |
| RF-006 | X | X | |
| RF-007 | X | X | |
| RF-008 | X | X | |
| RF-009 | X | | |
| RF-010 | X | X | |
| RF-011 | X | X | |
| RF-012 | X | X | |
| RF-013 | X | X | X |
| RF-014 | X | | X |
| RF-015 | X | | X |
| RF-016 | X | | X |
| RF-017 | X | | X |
| RF-018 | X | | X |
| RF-019 | X | | X |
| RF-020 | X | | |
| RF-021 | X | | |
| RF-022 | X | | |
| RF-023 | X | | |
| RF-024 | X | | |
| RF-025 | X | | |
| RF-026 | X | X | X |
| RF-027 | X | X | X |
| RF-028 | X | X | X |
| RF-029 | X | X | |
| RF-030 | X | X | X |
| RF-031 | X | | X |
| RF-032 | X | | X |

---

## 7. Matriz de Trazabilidad: Requisitos vs Criterios de Aceptacion

| ID | Requisito | Criterios de Aceptacion |
|----|-----------|------------------------|
| RF-001 | Inicio de sesion | 1. El usuario ingresa correo y contrasena validos y accede al sistema. 2. Si las credenciales son incorrectas, muestra mensaje de error. 3. Campos vacios muestran validacion. |
| RF-002 | Roles del sistema | 1. Existen 3 roles: admin, vendedor, cajero. 2. Cada rol tiene permisos diferenciados. 3. El rol se asigna al crear el usuario. |
| RF-003 | Redireccion por rol | 1. Admin ve dashboard completo. 2. Vendedor ve dashboard de ventas. 3. Cajero ve dashboard de caja. |
| RF-004 | Dashboard con metricas | 1. Muestra ventas del dia, productos, clientes, ingresos. 2. Los datos se actualizan correctamente. 3. Muestra porcentaje de cambio. |
| RF-005 | Alertas stock bajo | 1. Se listan productos con stock menor al minimo. 2. Se muestra la cantidad actual vs minima. 3. Tiene boton de reorden. |
| RF-006 | CRUD productos | 1. Se pueden crear, leer, actualizar y eliminar productos. 2. La tabla muestra todos los campos requeridos. 3. Las acciones requieren confirmacion. |
| RF-007 | Validar nombre sin numeros | 1. Al escribir numeros en el nombre, se eliminan automaticamente. 2. Solo se permiten letras, espacios y caracteres especiales. |
| RF-008 | Subir imagenes de productos | 1. Se permite arrastrar o seleccionar imagen. 2. Se validan formatos (JPG, PNG, WebP, GIF). 3. Tamano maximo 5MB. 4. Se muestra preview. |
| RF-009 | CRUD categorias | 1. Se pueden crear, leer, actualizar y eliminar categorias. 2. Cada categoria tiene color identificador. 3. Se muestra cantidad de productos. |
| RF-010 | CRUD clientes | 1. Se pueden crear, leer, actualizar y eliminar clientes. 2. Se valida documento unico. 3. Se registra tipo de documento. |
| RF-011 | Clasificacion de clientes | 1. Clientes con mas de $5,000 en compras son VIP. 2. Sin compras recientes son Inactivos. 3. El resto son Regulares. |
| RF-012 | Registro de ventas | 1. Se selecciona cliente existente. 2. Se buscan y agregan productos. 3. Se ajustan cantidades. 4. Se valida stock. |
| RF-013 | Calculo automatico | 1. Subtotal se calcula sumando items. 2. IVA se calcula al 12%. 3. Total = Subtotal + IVA - Descuento. 4. Actualizacion en tiempo real. |
| RF-014 | Facturacion sin cliente registrado | 1. El cajero puede facturar sin seleccionar cliente existente. 2. Permite ingresar datos manualmente. 3. "Consumidor Final" como opcion por defecto. |
| RF-015 | Datos manuales del cliente | 1. Campo para nombre del cliente. 2. Selector de tipo de documento (cedula, RUC, pasaporte). 3. Campo para numero de documento. |
| RF-016 | Codigo unico de factura | 1. Formato FAC-YYYY-NNNNNN. 2. Numero secuencial automatico. 3. No se repiten codigos. |
| RF-017 | Descarga PDF | 1. Boton visible de descarga PDF. 2. El PDF contiene datos de la empresa, cliente, productos y totales. 3. Se descarga correctamente. |
| RF-018 | Descarga Excel | 1. Boton visible de descarga Excel. 2. El archivo contiene todas las columnas de la factura. 3. Se descarga correctamente. |
| RF-019 | Imprimir factura | 1. Boton visible de impresion. 2. Se abre dialogo de impresion del navegador. 3. El formato es legible. |
| RF-020 | Grafico de ventas por dia | 1. Muestra grafico de area con color naranja. 2. Datos de los ultimos 15 dias. 3. Tooltip con valores exactos. 4. Indicador de tendencia. |
| RF-021 | Productos mas vendidos | 1. Muestra top 5 productos. 2. Incluye unidades, ingresos y tendencia. 3. Barra de progreso visual. |
| RF-022 | Reporte stock bajo | 1. Lista productos con stock critico. 2. Muestra stock actual vs minimo. 3. Boton de reorden disponible. |
| RF-023 | CRUD usuarios | 1. Se pueden crear, leer, actualizar y eliminar usuarios. 2. Se asigna rol y estado. 3. Email unico. |
| RF-024 | Validacion de contrasena | 1. Minimo 8 caracteres. 2. Al menos una mayuscula. 3. Al menos una minuscula. 4. Al menos un numero. 5. Al menos un caracter especial. |
| RF-025 | Indicador de fortaleza | 1. Se muestra barra de progreso. 2. Colores: rojo (debil), amarillo (media), verde (fuerte). 3. Texto descriptivo. |
| RF-026 | Preview de imagen en ventas | 1. Al pasar el cursor se muestra imagen del producto. 2. Se oculta al quitar el cursor. 3. Muestra nombre y detalles. |
| RF-027 | Restriccion por rol | 1. Admin accede a todos los modulos. 2. Vendedor solo a los permitidos. 3. Cajero solo a dashboard y facturacion. 4. Sidebar se filtra segun rol. |
| RF-028 | Busqueda en tiempo real | 1. Se filtra al escribir. 2. Busca por nombre y SKU. 3. Resultados instantaneos. |
| RF-029 | Filtro por categoria | 1. Dropdown con todas las categorias. 2. Filtra la tabla al seleccionar. 3. Opcion "Todas" disponible. |
| RF-030 | Logotipo en sidebar | 1. Se muestra la imagen del logo en el menu lateral. 2. Tiene icono de respaldo si no carga la imagen. 3. Visible en todos los roles. |
| RF-031 | Guardar facturas en BD | 1. La tabla `facturas` existe con todos los campos requeridos. 2. Se guardan datos del cliente, montos y estado. 3. Codigo de factura unico. |
| RF-032 | Detalle de productos por factura | 1. La tabla `factura_items` existe. 2. Cada item tiene producto, cantidad, precio y subtotal. 3. Se guarda nombre para historial. |

---

## 8. Resumen de Cobertura

### Por Modulo

| Modulo | Requisitos Cubiertos | Total |
|--------|---------------------|:-----:|
| Autenticacion | RF-001, RF-002, RF-003, RF-027 | 4 |
| Dashboard | RF-004, RF-005, RF-030 | 3 |
| Productos | RF-006, RF-007, RF-008, RF-028, RF-029 | 5 |
| Categorias | RF-009 | 1 |
| Clientes | RF-010, RF-011 | 2 |
| Ventas | RF-012, RF-013, RF-026, RF-028 | 4 |
| Facturacion | RF-014, RF-015, RF-016, RF-017, RF-018, RF-019, RF-031, RF-032 | 8 |
| Reportes | RF-020, RF-021, RF-022 | 3 |
| Usuarios | RF-023, RF-024, RF-025 | 3 |

### Estadisticas Generales

| Metrica | Valor |
|---------|:-----:|
| Total de requisitos funcionales | 32 |
| Total de requisitos no funcionales | 10 |
| Requisitos implementados | 42 |
| Requisitos pendientes | 0 |
| Cobertura total | 100% |
| Tablas de base de datos involucradas | 9 |
| Archivos de componentes involucrados | 28 |
| Roles del sistema | 3 |

---

## 9. Diagrama de Dependencias entre Requisitos

```
RF-001 (Login)
  └── RF-002 (Roles)
        ├── RF-003 (Redireccion por rol)
        └── RF-027 (Restriccion por rol)
              ├── RF-004 (Dashboard) ── RF-005 (Alertas stock)
              ├── RF-006 (CRUD Productos)
              │     ├── RF-007 (Validar nombre)
              │     ├── RF-008 (Subir imagenes)
              │     ├── RF-028 (Busqueda)
              │     └── RF-029 (Filtro categoria) ── RF-009 (CRUD Categorias)
              ├── RF-010 (CRUD Clientes) ── RF-011 (Clasificacion)
              ├── RF-012 (Ventas)
              │     ├── RF-013 (Calculos automaticos)
              │     └── RF-026 (Preview imagen)
              ├── RF-014 (Facturacion rapida)
              │     ├── RF-015 (Datos manuales)
              │     ├── RF-016 (Codigo factura)
              │     ├── RF-017 (PDF)
              │     ├── RF-018 (Excel)
              │     ├── RF-019 (Imprimir)
              │     ├── RF-031 (Guardar factura BD)
              │     └── RF-032 (Detalle productos BD)
              ├── RF-020 (Grafico ventas) ── RF-021 (Top productos) ── RF-022 (Stock bajo)
              └── RF-023 (CRUD Usuarios)
                    ├── RF-024 (Validar contrasena)
                    └── RF-025 (Indicador fortaleza)
```

---

*Documento de Trazabilidad del Sistema LuckFeer*
*Ultima actualizacion: Enero 2024*
