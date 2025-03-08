import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

  export default {
    components: {
      AuthenticatedLayout,
    },
    data() {
      return {
        empleado: {
          nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          email: '',
          idcargo: '',
          idnivel: '',
          fecha_contratacion: '',
        },
        cargos: [],
        niveles: [],
        isNombreValido: true,
        isPrimerApellidoValido: true,
        isSegundoApellidoValido: true,
        isEmailValido: true,
        emailDuplicado: false,
        isCargoValido: true,
        isNivelValido: true,
        isFechaContratacionValida: true,
        empleadoGuardado: false
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
      formHasData() {
        return (
          this.empleado.nombre ||
          this.empleado.primer_apellido ||
          this.empleado.segundo_apellido ||
          this.empleado.email ||
          this.empleado.idcargo ||
          this.empleado.idnivel ||
          this.empleado.fecha_contratacion
        );
      }
    },
    mounted() {
      this.fetchCargos();
      this.fetchNiveles();
    },
    methods: {
      async fetchCargos() {
        try {
          const response = await fetch('/api/cargos');
          if (response.ok) {
            const data = await response.json();
            this.cargos = data;
          } else {
            console.error("Error al hacer la solicitud de cargos:", response.status);
          }
        } catch (error) {
          console.error("Error al cargar cargos:", error);
        }
      },
      async fetchNiveles() {
        try {
          const response = await fetch('/api/niveles');
          if (response.ok) {
            const data = await response.json();
            this.niveles = data;
          } else {
            console.error("Error al hacer la solicitud de niveles:", response.status);
          }
        } catch (error) {
          console.error("Error al cargar niveles:", error);
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

      async verificarEmailExistente() {
        try {
          const response = await fetch(`/api/verificar-email?email=${this.empleado.email}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Correo duplicado:", data.existe); // Verifica respuesta
            return data.existe; // Si el correo existe, retornar true
          } else {
            console.error("Error al verificar el correo:", response.status);
            return false; // Si hubo error en la solicitud, retornar false
          }
        } catch (error) {
          console.error("Error al verificar el correo:", error);
          return false; // En caso de error en la solicitud, retornar false
        }
      },

      async guardarEmpleado() {
        const correoExiste = await this.verificarEmailExistente();

        if (!this.formIsValid) {
          alert("Por favor, complete todos los campos correctamente.");
          return;
        }

        if (correoExiste) {
          alert("Error: El correo ya está registrado.");
          this.emailDuplicado = true;
          return;
        }

        try {
          this.empleadoGuardado = false;
          const response = await fetch('/api/empleados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.empleado),
          });

          if (response.ok) {
            this.empleadoGuardado = true;
            alert('Empleado guardado correctamente');
            this.$inertia.visit('/empleados');
            this.resetForm();
          } else {
            const errorText = await response.text();
            alert(`Error al guardar el empleado: ${errorText}`);
            console.log('Error de servidor:', errorText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
          alert('Hubo un problema al intentar guardar el empleado. Intenta de nuevo más tarde.');
        }
      },
      resetForm() {
        this.empleado = {
          nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          email: '',
          idcargo: '',
          idnivel: '',
          fecha_contratacion: '',
        };
        this.isNombreValido = true;
        this.isPrimerApellidoValido = true;
        this.isSegundoApellidoValido = true;
        this.isEmailValido = true;
        this.isCargoValido = true;
        this.isNivelValido = true;
        this.isFechaContratacionValida = true;
        this.empleadoGuardado = false;
        this.emailDuplicado = false;
      },

      confirmCancel() {
        if (confirm("¿Seguro que deseas cancelar?")) {
          this.resetForm();
        }
      },

      regresar() {
        window.history.back();
      },
    },
  };
