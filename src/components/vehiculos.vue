<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Vehiculos</h2>
        <span class="text-muted">Listado de vehiculos</span>
      </div>
      <router-link to="/vehiculo-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarVehiculo">Buscar</label>
      <input type="search" name="buscarVehiculo" id="buscarVehiculo" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando vehiculos</div>
      <table v-if="!error && !cargando && vehiculos.length" class="table">
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
          <tr v-for="(vehiculo, index) in vehiculos" :key="index">
            <td>{{vehiculo.nombre}}</td>
            <td>{{vehiculo.matricula}}</td>
            <td>{{vehiculo.marca}}</td>
            <td>{{vehiculo.modelo}}</td>
            <td :id="'btn_' + vehiculo.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/vehiculo-post/${vehiculo.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(vehiculo.id)"
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
        v-if="!error && !cargando && !vehiculos.length"
      >No se han encontrado vehiculos</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar vehiculo" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarVehiculo">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { vehiculosService } from "../services/vehiculos.service";


export default {
  name: "Vehiculos",
  mounted() {
    this.obtenerVehiculos();
  },
  data() {
    return {
      vehiculos: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedVehiculoId: null,
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
      this.selectedVehiculoId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedVehiculoId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarVehiculo() {
      try {
        vehiculosService.deleteVehiculo(this.selectedVehiculoId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedVehiculoId}`);
        this.selectedVehiculoId = null;
        this.confirmModal = false;
        this.$toast.success("Vehiculo eliminado");
        setTimeout(() => this.obtenerVehiculos(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el vehiculo");
        this.handleError(e);
      }
    },
    async search() {
      console.log('buscando...');
      this.fetchVehiculos(this.buscar);
    },
    async fetchVehiculos(searchText) {
      try {
        console.info("Obteniendo vehiculos...");
        this.cargando = true;
        this.vehiculos = [];
        const datos = await vehiculosService.fetchVehiculos({
          matricula: "",
          search: searchText,
        });

        if (datos) {
          this.vehiculos = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerVehiculos() {
      this.fetchVehiculos('');
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
