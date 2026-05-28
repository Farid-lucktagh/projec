<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cliente_id'     => [
                'required', 
                'integer', 
                Rule::exists('customers', 'id')->where(function ($query) {
                    $query->where('estado', 'activo');
                })
            ],
            'metodo_pago'    => ['required', 'string', 'in:efectivo,tarjeta,transferencia'],
            'porcentaje_iva' => ['required', 'numeric', 'min:0'],
            'descuento'      => ['required', 'numeric', 'min:0'],
            'notas'          => ['nullable', 'string', 'max:1000'],
            'subtotal'       => ['required', 'numeric', 'min:0'],
            'monto_iva'      => ['required', 'numeric', 'min:0'],
            'total'          => ['required', 'numeric', 'min:0'],

            'items'                          => ['required', 'array', 'min:1'],
            'items.*.producto_id'             => [
                'required', 
                'integer', 
                Rule::exists('products', 'id')->where(function ($query) {
                    $query->where('estado', '!=', 'inactivo')
                          ->whereIn('categoria_id', function($q) {
                              $q->select('id')->from('categories')->where('estado', 'activo');
                          });
                })
            ],
            'items.*.nombre_producto'         => ['required', 'string'],
            'items.*.categoria_producto'      => ['required', 'string'],
            'items.*.cantidad'                => ['required', 'integer', 'min:1'],
            'items.*.precio_unitario'         => ['required', 'numeric', 'min:0'],
            'items.*.subtotal'                => ['required', 'numeric', 'min:0'],
        ];
    }
}