const mutations= {
    setSearchInteraction(state,string) {
          state.searchInteraction = string
    },
    setUserInfo(state,obj){
        state.userInfo = obj
    },
    setOpenid(state,string){
        state.openId = string
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
	setWXCode(state,string){
        state.sureCodeBase64 = string
	},
	setPhoneNumber(state,string){
        state.phoneNumber = string
	},
	setQusetionArr(state,arr){
		console.log(arr)
        state.qusetionArr = arr
	},
	setLoginCode(state,code){
        state.loginCode = code
	}
    
}
export default mutations