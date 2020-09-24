<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/transportistas" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Transportista</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitTransportistaData">
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
import TransportistaFormSchema from "../forms/transportistaFormSchema";
import babelPolyfill from "babel-polyfill";
import { transportistasService } from "../services/transportistas.service";

export default {
  name: "transportista-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.transportistaId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
        provincia: "37",
        pais: "España",
      },
      schema: TransportistaFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      transportistaId: null,
    };
  },
  computed: {
    codProvincia: function () {
      return parseInt(this.model.provincia, 10);
    },
    editMode: function () {
      return this.transportistaId !== null;
    },
  },
  methods: {
    async loadModel() {
        const transportista = await transportistasService.getTransportista(this.transportistaId);
        console.log('transportista', transportista),
        this.model = transportista.data;
        this.model.provincia = '' + this.model.codProvincia;
    },
    async submitTransportistaData() {
      try {
        console.info("creando transportista...");
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

        console.log(`observaciones: "${observaciones}"`);
        console.log(`codProvincia: "${codProvincia}"`);
        let transportista = null; 

        if (this.editMode) {
            transportista = await transportistasService.updateTransportista(
                this.transportistaId,
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
            transportista = await transportistasService.createTransportista(
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
        console.info("Datos transportista: ", transportista);

        const msg = this.editMode ? 'Transportista modificado' : 'Transportista creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/transportistas");
        }, 2000);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el transportista' : 'No se pudo crear el transportista';
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

