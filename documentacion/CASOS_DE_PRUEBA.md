# Casos de Prueba - Sistema LuckFeer

## Informacion del Documento

| Campo | Detalle |
|-------|---------|
| Proyecto | LuckFeer - Sistema de Gestion de Ferreteria |
| Version | 1.0 |
| Fecha de Creacion | 19/02/2026 |
| Autor | Equipo de Desarrollo LuckFeer |
| Estado | Completo |
| Total de Casos | 41 |

---

## Entorno de Pruebas (Comun a todos los casos)

| Elemento | Especificacion |
|----------|----------------|
| Sistema Operativo | Windows 10/11, macOS, Linux |
| Navegadores | Google Chrome 120+, Mozilla Firefox 120+, Microsoft Edge 120+ |
| Resolucion Minima | 1024x768 (PC y Tablet) |
| Framework | Next.js (React) |
| Base de Datos | MySQL 8.0+ |
| Node.js | v18+ |
| Conexion | Conexion a Internet estable |

---

## Modulo 1: Autenticacion e Inicio de Sesion

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-001 | Inicio de sesion exitoso con rol Administrador | Verificar que el usuario con rol de Administrador puede iniciar sesion correctamente con credenciales validas y es redirigido al dashboard de administrador | 19/02/2026 | Autenticacion / Inicio de Sesion | Login con credenciales validas | 1. Navegar a /login. 2. Ingresar correo: admin@luckfeer.com. 3. Ingresar contrasena: admin123. 4. Clic en "Iniciar Sesion" | El sistema valida las credenciales, redirige al dashboard de administrador (/dashboard), muestra el menu lateral completo con todos los modulos y muestra el nombre "Carlos Mendoza" con rol "Administrador" | Navegador con JavaScript habilitado | Ninguno | Ninguna | - | Pendiente | - | Primer caso a ejecutar en la suite |
| CP-002 | Inicio de sesion exitoso con rol Vendedor | Verificar que el usuario con rol de Vendedor puede iniciar sesion y es redirigido al dashboard de vendedor con modulos restringidos | 19/02/2026 | Autenticacion / Inicio de Sesion | Login con credenciales validas - Rol Vendedor | 1. Navegar a /login. 2. Ingresar correo: vendedor@luckfeer.com. 3. Ingresar contrasena: vendedor123. 4. Clic en "Iniciar Sesion" | El sistema redirige al dashboard de vendedor con metas de ventas y progreso. El menu lateral solo muestra: Dashboard, Productos, Clientes, Ventas. No muestra: Categorias, Facturacion, Reportes, Usuarios | Navegador con JavaScript habilitado | Ninguno | Ninguna | - | Pendiente | - | - |
| CP-003 | Inicio de sesion exitoso con rol Cajero | Verificar que el usuario con rol de Cajero puede iniciar sesion y es redirigido al dashboard de caja con modulos restringidos | 19/02/2026 | Autenticacion / Inicio de Sesion | Login con credenciales validas - Rol Cajero | 1. Navegar a /login. 2. Ingresar correo: cajero@luckfeer.com. 3. Ingresar contrasena: cajero123. 4. Clic en "Iniciar Sesion" | El sistema redirige al dashboard de cajero con resumen de caja. El menu lateral solo muestra: Dashboard y Facturacion Rapida | Navegador con JavaScript habilitado | Ninguno | Ninguna | - | Pendiente | - | - |
| CP-004 | Inicio de sesion con credenciales incorrectas | Verificar que el sistema muestra un mensaje de error cuando se ingresan credenciales invalidas | 19/02/2026 | Autenticacion / Inicio de Sesion | Validacion de credenciales invalidas | 1. Navegar a /login. 2. Ingresar correo: admin@luckfeer.com. 3. Ingresar contrasena: contrasenaIncorrecta. 4. Clic en "Iniciar Sesion" | El sistema muestra el mensaje "Credenciales incorrectas". No redirige al dashboard. Los campos de entrada permanecen visibles | Navegador con JavaScript habilitado | Ninguno | Ninguna | - | Pendiente | - | - |
| CP-005 | Inicio de sesion con campos vacios | Verificar que el sistema valida que los campos de correo y contrasena no esten vacios antes de enviar el formulario | 19/02/2026 | Autenticacion / Inicio de Sesion | Validacion de campos obligatorios | 1. Dejar el campo de correo vacio. 2. Dejar el campo de contrasena vacio. 3. Clic en "Iniciar Sesion" | El sistema muestra mensajes de validacion indicando que los campos son obligatorios. No se envia el formulario | Navegador con JavaScript habilitado | Ninguno | Ninguna | - | Pendiente | - | - |
| CP-006 | Cierre de sesion exitoso | Verificar que el usuario puede cerrar sesion correctamente y es redirigido a la pagina de login | 19/02/2026 | Autenticacion / Cierre de Sesion | Logout del sistema | 1. Hacer clic en el boton "Cerrar Sesion" en el menu lateral | El sistema cierra la sesion, elimina los datos de autenticacion y redirige a /login | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |

