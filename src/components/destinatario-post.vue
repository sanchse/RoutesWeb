<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/destinatarios" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Destinatario</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitDestinatarioData">
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
import destinatarioFormSchema from "../forms/destinatarioFormSchema";
import babelPolyfill from "babel-polyfill";
import { destinatariosService } from "../services/destinatarios.service";

export default {
  name: "destinatario-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.destinatarioId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
        provincia: "37",
        pais: "España",
      },
      schema: destinatarioFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      destinatarioId: null,
    };
  },
  computed: {
    codProvincia: function () {
      return parseInt(this.model.provincia, 10);
    },
    editMode: function () {
      return this.destinatarioId !== null;
    },
  },
  methods: {
    async loadModel() {
        const destinatario = await destinatariosService.getDestinatario(this.destinatarioId);
        
        this.model = destinatario.data;
        this.model.provincia = '' + this.model.codProvincia;
    },
    async submitDestinatarioData() {
      try {
        console.info("creando destinatario...");
        const {
          nif,
          nombre,
          domicilio = "",
          localidad = "",
          provincia = "",
          pais = "",
          codPostal = "",
          observaciones = "",
        } = this.model;
        const codProvincia = this.codProvincia;

        let destinatario = null; 

        if (this.editMode) {
            destinatario = await destinatariosService.updateDestinatario(
                this.destinatarioId,
                nombre,
                nif, 
                domicilio,
                localidad,
                codProvincia, 
                pais, 
                codPostal, 
                observaciones
            );
        } else {
            destinatario = await destinatariosService.createDestinatario(
            nif,
            nombre,
            domicilio,
            localidad,
            codProvincia,
            pais,
            codPostal,
            observaciones
            );
        }
        console.info("Datos destinatario: ", destinatario);

        const msg = this.editMode ? 'Destinatario modificado' : 'Destinatario creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/destinatarios");
        }, 2000);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el destinatario' : 'No se pudo crear el destinatario';
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

