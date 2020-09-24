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
            <router-link to="/" exact active-class="active" class="nav-item" tag="li">
              <a class="nav-link">Inicio</a>
            </router-link>
            <router-link to="/clientes" active-class="active" class="nav-item" tag="li">
              <a class="nav-link">Clientes</a>
            </router-link>
            <router-link to="/transportistas" active-class="active" class="nav-item" tag="li">
              <a class="nav-link">Transportistas</a>
            </router-link>
            <router-link to="/destinatarios" active-class="active" class="nav-item" tag="li">
              <a class="nav-link">Destinatarios</a>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container my-5">
      <hr />
      <router-view @renove-token="renoveToken"></router-view>
    </div>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { authService } from "./services/auth.service";

export default {
  data() {
    return {
      tokenRenovationCount: 0,
    };
  },
  created() {},
  mounted() {
    this.obtenerToken();
  },
  methods: {
    obtenerToken() {
      authService.signout();
      authService.signin("admin", "12345aA$");
    },
    renoveToken() {
      console.log("renove token");
      authService.signout();
      authService.signin("admin", "12345aA$");
    },
  },
  computed: {
    hasToken() {
      const token = localStorage.getItem("accessToken");
      return token ? true : false;
    },
  },
};
</script>

<style>
.router-link-active {
  color: red;
}

body {
  background-color: #fafafa !important;
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

