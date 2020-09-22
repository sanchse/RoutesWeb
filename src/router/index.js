import Home from '../components/home.vue';
import Clientes from '../components/clientes.vue';
import Transportistas from '../components/transportistas.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/clientes', component: Clientes}, 
    { path: '/transportistas', component: Transportistas },
]