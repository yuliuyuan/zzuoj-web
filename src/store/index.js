import { createStore } from 'vuex'


import news from "@/store/modules/news.js"
import user from "@/store/modules/user.js"
import problem from '@/store/modules/problem.js'
import userList from "@/store/modules/userList.js"

export default createStore({
  modules: {
    user,
    news,
    problem,
    userList,
  }
})
