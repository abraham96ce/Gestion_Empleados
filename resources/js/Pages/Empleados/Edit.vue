<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl text-center font-semibold text-gray-800 mb-6">Edición de Empleado</h1>
      <form @submit.prevent="actualizar" class="space-y-6">
        <!-- Nombre -->
        <div class="flex flex-col">
          <label for="nombre" class="text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            v-model="empleado.nombre"
            id="nombre"
            @blur="validateNombre"
            :class="{'border-red-500': !isNombreValido, 'border-gray-300': isNombreValido}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p v-if="!isNombreValido" class="text-red-500 text-sm">El nombre es requerido.</p>
        </div>

        <!-- Primer Apellido -->
        <div class="flex flex-col">
          <label for="primer_apellido" class="text-sm font-medium text-gray-700">Primer Apellido</label>
          <input
            type="text"
            v-model="empleado.primer_apellido"
            id="primer_apellido"
            @blur="validatePrimerApellido"
            :class="{'border-red-500': !isPrimerApellidoValido, 'border-gray-300': isPrimerApellidoValido}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p v-if="!isPrimerApellidoValido" class="text-red-500 text-sm">El primer apellido es requerido.</p>
        </div>

        <!-- Segundo Apellido -->
        <div class="flex flex-col">
          <label for="segundo_apellido" class="text-sm font-medium text-gray-700">Segundo Apellido</label>
          <input
            type="text"
            v-model="empleado.segundo_apellido"
            id="segundo_apellido"
            @blur="validateSegundoApellido"
            :class="{'border-red-500': !isSegundoApellidoValido, 'border-gray-300': isSegundoApellidoValido}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p v-if="!isSegundoApellidoValido" class="text-red-500 text-sm">El segundo apellido es requerido.</p>
        </div>

        <!-- Email -->
        <div class="flex flex-col">
          <label for="email" class="text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            v-model="empleado.email"
            id="email"
            @blur="validateEmail"
            :class="{
              'border-red-500': !isEmailValido,
              'border-gray-300': isEmailValido
            }"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p v-if="!isEmailValido" class="text-red-500 text-sm">Por favor ingrese un correo electrónico válido.</p>
        </div>

        <!-- Cargo -->
        <div class="flex flex-col">
          <label for="idcargo" class="text-sm font-medium text-gray-700">Cargo</label>
          <select
            v-model="empleado.idcargo"
            id="idcargo"
            @blur="validateCargo"
            :class="{'border-red-500': !isCargoValido, 'border-gray-300': isCargoValido}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option v-for="cargo in cargos" :key="cargo.idcargo" :value="cargo.idcargo">
              {{ cargo.nombre_cargo }}
            </option>
          </select>
          <p v-if="!isCargoValido" class="text-red-500 text-sm">Seleccione un cargo.</p>
        </div>

        <!-- Nivel -->
        <div class="flex flex-col">
          <label for="idnivel" class="text-sm font-medium text-gray-700">Nivel</label>
          <select
            v-model="empleado.idnivel"
            id="idnivel"
            @blur="validateNivel"
            :class="{'border-red-500': !isNivelValido, 'border-gray-300': isNivelValido}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option v-for="nivel in nivels" :key="nivel.idnivel" :value="nivel.idnivel">
              {{ nivel.salario }}
            </option>
          </select>
          <p v-if="!isNivelValido" class="text-red-500 text-sm">Seleccione un nivel.</p>
        </div>

        <!-- Fecha de Contratación -->
        <div class="flex flex-col">
          <label for="fecha_contratacion" class="text-sm font-medium text-gray-700">Fecha de Contratación</label>
          <input
            type="date"
            v-model="empleado.fecha_contratacion"
            id="fecha_contratacion"
            @blur="validateFechaContratacion"
            :class="{'border-red-500': !isFechaContratacionValida, 'border-gray-300': isFechaContratacionValida}"
            class="mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p v-if="!isFechaContratacionValida" class="text-red-500 text-sm">La fecha de contratación es requerida.</p>
        </div>

        <!-- Botones de acción -->
        <div class="flex space-x-4">
          <button
            type="submit"
            :disabled="!formIsValid"
            class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Actualizar
          </button>

          <button
            type="button"
            @click="cancelarEdicion"
            class="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </template>

  <script>
  export default {
    props: {
      empleado: Object,
      cargos: Array,
      nivels: Array,
    },
    data() {
      return {
        isNombreValido: true,
        isPrimerApellidoValido: true,
        isSegundoApellidoValido: true,
        isEmailValido: true,
        isCargoValido: true,
        isNivelValido: true,
        isFechaContratacionValida: true,
      };
    },
    computed: {
      formIsValid() {
        return (
          this.isNombreValido &&
          this.isPrimerApellidoValido &&
          this.isSegundoApellidoValido &&
          this.isEmailValido &&
          this.isCargoValido &&
          this.isNivelValido &&
          this.isFechaContratacionValida
        );
      },
    },
    methods: {
        actualizar() {
            // Validar los campos antes de enviar
            this.validateNombre();
            this.validatePrimerApellido();
            this.validateSegundoApellido();
            this.validateEmail();
            this.validateCargo();
            this.validateNivel();
            this.validateFechaContratacion();

            console.log('Form Valid:', this.formIsValid); // Verificar si la validación pasa

            if (this.formIsValid) {
                console.log('Empleado a actualizar:', this.empleado); // Verificar los datos del empleado

                // Llamada al backend para actualizar el empleado
                this.$inertia.put(`/empleados/${this.empleado.idempleado}`, this.empleado, {
                    onSuccess: () => {
                        console.log('Empleado actualizado con éxito');
                        alert('Empleado actualizado con éxito');
                        this.$inertia.visit('/empleados'); // Redirigir a la lista de empleados
                        },
                        onError: (error) => {
                            console.error('Error al actualizar empleado:', error);
                            alert('Hubo un error al actualizar el empleado');
                        },
                    });
                } else {
                    console.log('Formulario no válido');
                }
            },
      validateNombre() {
        this.isNombreValido = this.empleado.nombre.trim() !== '';
      },
      validatePrimerApellido() {
        this.isPrimerApellidoValido = this.empleado.primer_apellido.trim() !== '';
      },
      validateSegundoApellido() {
        this.isSegundoApellidoValido = this.empleado.segundo_apellido.trim() !== '';
      },
      validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        this.isEmailValido = emailRegex.test(this.empleado.email);
      },
      validateCargo() {
        this.isCargoValido = this.empleado.idcargo !== '';
      },
      validateNivel() {
        this.isNivelValido = this.empleado.idnivel !== '';
      },
      validateFechaContratacion() {
        this.isFechaContratacionValida = this.empleado.fecha_contratacion !== '';
      },
      cancelarEdicion() {
        window.location.href = '/empleados';
      },
    },
  };
  </script>
