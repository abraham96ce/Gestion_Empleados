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
