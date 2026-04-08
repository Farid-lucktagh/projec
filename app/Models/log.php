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

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
