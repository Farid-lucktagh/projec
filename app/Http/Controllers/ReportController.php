<?php
namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Log;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $salesCount = Sale::count();
        $invoicesCount = Invoice::count();

        $moneySalesToday = Sale::whereDate('created_at', $today)->sum('total');
        $moneyInvoicesToday = Invoice::whereDate('fecha_emision', $today)->sum('total');
        $moneyTodayTotal = $moneySalesToday + $moneyInvoicesToday;

        $salesCustomers = Sale::whereDate('created_at', $today)->pluck('cliente_id');
        $invoiceCustomers = Invoice::whereDate('fecha_emision', $today)->pluck('cliente_id');
        $customersTodayCount = $salesCustomers->merge($invoiceCustomers)->filter()->unique()->count();

        $productsSoldCount = (int) SaleItem::sum('cantidad') + (int) InvoiceItem::sum('cantidad');

        // Productos con bajo stock (cantidad_stock <= stock_minimo y > 0)
        $lowStockProducts = Product::with('categoria')
            ->whereColumn('cantidad_stock', '<=', 'stock_minimo')
            ->where('cantidad_stock', '>', 0)
            ->get();

        // Productos sin stock (cantidad_stock <= 0)
        $outOfStockProducts = Product::with('categoria')
            ->where('cantidad_stock', '<=', 0)
            ->get();

        // Productos más vendidos (SaleItem + InvoiceItem)
        $saleItemsQuery = SaleItem::select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
            ->groupBy('producto_id');

        $invoiceItemsQuery = InvoiceItem::select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
            ->groupBy('producto_id');

        $topProducts = Product::select('products.id', 'products.nombre', DB::raw('(COALESCE(sales.total_sold, 0) + COALESCE(invoices.total_sold, 0)) as total_sold'))
            ->leftJoinSub($saleItemsQuery, 'sales', function ($join) {
                $join->on('products.id', '=', 'sales.producto_id');
            })
            ->leftJoinSub($invoiceItemsQuery, 'invoices', function ($join) {
                $join->on('products.id', '=', 'invoices.producto_id');
            })
            ->where(DB::raw('COALESCE(sales.total_sold, 0) + COALESCE(invoices.total_sold, 0)'), '>', 0)
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // Últimos movimientos (Logs)
        $recentLogs = Log::with('usuario:id,name,rol')
            ->orderByDesc('creado_en')
            ->limit(5)
            ->get();

        return Inertia::render('reports/index', [
            'totals' => [
                'sales_count' => $salesCount,
                'invoices_count' => $invoicesCount,
                'customers_today_count' => $customersTodayCount,
                'products_sold_count' => $productsSoldCount,
                'money_today_total' => (float) $moneyTodayTotal,
                'low_stock_count' => $lowStockProducts->count(),
                'out_of_stock_count' => $outOfStockProducts->count(),
            ],
            'low_stock_products' => $lowStockProducts,
            'out_of_stock_products' => $outOfStockProducts,
            'top_products' => $topProducts,
            'recent_logs' => $recentLogs,
        ]);
    }

    public function getLogs(Request $request)
    {
        try {
            $from = $request->query('from');
            $to = $request->query('to');

            $query = Log::with('usuario:id,name,rol')->orderByDesc('creado_en');

            if ($from) {
                $query->whereDate('creado_en', '>=', Carbon::parse($from));
            }

            if ($to) {
                $query->whereDate('creado_en', '<=', Carbon::parse($to));
            }

            return response()->json($query->get());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function salesOverTime(Request $request)
    {
        try {
            $fromParam = $request->query('from');
            $toParam = $request->query('to');
            $to = $toParam ? Carbon::parse($toParam)->endOfDay() : Carbon::now();
            $from = $fromParam ? Carbon::parse($fromParam)->startOfDay() : Carbon::now()->subDays(6)->startOfDay();

            if ($from->gt($to)) {
                $tmp = $from;
                $from = $to->copy()->startOfDay();
                $to = $tmp->copy()->endOfDay();
            }

            $sales = Sale::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total) as total'))
                ->whereBetween('created_at', [$from, $to])
                ->groupBy('date')
                ->get()
                ->keyBy('date');

            $invoices = Invoice::select(DB::raw('DATE(fecha_emision) as date'), DB::raw('SUM(total) as total'))
                ->whereBetween('fecha_emision', [$from, $to])
                ->groupBy('date')
                ->get()
                ->keyBy('date');

            $dates = collect();
            $cursor = $from->copy()->startOfDay();
            while ($cursor->lte($to)) {
                $dates->push($cursor->format('Y-m-d'));
                $cursor->addDay();
            }

            $data = $dates->map(function ($date) use ($sales, $invoices) {
                $salesTotal = $sales->has($date) ? $sales->get($date)->total : 0;
                return [
                    'date' => Carbon::parse($date)->format('d M'),
                    'total' => $salesTotal,
                ];
            });

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAllProductSales()
    {
        try {
            $saleItemsQuery = SaleItem::select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
                ->groupBy('producto_id');

            $invoiceItemsQuery = InvoiceItem::select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
                ->groupBy('producto_id');

            $products = Product::select(
                    'products.id', 
                    'products.nombre', 
                    'products.cantidad_stock',
                    DB::raw('(COALESCE(sales.total_sold, 0) + COALESCE(invoices.total_sold, 0)) as total_sold')
                )
                ->with('categoria')
                ->leftJoinSub($saleItemsQuery, 'sales', function ($join) {
                    $join->on('products.id', '=', 'sales.producto_id');
                })
                ->leftJoinSub($invoiceItemsQuery, 'invoices', function ($join) {
                    $join->on('products.id', '=', 'invoices.producto_id');
                })
                ->orderByDesc('total_sold')
                ->get();

            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
