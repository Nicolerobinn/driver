import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		searchInteraction:''
	},
    mutations: {
		setSearchInteraction (state,string) {
		  state.searchInteraction = string
		}
	},
    actions: {}
})
export default store