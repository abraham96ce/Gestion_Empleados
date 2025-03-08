<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cargos')->insert([
            ['nombre_cargo' => 'Gerente'],
            ['nombre_cargo' => 'Desarrollador'],
            ['nombre_cargo' => 'Analista'],
        ]);

    }
}
