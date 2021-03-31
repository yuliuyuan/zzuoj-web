//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes.js'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

export default router