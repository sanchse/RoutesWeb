<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Mercancias</h2>
        <span class="text-muted">Listado de mercancias</span>
      </div>
      <router-link to="/mercancia-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarMercancia">Buscar</label>
      <input type="search" name="buscarMercancia" id="buscarMercancia" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando mercancias</div>
      <table v-if="!error && !cargando && mercancias.length" class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Observaciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mercancia, index) in mercancias" :key="index">
            <td>{{mercancia.nombre}}</td>
            <td>{{mercancia.observaciones}}</td>
            <td :id="'btn_' + mercancia.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/mercancia-post/${mercancia.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(mercancia.id)"
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
        v-if="!error && !cargando && !mercancias.length"
      >No se han encontrado mercancias</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar mercancia" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarMercancia">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { mercanciasService } from "../services/mercancias.service";


export default {
  name: "Mercancias",
  mounted() {
    this.obtenerMercancias();
  },
  data() {
    return {
      mercancias: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedMercanciaId: null,
      buscar: '',
    };
  },
  computed: {
    
  },
  methods: {
    confirmDelete(id) {
      this.selectedMercanciaId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedMercanciaId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarMercancia() {
      try {
        mercanciasService.deleteMercancia(this.selectedMercanciaId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedMercanciaId}`);
        this.selectedMercanciaId = null;
        this.confirmModal = false;
        this.$toast.success("Mercancia eliminado");
        setTimeout(() => this.obtenerMercancias(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el mercancia");
        this.handleError(e);
      }
    },
    async search() {
      console.log('buscando...');
      this.fetchMercancias(this.buscar);
    },
    async fetchMercancias(searchText) {
      try {
        console.info("Obteniendo mercancias...");
        this.cargando = true;
        this.mercancias = [];
        const datos = await mercanciasService.fetchMercancias({
          search: searchText,
        });

        if (datos) {
          this.mercancias = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerMercancias() {
      this.fetchMercancias('');
    },

    handleError(error) {
      const { statusCode } = error.response.data;
      console.info("status code: ", statusCode);

      if (statusCode !== 401) {
        console.log(error);
        //(error.message);
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
