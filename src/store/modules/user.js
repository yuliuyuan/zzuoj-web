/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */


import {USER_ROLE} from "../../pages/oj/util/constants";

const state = {
  profile: {}
}
//profile:username、isLogin、isVerified、isAdmin
const getters = {
  profile: state =>  state.profile ||  {},
  username: state =>  state.profile.username || {},
  isLogin: state => !!state.profile.userId,
  isVerified: state => !!state.profile.emailVerified,
  isAdmin: (state, getters) => {
    if(!getters.isLogin){
      return false;
    }
    var isAdmin = false;
    (state.profile.roles || []).forEach(role => (isAdmin |= USER_ROLE[role].isAdmin));
  }
}

const mutations = {
  setProfile: function (state,profile){
    state.profile = Object.assign({}, profile);
    window.localStorage.setItem("isLogin",!!profile.userId);
  },
  clearProfile: function (state){
    window.localStorage.clear();
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
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
