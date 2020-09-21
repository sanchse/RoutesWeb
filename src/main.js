import Vue from 'vue'
import App from './App.vue'
import babelPolyfill from 'babel-polyfill'
import AuthService from './services/auth.service';

const authService = new AuthService();
authService.signout();
authService.signin('admin', '12345aA$'); 

new Vue({
  el: '#app',
  render: h => h(App)
})
