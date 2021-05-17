//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@oj/router/user.js'
import homeRoutes from '@oj/router/home.js'
import aboutRoutes from '@oj/router/about.js'
import problemRoutes from '@oj/router/problem.js'
import contestRoutes from '@oj/router/contest.js'
import other from '@oj/router/other.js'


export default [
    // other放到最后，因为有404、401
    ...userRoutes, ...homeRoutes, ...aboutRoutes, ...problemRoutes, ...contestRoutes,
    ...other

]
