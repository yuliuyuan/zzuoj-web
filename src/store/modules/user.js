const state = {
  profile: {}
}
const getters = {
  profileGetter: state =>  {
    return state.profile;
  },
  userIdGetter: state =>  state.profile.userId || {},
  nickNameGetter: state => state.profile.nickName || {},
  roleGetter: state =>  {
    if( state.profile.role & 1) return "root";
    if( state.profile.role & 2) return "admin";
    return "user";
  },
  isLoginGetter: state => !!state.profile.userId,
  isAdminGetter: state => {
    if(!getters.isLoginGetter){
      return false;
    }
    if(!getters.profileGetter){
      return false;
    }
    return  (state.profile.role & 1) || (state.profile.role & 2);
  },
  isRootGetter: state => {
    if(!getters.isLoginGetter){
      return false;
    }
    return  (state.profile.role & 1);
  }
}

const mutations = {
  setProfile: function (state,profile){
    state.profile = profile;
  },
  clearProfile: function (state){
    state.profile = null;
  },
}


const actions = {
  setProfile({ commit }, profile) {
    commit('setProfile', profile);
  },
  clearProfile({ commit }) {
    commit('clearProfile');
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}
