import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store'
import httpApi from '@/utils/http.api.js'
import httpInterceptor from '@/utils/http.interceptor.js'

Vue.prototype.$store = store
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

Vue.use(httpApi, app)
Vue.use(httpInterceptor, app)
app.$mount()
