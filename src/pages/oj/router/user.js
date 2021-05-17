import LoginView from '@oj/views/user/LoginView.vue'
import RegistryView from '@oj/views/user/RegistryView.vue'
import ProfileView from '@oj/views/user/ProfileView.vue'

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
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfileView,
        props: true
    },
]

