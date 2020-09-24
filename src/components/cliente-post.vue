<template>
  <div class="container">
    <div class="d-flex justify-content-start mb-3">
      <router-link to="/clientes" class="btn btn-sm btn-outline-secondary">Volver</router-link>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>{{editMode ? 'Modificar ': 'Crear '}} Cliente</h2>
        <span class="text-muted">{{editMode ? 'Actualizar ': 'Añadir nuevo '}} registro</span>
      </div>
    </div>

    <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
      <form action @submit.prevent="submitClienteData">
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
import clienteFormSchema from "../forms/clienteFormSchema";
import babelPolyfill from "babel-polyfill";
import { clientesService } from "../services/clientes.service";

export default {
  name: "cliente-post",
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.clienteId = this.$route.params.id;
      this.loadModel();
    }
  },
  data() {
    return {
      model: {
        provincia: "37",
        pais: "España",
      },
      schema: clienteFormSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      isSaving: false,
      error: false,
      clienteId: null,
    };
  },
  computed: {
    codProvincia: function () {
      return parseInt(this.model.provincia, 10);
    },
    editMode: function () {
      return this.clienteId !== null;
    },
  },
  methods: {
    async loadModel() {
        const cliente = await clientesService.getCliente(this.clienteId);
        console.log('cliente', cliente),
        this.model = cliente.data;
        this.model.provincia = '' + this.model.codProvincia;
    },
    async submitClienteData() {
      try {
        console.info("creando cliente...");
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
        let cliente = null; 

        if (this.editMode) {
            cliente = await clientesService.updateCliente(
                this.clienteId,
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
            cliente = await clientesService.createCliente(
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
        console.info("Datos cliente: ", cliente);

        const msg = this.editMode ? 'Cliente modificado' : 'Cliente creado';
        this.$toast.success(msg);
        setTimeout(() => {
          this.$router.push("/clientes");
        }, 2000);
      } catch (e) {
        this.error = true;
        const msg = this.editMode ? 'No se pudo modificar el cliente' : 'No se pudo crear el cliente';
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

