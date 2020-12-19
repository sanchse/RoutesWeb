<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Transportistas</h2>
        <span class="text-muted">Listado de transportistas</span>
      </div>
      <router-link to="/transportista-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarTransportista">Buscar</label>
      <input type="search" name="buscarTransportista" id="buscarTransportista" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando transportistas</div>
      <table v-if="!error && !cargando && transportistas.length" class="table">
        <thead>
          <tr>
            <th>NIF/CIF</th>
            <th>Nombre</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th>Provincia</th>
            <th>Código Postal</th>
            <th>Observaciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transportista, index) in transportistas" :key="index">
            <td>{{transportista.nif}}</td>
            <td>{{transportista.nombre}}</td>
            <td>{{transportista.domicilio}}</td>
            <td>{{transportista.localidad}}</td>
            <td>{{provinciaString(transportista.codProvincia)}}</td>
            <td>{{transportista.codPostal}}</td>
            <td>{{transportista.observaciones}}</td>
            <td :id="'btn_' +transportista.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/transportista-post/${transportista.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(transportista.id)"
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
        v-if="!error && !cargando && !transportistas.length"
      >No se han encontrado transportistas</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar transportista" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarTransportista">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { transportistasService } from "../services/transportistas.service";
import provinciasFile from "../assets/provincias.json";

export default {
  name: "Transportistas",
  mounted() {
    this.obtenerTransportistas();
  },
  data() {
    return {
      transportistas: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedTransportistaId: null,
      provincias: provinciasFile.provincias,
      buscar: '',
    };
  },
  computed: {
    
  },
  methods: {
    provinciaString(id) {
      const provincia = this.provincias.filter(function (data) {
        return data.id == id;
      });

      return provincia || provincia.length ? provincia[0].name : '';
    },
    confirmDelete(id) {
      this.selectedTransportistaId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedTransportistaId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarTransportista() {
      try {
        transportistasService.deleteTransportista(this.selectedTransportistaId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedTransportistaId}`);
        this.selectedTransportistaId = null;
        this.confirmModal = false;
        this.$toast.success("Transportista eliminado");
        setTimeout(() => this.obtenerTransportistas(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el transportista");
        this.handleError(e);
      }
    },
    async search() {
      this.fetchTransportistas(this.buscar);
    },
    async fetchTransportistas(searchText) {
      try {
        this.cargando = true;
        this.transportistas = [];
        const datos = await transportistasService.fetchTransportistas({
          nif: "",
          codProvincia: "",
          search: searchText,
        });

        if (datos) {
          this.transportistas = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerTransportistas() {
      this.fetchTransportistas('');
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
  },
};
</script>

<style scoped>
a.btn:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}
a.btn {
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
}
</style>>
