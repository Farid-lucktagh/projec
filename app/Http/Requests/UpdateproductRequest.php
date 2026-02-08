<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateproductRequest extends FormRequest
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
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'categoria_id' => 'required|integer|exists:categories,id',
            'proveedor_id' => 'required|integer|exists:suppliers,id',
            'precio' => 'required|numeric|min:0',
            'cantidad_stock' => 'required|integer|min:0',
            'estado' => 'required|in:disponible,bajo,sin',
        ];
    }
}
