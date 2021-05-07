import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import store from '@/store'
import installElementPlus from '@/plugins/element'
import jwtDecode from "jwt-decode";

const app = createApp(App)
installElementPlus(app)
app.use(store).use(Router).use(VueAxios,axios).mount('#app')


axios.interceptors.request.use(  config => {
        if (window.localStorage.getItem('Authorization'))
        {
            var token = localStorage.getItem('Authorization');
            const decode =  jwtDecode(token);

            const dateTime = new Date().getTime();
            const now = Math.floor(dateTime / 1000);
            if(decode.exp <= now){
                window.localStorage.removeItem('Authorization');
            } else {
                config.headers.Authorization = token;
            }
        }
        return config;  },
    error => {    return Promise.reject(error);
    });
