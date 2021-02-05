import {hotSearchUrl,indexUrl,jscode2session} from './http.url'
import {APPID,SECRET} from './constant.js'
const install = (Vue, vm) => {
	const getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});
	const getOpenId = (params = {}) => vm.$u.get(jscode2session, {
		...params,
		grant_type:'authorization_code',
		appid:APPID,
		secret:SECRET
	});
	const getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	vm.$u.api = {getSearch, getInfo,getOpenId};
}

export default {
	install
}