# Datos del Sistema LuckFeer

Este documento contiene todos los datos de prueba y configuraciones que maneja el sistema de gestión de ferretería LuckFeer.

---

## 1. Roles del Sistema

El sistema maneja 3 roles con diferentes niveles de acceso:

| Rol | Código | Descripción | Permisos |
|-----|--------|-------------|----------|
| **Administrador** | `admin` | Control total del sistema | Acceso completo a todos los módulos |
| **Vendedor** | `vendedor` | Personal de ventas | Dashboard, Productos, Clientes, Ventas |
| **Cajero** | `cajero` | Personal de caja | Dashboard, Facturación Rápida |

### Permisos por Módulo

| Módulo | Administrador | Vendedor | Cajero |
|--------|:-------------:|:--------:|:------:|
| Dashboard | ✅ | ✅ | ✅ |
| Productos | ✅ | ✅ | ❌ |
| Categorías | ✅ | ❌ | ❌ |
| Clientes | ✅ | ✅ | ❌ |
| Ventas | ✅ | ✅ | ❌ |
| Facturación Rápida | ✅ | ❌ | ✅ |
| Reportes | ✅ | ❌ | ❌ |
| Usuarios | ✅ | ❌ | ❌ |

---

## 2. Usuarios del Sistema

### Credenciales de Acceso

| Usuario | Correo | Contraseña | Rol |
|---------|--------|------------|-----|
| Administrador | admin@luckfeer.com | admin123 | Administrador |
| Vendedor | vendedor@luckfeer.com | vendedor123 | Vendedor |
| Cajero | cajero@luckfeer.com | cajero123 | Cajero |

---

## 3. Características de Búsqueda y Reportes

### Búsqueda en Tiempo Real (Debounce 300ms)

| Módulo | Campos de Búsqueda |
|--------|--------------------|
| **Productos** | Nombre, Categoría, Proveedor |
| **Ventas** | Nombre del Cliente, Número de Documento |
| **Facturas** | Código, Nombre del Cliente, Número de Documento |
| **Categorías** | Nombre |
| **Clientes** | Nombre, Número de Documento |
| **Usuarios** | Nombre |

### Reportes Dinámicos (Dashboard)

- **Totales Calculados:** Ventas, Facturas, Clientes del día, Productos vendidos, Recaudación total.
- **Gráfica Interactiva:** Ventas por día con filtros de rango de fechas personalizados.
- **Filtros:** "Desde" y "Hasta" para análisis temporal de ingresos.

---

## 4. Categorías de Productos

