//缓存所有的新闻

const state = {
    newsList: [],
    pageIndex: -1,
    newsCnt : -1,
}

const getters = {
    //在首页展示，不需要内容等等
    newsListGetter: (state) => {
        return state.newsList || [];
    },

    pageIndexGetter: (state) => {
      return state.pageIndex;
    },

    newsCntGetter: (state) => {
        return state.newsCnt;
    }
}

const mutations = {
    setNewsList (state, data){
        state.newsList = [...data];
    },
    setPageIndex (state, pos){
        state.pageIndex = pos;
    },
    setNewsCnt (state, cnt){
        state.newsCnt = cnt;
    }
}

const actions = {
    setNewsList({commit}, data){
        commit('setNewsList',data);
        // 异步执行
        // setTimeout(() => {
        //     commit('setNewsList',data)
        // }, 1000)
    },
    setPageIndex({commit}, pos){
        commit('setPageIndex', pos);
    },

    setNewsCnt({commit}, cnt){
        commit('setNewsCnt', cnt);
    }
}

export default {
    modules: {
        news: {
            namespace: true,
            state,
            getters,
            mutations,
            actions,
        }
    }

}