---

## Modulo 2: Dashboard

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-007 | Visualizacion del dashboard de Administrador | Verificar que el dashboard del administrador muestra todas las metricas, alertas de stock bajo y actividad reciente | 19/02/2026 | Dashboard / Vista General | Metricas y resumen del sistema | 1. Iniciar sesion como admin. 2. Navegar a /dashboard | Se muestran: 4 tarjetas de metricas (Ventas del Dia $3,456.78, Productos Vendidos 89, Clientes Atendidos 34, Ticket Promedio $101.67), seccion de actividad reciente, alertas de stock bajo, logotipo de LuckFeer en el menu lateral | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-008 | Logotipo de LuckFeer visible en el menu lateral | Verificar que el logotipo de LuckFeer se muestra correctamente en la parte superior del menu lateral para todos los roles | 19/02/2026 | Dashboard / Menu Lateral | Visualizacion del logotipo | 1. Iniciar sesion con cualquier rol. 2. Observar la parte superior del menu lateral | Se muestra la imagen del logotipo de LuckFeer (luckfeer-logo.jpg). Si la imagen no carga, se muestra el icono de respaldo "LF" | Archivo /public/images/luckfeer-logo.jpg disponible | Ninguno | CP-001 | - | Pendiente | - | Probar con los 3 roles |

---

## Modulo 3: Gestion de Productos

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-009 | Crear un nuevo producto con datos validos | Verificar que se puede registrar un nuevo producto ingresando todos los campos requeridos, incluyendo imagen, y que el nombre no acepta numeros | 19/02/2026 | Productos / Registro | Alta de producto | 1. Clic en "Agregar Producto". 2. Nombre: Llave de Tubo. 3. Categoria: Herramientas. 4. Precio: 45.99. 5. Stock: 30. 6. Proveedor: Herramientas Pro S.A. 7. Arrastrar imagen JPG menor a 5MB. 8. Clic en "Guardar" | El producto se agrega a la tabla. Se muestra preview de la imagen. El nombre no contiene numeros. Se cierra el dialogo y la tabla se actualiza | Imagen de prueba en formato JPG menor a 5MB | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-010 | Validar que el nombre del producto no acepta numeros | Verificar que al intentar escribir numeros en el campo de nombre del producto, estos se eliminan automaticamente | 19/02/2026 | Productos / Validacion | Restriccion de caracteres numericos en nombre | 1. En el campo nombre, escribir: Martillo 16 oz. 2. Observar el valor del campo | El campo muestra "Martillo  oz" (los numeros 1 y 6 son eliminados automaticamente). Solo se permiten letras, espacios y caracteres especiales | Navegador con JavaScript habilitado | Ninguno | CP-009 | - | Pendiente | - | - |
| CP-011 | Subir imagen de producto con formato valido | Verificar que se puede subir una imagen de producto en formatos JPG, PNG, WebP o GIF con tamano menor a 5MB | 19/02/2026 | Productos / Carga de Imagen | Upload de imagen de producto | 1. Clic en el area de carga de imagen o arrastrar un archivo JPG de 2MB. 2. Observar el preview | Se muestra una vista previa de la imagen cargada. Aparece un boton para eliminar la imagen. El nombre del archivo y tamano se muestran correctamente | Archivo de imagen de prueba en formato JPG, menor a 5MB | Ninguno | CP-009 | - | Pendiente | - | Probar con cada formato: JPG, PNG, WebP, GIF |
| CP-012 | Rechazar imagen de producto mayor a 5MB | Verificar que el sistema rechaza imagenes que superen el limite de 5MB | 19/02/2026 | Productos / Validacion de Imagen | Validacion de tamano de imagen | 1. Intentar cargar un archivo de imagen de 7MB | El sistema muestra un mensaje de error indicando que la imagen excede el tamano maximo de 5MB. La imagen no se carga | Archivo de imagen de prueba mayor a 5MB | Ninguno | CP-009 | - | Pendiente | - | - |
| CP-013 | Editar un producto existente | Verificar que se puede modificar la informacion de un producto ya registrado | 19/02/2026 | Productos / Edicion | Modificacion de producto | 1. Ubicar "Martillo de Garra 16oz". 2. Clic en el icono de editar. 3. Cambiar precio de $25.99 a $28.99. 4. Clic en "Guardar Cambios" | El dialogo de edicion se cierra. La tabla muestra el producto con el nuevo precio $28.99. Los demas campos no se modifican | Navegador con JavaScript habilitado | Ninguno | CP-009 | - | Pendiente | - | - |
| CP-014 | Eliminar un producto con confirmacion | Verificar que al eliminar un producto se muestra un dialogo de confirmacion y el producto se elimina correctamente | 19/02/2026 | Productos / Eliminacion | Baja de producto | 1. Ubicar un producto. 2. Clic en icono de eliminar. 3. Confirmar en dialogo. 4. Clic en "Confirmar" | El producto desaparece de la tabla. La cantidad total de productos se actualiza | Navegador con JavaScript habilitado | Ninguno | CP-009 | - | Pendiente | - | - |
| CP-015 | Busqueda de productos en tiempo real | Verificar que al escribir en el campo de busqueda, la tabla se filtra en tiempo real | 19/02/2026 | Productos / Busqueda | Filtrado en tiempo real | 1. Escribir "Martillo" en el campo de busqueda | La tabla se filtra inmediatamente mostrando solo los productos que contienen "Martillo" en su nombre | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-016 | Filtrar productos por categoria | Verificar que se pueden filtrar los productos seleccionando una categoria del dropdown | 19/02/2026 | Productos / Filtrado | Filtro por categoria | 1. Clic en el dropdown de categorias. 2. Seleccionar "Herramientas" | La tabla solo muestra productos de la categoria "Herramientas". La opcion "Todas" esta disponible para resetear el filtro | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |

