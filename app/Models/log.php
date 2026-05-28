<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $table = 'logs';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'accion',
        'descripcion',
        'creado_en',
    ];

    protected $casts = [
        'creado_en' => 'datetime',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public static function record($accion, $descripcion)
    {
        return self::create([
            'usuario_id' => auth()->id(),
            'accion' => $accion,
            'descripcion' => $descripcion,
            'creado_en' => now(),
        ]);
    }
}
