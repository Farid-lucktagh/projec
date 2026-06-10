# LUCKFEER — Presentación (10 diapositivas)

---

## SLIDE 1 — Portada
**LUCKFEER**

Sistema web de inventario, facturación y punto de venta para negocios pequeños

Negocio de herramientas y materiales de construcción — pto. Serviez

Herramientas y materiales de construcción · 2026

---

## SLIDE 2 — El problema
Negocio de herramientas y materiales de construcción (detal + domicilio) en Bogotá

- Inventario y facturación en registros manuales
- Stock desactualizado y sin trazabilidad de productos
- Errores en ventas y descuadres de caja
- Sin reportes para tomar decisiones de negocio
- Usuarios con diferentes roles sin control de acceso

**Pregunta:** ¿Cómo digitalizar inventario, ventas, facturación y gestión de usuarios en un solo sistema profesional?

---

## SLIDE 3 — Objetivo
**General:**
Desarrollar LUCKFEER, un sistema web que integre inventario, facturación, POS, usuarios y reportes para negocios de construcción.

**Específicos (resumen):**
- Analizar procesos del negocio de herramientas y materiales
- Diseñar base de datos, API e interfaz (Laravel + React + Tauri)
- Implementar inventario con estados (activo/inactivo), ventas, facturas y reportes
- Sistema de roles y permisos personalizados para administrador, vendedor y cajero
- Control de usuario activo/inactivo y trazabilidad de movimientos

---

## SLIDE 4 — Justificación y alcance
**¿Por qué?**
- Menos errores operativos y mejor control del stock
- Trazabilidad completa de productos y movimientos
- Sistema propio, accesible y moderno
- Roles y permisos para seguridad operativa

**Incluye:**
- Productos (con categorías y proveedores)
- Ventas (POS) y facturas
- Reportes de ventas, inventario y movimientos diarios (incluye facturas en las gráficas)
- Usuarios con roles: Admin, Vendedor, Cajero
- Control de estado de productos (activo/inactivo)
- Registros de logs de actividad
- **Cierre de sesión automático por inactividad (15 minutos) con advertencia previa y redirección al welcome**

**No incluye:**
- Facturación electrónica DIAN
- App móvil nativa
- Pagos en línea integrados

---

## SLIDE 5 — Metodología
**Enfoque ágil e incremental — Laravel + React**

| Fase | Descripción |
|------|-------------|
| **Análisis** | Definir requerimientos del negocio de construcción |
| **Diseño** | BD (MySQL/MariaDB), API REST (Laravel), UI (React + Tauri) |
| **Desarrollo** | Módulos por funcionalidad: inventario, ventas, facturas, reportes |
| **Pruebas** | QA manual y pruebas de usuario |

**Técnicas:**
- Desarrollo modular (Laravel MVC)
- Autenticación con Breeze
- Componentes shadcn/ui
- Sistema de logs para trazabilidad
- Roles y permisos dinámicos

---

## SLIDE 6 — Arquitectura
```
Frontend (React + Tauri + Tailwind CSS)
            ↓
    API REST (Laravel 12)
            ↓
Base de datos (MySQL / MariaDB)
```

**Características clave:**
- 3 roles: Administrador, Vendedor, Cajero
- Autenticación Breeze (contraseñas bcrypt)
- Sistema de permisos por módulo para usuarios
- Control de estado (activo/inactivo) para usuarios y productos
- Logs de actividad para auditoría
- Comunicación JSON via Inertia.js

---

## SLIDE 7 — Módulos clave
**1. Gestión de Productos**
- Categorías, proveedores, productos con SKU
- Estados: Activo / Inactivo / Bajo stock / Sin stock
- Control de estado para filtrar elementos no disponibles

**2. Ventas (POS)**
- Carrito de compras → cobro → ticket
- Verificación de disponibilidad de productos

**3. Facturación**
- Facturas asociadas a clientes y productos
- Historial completo de facturación

**4. Usuarios y Permisos**
- Roles: Admin, Vendedor, Cajero
- Permisos personalizables por módulo
- Control de usuario activo/inactivo

**5. Reportes y Logs**
- Estadísticas de ventas e inventario
- Trazabilidad de actividades por usuario
- Reportes de movimientos diarios

**Productos ejemplo:** Llaves, destornilladores, martillos, tuercas, cemento, arena

---

## SLIDE 8 — Cronograma
```
Análisis      ███
Diseño             ████
Desarrollo              ██████
Pruebas/QA   ░░░░░░░░░░░░░░░░░░░
           M1 ──────────────────── M17
```
Aproximadamente 1 año y 4–5 meses de trabajo

- **Énfasis inicial:** Diseño de BD y definición de roles y permisos
- **Énfasis final:** Reportes y mejora de la experiencia de usuario
- **Resultado:** Sistema estable, escalable y usable en el negocio de herramientas

---

## SLIDE 9 — Conclusiones
- La integración inventario + ventas + facturas resolvió el problema principal
- Los estados de productos (activo/inactivo) mejoran el control del negocio
- Roles separados y permisos personalizados aumentan la seguridad
- Stack Laravel + React + Tauri fue práctico, moderno y mantenible
- Los logs y reportes brindan trazabilidad completa para decisiones
- El proyecto cumple su objetivo de digitalizar la gestión del negocio de herramientas

---

## SLIDE 10 — Cierre
**Recomendaciones**

- Utilizar el sistema de activar/desactivar productos en lugar de eliminar
- Controlar el estado de usuarios para seguridad
- Generar y revisar reportes periódicamente
- Registrar y cerrar caja cada turno
- Realizar respaldos periódicos de la base de datos

**Futuro:**
- Integración con facturación DIAN
- App móvil para vendedores
- Pedidos a domicilio integrados
- Notificaciones por bajo stock
