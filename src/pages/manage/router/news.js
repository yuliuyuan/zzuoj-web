import newsList from '@manage/views/news/NewsList.vue'
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix + '/news/list',
        name: 'problemList',
        components: {
            manage: newsList
        }
    },
]
