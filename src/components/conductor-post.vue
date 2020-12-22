<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/conductores" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Conductor</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitConductorData">
        <vue-form-generator tag="div" :schema="schema" :options="formOptions" :model="model" />
        <div class="d-flex justify-content-end mt-3 pr-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
          >{{ isSaving ? 'Guardando...' : (editMode ? 'Actualizar' : 'Enviar')}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import conductorFormSchema from "../forms/conductorFormSchema";
import babelPolyfill from "babel-polyfill";
import { conductoresService } from "../services/conductores.service";

export default {
  name: "conductor-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.conductorId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
        
      },
      schema: conductorFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      conductorId: null,
    };
  },
  computed: {
    editMode: function () {
      return this.conductorId !== null;
    },
  },
  methods: {
    async loadModel() {
        const conductor = await conductoresService.getConductor(this.conductorId);
        
        this.model = conductor.data;
    },
    async submitConductorData() {
      try {
        console.info("creando conductor...");
        const {
          nif,
          nombre,
          apellido1 = "",
          apellido2 = "",
          observaciones = "",
        } = this.model;

        let conductor = null; 

        if (this.editMode) {
            conductor = await conductoresService.updateConductor(
                this.conductorId,
                nif,
                nombre,
                apellido1, 
                apellido2, 
                observaciones
            );
        } else {
            conductor = await conductoresService.createConductor(
            nif,
            nombre,
            apellido1,
            apellido2,
            observaciones
            );
        }
        console.info("Datos conductor: ", conductor);

        const msg = this.editMode ? 'Conductor modificado' : 'Conductor creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/conductores");
        }, 1500);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el conductor' : 'No se pudo crear el conductor';
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

