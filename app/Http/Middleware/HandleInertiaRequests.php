<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Models\Sale;
use App\Models\Invoice;
use App\Models\SaleItem;
use App\Models\InvoiceItem;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

class HandleInertiaRequests extends Middleware
{
    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = App::getLocale();
        $langPath = base_path("lang/{$locale}.json");
        $translations = File::exists($langPath) ? json_decode(File::get($langPath), true) : [];

        return [
            ...parent::share($request),
            'locale' => $locale,
            'translations' => $translations,
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