---

## Modulo 4: Gestion de Categorias

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-017 | Crear una nueva categoria | Verificar que el administrador puede crear una nueva categoria de productos con nombre, descripcion y color | 19/02/2026 | Categorias / Registro | Alta de categoria | 1. Clic en "Agregar Categoria". 2. Nombre: Materiales de Construccion. 3. Descripcion: Cemento, arena, bloques y varillas. 4. Color: Rojo. 5. Clic en "Guardar" | La categoria se agrega a la tabla con su color identificador. La cantidad de productos inicia en 0 | Navegador con JavaScript habilitado | Solo el Administrador tiene acceso a este modulo | CP-001 | - | Pendiente | - | - |
| CP-018 | Editar una categoria existente | Verificar que se puede modificar el nombre, descripcion y color de una categoria existente | 19/02/2026 | Categorias / Edicion | Modificacion de categoria | 1. Clic en editar de "Herramientas". 2. Cambiar nombre a "Herramientas Manuales". 3. Clic en "Guardar Cambios" | La tabla se actualiza mostrando el nuevo nombre de la categoria | Navegador con JavaScript habilitado | Ninguno | CP-017 | - | Pendiente | - | - |

---

## Modulo 5: Gestion de Clientes

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-019 | Registrar un nuevo cliente | Verificar que se puede registrar un nuevo cliente con sus datos personales y de contacto | 19/02/2026 | Clientes / Registro | Alta de cliente | 1. Clic en "Agregar Cliente". 2. Nombre: Fernando Gutierrez. 3. Tipo documento: Cedula. 4. Numero: 1756789012. 5. Telefono: 555-0201. 6. Correo: fernando.g@email.com. 7. Clic en "Guardar" | El cliente se agrega a la tabla con estado "Activo" y tipo "Regular". Total de compras inicia en $0 | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-020 | Clasificacion automatica de clientes VIP | Verificar que los clientes con compras superiores a $5,000 se clasifican automaticamente como VIP | 19/02/2026 | Clientes / Clasificacion | Clasificacion VIP automatica | 1. Navegar a /dashboard/clientes. 2. Buscar "Juan Martinez" | El cliente "Juan Martinez" muestra la etiqueta "VIP" ($5,240 en compras). El cliente "Carlos Rodriguez" con $920 muestra "Regular" | Navegador con JavaScript habilitado | Ninguno | CP-019 | - | Pendiente | - | - |

