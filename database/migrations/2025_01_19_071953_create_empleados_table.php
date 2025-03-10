<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('idempleado');
            $table->string('nombre');
            $table->string('primer_apellido');
            $table->string('segundo_apellido');
            $table->string('email')->unique();
            $table->unsignedBigInteger('idcargo');
            $table->unsignedBigInteger('idnivel');
            $table->date('fecha_contratacion');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('idcargo')->references('idcargo')->on('cargos')->onDelete('cascade');
            $table->foreign('idnivel')->references('idnivel')->on('nivels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
