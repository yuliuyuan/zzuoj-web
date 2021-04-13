import HomeView from '@manage/views/home/HomeView.vue'
import Global from '@/Global.vue'

export default [
    {
        path: Global.admin_base_url_prefix,
        name: 'admin-',
        component:{
            manage: HomeView
        }
    },
    {
        path: Global.admin_base_url_prefix+'/home',
        name: 'admin-home',
        component: {
            manage: HomeView
        }
    },
]
