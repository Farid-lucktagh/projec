<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoresaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cliente_id' => [
                'required', 
                'integer', 
                Rule::exists('customers', 'id')->where(function ($query) {
                    $query->where('estado', 'activo');
                })
            ],
            'metodo_pago' => ['required', 'string', 'in:efectivo,tarjeta,transferencia'],
            'subtotal' => ['required', 'numeric', 'min:0'],
            'impuesto' => ['required', 'numeric', 'min:0'],
            'total' => ['required', 'numeric', 'min:0'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.producto_id' => [
                'required', 
                'integer', 
                Rule::exists('products', 'id')->where(function ($query) {
                    $query->where('estado', '!=', 'inactivo')
                          ->whereIn('categoria_id', function($q) {
                              $q->select('id')->from('categories')->where('estado', 'activo');
                          });
                })
            ],
            'items.*.cantidad' => ['required', 'integer', 'min:1'],
            'items.*.precio_unitario' => ['required', 'numeric', 'min:0'],
            'items.*.precio_total' => ['required', 'numeric', 'min:0'],
        ];
    }
}
