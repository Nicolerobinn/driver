const mutations= {
    setSearchInteraction(state,string) {
          state.searchInteraction = string
    },
    setUserInfo(state,obj){
        state.userInfo = obj
    },
    setToken(state,string){
        state.token = string
    },
    setLocation(state,string){
        state.location = string
    },
	setLocationModel(state,boolea){
        state.locationModel = boolea
    },
    
}
export default mutations