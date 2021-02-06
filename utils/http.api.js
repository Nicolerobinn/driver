import { hotSearchUrl,indexUrl,jscode2session ,wxToken,getwxacode ,loginUrl,auth} from './http.url'
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
	const getWXToken = (params = {}) => vm.$u.get(wxToken, {
		grant_type:'client_credential',
		appid:APPID,
		secret:SECRET,
	});
	const getAuth = (params = {}) => vm.$u.get(auth,params);
	
	const getGetwxacode = (params = {}) => vm.$u.post(`${getwxacode}?access_token=${params.access_token}`,{path:params.path} );
	const login = (params = {}) => vm.$u.get(login, params);
	const getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	vm.$u.api = {getSearch, getInfo,getOpenId,getWXToken,getGetwxacode,login,getAuth};
}

export default {
	install
}