<?php

namespace App\Http\Controllers;

use App\Models\Empleados;
use App\Models\Cargo;
use App\Models\Nivel;;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empleados = Empleados::with(['cargo', 'nivel'])->get();
        return Inertia::render('Empleados/Index', ['empleados' => $empleados ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Empleados/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos antes de proceder con la creación
        $validated = $request->validate([
            'nombre' => 'required',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'email' => 'required|email|unique:empleados',
            'idcargo' => 'required|exists:cargos,idcargo',
            'idnivel' => 'required|exists:nivels,idnivel',
            'fecha_contratacion' => 'required|date',
        ]);

        // Crear el nuevo empleado
        Empleados::create($validated);

        return Inertia::render('Empleados/Index', [
            'empleados' => Empleados::with(['cargo', 'nivel'])->get(),
            'message' => 'Empleado creado exitosamente'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Empleados $empleados)
    {
        return Inertia::render('Empleados/Show', ['empleado' => $empleados]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Empleados $empleado)
    {
        return Inertia::render('Empleados/Edit', [
            'empleado' => $empleado,
            'cargos' => Cargo::all(), // Para llenar el select de cargos
            'nivels' => Nivel::all() // Para llenar el select de niveles
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Empleados $empleado)
    {
        // Asegúrate de que el ID esté siendo pasado correctamente y es válido
        $validated = $request->validate([
            'nombre' => 'required',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'email' => 'required|email|unique:empleados,email,' . $empleado->idempleado . ',idempleado',
            'idcargo' => 'required|exists:cargos,idcargo',
            'idnivel' => 'required|exists:nivels,idnivel',
            'fecha_contratacion' => 'required|date',
        ]);

        // Actualiza el empleado con los datos validados
        $empleado->update(attributes: $validated);

        // Redirigir a la lista de empleados después de la actualización
        return redirect()->route('empleados.edit', $empleado)->with('message', 'Empleado actualizado exitosamente');
    }


    public function verificarEmail(Request $request)
    {
        // Obtener el correo electrónico desde los parámetros de la consulta
        $email = $request->query('email');

        // Verificar si el correo electrónico ya existe en la base de datos
        $existe = Empleados::where('email', $email)->exists();

        // Devolver la respuesta en formato JSON
        return response()->json(['existe' => $existe]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $empleado = Empleados::findOrFail($id);
        $empleado->delete();

        return redirect()->route('empleados.index')->with('message', 'Empleado eliminado exitosamente');
    }


}
