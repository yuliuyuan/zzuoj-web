import ProblemList from "@manage/views/problem/ProblemList";
import ProblemAdd from "@manage/views/problem/ProblemAdd";
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix+'/problem/list',
        name: 'problem',
        components:{
            manage: ProblemList,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/problem/add',
        name:'problemAdd',
        components: {
            manage: ProblemAdd,
        }
    }
]