---

## Modulo 6: Ventas

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-021 | Registrar una venta completa | Verificar que se puede registrar una venta seleccionando un cliente, agregando productos y completando la transaccion | 19/02/2026 | Ventas / Registro de Venta | Proceso de venta completo | 1. Navegar a /dashboard/ventas. 2. Seleccionar cliente: Juan Martinez. 3. Buscar producto: Martillo de Garra 16oz. 4. Agregar 2 unidades. 5. Buscar: Clavos 2 pulgadas. 6. Agregar 3 unidades. 7. Clic en "Completar Venta" | Subtotal = (2 x $25.99) + (3 x $5.99) = $69.95. IVA (12%) = $8.39. Total = $78.34. La venta se registra y aparece en ventas recientes | Navegador con JavaScript habilitado | Ninguno | CP-001, CP-009, CP-019 | - | Pendiente | - | - |
| CP-022 | Calculo automatico de subtotal, IVA y total | Verificar que al agregar productos a la venta, los montos se calculan automaticamente en tiempo real | 19/02/2026 | Ventas / Calculos | Calculo automatico de montos | 1. Agregar Taladro Electrico (1 x $89.99). 2. Agregar Destornillador Phillips (2 x $8.50). 3. Observar totales | Subtotal = $89.99 + $17.00 = $106.99. IVA (12%) = $12.84. Total = $119.83. Los valores se actualizan automaticamente al cambiar cantidades | Navegador con JavaScript habilitado | Ninguno | CP-021 | - | Pendiente | - | - |
| CP-023 | Preview de imagen al pasar cursor sobre producto | Verificar que al pasar el cursor sobre un producto en el selector, se muestra un modal con la imagen del producto | 19/02/2026 | Ventas / Seleccion de Producto | Vista previa de imagen del producto | 1. Buscar "Martillo de Garra 16oz" en el selector. 2. Pasar el cursor sobre el producto. 3. Mover el cursor fuera del producto | Al pasar el cursor: se muestra un modal con la imagen del martillo, nombre, categoria, precio y stock. Al mover el cursor fuera: el modal desaparece | Imagenes de productos disponibles en /public/images/productos/ | Ninguno | CP-021 | - | Pendiente | - | - |

---

## Modulo 7: Facturacion Rapida (Cajero)

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-024 | Crear factura sin cliente registrado (Consumidor Final) | Verificar que el cajero puede crear una factura sin necesidad de que el cliente este registrado en el sistema | 19/02/2026 | Facturacion / Factura Rapida | Facturacion sin cliente registrado | 1. Dejar tipo de documento como "Consumidor Final". 2. Buscar producto: Martillo de Carpintero. 3. Agregar 1 unidad. 4. Metodo de pago: Efectivo. 5. Clic en "Completar Factura" | Se genera factura con codigo unico FAC-YYYY-NNNNNN. Cliente aparece como "Consumidor Final". Se calculan subtotal, IVA (12%) y total correctamente | Navegador con JavaScript habilitado | Ninguno | CP-003 | - | Pendiente | - | - |
| CP-025 | Crear factura ingresando datos del cliente manualmente | Verificar que el cajero puede digitar manualmente el nombre, tipo y numero de documento del cliente sin que este registrado | 19/02/2026 | Facturacion / Datos del Cliente | Ingreso manual de datos del cliente | 1. Nombre: Roberto Andrade. 2. Tipo documento: Cedula. 3. Numero: 1712345679. 4. Agregar productos. 5. Clic en "Completar Factura" | La factura se genera con los datos del cliente ingresados manualmente. Nombre "Roberto Andrade", tipo "Cedula" y numero "1712345679" aparecen en la factura | Navegador con JavaScript habilitado | Ninguno | CP-024 | - | Pendiente | - | - |
| CP-026 | Generacion de codigo unico de factura | Verificar que cada factura generada tiene un codigo unico con el formato FAC-YYYY-NNNNNN | 19/02/2026 | Facturacion / Codigo de Factura | Generacion de codigo secuencial | 1. Completar una primera factura. 2. Anotar codigo. 3. Completar segunda factura. 4. Comparar codigos | La primera factura tiene codigo FAC-2026-000001 (o secuencial correspondiente). La segunda tiene numero mayor. No hay codigos duplicados | Navegador con JavaScript habilitado | Ninguno | CP-024 | - | Pendiente | - | - |
| CP-027 | Descargar factura en formato PDF | Verificar que se puede descargar una factura completada en formato PDF con todos los datos visibles | 19/02/2026 | Facturacion / Exportacion | Descarga de factura PDF | 1. Completar una factura. 2. Clic en el boton "PDF" | Se descarga un archivo PDF con: datos de la empresa (LuckFeer Ferreteria), codigo de factura, datos del cliente, lista de productos con cantidades y precios, subtotal, IVA y total | Navegador con soporte para descarga de archivos | Ninguno | CP-024 | - | Pendiente | - | - |
| CP-028 | Descargar factura en formato Excel | Verificar que se puede descargar una factura completada en formato Excel con todas las columnas | 19/02/2026 | Facturacion / Exportacion | Descarga de factura Excel | 1. Completar una factura. 2. Clic en el boton "Excel" | Se descarga archivo Excel con columnas: Producto, Categoria, Cantidad, Precio Unitario, Subtotal, y fila resumen con IVA y Total | Navegador con soporte para descarga de archivos | Ninguno | CP-024 | - | Pendiente | - | - |
| CP-029 | Imprimir factura directamente | Verificar que al hacer clic en imprimir se abre el dialogo de impresion del navegador con el formato correcto | 19/02/2026 | Facturacion / Impresion | Impresion de factura | 1. Completar una factura. 2. Clic en el boton "Imprimir" | Se abre el dialogo de impresion nativo del navegador. El formato de la factura es legible e incluye todos los datos | Navegador con soporte para window.print() | Se requiere impresora conectada para impresion fisica (opcional) | CP-024 | - | Pendiente | - | - |

