<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Nivel extends Model
{
    use HasFactory;
    protected $table = 'nivels';
    protected $fillable = ['salario'];
    protected $primaryKey = 'idnivel';
}
