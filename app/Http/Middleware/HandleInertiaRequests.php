<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Models\Sale;
use App\Models\Invoice;
use App\Models\SaleItem;
use App\Models\InvoiceItem;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'totals' => [
                'sales_count' => Sale::count(),
                'invoices_count' => Invoice::count(),
                'customers_today_count' => (function() {
                    $salesCustomers = Sale::whereDate('created_at', now())->distinct('cliente_id')->pluck('cliente_id');
                    $invoiceDocuments = Invoice::whereDate('fecha_emision', now())->distinct('cliente_id')->pluck('cliente_id');
                    
                    // Combinar ambos y contar únicos
                    return $salesCustomers->merge($invoiceDocuments)->unique()->count();
                })(),
                'money_today_total' => (float) (Sale::whereDate('created_at', now())->sum('total') + Invoice::whereDate('fecha_emision', now())->sum('total')),
                'products_sold_count' => (int) (SaleItem::sum('cantidad') + InvoiceItem::sum('cantidad')),
            ],
        ];
    }
}
