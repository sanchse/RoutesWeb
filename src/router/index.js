import Home from '../components/home.vue';
import Clientes from '../components/clientes.vue';
import Transportistas from '../components/transportistas.vue';
import ClientePost from '../components/cliente-post.vue';

export const routes = [
    { path: '/', component: Home },
    { 
        path: '/clientes', 
        component: Clientes,
        // children: [
        //     { path: '', component: ClienteConfirmationModal },
        //  ],
    }, 
    { path: '/cliente-post/:id?', component: ClientePost},
    { path: '/transportistas', component: Transportistas },
]