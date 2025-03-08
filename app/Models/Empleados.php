<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Empleados extends Model
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $table = 'empleados';
    protected $primaryKey = 'idempleado';

    protected $fillable = [
        'nombre', 'primer_apellido', 'segundo_apellido', 'email',
        'idcargo', 'idnivel', 'fecha_contratacion'
    ];

    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'idcargo');
    }

    public function nivel()
    {
        return $this->belongsTo(Nivel::class, 'idnivel');
    }
}
