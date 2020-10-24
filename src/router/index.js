import Home from '../components/home.vue';
import Clientes from '../components/clientes.vue';
import ClientePost from '../components/cliente-post.vue';
import Transportistas from '../components/transportistas.vue';
import TransportistaPost from '../components/transportista-post.vue';
import Destinatarios from '../components/destinatarios.vue';
import DestinatarioPost from '../components/destinatario-post.vue';
import Vehiculos from '../components/vehiculos.vue';
import VehiculoPost from '../components/vehiculo-post.vue';
import Remolques from '../components/remolques.vue';
import RemolquePost from '../components/remolque-post.vue';
import Mercancias from '../components/mercancias.vue';
import MercanciaPost from '../components/mercancia-post.vue';
import Rutas from '../components/rutas.vue';
import RutaDetalle from '../components/ruta-detalle.vue';
import RutaPost from '../components/ruta-post2.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/clientes', component: Clientes }, 
    { path: '/cliente-post/:id?', component: ClientePost },
    { path: '/transportistas', component: Transportistas },
    { path: '/transportista-post/:id?', component: TransportistaPost},
    { path: '/destinatarios', component: Destinatarios },
    { path: '/destinatario-post/:id?', component: DestinatarioPost},
    { path: '/vehiculos', component: Vehiculos },
    { path: '/vehiculo-post/:id?', component: VehiculoPost},
    { path: '/remolques', component: Remolques },
    { path: '/remolque-post/:id?', component: RemolquePost},
    { path: '/mercancias', component: Mercancias },
    { path: '/mercancia-post/:id?', component: MercanciaPost},
    { path: '/rutas', component: Rutas}, 
    { path: '/ruta-detalle/:id', component: RutaDetalle},
    { path: '/ruta-post/:id?', component: RutaPost },
    // { path: '*', redirect: '/'},
]