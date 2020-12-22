<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Conductores</h2>
        <span class="text-muted">Listado de conductores</span>
      </div>
      <router-link to="/conductor-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarConductor">Buscar</label>
      <input type="search" name="buscarConductor" id="buscarConductor" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando conductores</div>
      <table v-if="!error && !cargando && conductores.length" class="table">
        <thead>
          <tr>
            <th>NIF/DNI</th>
            <th>Nombre</th>
            <th>Apellido 1</th>
            <th>Apellido 2</th>
            <th>Observaciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(conductor, index) in conductores" :key="index">
            <td>{{conductor.nif}}</td>
            <td>{{conductor.nombre}}</td>
            <td>{{conductor.apellido1}}</td>
            <td>{{conductor.apellido2}}</td>
            <td>{{conductor.observaciones}}</td>
            <td :id="'btn_' +conductor.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/conductor-post/${conductor.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(conductor.id)"
                  class="btn btn-primary a-btn-slide-text"
                >
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  <span>
                    <strong>Borrar</strong>
                  </span>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="text-center"
        v-if="!error && !cargando && !conductores.length"
      >No se han encontrado conductores</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar conductor" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarConductor">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>


<script>
import babelPolyfill from "babel-polyfill";
import { conductoresService } from "../services/conductores.service";

export default {
    name: "Conductores",
    mounted() {
        this.obtenerConductores();
    },
    data() {
        return {
            conductores: [],
            cargando: true,
            error: false,
            confirmModal: false,
            selectedConductorId: null,
            buscar: '',
        }
    },
    methods: {
        confirmDelete(id) {
            this.selectedConductorId = id;
            this.confirmModal = true;
            this.$refs["my-modal"].show();
        },
        cancelDelete() {
            this.$toast.warning("Borrado cancelado");
            this.selectedConductorId = null;
            this.confirmModal = false;
            this.$refs["my-modal"].hide();
        },
        eliminarConductor() {
            try {
                conductoresService.deleteConductor(this.selectedConductorId);
                this.$refs["my-modal"].toggle(`#btn_${this.selectedConductorId}`);
                this.selectedConductorId = null;
                this.confirmModal = false;
                this.$toast.success("Conductor eliminado");
                setTimeout(() => this.obtenerConductores(), 1000);
            } catch (error) {
                this.error = true;
                this.$toast.error("No se pudo eliminar el conductor");
                this.handleError(e);
            }
        },
        async search() {
            this.fetchConductores(this.buscar);
        },
        async fetchConductores(searchText) {
            try {
                this.cargando = true;
                this.conductores = [];
                const datos = await conductoresService.fetchConductores({
                    nif: '',
                    search: searchText,
                });

                if (datos) {
                    this.conductores = datos.data;
                    this.cargando = false;
                }
            } catch (e) {
                this.error = true;
                this.handleError(e);
            }
        },
        async obtenerConductores() {
            this.fetchConductores('');
        },

        handleError(error) {
            const { statusCode } = error.response.data;
            console.info("status code: ", statusCode);

            if (statusCode !== 401) {
                console.log(error);
                //alert(error.message);
            } else {
                console.error("error 401");
                this.$emit("renove-token");
                this.$router.push("/").catch(err => {});
            }
        },
    }
}
</script>

<style scoped>

</style>