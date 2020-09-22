<template>
  <div>
    <section>
      <h1>Aplicación de Rutas</h1>
      <router-link to="/" exact>Inicio</router-link>
      <router-link to="/clientes">Clientes</router-link>
      <router-link to="/transportistas">Transportistas</router-link>
      <hr />
      <router-view @renove-token="renoveToken"></router-view>
    </section>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import { authService } from "./services/auth.service";

export default {
  data() {
    return {
      tokenRenovationCount: 0,
    }
  },
  created() {
    
  },
  mounted() {
    this.obtenerToken();
  },
  methods: {
    obtenerToken() {
      authService.signout();
      authService.signin("admin", "12345aA$");
    },
    renoveToken() {
      console.log('renove token');
      authService.signout();
      authService.signin("admin", "12345aA$");
    }
  },
  computed: {
    hasToken() {
      const token = localStorage.getItem('accessToken');
      return token ? true: false;
    }
  },
};
</script>

<style>
.router-link-active {
  color: red;
}
</style>
