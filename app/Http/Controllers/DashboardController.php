<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // Dinero acumulado hoy (Ventas + Facturas)
        $moneySalesToday = Sale::whereDate('created_at', $today)->sum('total');
        $moneyInvoicesToday = Invoice::whereDate('fecha_emision', $today)->sum('total');
        $moneyTodayTotal = (float) ($moneySalesToday + $moneyInvoicesToday);

        // Clientes atendidos hoy
        $salesCustomers = Sale::whereDate('created_at', $today)->pluck('cliente_id');
        $invoiceCustomers = Invoice::whereDate('fecha_emision', $today)->pluck('cliente_id');
        $customersTodayCount = $salesCustomers->merge($invoiceCustomers)->filter()->unique()->count();

        // Estado del inventario
        $outOfStockCount = Product::where('cantidad_stock', '<=', 0)->count();
        $lowStockCount = Product::whereColumn('cantidad_stock', '<=', 'stock_minimo')
            ->where('cantidad_stock', '>', 0)
            ->count();

        // Últimas ventas y facturas
        $latestSales = Sale::with('cliente:id,nombre')->latest()->limit(5)->get()->map(function($sale) {
            return [
                'id' => $sale->id,
                'tipo' => 'Venta',
                'cliente' => $sale->cliente->nombre ?? 'N/A',
                'total' => $sale->total,
                'fecha' => $sale->created_at,
            ];
        });

        $latestInvoices = Invoice::with('cliente:id,nombre')->latest('fecha_emision')->limit(5)->get()->map(function($invoice) {
            return [
                'id' => $invoice->id,
                'tipo' => 'Factura',
                'cliente' => $invoice->cliente->nombre ?? 'N/A',
                'total' => $invoice->total,
                'fecha' => $invoice->fecha_emision,
            ];
        });

        $latestTransactions = $latestSales->merge($latestInvoices)->sortByDesc('fecha')->values()->take(5);

        // Clientes atendidos hoy detallados
        $customersTodaySales = Sale::with(['cliente:id,nombre', 'usuario:id,name'])
            ->whereDate('created_at', $today)
            ->get()
            ->map(function($sale) {
                return [
                    'nombre' => $sale->cliente->nombre ?? 'N/A',
                    'atendido_por' => $sale->usuario->name ?? 'N/A',
                    'fecha' => $sale->created_at->format('Y-m-d'),
                    'tipo' => 'Venta'
                ];
            });

        $customersTodayInvoices = Invoice::with(['cliente:id,nombre', 'usuario:id,name'])
            ->whereDate('fecha_emision', $today)
            ->get()
            ->map(function($invoice) {
                return [
                    'nombre' => $invoice->cliente->nombre ?? 'N/A',
                    'atendido_por' => $invoice->usuario->name ?? 'N/A',
                    'fecha' => Carbon::parse($invoice->fecha_emision)->format('Y-m-d'),
                    'tipo' => 'Factura'
                ];
            });

        $customersTodayDetailed = $customersTodaySales->concat($customersTodayInvoices)->sortByDesc('fecha')->values();

        // Últimos productos vendidos y facturados
        $latestSaleItems = SaleItem::with(['producto:id,nombre', 'venta:id,created_at'])
            ->latest('id')
            ->limit(5)
            ->get()
            ->map(function($item) {
                return [
                    'nombre' => $item->producto->nombre ?? 'N/A',
                    'cantidad' => $item->cantidad,
                    'fecha' => $item->venta->created_at ?? null,
                ];
            });

        $latestInvoiceItems = InvoiceItem::with(['producto:id,nombre', 'factura:id,fecha_emision'])
            ->latest('id')
            ->limit(5)
            ->get()
            ->map(function($item) {
                return [
                    'nombre' => $item->producto->nombre ?? 'N/A',
                    'cantidad' => $item->cantidad,
                    'fecha' => $item->factura->fecha_emision ?? null,
                ];
            });

        $latestProductsSold = $latestSaleItems->merge($latestInvoiceItems)->sortByDesc('fecha')->values()->take(5);

        return Inertia::render('dashboard', [
            'stats' => [
                'money_today' => $moneyTodayTotal,
                'customers_today' => $customersTodayCount,
                'inventory' => [
                    'out_of_stock' => $outOfStockCount,
                    'low_stock' => $lowStockCount,
                ],
                'latest_transactions' => $latestTransactions,
                'customers_today_detailed' => $customersTodayDetailed,
                'latest_products_sold' => $latestProductsSold,
            ]
        ]);
    }
}
