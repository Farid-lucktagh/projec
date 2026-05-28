<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use App\Models\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreInvoiceRequest;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Invoice::with('cliente');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('codigo', 'like', '%' . $search . '%')
                  ->orWhereHas('cliente', function ($q) use ($search) {
                      $q->where('nombre', 'like', '%' . $search . '%')
                        ->orWhere('numero_documento', 'like', '%' . $search . '%');
                  });
            });
        }

        $invoices = $query->latest('fecha_emision')->get();

        return inertia('invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return inertia('invoices/create', [
            'customers' => Customer::where('estado', 'activo')->get(),
            'products'  => Product::with('categoria')
                ->activos()
                ->get(),
        ]);
    }

    public function store(StoreInvoiceRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $userId = optional(auth()->guard('web')->user())->id;

            if (!$userId) {
                $userId = User::query()->value('id');
            }

            if (!$userId) {
                $user = User::create([
                    'name'     => 'Facturacion',
                    'email'    => 'facturacion@local.test',
                    'password' => bcrypt(Str::random(40)),
                    'rol'      => 'cajero',
                    'estado'   => 'activo',
                ]);

                $userId = $user->id;
            }

            $lastInvoice = Invoice::orderByDesc('id')->first();
            $nextNumber  = $lastInvoice
                ? ((int) str_replace('FAC-', '', $lastInvoice->codigo)) + 1
                : 1;

            $codigo = 'FAC-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);

            $invoice = Invoice::create([
                'codigo'         => $codigo,
                'cliente_id'     => $validated['cliente_id'],
                'usuario_id'     => $userId,
                'subtotal'       => $validated['subtotal'],
                'porcentaje_iva' => $validated['porcentaje_iva'],
                'monto_iva'      => $validated['monto_iva'],
                'descuento'      => $validated['descuento'],
                'total'          => $validated['total'],
                'metodo_pago'    => $validated['metodo_pago'],
                'estado'         => 'completada',
                'notas'          => $validated['notas'] ?? null,
                'fecha_emision'  => now(),
            ]);

            foreach ($validated['items'] as $item) {
                InvoiceItem::create([
                    'factura_id'         => $invoice->id,
                    'producto_id'        => $item['producto_id'],
                    'nombre_producto'    => $item['nombre_producto'],
                    'categoria_producto' => $item['categoria_producto'],
                    'cantidad'           => $item['cantidad'],
                    'precio_unitario'    => $item['precio_unitario'],
                    'subtotal'           => $item['subtotal'],
                ]);

                $product = Product::find($item['producto_id']);

                $product->decrement('cantidad_stock', $item['cantidad']);

                if ($product->cantidad_stock <= 0) {
                    $product->update(['estado' => 'sin']);
                } elseif ($product->cantidad_stock <= $product->stock_minimo) {
                    $product->update(['estado' => 'bajo']);
                }
            }

            DB::commit();

            Log::record('crear_factura', "Se generó una factura por un total de " . $validated['total']);

            return redirect()
                ->route('invoices.index')
                ->with('success', 'Factura creada con exito');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'error' => 'Error al procesar la factura: ' . $e->getMessage()
            ]);
        }
    }

    public function print(Invoice $invoice)
    {
        $invoice->load(['cliente', 'usuario', 'items.producto']);
        
        $pdf = Pdf::loadView('invoices.print', compact('invoice'));
        
        return $pdf->stream('factura-' . $invoice->codigo . '.pdf');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->items()->delete();
        $invoice->delete();

        return redirect()
            ->route('invoices.index')
            ->with('success', 'Factura eliminada');
    }
}