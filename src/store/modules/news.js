//缓存所有的新闻

const state = {
    newsList: [],
}

const getters = {
    //在首页展示，不需要内容等等
    getNewList: (state) => {
        return state.newsList || [];
    },
    //获取某个特定的用来展示:文章名称、文章内容，时间
    getNewById: (state) => (id) => {
        var res = state.newsList.filter( function (v){
            return v.newsId.toString() == id
        });
        return res[0]
        //todo: 做个兜底
    }
}

const mutations = {
    setNewsList (state, data){
        state.newsList = [...data];
    }
}

const actions = {
    setNewsList({commit}, data){
        commit('setNewsList',data)
        //异步执行
        // setTimeout(() => {
        //     commit('setNewsList',data)
        // }, 1000)
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
