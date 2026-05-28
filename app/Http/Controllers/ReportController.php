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
use Barryvdh\DomPDF\Facade\Pdf;

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

    public function exportPdf(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');
        $sections = $request->query('sections', []);
        
        $startDate = $from ? Carbon::parse($from)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $to ? Carbon::parse($to)->endOfDay() : Carbon::now()->endOfDay();

        $data = [
            'date_range' => [
                'from' => $startDate->format('Y-m-d'),
                'to' => $endDate->format('Y-m-d'),
            ],
            'sections' => $sections,
        ];

        if (in_array('sales', $sections) || in_array('money', $sections)) {
            $sales = Sale::whereBetween('created_at', [$startDate, $endDate])->get();
            $invoices = Invoice::whereBetween('fecha_emision', [$startDate, $endDate])->get();
            
            $data['sales_summary'] = [
                'total_sales_count' => $sales->count(),
                'total_invoices_count' => $invoices->count(),
                'total_money' => $sales->sum('total') + $invoices->sum('total'),
                'sales_list' => in_array('sales', $sections) ? $sales->load('cliente') : [],
                'invoices_list' => in_array('sales', $sections) ? $invoices->load('cliente') : [],
            ];
        }

        if (in_array('customers', $sections)) {
            $salesCustomers = Sale::whereBetween('created_at', [$startDate, $endDate])->pluck('cliente_id');
            $invoiceCustomers = Invoice::whereBetween('fecha_emision', [$startDate, $endDate])->pluck('cliente_id');
            $customerIds = $salesCustomers->merge($invoiceCustomers)->filter()->unique();
            $data['customers'] = \App\Models\Customer::whereIn('id', $customerIds)->get();
        }

        if (in_array('products', $sections)) {
            $saleItemIds = SaleItem::whereHas('venta', function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            })->pluck('producto_id');
            
            $invoiceItemIds = InvoiceItem::whereHas('factura', function($q) use ($startDate, $endDate) {
                $q->whereBetween('fecha_emision', [$startDate, $endDate]);
            })->pluck('producto_id');
            
            $productIds = $saleItemIds->merge($invoiceItemIds)->unique();
            $data['products_sold'] = Product::whereIn('id', $productIds)->with('categoria')->get();
        }

        if (in_array('inventory', $sections)) {
            $data['inventory'] = [
                'out_of_stock' => Product::where('cantidad_stock', '<=', 0)->with('categoria')->get(),
                'low_stock' => Product::whereColumn('cantidad_stock', '<=', 'stock_minimo')
                    ->where('cantidad_stock', '>', 0)
                    ->with('categoria')
                    ->get(),
                'in_stock' => Product::whereColumn('cantidad_stock', '>', 'stock_minimo')->with('categoria')->get(),
            ];
        }

        if (in_array('top_products', $sections)) {
            $saleItemsQuery = SaleItem::whereHas('venta', function($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                })
                ->select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
                ->groupBy('producto_id');

            $invoiceItemsQuery = InvoiceItem::whereHas('factura', function($q) use ($startDate, $endDate) {
                    $q->whereBetween('fecha_emision', [$startDate, $endDate]);
                })
                ->select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
                ->groupBy('producto_id');

            $data['top_products'] = Product::select('products.id', 'products.nombre', DB::raw('(COALESCE(sales.total_sold, 0) + COALESCE(invoices.total_sold, 0)) as total_sold'))
                ->leftJoinSub($saleItemsQuery, 'sales', function ($join) {
                    $join->on('products.id', '=', 'sales.producto_id');
                })
                ->leftJoinSub($invoiceItemsQuery, 'invoices', function ($join) {
                    $join->on('products.id', '=', 'invoices.producto_id');
                })
                ->where(DB::raw('COALESCE(sales.total_sold, 0) + COALESCE(invoices.total_sold, 0)'), '>', 0)
                ->orderByDesc('total_sold')
                ->limit(10)
                ->get();
        }

        if (in_array('movements', $sections)) {
            $data['movements'] = Log::with('usuario')
                ->whereBetween('creado_en', [$startDate, $endDate])
                ->orderByDesc('creado_en')
                ->get();
        }

        $pdf = Pdf::loadView('reports.pdf', $data);
        return $pdf->download('reporte-luckfeer-' . now()->format('YmdHis') . '.pdf');
    }

    public function exportExcel(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');
        $sections = $request->query('sections', []);
        
        $startDate = $from ? Carbon::parse($from)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $to ? Carbon::parse($to)->endOfDay() : Carbon::now()->endOfDay();

        $fileName = 'reporte-luckfeer-' . now()->format('YmdHis') . '.csv';

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use ($sections, $startDate, $endDate) {
            $file = fopen('php://output', 'w');
            
            // Añadir BOM para que Excel reconozca caracteres especiales (UTF-8)
            fputs($file, $bom = (chr(0xEF) . chr(0xBB) . chr(0xBF)));

            // Título del Reporte
            fputcsv($file, ['REPORTE ADMINISTRATIVO LUCKFEER']);
            fputcsv($file, ['Periodo:', $startDate->format('Y-m-d') . ' al ' . $endDate->format('Y-m-d')]);
            fputcsv($file, []); // Línea en blanco

            if (in_array('sales', $sections) || in_array('money', $sections)) {
                $sales = Sale::whereBetween('created_at', [$startDate, $endDate])->with('cliente')->get();
                $invoices = Invoice::whereBetween('fecha_emision', [$startDate, $endDate])->with('cliente')->get();
                
                fputcsv($file, ['RESUMEN DE VENTAS Y FACTURACIÓN']);
                fputcsv($file, ['Total Ventas:', $sales->count()]);
                fputcsv($file, ['Total Facturas:', $invoices->count()]);
                fputcsv($file, ['Dinero Total:', number_format($sales->sum('total') + $invoices->sum('total'), 2)]);
                fputcsv($file, []);

                if (in_array('sales', $sections)) {
                    fputcsv($file, ['DETALLE DE VENTAS']);
                    fputcsv($file, ['ID', 'Cliente', 'Subtotal', 'Impuesto', 'Total', 'Fecha']);
                    foreach ($sales as $sale) {
                        fputcsv($file, [
                            $sale->id,
                            $sale->cliente->nombre ?? 'N/A',
                            $sale->subtotal,
                            $sale->impuesto,
                            $sale->total,
                            $sale->created_at->format('Y-m-d H:i')
                        ]);
                    }
                    fputcsv($file, []);

                    fputcsv($file, ['DETALLE DE FACTURAS']);
                    fputcsv($file, ['Código', 'Cliente', 'Subtotal', 'IVA', 'Total', 'Fecha']);
                    foreach ($invoices as $invoice) {
                        fputcsv($file, [
                            $invoice->codigo,
                            $invoice->cliente->nombre ?? 'N/A',
                            $invoice->subtotal,
                            $invoice->monto_iva,
                            $invoice->total,
                            Carbon::parse($invoice->fecha_emision)->format('Y-m-d')
                        ]);
                    }
                    fputcsv($file, []);
                }
            }

            if (in_array('customers', $sections)) {
                $salesCustomers = Sale::whereBetween('created_at', [$startDate, $endDate])->pluck('cliente_id');
                $invoiceCustomers = Invoice::whereBetween('fecha_emision', [$startDate, $endDate])->pluck('cliente_id');
                $customerIds = $salesCustomers->merge($invoiceCustomers)->filter()->unique();
                $customers = \App\Models\Customer::whereIn('id', $customerIds)->get();

                fputcsv($file, ['CLIENTES ATENDIDOS']);
                fputcsv($file, ['Nombre', 'Documento', 'Correo', 'Teléfono']);
                foreach ($customers as $customer) {
                    fputcsv($file, [
                        $customer->nombre,
                        $customer->numero_documento,
                        $customer->correo,
                        $customer->telefono
                    ]);
                }
                fputcsv($file, []);
            }

            if (in_array('products', $sections)) {
                $saleItemIds = SaleItem::whereHas('venta', function($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                })->pluck('producto_id');
                
                $invoiceItemIds = InvoiceItem::whereHas('factura', function($q) use ($startDate, $endDate) {
                    $q->whereBetween('fecha_emision', [$startDate, $endDate]);
                })->pluck('producto_id');
                
                $productIds = $saleItemIds->merge($invoiceItemIds)->unique();
                $productsSold = Product::whereIn('id', $productIds)->with('categoria')->get();

                fputcsv($file, ['PRODUCTOS VENDIDOS']);
                fputcsv($file, ['ID', 'Nombre', 'Categoría', 'Stock Actual', 'Precio']);
                foreach ($productsSold as $product) {
                    fputcsv($file, [
                        $product->id,
                        $product->nombre,
                        $product->categoria->nombre ?? 'N/A',
                        $product->cantidad_stock,
                        $product->precio
                    ]);
                }
                fputcsv($file, []);
            }

            if (in_array('inventory', $sections)) {
                $outOfStock = Product::where('cantidad_stock', '<=', 0)->with('categoria')->get();
                $lowStock = Product::whereColumn('cantidad_stock', '<=', 'stock_minimo')
                    ->where('cantidad_stock', '>', 0)
                    ->with('categoria')
                    ->get();

                fputcsv($file, ['ESTADO DEL INVENTARIO']);
                fputcsv($file, ['PRODUCTOS SIN STOCK']);
                fputcsv($file, ['Nombre', 'Categoría', 'Stock']);
                foreach ($outOfStock as $p) {
                    fputcsv($file, [$p->nombre, $p->categoria->nombre ?? 'N/A', $p->cantidad_stock]);
                }
                fputcsv($file, []);

                fputcsv($file, ['PRODUCTOS CON BAJO STOCK']);
                fputcsv($file, ['Nombre', 'Categoría', 'Stock', 'Mínimo']);
                foreach ($lowStock as $p) {
                    fputcsv($file, [$p->nombre, $p->categoria->nombre ?? 'N/A', $p->cantidad_stock, $p->stock_minimo]);
                }
                fputcsv($file, []);
            }

            if (in_array('top_products', $sections)) {
                $saleItemsQuery = SaleItem::whereHas('venta', function($q) use ($startDate, $endDate) {
                        $q->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
                    ->groupBy('producto_id');

                $invoiceItemsQuery = InvoiceItem::whereHas('factura', function($q) use ($startDate, $endDate) {
                        $q->whereBetween('fecha_emision', [$startDate, $endDate]);
                    })
                    ->select('producto_id', DB::raw('SUM(cantidad) as total_sold'))
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
                    ->limit(10)
                    ->get();

                fputcsv($file, ['PRODUCTOS MÁS VENDIDOS']);
                fputcsv($file, ['ID', 'Nombre', 'Total Unidades Vendidas']);
                foreach ($topProducts as $p) {
                    fputcsv($file, [$p->id, $p->nombre, $p->total_sold]);
                }
                fputcsv($file, []);
            }

            if (in_array('movements', $sections)) {
                $movements = Log::with('usuario')
                    ->whereBetween('creado_en', [$startDate, $endDate])
                    ->orderByDesc('creado_en')
                    ->get();

                fputcsv($file, ['ÚLTIMOS MOVIMIENTOS']);
                fputcsv($file, ['Usuario', 'Acción', 'Descripción', 'Fecha']);
                foreach ($movements as $m) {
                    fputcsv($file, [
                        $m->usuario->name ?? 'N/A',
                        $m->accion,
                        $m->descripcion,
                        $m->creado_en->format('Y-m-d H:i')
                    ]);
                }
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
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
                $invoicesTotal = $invoices->has($date) ? $invoices->get($date)->total : 0;
                return [
                    'date' => Carbon::parse($date)->format('d M'),
                    'total' => $salesTotal + $invoicesTotal,
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
