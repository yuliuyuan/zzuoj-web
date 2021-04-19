import newsList from '@manage/views/news/NewsList.vue'
import news from '@manage/views/news/News.vue'
import Global from '@/Global.js'

export default [
    {
        path: Global.admin_base_url_prefix + '/news/show',
        name: 'newsList',
        components: {
            manage: newsList
        }
    },
    {
        path: Global.admin_base_url_prefix + '/news/show/:id',
        name: 'news',
        components: {
            manage: news
        },
        props: true
    }
]
