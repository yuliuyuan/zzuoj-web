/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */

import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = `${process.env.VUE_APP_SERVER_URL}`;
axios.defaults.withCredentials = true;


//response.data是被后端封装的一个对象{code:***,msg:***,data:***}
function post(url, data){
    data = data || {};
    // resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
    return new Promise((resolve, reject) => {
        axios.post(url,data)
            .then(response => {
                //服务端common包里定义所有正确的response.data.code都是200
                if(response.data.code === 1) {
                    resolve(response.data.data);
                } else {
                    reject(response.data.msg);
                }
            }), err => {
                reject(err.response.data);
            }
    })
}

// function post(url, data) {
//     data = data || {};
//     return new Promise((resolve, reject) => {
//         axios.post(url, data)
//             .then(response => {
//                 if (response.data.code === 0) {
//                     // everything alright
//                     resolve(response.data.data);
//                 } else {
//                     // Vue.prototype.$Message.error(response.data.message);
//                     // reject(response.data);
//                 }
//                 // store.commit('updateNow', {
//                 //     now: response.data.timestamp
//                 // });
//             }, err => {
//                 Vue.prototype.$Loading.finish();
//                 reject(err.response.data);
//                 // store.commit('updateNow', {
//                 //     now: err.response.data.timestamp
//                 // });
//             })
//     });
// }

//异步
function get(url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
        axios.get(url,{ params })
            .then(response => {
                if(response.data.code === 1 ){
                    resolve(response.data.data);
                } else{
                    reject(response.data.msg);
                }
            }), err => {
                reject(err.response.data.data);
            }
    })
}

// function get(url, params) {
//     params = params || {};
//     return new Promise((resolve, reject) => {
//         axios.get(url, { params })
//             .then(response => {
//                 if (response.data.code === 0) {
//                     resolve(response.data.data);
//                 } else {
//                     // Vue.prototype.$Message.error(response.data.message);
//                     // reject(response.data);
//                 }
//                 store.commit('updateNow', {
//                     now: response.data.timestamp
//                 });
//             }, err => {
//                 Vue.prototype.$Loading.finish();
//                 reject(err.response.data);
//                 store.commit('updateNow', {
//                     now: err.response.data.timestamp
//                 });
//             })
//     })
// }

// 所有的链接下面都要加上下面的url前缀，对应后端几个微服务： https://j538mnfb9c.feishu.cn/docs/doccnMyT9uQgDd12haw3p5QzuYc
const user_url = "zzuoj-user";
const problem_url = "zzuoj-problem";
const experiment_url = "zzuoj-experiment";
const contest_url = "zzuoj-contest";
const file_url = "zzuoj-file";


export default {
    //user相关
    login: function(data) {
        return post(user_url+'/user/login', data);
    },

    registry: function (data) {
        return post(user_url+'/user/registry', data);
    },

    showUser: function (params) {
        return get(user_url + '/admin/user/show',params);
    },

    getProfileByUserId: function (params){
        return get( user_url + '/user/get', params)
    },

    updateProfile: function (data){
        return post(user_url + '/user/update', data)
    },

    getUserCnt: function (){
        return get(user_url + '/admin/user/cnt');
    },

    switchUserDefunctStatus: function (data){
        return post( user_url + '/admin/user/switchDefunct', data)
    },

    updateUserRole: function (params){
        return get(user_url + '/root/auth/updateRole',params)
    },

    // group
    addGroup: function (data){
        return post(user_url + '/admin/group/add', data)
    },
    deleteGroup: function (params){
        return get(user_url + '/admin/group/delete', params)
    },

    showGroups: function (params) {
        return get(user_url + '/admin/group/show',params);
    },
    getGroupCnt: function (){
        return get(user_url + '/admin/group/cnt');
    },

    getGroupById: function (params){
        return get(user_url + '/admin/group/get',params);
    },

    updateGroupById: function (data){
        return post( user_url + '/admin/group/update', data);
    },




    // logout: function() {
    //     return get('/user/logout');
    // },
    // register: function(data) {
    //     return post('/user/register', data);
    // },
    // forgetPassword: function(data) {
    //     return post('/user/forgetPassword', data);
    // },
    // updateProfile: function(data) {
    //     return post('/user/updateProfile', data);
    // },

    //problem 相关
    showProblem: function (params) {
        return get(problem_url + '/problem/show',params);
    },

    getProblemById: function (params) {
        return get( problem_url + '/problem/get', params);
    },

    getProblemCnt: function (){
        return get(problem_url + '/problem/cnt');
    },

    deleteProblemById: function (params) {
        return get( problem_url + '/admin/problem/delete', params);
    },

    addProblem: function (data) {
        return post(problem_url + '/admin/problem/add',data);
    },

    //切换问题是否禁用状态
    switchProblemDefunctStatus: function (data){
        return post( problem_url + '/admin/problem/switchDefunct', data)
    },

    //experiment相关

    //contest相关
    getContestList: function (params) {
        return get(contest_url + '/contest/show', params);
    },

    getContestById: function (params) {
        return get( contest_url + '/contest/get', params)
    },

    getContestCnt: function () {
        return get( contest_url + '/contest/cnt');
    },

    addContest: function (data) {
        return post( contest_url + '/admin/contest/add', data)
    },

    switchContestDefunctStatus: function (data){
        return post( contest_url + '/admin/contest/switchDefunct', data)
    },

    updateContestById: function (data){
        return post(contest_url + '/admin/contest/update', data)
    },

    //file相关
    getNewsList: function (params) {
        return get( file_url + '/news/show', params);
    },

    getNewById: function (params) {
        return get( file_url + '/news/get', params)
    },

    getNewsCnt: function () {
        return get( file_url + '/news/cnt');
    },

    addNews: function (data) {
        return post( file_url + '/admin/news/add', data);
    },

    deleteNews:  function (params) {
        return get( file_url +  '/admin/news/delete', params)
    },

    updateNews: function (data) {
        return post( file_url + '/admin/news/update', data)
    }
}



