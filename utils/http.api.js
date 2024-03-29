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
	getImgCountUrl,
	getMyTeamUrl,
	
	noAnswerQuestionUrl,
	deleteNoAnswerUrl,
	saveQuestionUrl,
	saveNoAnswerQuestionUrl,
	
	getwxacode
} from './http.url'
const install = (Vue, vm) => {

	const login = (params = {}) => vm.$u.post(loginUrl, params);
	const getQRcode = (params) => vm.$u.get(`${getQRcodeUrl}/${params}`);
	const getMyTeam = (params) => vm.$u.get(`${getMyTeamUrl}`,params);

	const imgSearch = (params = {}) => vm.$u.post(imgSearchUrl);
	const getQuestion = () => vm.$u.get(getQuestionUrl);
	const getImgCount = () => vm.$u.get(getImgCountUrl);
	const searchQuestion = (params = {}) => vm.$u.post(searchQuestionUrl, params);
	const saveAnswerRecord = (params = {}) => vm.$u.post(saveAnswerRecordUrl, params);
	const getUser = (params) => vm.$u.get(`${getUserUrl}/${params}`);
	const answerRecord = (params) => vm.$u.get(`${answerRecordUrl}/${params.userId}/${params.currPage}/${params.pageSize}`);
	const noAnswerQuestion = (params) => vm.$u.get(`${noAnswerQuestionUrl}/${params.userId}/${params.currPage}/${params.pageSize}`);
	const deleteNoAnswer = (id) => vm.$u.delete(`${deleteNoAnswerUrl}/${id}`);
	const saveNoAnswerQuestion = (params) => vm.$u.post(saveNoAnswerQuestionUrl, params);
	const saveQuestion = (params) => vm.$u.post(`${saveQuestionUrl}/${params.id}`, params);
	
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
		getImgCount,
		saveAnswerRecord,
		answerRecord,
		noAnswerQuestion,
		deleteNoAnswer,
		saveNoAnswerQuestion,
		saveQuestion,
		getMyTeam,
		
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
