<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoresaleRequest;
use App\Http\Requests\UpdatesaleRequest;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Sale::with('cliente');

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('cliente', function ($q) use ($search) {
                $q->where('nombre', 'like', '%' . $search . '%')
                  ->orWhere('numero_documento', 'like', '%' . $search . '%');
            });
        }

        return inertia('sales/index',[
            'sales' => $query->latest()->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('sales/create', [
            'customers' => Customer::where('estado', 'activo')->get(),
            'products' => Product::with('categoria')->where('estado', 'disponible')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoresaleRequest $request)
    {
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            // Resolver usuario_id válido
            $userId = optional(auth()->guard('web')->user())->id;
            if (!$userId) {
                $userId = User::query()->value('id');
            }
            if (!$userId) {
                $user = User::firstOrCreate(
                    ['email' => 'ventas@local.test'],
                    [
                        'name' => 'Ventas',
                        'password' => Str::random(40),
                        'rol' => 'cajero',
                        'estado' => 'activo',
                    ]
                );
                $userId = $user->id;
            }

            $sale = Sale::create([
                'cliente_id' => $validated['cliente_id'],
                'usuario_id' => $userId,
                'subtotal' => $validated['subtotal'],
                'impuesto' => $validated['impuesto'],
                'total' => $validated['total'],
                'metodo_pago' => $validated['metodo_pago'],
                'estado' => 'completada',
            ]);

            foreach ($validated['items'] as $item) {
                SaleItem::create([
                    'venta_id' => $sale->id,
                    'producto_id' => $item['producto_id'],
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $item['precio_unitario'],
                    'precio_total' => $item['precio_total'],
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
            return redirect()->route('sales.index')->with('success', 'Venta realizada con éxito');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al procesar la venta: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        return inertia('sales/show', [
            'sale' => $sale->load('cliente', 'items.producto')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        return inertia('sales/edit', [
            'sale' => $sale,
            'customers' => Customer::where('estado', 'activo')->get(),
            'products' => Product::with('categoria')->where('estado', 'disponible')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatesaleRequest $request, Sale $sale)
    {
        $validated = $request->validated();
        $sale->update($validated);
        return redirect()->route('sales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
        return redirect()->route('sales.index');
    }
}
