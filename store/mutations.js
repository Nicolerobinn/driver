const mutations= {
    setSearchInteraction(state,string) {
          state.searchInteraction = string
    },
    setUserInfo(state,obj){
        state.userInfo = obj
    },
	setUserId(state,number){
        state.userId = number
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
        wx.setStorage({key:'phoneNumber',data:string})
        state.phoneNumber = string
	},
	setQusetionArr(state,arr){
        state.questionArr = arr
	},
	setLoginCode(state,code){
        state.loginCode = code
	}
    
}
export default mutations