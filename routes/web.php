<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmpleadosController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\NivelController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/empleados');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('empleados', EmpleadosController::class);

Route::delete('/empleados/{id}', [EmpleadosController::class, 'destroy'])->name('empleados.destroy');

Route::prefix('api')->group(function () {
    Route::get('/cargos', [CargoController::class, 'index']);
    Route::get('/niveles', [NivelController::class, 'index']);
    Route::get('/verificar-email', [EmpleadosController::class, 'verificarEmail']);
});

Route::prefix('api')->middleware('api')->group(function () {
    Route::get('/empleados', [EmpleadosController::class, 'index']);
    Route::post('/empleados', [EmpleadosController::class, 'store']);
});

require __DIR__.'/auth.php';
