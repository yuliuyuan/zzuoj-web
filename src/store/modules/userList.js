const state = {
    usersList : [],
    userPageIndex : -1,
    usersCnt : -1,
}

const getters = {
    usersListGetter : (state) => {
        return state.usersList;
    },

    userPageIndexGetter : (state) => {
        return state.userPageIndex;
    },

    usersCntGetter : (state) => {
        return state.usersCnt;
    }
}

const mutations = {
    setUsersList(state, data){
        state.usersList = data;
    },
    setUserPageIndex(state, index){
        state.userPageIndex = index;
    },
    setUsersCnt(state, cnt){
        state.usersCnt = cnt;
    },
}

const actions = {
    setUsersList({commit}, data){
        commit('setUsersList',data);
        // 异步执行
        // setTimeout(() => {
        //     commit('setNewsList',data)
        // }, 1000)
    },
    setUserPageIndex({commit}, pos){
        commit('setUserPageIndex', pos);
    },

    setUsersCnt({commit}, cnt){
        commit('setUsersCnt', cnt);
    }
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions,
}