| ID | Nombre | Color | Descripción | Productos |
|----|--------|-------|-------------|-----------|
| 1 | Herramientas | Azul (#3b82f6) | Herramientas manuales y de trabajo | 45 |
| 2 | Herramientas Eléctricas | Naranja (#f97316) | Taladros, sierras, amoladoras | 23 |
| 3 | Ferretería | Gris (#6b7280) | Clavos, tornillos, tuercas | 89 |
| 4 | Pinturas | Verde (#22c55e) | Pinturas, esmaltes, barnices | 34 |
| 5 | Plomería | Cyan (#06b6d4) | Tubos, válvulas, accesorios | 56 |
| 6 | Eléctricos | Amarillo (#eab308) | Cables, interruptores, enchufes | 67 |
| 7 | Jardinería | Verde Lima (#84cc16) | Herramientas y accesorios de jardín | 28 |
| 8 | Seguridad | Rojo (#ef4444) | Candados, cerraduras, alarmas | 19 |

---

## 4. Productos e Inventario

### Productos del Sistema

| ID | Nombre | Categoría | Precio | Stock | Stock Mín. | Estado |
|----|--------|-----------|--------|-------|------------|--------|
| 1 | Martillo de Garra 16oz | Herramientas | $25.99 | 45 | 10 | En Stock |
| 2 | Tornillos Autorroscantes 1/4" | Ferretería | $0.15 | 5 | 50 | Stock Bajo |
| 3 | Pintura Látex Blanca 1L | Pinturas | $18.50 | 28 | 15 | En Stock |
| 4 | Cable Eléctrico 12AWG | Eléctricos | $2.75 | 12 | 20 | Stock Bajo |
| 5 | Llave Inglesa 10" | Herramientas | $32.00 | 15 | 10 | En Stock |
| 6 | Tubo PVC 1/2" | Plomería | $4.25 | 67 | 30 | En Stock |
| 7 | Destornillador Phillips | Herramientas | $8.50 | 120 | 20 | En Stock |
| 8 | Taladro Eléctrico | Herramientas Eléctricas | $89.99 | 15 | 5 | En Stock |
| 9 | Pintura Blanca 1 Galón | Pinturas | $35.00 | 60 | 20 | En Stock |
| 10 | Clavos 2 pulgadas (100u) | Ferretería | $5.99 | 200 | 50 | En Stock |
| 11 | Tornillos Madera (50u) | Ferretería | $4.50 | 180 | 50 | En Stock |
| 12 | Cinta Métrica 5m | Herramientas | $12.99 | 75 | 20 | En Stock |
| 13 | Sierra Manual | Herramientas | $22.00 | 30 | 10 | En Stock |
| 14 | Brocha 3 pulgadas | Pinturas | $6.99 | 90 | 25 | En Stock |

### Productos con Stock Bajo (Alerta)

| Producto | Stock Actual | Stock Mínimo | Déficit |
|----------|:------------:|:------------:|:-------:|
| Tornillos Autorroscantes 1/4" | 5 | 50 | -45 |
| Cable Eléctrico 12AWG | 12 | 20 | -8 |
| Cemento Gris 50kg | 8 | 15 | -7 |
| Lija de Agua #100 | 15 | 30 | -15 |

### Imágenes de Productos

Las imágenes se almacenan en `/public/images/productos/`:

| Producto | Archivo de Imagen |
|----------|-------------------|
| Martillo de Garra 16oz | martillo-16oz.jpg |
| Tornillos Autorroscantes | tornillos-autorroscantes.jpg |
| Pintura Látex Blanca | pintura-latex-blanca.jpg |
| Cable Eléctrico 12AWG | cable-electrico-12awg.jpg |
| Llave Inglesa 10" | llave-ajustable-10.jpg |
| Tubo PVC 1/2" | tubo-pvc-blanco.jpg |
| Destornillador Phillips | destornillador-phillips.jpg |
| Taladro Eléctrico | taladro-electrico.jpg |
| Pintura Blanca 1 Galón | pintura-galon-blanco.jpg |
| Clavos 2 pulgadas | clavos-2-pulgadas.jpg |
| Tornillos Madera | tornillos-madera.jpg |
| Cinta Métrica 5m | cinta-metrica-5m.jpg |
| Sierra Manual | serrucho-carpinteria.jpg |
| Brocha 3 pulgadas | brocha-3-pulgadas.jpg |

---

## 5. Clientes

### Tipos de Cliente

| Tipo | Código | Beneficios |
|------|--------|------------|
| Regular | `regular` | Sin beneficios especiales |
| VIP | `vip` | Descuentos preferenciales, crédito |

### Clientes Registrados

| ID | Nombre | Documento | Teléfono | Correo | Tipo | Compras | Estado |
|----|--------|-----------|----------|--------|------|---------|--------|
| 1 | Juan Martínez | 1234567890 | 555-0101 | juan.m@email.com | VIP | $5,240 | Activo |
| 2 | María López | 0987654321 | 555-0102 | maria.l@email.com | Regular | $1,850 | Activo |
| 3 | Carlos Rodríguez | 1122334455 | 555-0103 | carlos.r@email.com | Regular | $920 | Activo |
| 4 | Ana García | 5544332211 | 555-0104 | ana.g@email.com | VIP | $8,750 | Activo |
| 5 | Pedro Sánchez | 6677889900 | 555-0105 | pedro.s@email.com | Regular | $450 | Inactivo |
| 6 | Laura Fernández | 1122558899 | 555-0106 | laura.f@email.com | Regular | $2,100 | Activo |
| 7 | Roberto Díaz | 9988776655 | 555-0107 | roberto.d@email.com | VIP | $12,300 | Activo |
| 8 | Carmen Torres | 4455667788 | 555-0108 | carmen.t@email.com | Regular | $780 | Activo |

---

## 6. Proveedores

| ID | Nombre | Contacto | Teléfono | Correo | Productos |
|----|--------|----------|----------|--------|-----------|
| 1 | Herramientas Pro S.A. | Luis Méndez | 555-1001 | ventas@herramientaspro.com | Herramientas |
| 2 | Ferretería Nacional | Ana Ruiz | 555-1002 | contacto@ferreterianacional.com | Ferretería |
| 3 | Pinturas del Valle | Carlos Vega | 555-1003 | ventas@pinturasdelvalle.com | Pinturas |
| 4 | Eléctricos Express | María Solís | 555-1004 | pedidos@electricosexpress.com | Eléctricos |
| 5 | Plomería Total | Jorge Luna | 555-1005 | ventas@plomeriatotal.com | Plomería |
| 6 | Importadora Stanley | Pedro Ríos | 555-1006 | comercial@stanleyimport.com | Herramientas |

---

## 7. Sistema de Facturacion

### Estructura de la Tabla `facturas`

La tabla de facturas permite guardar ventas tanto de clientes registrados como no registrados (consumidor final).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | BIGINT | Identificador unico |
| codigo_factura | VARCHAR(50) | Codigo unico (FAC-2024-000001) |
| cliente_nombre | VARCHAR(255) | Nombre del cliente |
| cliente_documento_tipo | ENUM | cedula, ruc, passport, consumidor_final |
| cliente_documento_numero | VARCHAR(50) | Numero de documento (opcional) |
| cliente_telefono | VARCHAR(20) | Telefono (opcional) |
| cliente_direccion | TEXT | Direccion (opcional) |
| customer_id | BIGINT | Referencia a cliente registrado (opcional) |
| user_id | BIGINT | Cajero que genero la factura |
| subtotal | DECIMAL(10,2) | Subtotal antes de impuestos |
| porcentaje_iva | DECIMAL(5,2) | Porcentaje de IVA (default: 12%) |
| monto_iva | DECIMAL(10,2) | Monto del IVA |
| descuento | DECIMAL(10,2) | Descuento aplicado |
| total | DECIMAL(10,2) | Total de la factura |
| metodo_pago | ENUM | efectivo, tarjeta, transferencia |
| estado | ENUM | completada, anulada, pendiente |
| notas | TEXT | Notas adicionales |
| fecha_emision | TIMESTAMP | Fecha de emision |

### Estructura de la Tabla `factura_items`

Guarda el detalle de productos de cada factura.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | BIGINT | Identificador unico |
| factura_id | BIGINT | Referencia a la factura |
| product_id | BIGINT | Referencia al producto |
| producto_nombre | VARCHAR(255) | Nombre del producto (historial) |
| producto_categoria | VARCHAR(255) | Categoria del producto |
| cantidad | INT | Cantidad vendida |
| precio_unitario | DECIMAL(10,2) | Precio por unidad |
| subtotal_item | DECIMAL(10,2) | Subtotal del item |

### Tipos de Documento del Cliente

| Tipo | Codigo | Descripcion |
|------|--------|-------------|
| Cedula | `cedula` | Cedula de identidad |
| RUC | `ruc` | Registro Unico de Contribuyentes |
| Pasaporte | `passport` | Pasaporte internacional |
| Consumidor Final | `consumidor_final` | Cliente sin documento |

### Metodos de Pago

| Metodo | Codigo |
|--------|--------|
| Efectivo | `efectivo` |
| Tarjeta | `tarjeta` |
| Transferencia | `transferencia` |

### Estados de Factura

| Estado | Codigo | Descripcion |
|--------|--------|-------------|
| Completada | `completada` | Factura finalizada y pagada |
| Anulada | `anulada` | Factura cancelada |
| Pendiente | `pendiente` | Factura en proceso |

### Configuracion de Impuestos

| Concepto | Valor |
|----------|-------|
| IVA | 12% |

### Facturas de Ejemplo

| Codigo | Cliente | Documento | Subtotal | IVA | Total | Metodo | Estado |
|--------|---------|-----------|----------|-----|-------|--------|--------|
| FAC-2024-000001 | Consumidor Final | - | $45.50 | $5.46 | $50.96 | Efectivo | Completada |
| FAC-2024-000002 | Roberto Andrade | 1712345679 | $125.80 | $15.10 | $140.90 | Tarjeta | Completada |
| FAC-2024-000003 | Consumidor Final | - | $28.75 | $3.45 | $32.20 | Efectivo | Completada |
| FAC-2024-000004 | Comercial Los Andes | 1791234567001 | $890.00 | $106.80 | $946.80 | Transferencia | Completada |
| FAC-2024-000005 | Luis Fernando Mora | 1723456780 | $67.25 | $8.07 | $75.32 | Efectivo | Completada |
| FAC-2024-000006 | Consumidor Final | - | $156.90 | $18.83 | $175.73 | Tarjeta | Completada |
| FAC-2024-000007 | Ana Lucia Paredes | 1734567891 | $234.50 | $28.14 | $262.64 | Efectivo | Completada |
| FAC-2024-000008 | Pedro Sanchez | 1745678902 | $89.99 | $10.80 | $100.79 | Efectivo | **Anulada** |
| FAC-2024-000009 | Ferreteria Central | 1792345678001 | $1,250.00 | $150.00 | $1,300.00 | Transferencia | Completada |
| FAC-2024-000010 | Consumidor Final | - | $35.80 | $4.30 | $40.10 | Efectivo | Completada |

### Detalle de Factura (Ejemplo FAC-2024-000002)

| Producto | Categoria | Cantidad | Precio Unit. | Subtotal |
|----------|-----------|:--------:|:------------:|:--------:|
| Martillo de Garra 16oz | Herramientas Manuales | 2 | $12.50 | $25.00 |
| Juego de Llaves Allen | Herramientas Manuales | 1 | $8.75 | $8.75 |
| Taladro Percutor 650W | Herramientas Electricas | 1 | $89.99 | $89.99 |
| | | | **Subtotal:** | **$125.80** |
| | | | **IVA (12%):** | **$15.10** |
| | | | **TOTAL:** | **$140.90** |

### Formato del Codigo de Factura

```
FAC-YYYY-NNNNNN
```

Donde:
- `FAC`: Prefijo fijo de factura
- `YYYY`: Ano de emision
- `NNNNNN`: Numero secuencial de 6 digitos

---

## 8. Datos de Ventas (Sistema General)

---

## 8. Datos del Dashboard

### Métricas Principales

| Métrica | Valor | Cambio |
|---------|-------|--------|
| Ventas del Día | $3,456.78 | +12.5% |
| Productos Vendidos | 89 unidades | +8.2% |
| Clientes Atendidos | 34 | +5.1% |
| Ticket Promedio | $101.67 | +3.8% |

### Ventas por Día (Últimos 15 días)

| Fecha | Ventas | Pedidos |
|-------|--------|---------|
| 01 Ene | $1,200 | 12 |
| 02 Ene | $1,800 | 18 |
| 03 Ene | $1,500 | 15 |
| 04 Ene | $2,200 | 22 |
| 05 Ene | $1,900 | 19 |
| 06 Ene | $2,800 | 28 |
| 07 Ene | $2,400 | 24 |
| 08 Ene | $3,200 | 32 |
| 09 Ene | $2,900 | 29 |
| 10 Ene | $3,500 | 35 |
| 11 Ene | $3,100 | 31 |
| 12 Ene | $3,800 | 38 |
| 13 Ene | $3,400 | 34 |
| 14 Ene | $4,200 | 42 |
| 15 Ene | $3,900 | 39 |

### Productos Más Vendidos

| # | Producto | Categoría | Unidades | Ingresos | Tendencia |
|---|----------|-----------|----------|----------|-----------|
| 1 | Martillo 16oz | Herramientas | 145 | $3,768.55 | +15% |
| 2 | Clavos 2" (100u) | Ferretería | 230 | $1,377.70 | +12% |
| 3 | Pintura Blanca 1L | Pinturas | 89 | $1,646.50 | +8% |
| 4 | Destornillador | Herramientas | 178 | $1,513.00 | +5% |
| 5 | Cinta Métrica | Medición | 67 | $870.33 | +3% |

---

## 9. Datos del Cajero

### Resumen de Caja (Día)

| Concepto | Valor |
|----------|-------|
| Caja Inicial | $500.00 |
| Ventas en Efectivo | $1,245.00 |
| Ventas con Tarjeta | $890.50 |
| Devoluciones | $45.00 |
| Caja Actual | $2,590.50 |

### Transacciones del Turno

| # | Hora | Tipo | Monto | Método |
|---|------|------|-------|--------|
| 1 | 08:15 | Venta | $125.50 | Efectivo |
| 2 | 09:30 | Venta | $89.99 | Tarjeta |
| 3 | 10:45 | Devolución | -$25.00 | Efectivo |
| 4 | 11:20 | Venta | $234.00 | Efectivo |
| 5 | 12:00 | Venta | $67.80 | Tarjeta |

---

## 10. Datos del Vendedor

### Metas de Ventas

| Período | Meta | Actual | Progreso |
|---------|------|--------|----------|
| Día | $1,500 | $1,245 | 83% |
| Semana | $8,000 | $6,234 | 78% |
| Mes | $35,000 | $28,500 | 81% |

### Comisiones

| Nivel de Ventas | Comisión |
|-----------------|----------|
| $0 - $5,000 | 2% |
| $5,001 - $15,000 | 3% |
| $15,001+ | 5% |

---

## 11. Configuración del Sistema

### Información de la Empresa

| Campo | Valor |
|-------|-------|
| Nombre | LuckFeer Ferretería |
| RUC/NIT | 1234567890001 |
| Dirección | Av. Principal 123, Ciudad |
| Teléfono | (555) 123-4567 |
| Correo | info@luckfeer.com |
| Horario | Lun-Sáb: 8:00 AM - 6:00 PM |

### Colores del Tema

| Elemento | Color | Código Hex |
|----------|-------|------------|
| Primario | Azul Oscuro | #1e3a5f |
| Secundario | Naranja | #ff6b35 |
| Fondo | Gris Oscuro | #0f1419 |
| Texto | Blanco | #ffffff |
| Acento | Verde | #22c55e |
| Error | Rojo | #ef4444 |

---

## 12. Formatos de Factura

### Estructura de Número de Factura

```
FAC-YYYYMMDD-XXXX
```

Donde:
- `FAC`: Prefijo fijo
- `YYYYMMDD`: Fecha (Año-Mes-Día)
- `XXXX`: Número secuencial del día

### Ejemplo de Factura

```
╔════════════════════════════════════════════════╗
║           LUCKFEER FERRETERÍA                  ║
║         Av. Principal 123, Ciudad              ║
║            Tel: (555) 123-4567                 ║
║           RUC: 1234567890001                   ║
╠════════════════════════════════════════════════╣
║ Factura: FAC-20240115-0001                     ║
║ Fecha: 15/01/2024 10:30:45                     ║
║ Cajero: Juan Pérez                             ║
╠════════════════════════════════════════════════╣
║ Cliente: Juan Martínez                         ║
║ Documento: 1234567890                          ║
╠════════════════════════════════════════════════╣
║ Producto          Cant.   Precio    Subtotal   ║
║ ──────────────────────────────────────────────║
║ Martillo 16oz        2    $25.99     $51.98   ║
║ Clavos 2" (100u)     3     $5.99     $17.97   ║
║ Cinta Métrica 5m     1    $12.99     $12.99   ║
╠════════════════════════════════════════════════╣
║                    Subtotal:         $82.94   ║
║                    IVA (12%):         $9.95   ║
║                    ─────────────────────────  ║
║                    TOTAL:            $92.89   ║
╠════════════════════════════════════════════════╣
║ Método de Pago: Efectivo                       ║
║ Recibido: $100.00                              ║
║ Cambio: $7.11                                  ║
╠════════════════════════════════════════════════╣
║      ¡Gracias por su compra!                   ║
║      Vuelva pronto a LuckFeer                  ║
╚════════════════════════════════════════════════╝
```

---

## Notas Importantes

1. **Datos de Prueba**: Todos los datos en este documento son de prueba y deben ser reemplazados con datos reales en producción.

2. **Contraseñas**: Las contraseñas mostradas son solo para desarrollo. En producción deben ser seguras y encriptadas con bcrypt.

3. **Imágenes**: Las imágenes de productos están en formato JPG y se encuentran en `/public/images/productos/`.

4. **Base de Datos**: Los scripts SQL para crear estas tablas están en `/base-de-datos/esquema.sql`.

5. **Moneda**: Todos los precios están en dólares estadounidenses (USD).

---

*Documento generado para el Sistema de Gestión LuckFeer*
*Última actualización: 25 de marzo de 2026*
