<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column align-items-start">
        <h2>Clientes</h2>
        <span class="text-muted">Listado de clientes</span>
      </div>
      <router-link to="/crear-usuario" class="btn btn-primary">Crear usuario</router-link>
    </div>
    <div class="table-responsive mt-5 bg-white">
      <div class="text-center" v-if="cargando">Cargando clientes</div>
      <table v-if="!cargando && clientes.length" class="table">
        <thead>
          <tr>
            <th>NIF/CIF</th>
            <th>Nombre</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th>Provincia</th>
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
            <td>{{cliente.codProvincia}}</td>
            <td>{{cliente.observaciones}}</td>
            <td>
              <div class="button-group">
                <button class="btn btn-sm">ver</button>
                <router-link
                  :to="`/editar-usuario/${cliente.id}`"
                  class="btn btn-sm btn-secondary"
                >editar</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="!cargando && !clientes.length">No se han encontrado clientes</div>
    </div>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { clientesService } from "../services/clientes.service";

export default {
  name: "Clientes",
  mounted() {
    this.obtenerClientes();
  },
  data() {
    return {
      clientes: [],
      cargando: true,
    };
  },
  methods: {
    async obtenerClientes() {
      try {
        console.info("Obteniendo clientes...");
          const datos = await clientesService.fetchClientes({
            nif: "",
            codProvincia: "",
            search: "",
          });
          console.info("Datos clientes: ", datos);
          if (datos) {
            this.clientes = datos.data;
          }
      } catch (e) {
        console.log(e);
        this.handleError(e);
      }
      this.cargando = false;
    },

    handleError(error) {
      const { statusCode } = error.response.data;

      if (statusCode !== 401) {
        console.log(error);
        alert(error.message);
      } else {
        console.error("error 401");
        this.$emit("renove-token");
        this.$router.push('/');
      }
    },
  },
};
</script>

<style>
</style>