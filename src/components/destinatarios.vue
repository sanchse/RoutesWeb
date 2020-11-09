<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Destinatarios</h2>
        <span class="text-muted">Listado de destinatarios</span>
      </div>
      <router-link to="/destinatario-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarDestinatario">Buscar</label>
      <input type="search" name="buscarDestinatario" id="buscarDestinatario" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando destinatarios</div>
      <table v-if="!error && !cargando && destinatarios.length" class="table">
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
          <tr v-for="(destinatario, index) in destinatarios" :key="index">
            <td>{{destinatario.nif}}</td>
            <td>{{destinatario.nombre}}</td>
            <td>{{destinatario.domicilio}}</td>
            <td>{{destinatario.localidad}}</td>
            <td>{{provinciaString(destinatario.codProvincia)}}</td>
            <td>{{destinatario.codPostal}}</td>
            <td>{{destinatario.observaciones}}</td>
            <td :id="'btn_' +destinatario.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/destinatario-post/${destinatario.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(destinatario.id)"
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
        v-if="!error && !cargando && !destinatarios.length"
      >No se han encontrado destinatarios</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar destinatario" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarDestinatario">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { destinatariosService } from "../services/destinatarios.service";
import provinciasFile from "../assets/provincias.json";

export default {
  name: "Destinatarios",
  mounted() {
    this.obtenerDestinatarios();
  },
  data() {
    return {
      destinatarios: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedDestinatarioId: null,
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
      this.selectedDestinatarioId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedDestinatarioId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarDestinatario() {
      try {
        destinatariosService.deleteDestinatario(this.selectedDestinatarioId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedDestinatarioId}`);
        this.selectedDestinatarioId = null;
        this.confirmModal = false;
        this.$toast.success("Destinatario eliminado");
        setTimeout(() => this.obtenerDestinatarios(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el destinatario");
        this.handleError(e);
      }
    },
    async search() {
      this.fetchDestinatarios(this.buscar);
    },
    async fetchDestinatarios(searchText) {
      try {
        console.info("Obteniendo destinatarios...");
        this.cargando = true;
        this.destinatarios = [];
        const datos = await destinatariosService.fetchDestinatarios({
          nif: "",
          codProvincia: "",
          search: searchText,
        });

        if (datos) {
          this.destinatarios = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerDestinatarios() {
      this.fetchDestinatarios('');
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
