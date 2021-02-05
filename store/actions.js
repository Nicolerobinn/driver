
import {  MAP_KEY } from '../utils/constant.js'
import amapFile from '../static/amap-wx.130.js'  // 引入

const actions= {
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
    					console.log('err',err)  
    				}  
    			})
    		}
    	})
	},
}
export default actions