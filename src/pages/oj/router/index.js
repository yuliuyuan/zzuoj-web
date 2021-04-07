//vue3.x router4.x的hash模式和history模式切换参考：https://www.linchaoqun.com/html/cms/content.jsp?menu=vuejs3.0&id=797d3f91-5b54-4959-9389-b31eea73b8a0
import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@oj/router/user.js'
import homeRoutes from '@oj/router/home.js'
import aboutRoutes from '@oj/router/about.js'
import NotFound from '@oj/views/404.vue'
import HomeView from "@oj/views/home/HomeView.vue"

// @/router下的文件和view目录是一一对应的


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // base: '/user/',
  routes: [
      // ...userRoutes, ...homeRoutes, ...aboutRoutes,
      {
          path: '/',
          name: 'home',
          component: HomeView
      },
      //404路由一定要放到最后
      {
        path: "/*",
        name: '404',
        component: NotFound,
      },
    ],
})

export default router
