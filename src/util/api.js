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

function post(url, data){
    data = data || {};
    // resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
    return new Promise((resolve, reject) => {
        axios.post(url,data)
            .then(response => {
                //服务端common包里定义所有正确的response.data.code都是200
                if(response.data.code === 200) {
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
                //todo：需要更新一些Session时间
            }), err => {
                reject(err.response.data);
                //todo: 也需要更新一下session时间
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


function get(url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
        console.log("begin:");
        axios.get(url,{ params })
            .then(response => {
                if(response.data.code === 200 ){
                    resolve(response.data.data);
                } else{
                    reject(response.data);
                }
                //todo: 更新一下session时间
            }), err => {
                reject(err.response.data);
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
        return post('/user/login', data);
    },
    logout: function() {
        return get('/user/logout');
    },
    register: function(data) {
        return post('/user/register', data);
    },
    forgetPassword: function(data) {
        return post('/user/forgetPassword', data);
    },
    updateProfile: function(data) {
        return post('/user/updateProfile', data);
    },

    //problem 相关


    //experiment相关

    //contest相关

    //file相关
    getNews: function () {
        return get(file_url+'/news/show');
    },
}



