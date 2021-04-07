//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from '@manage/router/home.js'
import NotFound from '@manage/views/404.vue'

// @/router下的文件和view目录是一一对应的
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: 'admin',
  routes: [...homeRoutes,
      //404路由一定要放到最后
    {
      path: '*',
      name: '404',
      component: NotFound
    }],
})

export default router
