import { createStore } from 'vuex'

import news from "@/store/modules/news.js"
import user from "@/store/modules/user.js"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    'user':user,
    'news':news
  }
})
