import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// main.js
import uView from "uview-ui";
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
