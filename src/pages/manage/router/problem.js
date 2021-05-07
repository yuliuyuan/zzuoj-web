import ProblemList from "@manage/views/problem/ProblemList";
import ProblemAdd from "@manage/views/problem/ProblemAdd";
import ProblemEdit from "@manage/views/problem/ProblemEdit";
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix+'/problem/show',
        name: 'problems',
        components:{
            manage: ProblemList,
        }
    },
    {
        path: Global.admin_base_url_prefix+'/problem/show/:id',
        name: 'problem',
        components: {
            manage: ProblemEdit
        },
        props: true
    },
    {
        path: Global.admin_base_url_prefix+'/problem/add',
        name:'problemAdd',
        components: {
            manage: ProblemAdd,
        }
    },

]