---

## Modulo 8: Reportes y Analiticas

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-030 | Visualizacion del grafico de ventas por dia | Verificar que el grafico de ventas muestra los datos de los ultimos 15 dias con color naranja y tooltip informativo | 19/02/2026 | Reportes / Ventas por Dia | Grafico de area de ventas | 1. Navegar a /dashboard/reportes. 2. Observar grafico "Ventas por Dia". 3. Pasar cursor sobre un punto | El grafico muestra area en color naranja con 15 puntos de datos. Tooltip con fecha y monto. Total acumulado y promedio diario visibles. Indicador de tendencia +12.5% | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-031 | Visualizacion de productos mas vendidos | Verificar que se muestra la lista de los 5 productos mas vendidos con ranking, unidades, ingresos y tendencia | 19/02/2026 | Reportes / Productos Mas Vendidos | Top 5 productos mas vendidos | 1. Observar la seccion "Productos Mas Vendidos" en reportes | Se muestran 5 tarjetas con: ranking, nombre, categoria, barra de progreso, unidades vendidas, ingresos e indicador de tendencia (verde/rojo) | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |
| CP-032 | Reporte de productos con stock bajo | Verificar que el reporte de stock bajo lista los productos cuyo stock esta por debajo del minimo | 19/02/2026 | Reportes / Stock Bajo | Listado de productos con stock critico | 1. Navegar a seccion de stock bajo. 2. Observar la tabla | Se listan productos con stock critico: "Tornillos Autorroscantes" (5/50), "Cable Electrico 12AWG" (12/20). Cada fila muestra stock actual, minimo, deficit y boton de reorden | Navegador con JavaScript habilitado | Ninguno | CP-001 | - | Pendiente | - | - |

---

