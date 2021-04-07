import LoginView from '@oj/views/user/LoginView.vue'
import RegistryView from '@oj/views/user/RegistryView.vue'

export default [
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

