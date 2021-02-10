import app from '../main'
import {  MAP_KEY } from '../utils/constant.js'
import amapFile from '../static/amap-wx.130.js'  // 引入
import {getwxacode}from '../utils/http.url.js'
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
				commit('setUserInfo',res.userInfo)
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
				// const loginRes = await app.$u.api.login({openid:openid,shareCode:state.shareCode})
				// const { myShareCode } = loginRes 
				const myShareCode = '123'
				const tokenRes = await app.$u.api.getWXToken()
				const { access_token ='' }   = tokenRes 
				wx.request({
					url: `${getwxacode}?access_token=${access_token}`,
					method: 'POST',
					responseType: "arraybuffer",
					data: JSON.stringify({path:`pages/my?shareCode=${myShareCode}`,is_hyaline:false}),
					success(res) {
						commit('setWXBuffer',res.data)
						commit('setToken',openid)
					},
					fill(){
						commit('setToken',openid)
					}
				})
			}
		})
	},
}
export default actions