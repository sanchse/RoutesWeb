import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './router/index';
import babelPolyfill from 'babel-polyfill'
import AuthService from './services/auth.service';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment';
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import PortalVue from 'portal-vue'
import VueSignature from "vue-signature-pad";


Vue.use(VueSignature);
Vue.use(VueMaterial)

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

Vue.use(PortalVue)


// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'

Vue.use(CardPlugin)
Vue.use(Toast, toastOpotions);
Vue.use(VueFormGenerator);
Vue.use(VueRouter);

Vue.config.productionTip = false;

//Filters
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.filter('formatNumber', function(value) {
  if (value) {
    return Number(value).toLocaleString();
  }
});

const router = new VueRouter({
  //mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
