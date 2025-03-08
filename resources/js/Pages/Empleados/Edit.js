import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

export default {
  components: {
    AuthenticatedLayout,
  },
  data() {
    return {
      empleado: {
        id: '',
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
      empleadoGuardado: false,
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

    // Verificar si es un modo de edición
    const empleadoId = this.$route.params.id; // Asumiendo que el ID viene de la URL
    if (empleadoId) {
      this.fetchEmpleado(empleadoId);
    }
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

    // Cargar los datos del empleado si estamos en modo de edición
    async fetchEmpleado(id) {
      try {
        const response = await fetch(`/api/empleados/${id}`);
        if (response.ok) {
          const data = await response.json();
          this.empleado = data; // Rellenamos el formulario con los datos del empleado
        } else {
          console.error("Error al cargar los datos del empleado:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
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
          return data.existe;
        } else {
          console.error("Error al verificar el correo:", response.status);
          return false;
        }
      } catch (error) {
        console.error("Error al verificar el correo:", error);
        return false;
      }
    },

    async guardarEmpleado() {
      const correoExiste = await this.verificarEmailExistente();

      if (correoExiste) {
        alert("Error: El correo ya está registrado.");
        this.emailDuplicado = true;
        return;
      }

      // Si estamos en modo edición (tiene un ID), actualizar el empleado
      const method = this.empleado.id ? 'PUT' : 'POST'; // Si tiene ID, actualizar, si no, crear
      const url = this.empleado.id ? `/api/empleados/${this.empleado.id}` : '/api/empleados';

      try {
        this.empleadoGuardado = false;

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            nombre: this.empleado.nombre,
            primer_apellido: this.empleado.primer_apellido,
            segundo_apellido: this.empleado.segundo_apellido,
            email: this.empleado.email,
            fecha_contratacion: this.empleado.fecha_contratacion,
            idcargo: this.empleado.idcargo,
            idnivel: this.empleado.idnivel,
          }),
        });

        if (response.ok) {
          this.empleadoGuardado = true;
          alert('Empleado guardado correctamente');
          this.resetForm();
        } else {
          const errorText = await response.text();
          alert(`Error al guardar el empleado: ${errorText}`);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al intentar guardar el empleado. Intenta de nuevo más tarde.');
      }
    },

    resetForm() {
      this.empleado = {
        id: '',
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