## Modulo 9: Gestion de Usuarios

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-033 | Crear un nuevo usuario con validaciones completas | Verificar que se puede crear un nuevo usuario cumpliendo todas las validaciones de nombre, username, email y contrasena segura | 19/02/2026 | Usuarios / Registro | Alta de usuario con validaciones | 1. Clic en "Agregar Usuario". 2. Nombre: Pedro Ramirez (3-50 caracteres, solo letras). 3. Username: pramirez (4-20 caracteres). 4. Email: pedro.r@luckfeer.com. 5. Contrasena: Pedro$2024 (8+ caracteres, mayuscula, minuscula, numero, especial). 6. Confirmar: Pedro$2024. 7. Rol: Vendedor. 8. Clic en "Crear Usuario" | El usuario se crea correctamente. El indicador de fortaleza muestra "Fuerte" en verde. El usuario aparece en la tabla con estado "Activo" y rol "Vendedor" | Navegador con JavaScript habilitado | Solo el Administrador tiene acceso a este modulo | CP-001 | - | Pendiente | - | - |
| CP-034 | Validacion de contrasena debil | Verificar que el sistema rechaza contrasenas que no cumplen los requisitos de seguridad y muestra el indicador correspondiente | 19/02/2026 | Usuarios / Validacion de Contrasena | Validacion e indicador de fortaleza | 1. Contrasena: 123 (observar indicador). 2. Cambiar a: Pedro123 (observar). 3. Cambiar a: Pedro$2024! (observar) | Con "123": indicador rojo "Debil". Con "Pedro123": indicador amarillo "Media". Con "Pedro$2024!": indicador verde "Fuerte". Mensajes de error especificos por cada requisito faltante | Navegador con JavaScript habilitado | Ninguno | CP-033 | - | Pendiente | - | - |
| CP-035 | Validacion de confirmacion de contrasena | Verificar que el sistema valida que la contrasena y su confirmacion coincidan | 19/02/2026 | Usuarios / Validacion | Confirmacion de contrasena | 1. Contrasena: Pedro$2024. 2. Confirmar: Pedro$2025. 3. Intentar guardar | Se muestra mensaje "Las contrasenas no coinciden". No se permite crear el usuario | Navegador con JavaScript habilitado | Ninguno | CP-033 | - | Pendiente | - | - |
| CP-036 | Editar un usuario existente | Verificar que se pueden modificar los datos de un usuario del sistema | 19/02/2026 | Usuarios / Edicion | Modificacion de usuario | 1. Ubicar "Roberto Sanchez". 2. Clic en editar. 3. Cambiar estado de "Inactivo" a "Activo". 4. Clic en "Guardar Cambios" | El estado del usuario se actualiza a "Activo" en la tabla | Navegador con JavaScript habilitado | Ninguno | CP-033 | - | Pendiente | - | - |

---

## Modulo 10: Control de Acceso por Roles

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-037 | Restriccion de acceso a modulos para el rol Vendedor | Verificar que el Vendedor no puede acceder a los modulos restringidos para su rol | 19/02/2026 | Seguridad / Control de Acceso | Restriccion de menu por rol | 1. Iniciar sesion como vendedor@luckfeer.com. 2. Observar menu lateral. 3. Intentar navegar a /dashboard/usuarios. 4. Intentar /dashboard/reportes | El menu NO muestra: Categorias, Facturacion Rapida, Reportes, Usuarios. Al acceder manualmente a rutas restringidas, redirige al dashboard del vendedor | Navegador con JavaScript habilitado | Probar acceso directo por URL ademas del menu | CP-002 | - | Pendiente | - | - |
| CP-038 | Restriccion de acceso a modulos para el rol Cajero | Verificar que el Cajero solo puede acceder al dashboard y a facturacion rapida | 19/02/2026 | Seguridad / Control de Acceso | Restriccion de menu por rol | 1. Iniciar sesion como cajero@luckfeer.com. 2. Observar menu lateral. 3. Intentar navegar a /dashboard/productos. 4. Intentar /dashboard/clientes | El menu solo muestra: Dashboard y Facturacion Rapida. Al acceder a rutas restringidas, redirige al dashboard del cajero | Navegador con JavaScript habilitado | Probar acceso directo por URL | CP-003 | - | Pendiente | - | - |
| CP-039 | Administrador tiene acceso completo a todos los modulos | Verificar que el Administrador puede acceder a todos los modulos del sistema incluyendo Facturacion Rapida | 19/02/2026 | Seguridad / Control de Acceso | Acceso completo del administrador | 1. Iniciar sesion como admin@luckfeer.com. 2. Navegar a cada modulo: Dashboard, Productos, Categorias, Clientes, Ventas, Facturacion, Reportes, Usuarios | Todos los modulos son accesibles y se muestran en el menu lateral. El admin puede realizar todas las operaciones de cualquier rol | Navegador con JavaScript habilitado | Verificar que Facturacion Rapida (modulo del cajero) tambien es accesible | CP-001 | - | Pendiente | - | - |

---

## Modulo 11: Base de Datos - Facturacion

