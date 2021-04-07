import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'

import App from '@manage/App.vue'
import Router from '@manage/router'

import store from '@/store'
import installElementPlus from '@/plugins/element'


//.mount是绑定到zzuoj-web/public下面的两个html界面上
const app = createApp(App)
installElementPlus(app)
app.use(store).use(Router).use(VueAxios,axios).mount('#manage')
