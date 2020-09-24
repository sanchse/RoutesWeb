import Home from '../components/home.vue';
import Clientes from '../components/clientes.vue';
import Transportistas from '../components/transportistas.vue';
import ClientePost from '../components/cliente-post.vue';
import TransportistaPost from '../components/transportista-post.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/clientes', component: Clientes }, 
    { path: '/cliente-post/:id?', component: ClientePost },
    { path: '/transportistas', component: Transportistas },
    { path: '/transportista-post/:id?', component: TransportistaPost},
]