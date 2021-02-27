import app from '../main'
import {
	MAP_KEY
} from '../utils/constant.js'
import amapFile from '../static/amap-wx.130.js' // 引入
import {
	getwxacode
} from '../utils/http.url.js'
const actions = {
	// 授权后 获取地理位置
	getAccurate({
		commit
	}) {
		const myAmapFun = new amapFile.AMapWX({
			key: MAP_KEY
		});
		uni.getLocation({
			type: 'wgs84',
			success: ({
				latitude,
				longitude
			}) => {
				myAmapFun.getRegeo({
					location: `${longitude},${latitude}`, //经纬度
					success: (res) => {
						const {
							province
						} = res[0].regeocodeData.addressComponent
						// 设置城市 关闭请求模态框
						commit('setLocation', province)
						commit('setLocationModel', false)
					},
					fail: (err) => {
						// 暂未处理失败，后续添加
						console.log('err', err)
					}
				})
			}
		})
	},
	async getQuestion({
		commit
	}, ) {
		const res = await app.$u.api.getQuestion()
		const {
			data
		} = res
		commit('setQusetionArr', data)
	},
	async login({
		dispatch,
		commit,
		state
	}, {
		isAuthor,
		encryptedData,
		iv
	}) {
		if (!state.loginCode) {
			uni.showToast({
				icon: "none",
				title: '网络错误,请重新进入小程序',
				position: 'center'
			})
			return
		}
		if (isAuthor) {
			uni.showToast({
				icon: "loading",
				title: '登陆中',
				position: 'center'
			})
		}
		let userInfo = {
			...state.userInfo,
		}
		if (state.shareCode) {
			userInfo.referrerId = state.shareCode
		}
		const loginRes = await app.$u.api.login({
			code: state.loginCode,
			userInfo: userInfo,
			iv,
			encryptedData,
		})
		const {
			userId,
			openId,
		} = loginRes.data || {}
		commit('setUserInfo', loginRes.data)
		commit('setOpenid', openId)
		const codeRes = await app.$u.api.getQRcode(userId)
		commit('setWXCode', codeRes)
		if (isAuthor) {
			uni.showToast({
				icon: "none",
				title: '登陆成功',
				duration: 1000,
				position: 'center'
			})
		}
	},
}
export default actions
