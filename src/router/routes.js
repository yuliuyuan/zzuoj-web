import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/user/LoginView.vue'

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
]

export default routes
