import UserList from "@manage/views/user/UserList";
import GroupList from "@manage/views/user/GroupList";
import GroupAdd from "@manage/views/user/GroupAdd";
import GroupEdit from "@manage/views/user/GroupEdit";
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix+'/user/list',
        name: 'users',
        components:{
            manage: UserList,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/user/group/list',
        name: 'groups',
        components:{
            manage: GroupList,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/user/groupAdd',
        name: 'groupAdd',
        components:{
            manage: GroupAdd,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/user/group/edit/:id',
        name: 'groupEdit',
        components:{
            manage: GroupEdit,
        },
        props: true
    },
]
