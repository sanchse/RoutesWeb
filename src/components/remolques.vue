<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Remolques</h2>
        <span class="text-muted">Listado de remolques</span>
      </div>
      <router-link to="/remolque-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarRemolque">Buscar</label>
      <input type="search" name="buscarRemolque" id="buscarRemolque" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando remolques</div>
      <table v-if="!error && !cargando && remolques.length" class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matricula</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(remolque, index) in remolques" :key="index">
            <td>{{remolque.nombre}}</td>
            <td>{{remolque.matricula}}</td>
            <td>{{remolque.marca}}</td>
            <td>{{remolque.modelo}}</td>
            <td :id="'btn_' + remolque.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/remolque-post/${remolque.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(remolque.id)"
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
        v-if="!error && !cargando && !remolques.length"
      >No se han encontrado remolques</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar remolque" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarRemolque">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { remolquesService } from "../services/remolques.service";


export default {
  name: "Remolques",
  mounted() {
    this.obtenerRemolques();
  },
  data() {
    return {
      remolques: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedRemolqueId: null,
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
      this.selectedRemolqueId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedRemolqueId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarRemolque() {
      try {
        remolquesService.deleteRemolque(this.selectedRemolqueId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedRemolqueId}`);
        this.selectedRemolqueId = null;
        this.confirmModal = false;
        this.$toast.success("Remolque eliminado");
        setTimeout(() => this.obtenerRemolques(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el remolque");
        this.handleError(e);
      }
    },
    async search() {
      this.fetchRemolques(this.buscar);
    },
    async fetchRemolques(searchText) {
      try {
        this.cargando = true;
        this.remolques = [];
        const datos = await remolquesService.fetchRemolques({
          matricula: "",
          search: searchText,
        });

        if (datos) {
          this.remolques = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerRemolques() {
      this.fetchRemolques('');
    },

    handleError(error) {
      const { statusCode } = error.response.data;
      console.info("status code: ", statusCode);

      if (statusCode !== 401) {
        console.log(error);
        alert(error.message);
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
