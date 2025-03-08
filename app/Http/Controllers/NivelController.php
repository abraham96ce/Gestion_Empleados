<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NivelController extends Controller
{
    /**
     * Muestra la lista de niveles.
     */
    public function index()
    {
        // Obtener todos los niveles de la base de datos
        $niveles = Nivel::all();

        // Verificar si hay datos
        if ($niveles->isEmpty()) {
            return response()->json(['message' => 'No se encontraron niveles'], 404);
        }

        // Si hay datos, retornarlos como JSON
        return response()->json($niveles);
    }
    /**
     * Muestra el formulario para crear un nuevo nivel.
     */
    public function create(): Response
    {
        return Inertia::render('Niveles/Create');
    }

    /**
     * Guarda un nuevo nivel en la base de datos.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre_nivel' => 'required|string|max:255',
        ]);

        Nivel::create($validated);

        return to_route('niveles.index')->with('status', 'Nivel creado exitosamente.');
    }

    /**
     * Muestra el formulario de edición de un nivel.
     */
    public function edit(Nivel $nivel): Response
    {
        return Inertia::render('Niveles/Edit', ['nivel' => $nivel]);
    }

    /**
     * Actualiza un nivel en la base de datos.
     */
    public function update(Request $request, Nivel $nivel): RedirectResponse
    {
        $validated = $request->validate([
            'nombre_nivel' => 'required|string|max:255',
        ]);

        $nivel->update($validated);

        return to_route('niveles.index')->with('status', 'Nivel actualizado exitosamente.');
    }

    /**
     * Elimina un nivel de la base de datos.
     */
    public function destroy(Nivel $nivel): RedirectResponse
    {
        $nivel->delete();

        return to_route('niveles.index')->with('status', 'Nivel eliminado.');
    }
}
