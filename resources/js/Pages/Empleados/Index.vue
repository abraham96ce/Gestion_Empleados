<template>
    <AuthenticatedLayout>
      <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <!-- Título de la página -->
          <h1 class="text-3xl font-semibold">Lista de Empleados</h1>

          <!-- Botón de nuevo empleado -->
          <button
            @click="nuevoEmpleado"
            class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Nuevo Empleado
          </button>
        </div>

        <!-- Tabla de empleados -->
        <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="py-3 px-4 border-b">Nombre</th>
              <th class="py-3 px-4 border-b">Primer Apellido</th>
              <th class="py-3 px-4 border-b">Segundo Apellido</th>
              <th class="py-3 px-4 border-b">Email</th>
              <th class="py-3 px-4 border-b">Cargo</th>
              <th class="py-3 px-4 border-b">Salario</th>
              <th class="py-3 px-4 border-b">Fecha de Contratación</th>
              <th class="py-3 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados" :key="empleado.idempleado">
              <td class="py-3 px-4 border-b">{{ empleado.nombre }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.primer_apellido }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.segundo_apellido }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.email }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.cargo.nombre_cargo }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.nivel.salario }}</td>
              <td class="py-3 px-4 border-b">{{ empleado.fecha_contratacion }}</td>
              <td class="py-3 px-4 border-b flex space-x-2">
                <button
                  @click="editar(empleado.idempleado)"
                  class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Editar
                </button>
                <button
                  @click="eliminar(empleado.idempleado)"
                  class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  </template>

  <script>
    export default {
      props: {
        empleados: Array,
      },
      methods: {
        // Redirige al formulario de nuevo empleado (Create.vue)
        nuevoEmpleado() {
          this.$inertia.get('/empleados/create');
        },
        editar(id) {
            this.$inertia.get(`/empleados/${id}/edit`, {
                onSuccess: () => {
                this.$inertia.reload();
                }
            });
        },
        eliminar(id) {
            if (confirm('¿Seguro que deseas eliminar este empleado?')) {
                this.$inertia.delete(`/empleados/${id}`, {
                    onSuccess: () => {
                    alert('Empleado eliminado exitosamente');
                    this.$inertia.reload();
                    },
                    onError: (error) => {
                        console.error('Error eliminando empleado:', error);
                        alert('Hubo un error al eliminar el empleado.');
                    },
                });
            }
        },
      },
    };
  </script>