| Id | Caso de Prueba | Descripcion | Fecha | Area Funcional / Sub proceso | Funcionalidad / Caracteristica | Datos / Acciones de Entrada | Resultado Esperado | Requerimientos de Ambiente de Pruebas | Procedimientos especiales requeridos | Dependencias con otros casos de Prueba | Resultado Obtenido | Estado | Ultima Fecha de Estado | Observaciones |
|----|---------------|-------------|-------|------------------------------|-------------------------------|----------------------------|-------------------|--------------------------------------|--------------------------------------|---------------------------------------|-------------------|--------|----------------------|---------------|
| CP-040 | Verificar que la factura se guarda en la tabla facturas | Verificar que al completar una factura, todos los datos se guardan correctamente en la tabla facturas de la base de datos | 19/02/2026 | Base de Datos / Facturacion | Persistencia de datos de factura | 1. Completar factura con: cliente "Roberto Andrade", cedula "1712345679", 2 martillos, 3 destornilladores, metodo "Efectivo". 2. Consultar tabla facturas | La tabla facturas contiene registro con: codigo_factura unico, cliente_nombre = "Roberto Andrade", cliente_documento_tipo = "cedula", subtotal/monto_iva/total correctos, metodo_pago = "efectivo", estado = "completada" | MySQL 8.0+ con esquema ejecutado | Verificar directamente en BD con consulta SQL | CP-024 | - | Pendiente | - | SELECT * FROM facturas ORDER BY id DESC LIMIT 1; |
| CP-041 | Verificar que los items de la factura se guardan en factura_items | Verificar que al completar una factura, cada producto queda registrado en la tabla factura_items con cantidad, precio y subtotal | 19/02/2026 | Base de Datos / Detalle de Factura | Persistencia de items de factura | 1. Consultar tabla factura_items filtrando por la ultima factura creada | La tabla factura_items contiene registros para cada producto: factura_id correcto, product_id referenciado, producto_nombre guardado, cantidad, precio_unitario y subtotal_item correctos | MySQL 8.0+ con esquema ejecutado | Verificar directamente en BD | CP-040 | - | Pendiente | - | SELECT * FROM factura_items WHERE factura_id = (ultima factura); |

---

## Resumen de Casos de Prueba

### Por Modulo

| Modulo | Casos | IDs |
|--------|:-----:|-----|
| Autenticacion | 6 | CP-001 a CP-006 |
| Dashboard | 2 | CP-007, CP-008 |
| Productos | 8 | CP-009 a CP-016 |
| Categorias | 2 | CP-017, CP-018 |
| Clientes | 2 | CP-019, CP-020 |
| Ventas | 3 | CP-021 a CP-023 |
| Facturacion Rapida | 6 | CP-024 a CP-029 |
| Reportes | 3 | CP-030 a CP-032 |
| Usuarios | 4 | CP-033 a CP-036 |
| Control de Acceso | 3 | CP-037 a CP-039 |
| Base de Datos | 2 | CP-040, CP-041 |
| **Total** | **41** | **CP-001 a CP-041** |

### Por Prioridad

| Prioridad | Cantidad | Porcentaje |
|-----------|:--------:|:----------:|
| Alta | 28 | 68% |
| Media | 9 | 22% |
| Baja | 4 | 10% |

### Por Estado

| Estado | Cantidad |
|--------|:--------:|
| Pendiente | 41 |
| En Ejecucion | 0 |
| Aprobado | 0 |
| Fallido | 0 |

---

## Orden de Ejecucion Recomendado

1. **Primero**: CP-001 a CP-006 (Autenticacion - base del sistema)
2. **Segundo**: CP-037 a CP-039 (Control de Acceso - seguridad)
3. **Tercero**: CP-007, CP-008 (Dashboard)
4. **Cuarto**: CP-017, CP-018 (Categorias - dependencia de productos)
5. **Quinto**: CP-009 a CP-016 (Productos)
6. **Sexto**: CP-019, CP-020 (Clientes)
7. **Septimo**: CP-021 a CP-023 (Ventas)
8. **Octavo**: CP-024 a CP-029 (Facturacion Rapida)
9. **Noveno**: CP-030 a CP-032 (Reportes)
10. **Decimo**: CP-033 a CP-036 (Usuarios)
11. **Ultimo**: CP-040, CP-041 (Base de Datos)

---

*Documento de Casos de Prueba del Sistema LuckFeer*
*Version 1.0 - Fecha: 19/02/2026*
*Total de casos: 41*
