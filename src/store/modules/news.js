//缓存新闻列表

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

    newsPageIndexGetter: (state) => {
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
    setNewsPageIndex (state, pos){
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
    setNewsPageIndex({commit}, pos){
        commit('setNewsPageIndex', pos);
    },

    setNewsCnt({commit}, cnt){
        commit('setNewsCnt', cnt);
    }
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions,

}
