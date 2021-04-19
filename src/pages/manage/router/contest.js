import ContestList from "@manage/views/contest/ContestList.vue";
import ContestAdd from "@manage/views/contest/ContestAdd.vue";
import ContestDetail from "@manage/views/contest/ContestDetail.vue";
import ContestManage from "@manage/views/contest/ContestManage.vue";
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix+'/contest/list',
        name: 'contestList',
        components:{
            manage: ContestList,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/contest/add',
        name:'contestAdd',
        components: {
            manage: ContestAdd,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/contest/manage/:contestId',
        name:'contestManage',
        components: {
            manage: ContestManage,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/contest/view/:contestId',
        name:'contestView',
        components: {
            manage: ContestDetail,
        }
    }
]
