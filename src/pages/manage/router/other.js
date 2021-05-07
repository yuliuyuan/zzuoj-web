import page404 from '@manage/views/404.vue'
import page401 from '@manage/views/401.vue'
import Global from '@/Global.js'

export default[
    {
        path: Global.admin_base_url_prefix + '/401',
        name: 'AdminNoPermission',
        components: {
            manage: page401
        }
    },
    {
        path:  Global.admin_base_url_prefix + '/:pathMatch(.*)*',
        name: 'AdminNotFound',
        components: {
            manage: page404
        }
    },
]
