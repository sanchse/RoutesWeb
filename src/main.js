import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './router/index';
import babelPolyfill from 'babel-polyfill'
import AuthService from './services/auth.service';

// const authService = new AuthService();
// authService.signout();
// authService.signin('admin', '12345aA$'); 

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
