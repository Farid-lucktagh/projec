<?php

/**
 * Rutas Web Principales
 * 
 * Define todas las rutas de la aplicación.
 * Agrupa rutas por recurso para mejor organización.
 * Las rutas CRUD se generan automáticamente con el patrón:
 * - GET /resource          -> index (listar)
 * - GET /resource/create   -> create (formulario crear)
 * - POST /resource         -> store (guardar)
 * - GET /resource/{id}/edit -> edit (formulario editar)
 * - PUT /resource/{id}     -> update (actualizar)
 * - DELETE /resource/{id}  -> destroy (eliminar)
 */

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReportController;

/**
 * =====================
 * RUTAS PÚBLICAS
 * =====================
 */

// Página de inicio / bienvenida
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

/**
 * =====================
 * RUTAS PROTEGIDAS (requieren autenticación)
 * =====================
 */

// Dashboard principal
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/**
 * =====================
 * RUTAS CRUD DE PRODUCTOS
 * =====================
 */
// product routes
Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('products', [ProductController::class, 'store'])->name('products.store');
Route::get('products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

/**
 * =====================
 * RUTAS CRUD DE CATEGORÍAS
 * =====================
 */
//category routes
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

/**
 * =====================
 * RUTAS CRUD DE CLIENTES
 * =====================
 */
//customer routes
Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
Route::get('customers/create', [CustomerController::class, 'create'])->name('customers.create');
Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
Route::get('customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
Route::put('customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
Route::delete('customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');

/**
 * =====================
 * RUTAS CRUD DE USUARIOS
 * =====================
 */
//user routes
Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::get('users/create', [UserController::class, 'create'])->name('users.create');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

/**
 * =====================
 * RUTAS CRUD DE VENTAS
 * =====================
 * Gestión completa de transacciones de venta.
 * Incluye validación, stock tracking y detalles.
 */
//sales routes
Route::get('sales', [SaleController::class, 'index'])->name('sales.index');
Route::get('sales/create', [SaleController::class, 'create'])->name('sales.create');
Route::post('sales', [SaleController::class, 'store'])->name('sales.store');
Route::get('sales/{sale}/edit', [SaleController::class, 'edit'])->name('sales.edit');
Route::put('sales/{sale}', [SaleController::class, 'update'])->name('sales.update');
Route::delete('sales/{sale}', [SaleController::class, 'destroy'])->name('sales.destroy');

/**
 * =====================
 * RUTAS CRUD DE FACTURAS
 * =====================
 * Emisión y gestión de facturas fiscales.
 * Incluye generación de códigos únicos.
 */
//invoices routes
Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
Route::get('invoices/create', [InvoiceController::class, 'create'])->name('invoices.create');
Route::post('invoices', [InvoiceController::class, 'store'])->name('invoices.store');
Route::delete('invoices/{invoice}', [InvoiceController::class, 'destroy'])->name('invoices.destroy');

/**
 * =====================
 * RUTAS DE REPORTES
 * ===================== 
 * Generación de reportes de ventas, inventario y clientes.
 * Permite exportar datos en formatos CSV o PDF.
 */
//report routes
Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
Route::get('reports/logs', [ReportController::class, 'getLogs'])->name('reports.logs');
Route::get('reports/product-sales', [ReportController::class, 'getAllProductSales'])->name('reports.product-sales');
Route::get('reports/sales-over-time', [ReportController::class, 'salesOverTime'])->name('reports.sales-over-time');

require __DIR__.'/settings.php';
