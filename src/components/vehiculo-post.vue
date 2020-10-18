<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/vehiculos" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Vehiculo</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitVehiculoData">
        <vue-form-generator tag="div" :schema="schema" :options="formOptions" :model="model" />
        <div class="d-flex justify-content-end mt-3 pr-4">
          <button type="submit" class="btn btn-primary btn-lg">
              {{ isSaving ? 'Guardando...' : (editMode ? 'Actualizar' : 'Enviar')}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import vehiculoFormSchema from "../forms/vehiculoFormSchema";
import babelPolyfill from "babel-polyfill";
import { vehiculosService } from "../services/vehiculos.service";

export default {
  name: "vehiculo-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.vehiculoId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
      },
      schema: vehiculoFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      vehiculoId: null,
    };
  },
  computed: {
    editMode: function () {
      return this.vehiculoId !== null;
    },
  },
  methods: {
    async loadModel() {
        const vehiculo = await vehiculosService.getVehiculo(this.vehiculoId);
        
        this.model = vehiculo.data;
    },
    async submitVehiculoData() {
      try {
        console.info("creando vehiculo...");
        const {
          nombre,
          matricula,
          marca = "",
          modelo = "",
        } = this.model;
        
        let vehiculo = null; 

        if (this.editMode) {
            vehiculo = await vehiculosService.updateVehiculo(
                this.vehiculoId,
                nombre,
                matricula, 
                marca,
                modelo
            );
        } else {
            vehiculo = await vehiculosService.createVehiculo(
            nombre,
            matricula,
            marca,
            modelo
            );
        }
        console.info("Datos vehiculo: ", vehiculo);

        const msg = this.editMode ? 'Vehiculo modificado' : 'Vehiculo creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/vehiculos");
        }, 1500);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el vehiculo' : 'No se pudo crear el vehiculo';
        this.$toast.error(msg);
        this.handleError(e);
      }
    },

    handleError(error) {
      const { statusCode } = error.response.data;
      console.info("status code: ", statusCode);

      if (statusCode !== 401) {
        console.log(error);
      } else {
        console.error("error 401");
        this.$emit("renove-token");
        this.$router.push("/").catch(err => {});
      }
    },
  },
};
</script>

