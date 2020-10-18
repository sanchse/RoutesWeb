<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">RUTAS</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <router-link
              to="/"
              exact
              active-class="active"
              class="nav-item"
              tag="li"              
            >
              <a class="nav-link">Inicio</a>
            </router-link>
            <router-link
              to="/rutas"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Rutas</a>
            </router-link>
            <router-link
              to="/clientes"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Clientes</a>
            </router-link>
            <router-link
              to="/transportistas"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Transportistas</a>
            </router-link>
            <router-link
              to="/destinatarios"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Destinatarios</a>
            </router-link>
            <router-link
              to="/vehiculos"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Vehiculos</a>
            </router-link>
            <router-link
              to="/remolques"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Remolques</a>
            </router-link>
            <router-link
              to="/mercancias"
              active-class="active"
              class="nav-item"
              tag="li"
            >
              <a class="nav-link">Mercancias</a>
            </router-link>
          </ul>
        </div>

        <div
          class="float-right"
          :title="[conectado ? 'Conectado' : 'Sin coneción']"
        >
          <md-icon style="color: white" v-bind:class="[conectado ? 'conectado' : 'noconectado']">{{
            conectado ? "phonelink_ring" : "phonelink_erase"
          }}</md-icon>
        </div>
      </div>
    </nav>
    <div class="container my-5">
      <hr />
      <router-view @renove-token="renoveToken" @connectionChange="connectionChangeHandler"></router-view>
    </div>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { authService } from "./services/auth.service";
import { healthService } from './services/health.service';
import "bootstrap/dist/css/bootstrap.css";

export default {
  data() {
    return {
      tokenRenovationCount: 0,
      conectado: false,
    };
  },
  created() {},
  mounted() {
    this.obtenerToken();
  },
  methods: {     
    connectionChangeHandler(value) {
      console.log('Evento capturado: ' + value);
      this.conectado = value;
    },
    obtenerToken() {
      authService.signout();
      authService.signin("admin", "12345aA$");
    },
    renoveToken() {
      console.log("renove token");
      authService.signout();
      authService.signin("admin", "12345aA$");
    },
    hasToken() {
      const token = localStorage.getItem("accessToken");
      return token ? true : false;
    },
  },
  computed: {
    conectadoStr() {
      this.conectado ? "Conectado" : "Sin conexión";
    },
    
  },
};
</script>

<style>
.noconectado {
  color: red;
}

.conectado {
  color: white;
}

.router-link-active {
  color: red;
}

body {
  background-color: #fafafa !important;
}

.btn-secondary {
  background-color: #d3d3d3;
}
.btn-primary {
    background-color: #ffffff;
  }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.vue-form-generator > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2%;
  width: 50%;
}

.field-wrap,
.wrapper {
  width: 100%;
}

.dropList {
  z-index: 10;
  background-color: #fff;
  position: relative;
  width: 40%;
  top: 5px;
  right: 12px;
}

legend {
  margin: 10px 0 20px 18px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.hint {
  font-size: 10px;
  font-style: italic;
  color: purple;
}

.help-block {
  color: red;
}
</style>

