import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './router/index';
import babelPolyfill from 'babel-polyfill'
import AuthService from './services/auth.service';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFormGenerator from 'vue-form-generator'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const toastOpotions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,

  position: "top-right",
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

Vue.use(Toast, toastOpotions);
Vue.use(VueFormGenerator);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
