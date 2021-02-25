import app from '../main'
import {
	MAP_KEY
} from '../utils/constant.js'
import amapFile from '../static/amap-wx.130.js' // 引入
import {
	getwxacode
} from '../utils/http.url.js'
import {
	decrypt,
	encrypt
} from '../utils'
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
	getUserInfo({
		dispatch,
		commit,
		state
	}, {
		code,
		appid,
		secret,
		isAuthor
	}) {
		uni.getUserInfo({
			success: async (res) => {
				commit('setUserInfo', res.userInfo)
			}
		})
	},
	async getQuestion({
		commit
	}, ) {
		const res = await app.$u.api.getQuestion()
		const { data }  =res
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
		if(!state.loginCode){
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
		const appidRes = await app.$u.api.getAppid()
		const {
			appid = '', secret = ''
		} = decrypt(appidRes) || {}
		const respones = await app.$u.api.getOpenId({
			js_code: state.loginCode,
			appid: appid,
			secret: secret
		})
		const {
			openid,
			session_key
		} = respones || {}
		const userInfoObj = { ...state.userInfo,
			sessionKey: session_key,
			iv,
			encryptedData,
			openid: openid,
			referrerId: state.shareCode
		}
		console.log(userInfoObj)
		const user_aes = encrypt(JSON.stringify(userInfoObj))
		const loginRes = await app.$u.api.login({
			user: user_aes
		})
		const {
			userId
		} = loginRes
		if (isAuthor) {
			uni.showToast({
				icon: "none",
				title: '登陆成功',
				duration: 1000,
				position: 'center'
			})
		}
		const tokenRes = await app.$u.api.getWXToken({
			appid,
			secret
		})
		const {
			access_token = ''
		} = tokenRes
		wx.request({
			url: `${getwxacode}?access_token=${access_token}`,
			method: 'POST',
			responseType: "arraybuffer",
			data: JSON.stringify({
				path: `pages/my?shareCode=${userId}`,
				is_hyaline: false
			}),
			success(res) {
				commit('setWXBuffer', res.data)
				console.log(openid)
				commit('setOpenid', openid)
			},
			fill() {
				commit('setOpenid', openid)
			}
		})
		
	},
}
export default actions
