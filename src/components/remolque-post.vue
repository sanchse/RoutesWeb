<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/remolques" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Remolque</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitRemolqueData">
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
import remolqueFormSchema from "../forms/remolqueFormSchema";
import babelPolyfill from "babel-polyfill";
import { remolquesService } from "../services/remolques.service";

export default {
  name: "remolque-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.remolqueId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
      },
      schema: remolqueFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      remolqueId: null,
    };
  },
  computed: {
    editMode: function () {
      return this.remolqueId !== null;
    },
  },
  methods: {
    async loadModel() {
        const remolque = await remolquesService.getRemolque(this.remolqueId);

        this.model = remolque.data;
    },
    async submitRemolqueData() {
      try {
        console.info("creando remolque...");
        const {
          nombre,
          matricula,
          marca = "",
          modelo = "",
        } = this.model;
        
        let remolque = null; 

        if (this.editMode) {
            remolque = await remolquesService.updateRemolque(
                this.remolqueId,
                nombre,
                observaciones
            );
        } else {
            remolque = await remolquesService.createRemolque(
            nombre,
            observaciones
            );
        }
        console.info("Datos remolque: ", remolque);

        const msg = this.editMode ? 'Remolque modificado' : 'Remolque creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/remolques");
        }, 1500);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el remolque' : 'No se pudo crear el remolque';
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
        this.$router.push("/");
      }
    },
  },
};
</script>

