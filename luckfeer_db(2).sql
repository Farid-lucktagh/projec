-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2026 a las 06:43:21
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `luckfeer_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-0331bc0df950c7d2274e8f72bbb6b9e6', 'i:1;', 1776262232),
('laravel-cache-0331bc0df950c7d2274e8f72bbb6b9e6:timer', 'i:1776262232;', 1776262232),
('laravel-cache-0beffaab0ce1cb97b3dd7e575d175f50', 'i:2;', 1776256792),
('laravel-cache-0beffaab0ce1cb97b3dd7e575d175f50:timer', 'i:1776256792;', 1776256792),
('laravel-cache-1c87bb63c09decfe55060e5c9e5ed5da', 'i:1;', 1771981532),
('laravel-cache-1c87bb63c09decfe55060e5c9e5ed5da:timer', 'i:1771981532;', 1771981532),
('laravel-cache-34d21c6fc5c6195d83b3fcffb91dc8fd', 'i:2;', 1772196552),
('laravel-cache-34d21c6fc5c6195d83b3fcffb91dc8fd:timer', 'i:1772196552;', 1772196552),
('laravel-cache-c962352d6b37187a03b832b63ec6e2f3', 'i:1;', 1773415471),
('laravel-cache-c962352d6b37187a03b832b63ec6e2f3:timer', 'i:1773415471;', 1773415471),
('laravel-cache-cba257ce6b3ec6ed0e77b21a35369fe9', 'i:1;', 1776831275),
('laravel-cache-cba257ce6b3ec6ed0e77b21a35369fe9:timer', 'i:1776831275;', 1776831275),
('laravel-cache-ce84d2477d020feec3dd4abb16dfe471', 'i:1;', 1771982039),
('laravel-cache-ce84d2477d020feec3dd4abb16dfe471:timer', 'i:1771982039;', 1771982039),
('laravel-cache-farid@gmai.com0|127.0.0.1', 'i:1;', 1771982040),
('laravel-cache-farid@gmai.com0|127.0.0.1:timer', 'i:1771982040;', 1771982040),
('laravel-cache-farid@gmai.comp|127.0.0.1', 'i:1;', 1771981533),
('laravel-cache-farid@gmai.comp|127.0.0.1:timer', 'i:1771981533;', 1771981533),
('laravel-cache-farid@gmail.com|127.0.0.1', 'i:2;', 1772196552),
('laravel-cache-farid@gmail.com|127.0.0.1:timer', 'i:1772196552;', 1772196552),
('laravel-cache-fc0d42c5147053f5bd70f3803afb0cb8', 'i:3;', 1776262082),
('laravel-cache-fc0d42c5147053f5bd70f3803afb0cb8:timer', 'i:1776262082;', 1776262082),
('laravel-cache-usuario@prueva.com|127.0.0.1', 'i:1;', 1773415472),
('laravel-cache-usuario@prueva.com|127.0.0.1:timer', 'i:1773415472;', 1773415472),
('laravel-cache-victor@gmai.com|127.0.0.1', 'i:3;', 1776262084),
('laravel-cache-victor@gmai.com|127.0.0.1:timer', 'i:1776262083;', 1776262083);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `color` varchar(7) NOT NULL DEFAULT '#3B82F6',
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `nombre`, `descripcion`, `color`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Electricidad', 'Cables, enchufes, interruptores', '#b705fa', 'inactivo', NULL, '2026-04-22 09:34:27'),
(2, 'Jardinería', 'Herramientas de jardín, semillas', '#0e9246', 'inactivo', '2026-02-09 07:10:57', '2026-04-22 09:37:58'),
(7, 'Herramientas', 'Herramientas manuales y eléctricas', '#f59e0b', 'activo', NULL, NULL),
(8, 'Construcción', 'Materiales de construcción', '#6b7280', 'inactivo', NULL, '2026-04-22 09:38:07'),
(9, 'Pintura', 'Pinturas y accesorios', '#ef4444', 'inactivo', NULL, '2026-04-22 09:38:13'),
(10, 'Plomería', 'Tuberías y accesorios de agua', '#3b82f6', 'inactivo', NULL, '2026-04-22 09:38:21'),
(11, 'Seguridad', 'Equipos de protección', '#856b45', 'inactivo', NULL, '2026-04-22 09:38:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo_documento` enum('cedula','tarjeta_identidad','pasaporte') NOT NULL,
  `numero_documento` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `total_compras` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `nombre`, `tipo_documento`, `numero_documento`, `telefono`, `correo`, `direccion`, `total_compras`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'camilo', 'cedula', '1234567890', '3214567890', 'victor@gmail.com', 'su casita', 0.00, 'activo', '2026-02-09 08:31:32', '2026-02-19 21:22:03'),
