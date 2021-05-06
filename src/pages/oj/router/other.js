import page404 from '@oj/views/404.vue'
import page401 from '@oj/views/401.vue'

export default[
    {
        path: '/401',
        name: 'UserNoPermission',
        component: page401
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'UserNotFound',
        component: page404
    },
]
