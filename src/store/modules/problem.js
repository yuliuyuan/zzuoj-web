const state = {
    problemsList : [],
    problemPageIndex : -1,
    problemsCnt : -1,
}

const getters = {
    problemsListGetter : (state) => {
        return state.problemsList;
    },

    problemPageIndexGetter : (state) => {
        return state.problemPageIndex;
    },

    problemsCntGetter : (state) => {
        return state.problemsCnt;
    }
}

const mutations = {
    setProblemsList(state, data){
        state.problemsList = data;
    },
    setProblemPageIndex(state, index){
        state.problemPageIndex = index;
    },
    setProblemsCnt(state, cnt){
        state.problemsCnt = cnt;
    },
}

const actions = {
    setProblemsList({commit}, data){
        commit('setProblemsList',data);
        // 异步执行
        // setTimeout(() => {
        //     commit('setNewsList',data)
        // }, 1000)
    },
    setProblemPageIndex({commit}, pos){
        commit('setProblemPageIndex', pos);
    },

    setProblemsCnt({commit}, cnt){
        commit('setProblemsCnt', cnt);
    }
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions,
}
