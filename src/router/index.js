import Home from '../components/home.vue';
import Clientes from '../components/clientes.vue';
import ClientePost from '../components/cliente-post.vue';
import Transportistas from '../components/transportistas.vue';
import TransportistaPost from '../components/transportista-post.vue';
import Destinatarios from '../components/destinatarios.vue';
import DestinatarioPost from '../components/destinatario-post.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/clientes', component: Clientes }, 
    { path: '/cliente-post/:id?', component: ClientePost },
    { path: '/transportistas', component: Transportistas },
    { path: '/transportista-post/:id?', component: TransportistaPost},
    { path: '/destinatarios', component: Destinatarios },
    { path: '/destinatario-post/:id?', component: DestinatarioPost},
]