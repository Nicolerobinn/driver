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
	setShareCode(state,string){
        state.shareCode = string
	},
	setWXBuffer(state,string){
        state.buffer = string
	},
	setPhoneNumber(state,string){
        state.phoneNumber = string
	}
    
}
export default mutations