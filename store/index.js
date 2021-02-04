import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		searchInteraction:'',
		userInfo:{},
		token:''
	},
    mutations: {
		setSearchInteraction (state,string) {
		  	state.searchInteraction = string
		},
		setUserInfo(state,obj){
			state.userInfo = obj

		},
		setToken(state,string){
			state.token = string
		}
	},
    actions: {}
})
export default store