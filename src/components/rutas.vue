<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Rutas</h2>
        <span class="text-muted">Listado de rutas</span>
      </div>
      <router-link to="/ruta-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-left">
        <label for="rutasDisponibles">Filtrar Finalizadas</label>
        <input type="checkbox" name="rutasDisponibles" id="rutasDisponible" v-model="filtrarRutas" @change="search">
    </div>
    <div class="float-right">
      <label for="buscarRuta">Buscar</label>
      <input
        type="search"
        name="buscarRuta"
        id="buscarRuta"
        v-model="buscar"
        @keyup.enter.prevent="search"
      />
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando rutas</div>
      <table v-if="!error && !cargando && rutas.length" class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Mercancia</th>
            <th>Vehiculo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ruta, index) in rutas" :key="index">
            <td>{{ ruta.fechaEnvio | formatDate }}</td>
            <td>{{ ruta.origen }}</td>
            <td>{{ ruta.destino }}</td>
            <td>{{ ruta.mercancia.nombre }}</td>
            <td>{{ ruta.vehiculo.nombre }}</td>
            
            <td :id="'btn_' + ruta.id">
              <div class="button-group" style="display: inline-block">
                <router-link :to="`/ruta-detalle/${ruta.id}/from/rutas`" title="Ver" class="">
                  <md-icon>visibility</md-icon>
                </router-link>

              <!-- class="btn btn-secondary a-btn-slide-text" -->
                <router-link
                  :to="`/ruta-post/${ruta.id}`"
                  class=""
                  title="Editar"
                  >
                    <md-icon>edit</md-icon>
                  </router-link>

                <!-- class="btn btn-primary a-btn-slide-text" -->
                <a
                  href="#"
                  @click="confirmDelete(ruta.id)"
                  class=""
                  title="Eliminar"
                >
                  <md-icon>delete</md-icon>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="!error && !cargando && !rutas.length">
        No se han encontrado rutas
      </div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar ruta" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete"
          >Cancelar</b-button
        >
        <b-button size="sm" variant="success" @click="eliminarRuta"
          >Confirmar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>


<script>
import babelPolyfill from "babel-polyfill";
import { rutasService } from "../services/rutas.service";
import provinciasFile from "../assets/provincias.json";

export default {
  name: "Rutas",
  mounted() {
    this.obtenerRutas();
  },
  data() {
    return {
      rutas: [],
      filtrarRutas: false,
      cargando: true,
      error: false,
      confirmModal: false,
      selectedRutaId: null,
      provincias: provinciasFile.provincias,
      buscar: '',
    };
  },
  computed: {
    
  },
  methods: {
      filtrar(rutas) {
        const now = new Date();
        return rutas.filter((ruta) => {
            const date = new Date(ruta.fechaEnvio);
            return date >= now;
        });
      },
    
    provinciaString(id) {
      const provincia = this.provincias.filter(function (data) {
        return data.id == id;
      });

      return provincia || provincia.length ? provincia[0].name : '';
    },
    confirmDelete(id) {
      this.selectedRutaId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedRutaId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarRuta() {
      try {
        console.log('Borrado del elemento: ' + this.selectedRutaId);
        rutasService.deleteRuta(this.selectedRutaId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedRutaId}`);
        this.selectedRutaId = null;
        this.confirmModal = false;
        this.$toast.success("Ruta eliminada");
        setTimeout(() => this.obtenerRutas(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar la ruta");
        this.handleError(e);
      }
    },
    async search() {
      console.log('buscando...');
      this.fetchRutas(this.buscar);
    },
    async fetchRutas(searchText) {
      try {
          this.cargando = true;
        this.rutas = [];
        console.info("Obteniendo rutas...");
        const datos = await rutasService.fetchRutas({
          fechaDesde: null,
          fechaHasta: null,
          search: searchText,
        });

        if (datos) {
          this.rutas = this.filtrarRutas ? this.filtrar(datos.data) : datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerRutas() {
      this.fetchRutas('');
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