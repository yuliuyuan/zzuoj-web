import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import store from '@/store'
import installElementPlus from '@/plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(Router).use(VueAxios,axios).mount('#app')
