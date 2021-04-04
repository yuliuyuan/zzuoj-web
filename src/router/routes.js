import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/user/LoginView.vue'
import RegistryView from '@/views/user/RegistryView.vue'

const routes = [
    //home相关
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },

    //user相关
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/registry',
        name: 'registry',
        component: RegistryView,
    },
]

export default routes
