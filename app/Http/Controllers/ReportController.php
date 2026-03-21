<?php
namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
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

        return Inertia::render('reports/index', [
            'totals' => [
                'sales_count' => $salesCount,
                'invoices_count' => $invoicesCount,
                'customers_today_count' => $customersTodayCount,
                'products_sold_count' => $productsSoldCount,
                'money_today_total' => (float) $moneyTodayTotal,
            ],
        ]);
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
}