(3, 'Cliente General', 'cedula', '2222222222- 9', '6068370017', 'cliente@luckfeer.com', 'LuckFeer', 0.00, 'activo', '2026-02-26 17:49:15', '2026-03-13 18:43:42'),
(4, 'victor', 'cedula', '6543217890', '1234324567', 'v@gmail.com', '1', 0.00, 'activo', '2026-03-02 16:16:52', '2026-03-02 16:16:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice-items`
--

CREATE TABLE `invoice-items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `factura_id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `nombre_producto` varchar(255) NOT NULL,
  `categoria_producto` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `invoice-items`
--

INSERT INTO `invoice-items` (`id`, `factura_id`, `producto_id`, `nombre_producto`, `categoria_producto`, `cantidad`, `precio_unitario`, `subtotal`, `creado_en`) VALUES
(4, 4, 11, 'pala', 'Jardinería', 5, 12345.00, 61725.00, '2026-02-26 19:43:28'),
(5, 5, 12, 'Cable RH4', 'Electricidad', 5, 765.00, 3825.00, '2026-03-01 23:56:33'),
(6, 6, 11, 'pala', 'Jardinería', 3, 12345.00, 37035.00, '2026-03-02 16:17:27'),
(7, 7, 12, 'Cable RH4', 'Electricidad', 5, 765.00, 3825.00, '2026-03-05 16:27:49'),
(8, 8, 11, 'pala', 'Jardinería', 8, 12345.00, 98760.00, '2026-03-12 17:32:44'),
(9, 9, 85, 'Bombillo LED 9W', 'Electricidad', 6, 3000.00, 18000.00, '2026-04-13 21:14:30'),
(10, 9, 89, 'Cinta aislante', 'Electricidad', 5, 2000.00, 10000.00, '2026-04-13 21:14:30'),
(11, 9, 84, 'Cable 2m', 'Electricidad', 3, 5000.00, 15000.00, '2026-04-13 21:14:30'),
(12, 10, 84, 'Cable 2m', 'Electricidad', 15, 5000.00, 75000.00, '2026-04-15 17:39:35'),
(13, 11, 120, 'Codo PVC', 'Plomería', 1, 2000.00, 2000.00, '2026-04-22 09:39:27'),
(14, 12, 120, 'Codo PVC', 'Plomería', 1, 2000.00, 2000.00, '2026-04-22 09:39:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `porcentaje_iva` decimal(5,2) NOT NULL,
  `monto_iva` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL,
  `estado` enum('completada','anulada','pendiente') NOT NULL,
  `notas` text DEFAULT NULL,
  `fecha_emision` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `invoices`
--

INSERT INTO `invoices` (`id`, `codigo`, `cliente_id`, `usuario_id`, `subtotal`, `porcentaje_iva`, `monto_iva`, `descuento`, `total`, `metodo_pago`, `estado`, `notas`, `fecha_emision`) VALUES
(4, 'FAC-000001', 3, 1, 61725.00, 12.00, 7407.00, 9000.00, 60132.00, 'tarjeta', 'completada', NULL, '2026-02-26 19:43:28'),
(5, 'FAC-000002', 1, 1, 3825.00, 16.00, 612.00, 80.00, 4357.00, 'transferencia', 'completada', NULL, '2026-03-01 23:56:33'),
(6, 'FAC-000003', 4, 1, 37035.00, 16.00, 5925.60, 0.00, 42960.60, 'tarjeta', 'completada', NULL, '2026-03-02 16:17:27'),
(7, 'FAC-000004', 3, 1, 3825.00, 16.00, 612.00, 0.00, 4437.00, 'tarjeta', 'completada', NULL, '2026-03-05 16:27:49'),
(8, 'FAC-000005', 3, 1, 98760.00, 16.00, 15801.60, 0.00, 114561.60, 'efectivo', 'completada', NULL, '2026-03-12 17:32:44'),
(9, 'FAC-000006', 3, 1, 43000.00, 16.00, 6880.00, 1000.00, 48880.00, 'efectivo', 'completada', NULL, '2026-04-13 21:14:30'),
(10, 'FAC-000007', 4, 5, 75000.00, 16.00, 12000.00, 0.00, 87000.00, 'transferencia', 'completada', NULL, '2026-04-15 17:39:35'),
(11, 'FAC-000008', 3, 1, 2000.00, 11.00, 220.00, 0.00, 2220.00, 'transferencia', 'completada', NULL, '2026-04-22 09:39:27'),
(12, 'FAC-000009', 3, 1, 2000.00, 10.00, 200.00, 0.00, 2200.00, 'transferencia', 'completada', NULL, '2026-04-22 09:39:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `accion` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `usuario_id`, `accion`, `descripcion`, `creado_en`) VALUES
(1, 1, 'crear_venta', 'Se realizó una venta por un total de 841.5', '2026-04-22 09:35:46'),
(2, 1, 'crear_venta', 'Se realizó una venta por un total de 22000', '2026-04-22 09:40:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2026_02_07_225544_create_logs_table', 1),
(6, '2026_02_07_225550_create_suppliers_table', 1),
(7, '2026_02_07_225551_create_categories_table', 1),
(8, '2026_02_07_225600_create_customers_table', 1),
(9, '2026_02_07_225601_create_products_table', 1),
(10, '2026_02_07_225644_create_sales_table', 1),
(11, '2026_02_07_225745_create_sale-items_table', 1),
(12, '2026_02_07_230205_create_invoices_table', 1),
(13, '2026_02_07_230217_create_invoice-items_table', 1),
(14, '2026_02_16_000000_update_invoices_use_documento', 2),
(15, '2026_04_22_041739_add_permissions_to_users_table', 3),
(16, '2026_04_22_041755_update_products_estado_enum', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('lesherito@gmail.com', '$2y$12$SS2FjQuYQBPRq8r9A1CUWOpvvS4px1yvvCAH5LN9sBNUj5ddYgen2', '2026-04-08 16:49:14'),
('lesheritoomg@gmail.com', '$2y$12$QGGmtR.Fvy5X9.2BIaVTdOkMijz/pPC0MlzsTMTnfuU2FfQD7OmGa', '2026-04-08 16:53:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria_id` bigint(20) UNSIGNED NOT NULL,
  `proveedor_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `costo` decimal(10,2) NOT NULL DEFAULT 0.00,
  `cantidad_stock` int(11) NOT NULL DEFAULT 0,
  `stock_minimo` int(11) NOT NULL DEFAULT 10,
  `estado` enum('disponible','bajo','sin','inactivo') NOT NULL DEFAULT 'disponible',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `descripcion`, `categoria_id`, `proveedor_id`, `sku`, `precio`, `costo`, `cantidad_stock`, `stock_minimo`, `estado`, `created_at`, `updated_at`) VALUES
(8, 'Jarra de hierro', 'Jarra de jardinería', 2, 1, NULL, 15000.00, 0.00, 32, 10, 'disponible', '2026-02-09 07:12:19', '2026-04-08 17:35:04'),
(11, 'Pala Grande', 'Pala metálica', 2, 1, NULL, 40000.00, 0.00, 129, 10, 'disponible', '2026-02-19 21:27:55', '2026-04-09 03:13:34'),
(12, 'Cable RJ45', 'Cables de conexión', 1, 1, NULL, 765.00, 0.00, 3, 10, 'bajo', '2026-02-19 21:42:56', '2026-04-22 09:35:46'),
(84, 'Cable 2m', 'Cable doméstico', 1, 1, NULL, 5000.00, 0.00, 32, 10, 'disponible', NULL, '2026-04-15 17:39:35'),
(85, 'Bombillo LED 9W', 'Ahorro energía', 1, 1, NULL, 3000.00, 0.00, 74, 20, 'disponible', NULL, '2026-04-13 21:14:30'),
(86, 'Interruptor simple', 'Interruptor blanco', 1, 1, NULL, 3500.00, 0.00, 55, 10, 'disponible', NULL, '2026-04-15 16:57:24'),
(87, 'Tomacorriente doble', 'Toma doble', 1, 1, NULL, 4000.00, 0.00, 70, 10, 'disponible', NULL, NULL),
(88, 'Extensión 5m', 'Extensión eléctrica', 1, 1, NULL, 12000.00, 0.00, 27, 5, 'disponible', NULL, '2026-04-15 16:57:24'),
(89, 'Cinta aislante', 'Aislante negro', 1, 1, NULL, 2000.00, 0.00, 85, 20, 'disponible', NULL, '2026-04-13 21:14:30'),
(90, 'Breaker 20A', 'Protección', 1, 1, NULL, 17000.00, 0.00, 20, 5, 'disponible', NULL, NULL),
(91, 'Regleta', '6 puertos', 1, 1, NULL, 18000.00, 0.00, 15, 5, 'disponible', NULL, NULL),
(92, 'Portalámpara', 'Soporte bombillo', 1, 1, NULL, 2500.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(93, 'Detector voltaje', 'Detector', 1, 1, NULL, 20000.00, 0.00, 10, 3, 'disponible', NULL, NULL),
(94, 'Pala Pequeña', 'Pala metálica', 2, 1, NULL, 20000.00, 0.00, 29, 10, 'disponible', NULL, '2026-04-22 09:40:58'),
(95, 'Rastrillo', 'Para hojas', 2, 1, NULL, 18000.00, 0.00, 25, 10, 'disponible', NULL, NULL),
(96, 'Tijeras podar', 'Corte', 2, 1, NULL, 22000.00, 0.00, 20, 5, 'disponible', NULL, NULL),
(97, 'Manguera 10m', 'Riego', 2, 1, NULL, 25000.00, 0.00, 40, 10, 'disponible', NULL, NULL),
(98, 'Regadera', 'Manual', 2, 1, NULL, 10000.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(99, 'Abono', 'Orgánico', 2, 1, NULL, 8000.00, 0.00, 60, 15, 'disponible', NULL, NULL),
(100, 'Maceta pequeña', 'Decorativa', 2, 1, NULL, 5000.00, 0.00, 80, 20, 'disponible', NULL, NULL),
(101, 'Guantes jardín', 'Protección', 2, 1, NULL, 7000.00, 0.00, 70, 15, 'disponible', NULL, NULL),
(102, 'Semillas cesped', 'Para plantar', 2, 1, NULL, 6000.00, 0.00, 90, 20, 'disponible', NULL, NULL),
(103, 'Carretilla', 'Carga', 2, 1, NULL, 80000.00, 0.00, 10, 2, 'disponible', NULL, NULL),
(104, 'Martillo', 'Acero', 7, 1, NULL, 15000.00, 0.00, 40, 10, 'disponible', NULL, NULL),
(105, 'Destornillador plano', 'Manual', 7, 1, NULL, 5000.00, 0.00, 60, 10, 'disponible', NULL, NULL),
(106, 'Llave inglesa', 'Ajustable', 7, 1, NULL, 20000.00, 0.00, 30, 10, 'disponible', NULL, NULL),
(107, 'Alicate', 'Multiuso', 7, 1, NULL, 12000.00, 0.00, 35, 10, 'disponible', NULL, NULL),
(108, 'Taladro', 'Eléctrico', 7, 1, NULL, 120000.00, 0.00, 10, 2, 'disponible', NULL, NULL),
(109, 'Cemento', 'Bolsa 50kg', 8, 1, NULL, 30000.00, 0.00, 100, 20, 'disponible', NULL, NULL),
(110, 'Arena', 'Metro cúbico', 8, 1, NULL, 50000.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(111, 'Ladrillo', 'Unidad', 8, 1, NULL, 800.00, 0.00, 500, 100, 'disponible', NULL, NULL),
(112, 'Bloque', 'Construcción', 8, 1, NULL, 2500.00, 0.00, 300, 50, 'disponible', NULL, NULL),
(113, 'Varilla', 'Hierro', 8, 1, NULL, 20000.00, 0.00, 60, 10, 'disponible', NULL, NULL),
(114, 'Pintura blanca', 'Galón', 9, 1, NULL, 40000.00, 0.00, 30, 10, 'disponible', NULL, NULL),
(115, 'Rodillo', 'Pintar', 9, 1, NULL, 10000.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(116, 'Brocha', 'Pintura', 9, 1, NULL, 8000.00, 0.00, 60, 10, 'disponible', NULL, NULL),
(117, 'Lija', 'Superficie', 9, 1, NULL, 2000.00, 0.00, 100, 20, 'disponible', NULL, NULL),
(118, 'Pintura spray', 'Aerosol', 9, 1, NULL, 15000.00, 0.00, 30, 10, 'disponible', NULL, NULL),
(119, 'Tubo PVC', 'Agua', 10, 1, NULL, 12000.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(120, 'Codo PVC', 'Conexión', 10, 1, NULL, 2000.00, 0.00, 98, 20, 'disponible', NULL, '2026-04-22 09:39:51'),
(121, 'Llave paso', 'Control agua', 10, 1, NULL, 15000.00, 0.00, 30, 10, 'disponible', NULL, NULL),
(122, 'Grifo', 'Lavamanos', 10, 1, NULL, 25000.00, 0.00, 20, 5, 'disponible', NULL, NULL),
(123, 'Cinta teflón', 'Sellado', 10, 1, NULL, 3000.00, 0.00, 80, 20, 'disponible', NULL, NULL),
(124, 'Casco', 'Protección', 11, 1, NULL, 20000.00, 0.00, 30, 10, 'disponible', NULL, NULL),
(125, 'Guantes seguridad', 'Industrial', 11, 1, NULL, 8000.00, 0.00, 50, 10, 'disponible', NULL, NULL),
(126, 'Gafas seguridad', 'Protección ojos', 11, 1, NULL, 10000.00, 0.00, 35, 10, 'disponible', NULL, '2026-04-15 16:57:24'),
(127, 'Botas seguridad', 'Punta acero', 11, 1, NULL, 80000.00, 0.00, 13, 5, 'disponible', NULL, '2026-04-15 16:57:24'),
(128, 'Extintor', 'Incendios', 11, 1, NULL, 90000.00, 0.00, 10, 2, 'disponible', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale-items`
--

CREATE TABLE `sale-items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `venta_id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sale-items`
--

INSERT INTO `sale-items` (`id`, `venta_id`, `producto_id`, `cantidad`, `precio_unitario`, `precio_total`, `creado_en`) VALUES
(1, 1, 8, 4, 15000.00, 60000.00, '2026-02-16 11:15:10'),
(2, 2, 8, 4, 15000.00, 60000.00, '2026-02-16 16:04:23'),
(3, 3, 11, 5, 12345.00, 61725.00, '2026-02-19 16:28:54'),
(4, 4, 11, 7, 12345.00, 86415.00, '2026-02-25 01:17:21'),
(5, 5, 12, 5, 765.00, 3825.00, '2026-02-26 12:57:30'),
(6, 6, 11, 4, 12345.00, 49380.00, '2026-03-01 18:56:56'),
(7, 7, 11, 15, 12345.00, 185175.00, '2026-03-13 14:26:36'),
(8, 8, 88, 3, 12000.00, 36000.00, '2026-04-15 11:57:24'),
(9, 8, 86, 5, 3500.00, 17500.00, '2026-04-15 11:57:24'),
(10, 8, 126, 5, 10000.00, 50000.00, '2026-04-15 11:57:24'),
(11, 8, 127, 2, 80000.00, 160000.00, '2026-04-15 11:57:24'),
(12, 9, 12, 1, 765.00, 765.00, '2026-04-22 04:35:46'),
(13, 10, 94, 1, 20000.00, 20000.00, '2026-04-22 04:40:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `impuesto` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL,
  `estado` enum('completada','cancelada') NOT NULL DEFAULT 'completada',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `cliente_id`, `usuario_id`, `subtotal`, `impuesto`, `total`, `metodo_pago`, `estado`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 60000.00, 6000.00, 66000.00, 'transferencia', 'completada', '2026-02-16 16:15:10', '2026-02-16 16:15:10'),
(2, 1, 1, 60000.00, 6000.00, 66000.00, 'efectivo', 'completada', '2026-02-16 21:04:23', '2026-02-16 21:04:23'),
(3, 1, 1, 61725.00, 6172.50, 67897.50, 'transferencia', 'completada', '2026-02-19 21:28:54', '2026-02-19 21:28:54'),
(4, 1, 1, 86415.00, 8641.50, 95056.50, 'tarjeta', 'completada', '2026-02-25 06:17:21', '2026-02-25 06:17:21'),
(5, 3, 1, 3825.00, 382.50, 4207.50, 'tarjeta', 'completada', '2026-02-26 17:57:30', '2026-02-26 17:57:30'),
(6, 3, 1, 49380.00, 4938.00, 54318.00, 'efectivo', 'completada', '2026-03-01 23:56:56', '2026-03-01 23:56:56'),
(7, 3, 1, 185175.00, 18517.50, 203692.50, 'tarjeta', 'completada', '2026-03-13 19:26:36', '2026-03-13 19:26:36'),
(8, 3, 2, 263500.00, 26350.00, 289850.00, 'tarjeta', 'completada', '2026-04-15 16:57:24', '2026-04-15 16:57:24'),
(9, 3, 1, 765.00, 76.50, 841.50, 'efectivo', 'completada', '2026-04-22 09:35:46', '2026-04-22 09:35:46'),
(10, 3, 1, 20000.00, 2000.00, 22000.00, 'efectivo', 'completada', '2026-04-22 09:40:58', '2026-04-22 09:40:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('m0ZYidxGsIVFvssrtPAPT1zdLmodq44aA9H4Hvtd', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:150.0) Gecko/20100101 Firefox/150.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVXhuZHhxY3gyVkViWVVKSmJ5bjNiSDQwWDFFUmlpSzNuU0xkZmJmQyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZXBvcnRzL3Byb2R1Y3Qtc2FsZXMiO3M6NToicm91dGUiO3M6MjE6InJlcG9ydHMucHJvZHVjdC1zYWxlcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1776832919);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `persona_contacto` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`id`, `nombre`, `persona_contacto`, `telefono`, `correo`, `direccion`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Mauricio', 'sexual', '3186664027', 'mauricio@gmail.com', 'su casa23', 'activo', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `rol` enum('admin','vendedor','cajero') NOT NULL DEFAULT 'cajero',
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permissions`)),
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `rol`, `permissions`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Farid', 'farid@gmai.com', NULL, '$2y$12$JPzN32eDZdGITMNRrki5futbid/oU5p0sEsUbeQoRb.HXp1u.MlZG', NULL, NULL, NULL, '4v8NBOheGEVf4QjNUE2xJ9srasDqPmrGSXTNidjpRSkj3cnhpT6jRtkqt4DJ', 'admin', NULL, 'activo', '2026-02-08 05:39:28', '2026-04-15 18:49:41'),
(2, 'Camilo', 'camilo@gmai.com', NULL, '$2y$12$kjpuX2YQKc/VRC8oC5uvo.UMSui9Ob6qMI3Av5dJ1YcpRBRIJnM36', NULL, NULL, NULL, NULL, 'cajero', NULL, 'activo', '2026-02-09 17:10:53', '2026-04-15 19:08:30'),
(5, 'Victor', 'victor@gmail.com', NULL, '$2y$12$7C2q.zpo5W6NLHg5US//U.cA.LnIJrG7ctJepcQCAa7gkVxy77LSS', NULL, NULL, NULL, NULL, 'vendedor', NULL, 'activo', '2026-04-08 16:50:13', '2026-04-15 19:09:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_nombre_index` (`nombre`),
  ADD KEY `categories_estado_index` (`estado`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_numero_documento_unique` (`numero_documento`),
  ADD KEY `customers_nombre_index` (`nombre`),
  ADD KEY `customers_estado_index` (`estado`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `invoice-items`
--
ALTER TABLE `invoice-items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_factura_id_index` (`factura_id`),
  ADD KEY `invoice_items_producto_id_index` (`producto_id`);

--
-- Indices de la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_usuario_id_foreign` (`usuario_id`),
  ADD KEY `invoices_codigo_index` (`codigo`),
  ADD KEY `invoices_estado_index` (`estado`),
  ADD KEY `invoices_fecha_emision_index` (`fecha_emision`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `logs_usuario_id_foreign` (`usuario_id`),
  ADD KEY `logs_accion_index` (`accion`),
  ADD KEY `logs_creado_en_index` (`creado_en`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_categoria_id_foreign` (`categoria_id`),
  ADD KEY `products_proveedor_id_foreign` (`proveedor_id`),
  ADD KEY `products_nombre_index` (`nombre`),
  ADD KEY `products_estado_index` (`estado`),
  ADD KEY `products_cantidad_stock_index` (`cantidad_stock`),
  ADD KEY `products_sku_index` (`sku`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sale-items`
--
ALTER TABLE `sale-items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_items_venta_id_index` (`venta_id`),
  ADD KEY `sale_items_producto_id_index` (`producto_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_cliente_id_foreign` (`cliente_id`),
  ADD KEY `sales_usuario_id_foreign` (`usuario_id`),
  ADD KEY `sales_estado_index` (`estado`),
  ADD KEY `sales_created_at_index` (`created_at`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppliers_nombre_index` (`nombre`),
  ADD KEY `suppliers_estado_index` (`estado`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_correo_unique` (`email`),
  ADD KEY `users_correo_index` (`email`),
  ADD KEY `users_rol_index` (`rol`),
  ADD KEY `users_estado_index` (`estado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `invoice-items`
--
ALTER TABLE `invoice-items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT de la tabla `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale-items`
--
ALTER TABLE `sale-items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `invoice-items`
--
ALTER TABLE `invoice-items`
  ADD CONSTRAINT `invoice_items_factura_id_foreign` FOREIGN KEY (`factura_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoice_items_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `fk_invoices_customers` FOREIGN KEY (`cliente_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_proveedor_id_foreign` FOREIGN KEY (`proveedor_id`) REFERENCES `suppliers` (`id`);

--
-- Filtros para la tabla `sale-items`
--
ALTER TABLE `sale-items`
  ADD CONSTRAINT `sale_items_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sale_items_venta_id_foreign` FOREIGN KEY (`venta_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `sales_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
