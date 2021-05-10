import UserList from "@manage/views/user/UserList";
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix+'/user/list',
        name: 'users',
        components:{
            manage: UserList,
        }
    },
]
