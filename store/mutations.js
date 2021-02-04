const mutations= {
    setSearchInteraction (state,string) {
          state.searchInteraction = string
    },
    setUserInfo(state,obj){
        state.userInfo = obj
    },
    setToken(state,string){
        state.token = string
    }
    
}
export default mutations