<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/mercancias" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Mercancia</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitMercanciaData">
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
import mercanciaFormSchema from "../forms/mercanciaFormSchema";
import babelPolyfill from "babel-polyfill";
import { mercanciasService } from "../services/mercancias.service";

export default {
  name: "mercancia-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.mercanciaId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
      },
      schema: mercanciaFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      mercanciaId: null,
    };
  },
  computed: {
    editMode: function () {
      return this.mercanciaId !== null;
    },
  },
  methods: {
    async loadModel() {
        const mercancia = await mercanciasService.getMercancia(this.mercanciaId);
        console.log('mercancia', mercancia),
        this.model = mercancia.data;
    },
    async submitMercanciaData() {
      try {
        console.info("creando mercancia...");
        const {
          nombre,
          observaciones = "",
        } = this.model;
        
        let mercancia = null; 

        if (this.editMode) {
            mercancia = await mercanciasService.updateMercancia(
                this.mercanciaId,
                nombre,
                observaciones
            );
        } else {
            mercancia = await mercanciasService.createMercancia(
            nombre,
            observaciones
            );
        }
        console.info("Datos mercancia: ", mercancia);

        const msg = this.editMode ? 'Mercancia modificado' : 'Mercancia creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/mercancias");
        }, 1500);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el mercancia' : 'No se pudo crear el mercancia';
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

