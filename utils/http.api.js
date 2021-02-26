import { hotSearchUrl,getAppidUrl,loginUrl,imgSearchUrl,getQuestionUrl,searchQuestionUrl,getUserUrl,indexUrl,jscode2session ,wxToken,getwxacode } from './http.url'
const install = (Vue, vm) => {
	
	const getAppid = (params = {}) => vm.$u.get(getAppidUrl);
	const login =  (params = {}) => vm.$u.post(loginUrl,params);
	const getOpenId = (params = {}) => vm.$u.get(jscode2session, {
		...params,
		grant_type:'authorization_code',
	});
	
	
	const imgSearch =  (params = {}) => vm.$u.post(imgSearchUrl);
	const getQuestion =  () => vm.$u.get(getQuestionUrl);
	const searchQuestion =  (params = {}) => vm.$u.post(searchQuestionUrl,parames);
	const getUser = (params = {})=> vm.$u.get(getUserUrl,parames);
	
	
	
	
	const getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});
	const getWXToken = (params = {}) => vm.$u.get(wxToken, {
		...params,
		grant_type:'client_credential',
	});
	
	const getGetwxacode = (params = {}) => vm.$u.post(`${getwxacode}?access_token=${params.access_token}`,{path:params.path} );
	const getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	vm.$u.api = {getAppid,login ,imgSearch, getQuestion,searchQuestion, getSearch,getUser, getInfo,getOpenId,getWXToken,getGetwxacode};
}

export default {
	install
}