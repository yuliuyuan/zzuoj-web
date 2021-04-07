//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@manage/router/home.js'

// @/router下的文件和view目录是一一对应的

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/manage/',
  routes: [
      ...homeRoutes,
    ],
})

export default router
