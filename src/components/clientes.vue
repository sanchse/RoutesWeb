<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Clientes</h2>
        <span class="text-muted">Listado de clientes</span>
      </div>
      <router-link to="/cliente-post" class="btn btn-primary">Crear</router-link>
    </div>
    <div class="float-right">
      <label for="buscarCliente">Buscar</label>
      <input type="search" name="buscarCliente" id="buscarCliente" v-model="buscar" @keyup.enter.prevent="search">
    </div>
    <div class="table-responsive-md mt-5 bg-white">
      <div class="text-center" v-if="error">Error de conexión</div>
      <div class="text-center" v-if="!error && cargando">Cargando clientes</div>
      <table v-if="!error && !cargando && clientes.length" class="table">
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
          <tr v-for="(cliente, index) in clientes" :key="index">
            <td>{{cliente.nif}}</td>
            <td>{{cliente.nombre}}</td>
            <td>{{cliente.domicilio}}</td>
            <td>{{cliente.localidad}}</td>
            <td>{{provinciaString(cliente.codProvincia)}}</td>
            <td>{{cliente.codPostal}}</td>
            <td>{{cliente.observaciones}}</td>
            <td :id="'btn_' +cliente.id">
              <div class="button-group" style="display: inline-block">
                <router-link
                  :to="`/cliente-post/${cliente.id}`"
                  class="btn btn-secondary a-btn-slide-text"
                >Editar</router-link>

                <a
                  href="#"
                  @click="confirmDelete(cliente.id)"
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
        v-if="!error && !cargando && !clientes.length"
      >No se han encontrado clientes</div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Borrar cliente" button-size="sm">
      <div class="d-block text-center">
        <h5>¿Realmente desea eliminar este registro?</h5>
        <hr />
      </div>
      <div class="float-right">
        <b-button size="sm" variant="danger" @click="cancelDelete">Cancelar</b-button>
        <b-button size="sm" variant="success" @click="eliminarCliente">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { clientesService } from "../services/clientes.service";
import provinciasFile from "../assets/provincias.json";

export default {
  name: "Clientes",
  mounted() {
    this.obtenerClientes();
  },
  data() {
    return {
      clientes: [],
      cargando: true,
      error: false,
      confirmModal: false,
      selectedClienteId: null,
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
      this.selectedClienteId = id;
      this.confirmModal = true;
      this.$refs["my-modal"].show();
    },
    cancelDelete() {
      this.$toast.warning("Borrado cancelado");
      this.selectedClienteId = null;
      this.confirmModal = false;
      this.$refs["my-modal"].hide();
    },
    eliminarCliente() {
      try {
        clientesService.deleteCliente(this.selectedClienteId);
        this.$refs["my-modal"].toggle(`#btn_${this.selectedClienteId}`);
        this.selectedClienteId = null;
        this.confirmModal = false;
        this.$toast.success("Cliente eliminado");
        setTimeout(() => this.obtenerClientes(), 1000);
      } catch (error) {
        this.error = true;
        this.$toast.error("No se pudo eliminar el cliente");
        this.handleError(e);
      }
    },
    async search() {
      this.fetchClientes(this.buscar);
    },
    async fetchClientes(searchText) {
      try {
        console.info("Obteniendo clientes...");
        this.cargando = true;
        this.clientes = [];
        const datos = await clientesService.fetchClientes({
          nif: "",
          codProvincia: "",
          search: searchText,
        });

        if (datos) {
          this.clientes = datos.data;
          this.cargando = false;
        }
      } catch (e) {
        this.error = true;
        this.handleError(e);
      }
    },
    async obtenerClientes() {
      this.fetchClientes('');
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
