<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    /**
     * Campos asignables en masa
     */
    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria_id',
        'proveedor_id',
        'precio',
        'costo',
        'cantidad_stock',
        'stock_minimo',
        'estado',
    ];

    /**
     * Casts de atributos
     */
    protected $casts = [
        'precio' => 'decimal:2',
        'costo' => 'decimal:2',
        'cantidad_stock' => 'integer',
        'stock_minimo' => 'integer',
        'estado' => 'string',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    // Un producto pertenece a una categoría
    public function categoria()
    {
        return $this->belongsTo(Category::class, 'categoria_id');
    }

    // Un producto pertenece a un proveedor
    public function proveedor()
    {
        return $this->belongsTo(Supplier::class, 'proveedor_id');
    }

    // Un producto puede estar en muchos items de venta
    public function itemsVenta()
    {
        return $this->hasMany(SaleItem::class, 'producto_id');
    }

    // Un producto puede estar en muchos items de factura
    public function itemsFactura()
    {
        return $this->hasMany(InvoiceItem::class, 'producto_id');
    }

    /**
     * =====================
     * Scopes útiles
     * =====================
     */

    public function scopeActivos($query)
    {
        return $query->where('estado', '!=', 'inactivo')
                     ->whereHas('categoria', function($q) {
                         $q->where('estado', 'activo');
                     });
    }

    public function scopeStockBajo($query)
    {
        return $query->whereColumn('cantidad_stock', '<=', 'stock_minimo');
    }

    /**
     * =====================
     * Helpers
     * =====================
     */

    public function tieneStock($cantidad = 1): bool
    {
        return $this->cantidad_stock >= $cantidad;
    }
}
