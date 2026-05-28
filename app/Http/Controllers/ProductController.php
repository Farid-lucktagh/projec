<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Log;
use App\Http\Requests\StoreproductRequest;
use App\Http\Requests\UpdateproductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Product::with(['categoria', 'proveedor']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', '%' . $search . '%')
                  ->orWhereHas('categoria', function ($q) use ($search) {
                      $q->where('nombre', 'like', '%' . $search . '%');
                  })
                  ->orWhereHas('proveedor', function ($q) use ($search) {
                      $q->where('nombre', 'like', '%' . $search . '%');
                  });
            });
        }

        return Inertia('products/index', [
            'products' => $query->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()    
    {
        return Inertia('products/create', [
            'product' => new Product(),
            'categorias' => Category::select('id', 'nombre')->get(),
            'proveedores' => Supplier::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreproductRequest $request)
    {
        $validated = $request->validated();
        Product::create($validated);
        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia('products/edit', [
            'product' => $product,
            'categorias' => Category::activas()->select('id', 'nombre')->get(),
            'proveedores' => Supplier::activos()->select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateproductRequest $request, Product $product)
    {
        $validated = $request->validated();
        $product->update($validated);
        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Verificar si tiene ventas o facturas relacionadas
        if ($product->itemsVenta()->exists() || $product->itemsFactura()->exists()) {
            return redirect()->back()->with('error', 'No se puede eliminar el producto porque ya tiene ventas registradas. Se recomienda cambiar su estado a "inactivo".');
        }

        $product->delete();

        Log::record('eliminar_producto', "Se eliminó el producto: " . $product->nombre);

        return redirect()->route('products.index');
    }
}
