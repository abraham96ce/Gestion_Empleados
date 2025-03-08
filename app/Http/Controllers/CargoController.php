<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CargoController extends Controller
{
    /**
     * Display a listing of cargos.
     */
    public function index()
    {

        $cargos = Cargo::all();
        return response()->json($cargos);
    }

    /**
     * Show the form for creating a new cargo.
     */
    public function create(): Response
    {
        return Inertia::render('Cargos/Create');
    }

    /**
     * Store a newly created cargo in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['nombre_cargo' => 'required|string|max:255',]);

        Cargo::create($validated);

        return to_route('cargos.index')->with('status', 'Cargo creado exitosamente.');
    }

    /**
     * Show the form for editing the specified cargo.
     */
    public function edit(Cargo $cargo): Response
    {
        return Inertia::render('Cargos/Edit', ['cargo' => $cargo,]);
    }

    /**
     * Update the specified cargo in storage.
     */
    public function update(Request $request, Cargo $cargo): RedirectResponse
    {
        $validated = $request->validate(['nombre_cargo' => 'required|string|max:255']);

        $cargo->update($validated);

        return to_route('cargos.index')->with('status', 'Cargo actualizado');
    }

    /**
     * Remove the specified cargo from storage.
     */
    public function destroy(Cargo $cargo): RedirectResponse
    {
        $cargo->delete();

        return to_route('cargos.index')->with('status', 'Cargo eliminado');
    }
}
