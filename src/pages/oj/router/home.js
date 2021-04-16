import HomeView from "@oj/views/home/HomeView.vue";
import ArticleView from "@oj/views/home/ArticleView";

export default [
    {
        path: '/',
        name: 'home-',
        component: HomeView
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/home/article/:id',
        name: 'articleDetail',
        component: ArticleView,
        props: true
    },
    {
        path: '/home/list',
        name: 'homePageList',
        component: HomeView,
    }

]
