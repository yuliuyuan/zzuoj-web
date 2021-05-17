//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@manage/router/home.js'
import problemRoutes from '@manage/router/problem.js'
import contest from '@manage/router/contest.js'
import news from '@manage/router/news.js'
import other from '@manage/router/other.js'
import user from'@manage/router/user.js'

// @/router下的文件和view目录是一一对应的
export default [
    // other放到最后，因为有401，404
    ...homeRoutes, ...problemRoutes, ...contest, ...news, ...user,
    ...other,
]

