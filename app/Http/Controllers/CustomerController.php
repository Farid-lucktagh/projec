<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Log;
use App\Http\Requests\StorecustomerRequest;
use App\Http\Requests\UpdatecustomerRequest;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $query = customer::query();

        if ($request->has('search')) {
            $query->where('nombre', 'like', '%' . $request->search . '%');
        }

        return Inertia('customers/index', [
            'customers' => $query->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('customers/create', [
            'customer' => new customer(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecustomerRequest $request)
    {
        $validated = $request->validated();
        customer::create($validated);
        return redirect()->route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(customer $customer)
    {
        return Inertia('customers/edit', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecustomerRequest $request, customer $customer)
    {
        $validated = $request->validated();
        $customer->update($validated);

        Log::record('actualizar_cliente', "Se actualizó el cliente: " . $customer->nombre);

        return redirect()->route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        Log::record('eliminar_cliente', "Se eliminó el cliente: " . $customer->nombre);

        return redirect()->route('customers.index');
    }
}
