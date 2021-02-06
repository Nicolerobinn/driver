import app from '../main'
import {  MAP_KEY } from '../utils/constant.js'
import amapFile from '../static/amap-wx.130.js'  // 引入

const actions= {
	// 授权后 获取地理位置
    getAccurate({ commit }) {
    	const myAmapFun = new amapFile.AMapWX({ key: MAP_KEY });
    	uni.getLocation({
    	    type: 'wgs84',
    	    success:({latitude,longitude})=> {	     
    			myAmapFun.getRegeo({
    				location:`${longitude},${latitude}`, //经纬度
    				success: (res) => {
						const  {province} =   res[0].regeocodeData.addressComponent 
						// 设置城市 关闭请求模态框
						commit('setLocation', province)
						commit('setLocationModel', false)
    				}, 
    				fail: (err)=>{   
						// 暂未处理失败，后续添加
    					console.log('err',err)  
    				}  
    			})
    		}
    	})
	},
	getUserInfo({commit},){
		uni.getUserInfo({
			success: res => {
				console.log(res)
				commit('setUserInfo',res)
			}
		})
	},
	login({dispatch,commit,state},isAuthor){
		if(isAuthor){
			uni.showToast({
				icon: "loading",
				title: '登陆中',
				position: 'center'
			})
		}
		uni.login({
			provider:'weixin',
			success : async  (res)=>  {
				dispatch('getUserInfo')
				const respones = await app.$u.api.getOpenId({js_code: res.code})
				const {openid,session_key} = respones ||{}
				if(isAuthor){
					uni.showToast({
						icon: "none",
						title: '登陆成功',
						duration: 1000,
						position: 'center'
					})
				}
				console.log('shareCode',state.shareCode)
				// const loginRes = await app.$u.api.login({openid:openid,shareCode:state.shareCode})
				// const { myShareCode } = loginRes 
				const myShareCode = '123'
				const tokenRes = await app.$u.api.getWXToken()
				const { access_token ='' }   = tokenRes 
				const codeRes  = await app.$u.api.getGetwxacode({access_token:access_token,path:`pages/my?shareCode=${myShareCode}`})
				const { buffer,contentType } = codeRes 
				console.log('buffer',buffer)
				commit('setWXBuffer',buffer)
				commit('setToken',openid)
			}
		})
	},
}
export default actions