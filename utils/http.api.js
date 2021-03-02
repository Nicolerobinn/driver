import {
	hotSearchUrl,
	getQRcodeUrl,
	loginUrl,
	imgSearchUrl,
	getQuestionUrl,
	searchQuestionUrl,
	getUserUrl,
	withdrawUrl,
	getMemberPriceUrl,
	getSetMealUrl,
	prePayUrl,
	saveAnswerRecordUrl,
	jscode2session,
	answerRecordUrl,
	getwxacode
} from './http.url'
const install = (Vue, vm) => {

	const login = (params = {}) => vm.$u.post(loginUrl, params);
	const getQRcode = (params) => vm.$u.get(`${getQRcodeUrl}/${params}`);

	const imgSearch = (params = {}) => vm.$u.post(imgSearchUrl);
	const getQuestion = () => vm.$u.get(getQuestionUrl);
	const searchQuestion = (params = {}) => vm.$u.post(searchQuestionUrl, params);
	const saveAnswerRecord = (params = {}) => vm.$u.post(saveAnswerRecordUrl, params);
	const getUser = (params) => vm.$u.get(`${getUserUrl}/${params}`);
	const answerRecord = (params) => vm.$u.get(`${answerRecordUrl}/${params.userId}/${params.currPage}/${params.pageSize}`);

	const withdraw = (params = {}) => vm.$u.post(withdrawUrl, params);
	const getMemberPrice = (params = {}) => vm.$u.get(getMemberPriceUrl, params);
	const getSetMeal = (params = {}) => vm.$u.get(getSetMealUrl, params);
	const prePay = (params = {}) => vm.$u.post(prePayUrl, params);

	const getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});

	const getGetwxacode = (params = {}) => vm.$u.post(`${getwxacode}?access_token=${params.access_token}`, {
		path: params.path
	});
	vm.$u.api = {
		login,
		getQRcode,
		imgSearch,
		getQuestion,
		searchQuestion,
		saveAnswerRecord,
		answerRecord,
		
		withdraw,
		getMemberPrice,
		getSetMeal,
		prePay,
		
		getSearch,
		getUser,
		getGetwxacode
	};
}

export default {
	install
}
