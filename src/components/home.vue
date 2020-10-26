<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Inicio</h2>
        <span class="text-muted">Rutas disponibles</span>
      </div>
    </div>
    <!-- <div class="float-right">
      <label for="buscarRuta">Buscar</label>
      <input
        type="search"
        name="buscarRuta"
        id="buscarRuta"
        v-model="buscar"
        @keyup.enter.prevent="search"
      />
    </div> -->
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
                <router-link :to="`/ruta-detalle/${ruta.id}`" title="Ver" class="">
                  <md-icon>visibility</md-icon>
                </router-link>
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
import { healthService } from '../services/health.service';

export default {
  name: "Rutas",
  created() {
    this.comprobarConexion();
    },
  mounted() {
    this.obtenerRutas();    
  },
  data() {
    return {
      conectado: false,
      rutas: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedRutaId: null,
      provincias: provinciasFile.provincias,
      buscar: "",
    };
  },
  watch: {
    conectado: function (newValue, oldValue) {
      this.$emit('connectionChange', newValue);
      this.obtenerRutas();
    },
  },
  computed: {},
  methods: {    
    comprobarConexion() {
      var vm = this;
      setInterval(
        function () {          
          healthService.checkHealth()
            .then((data) => {
              //console.log('check: ', data);
              vm.conectado = data.status === 200;            
            })
            .catch(() => {
              vm.conectado =false;
            })
        }.bind(vm),
        7500
      );
    },
    provinciaString(id) {
      const provincia = this.provincias.filter(function (data) {
        return data.id == id;
      });

      return provincia || provincia.length ? provincia[0].name : "";
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
        rutasService.deleteRuta(this.selectedRutaId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedRutaId}`);
        this.selectedRutaId = null;
        this.confirmModal = false;
        this.$toast.success("Ruta eliminado");
        setTimeout(() => this.obtenerRutas(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar la ruta");
        this.handleError(e);
      }
    },
    async search() {
      console.log("buscando...");
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
          this.rutas = this.filtrarRutas(datos.data);
          localStorage.setItem('RutasHabiles', JSON.stringify(this.rutas));
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerRutas() {
      this.cargando = true;
      if (this.conectado) {
        this.fetchRutas("");
      } else {
        const datosRutas = localStorage.getItem('RutasHabiles');
        if (datosRutas !== undefined && datosRutas != null) {
          this.rutas = JSON.parse(datosRutas);
        }
      }
      this.cargando = false;
    },

    filtrarRutas(rutas) {
      const now = new Date();
      return rutas.filter((ruta) => {
        const date = new Date(ruta.fechaEnvio);
        return date >= now;
      });
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

<style>

</style>