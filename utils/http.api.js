import {hotSearchUrl,indexUrl} from './http.url'
import {MAP_KEY} from './constant.js'
const install = (Vue, vm) => {
	const getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
		id: 2
	});
	const getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	vm.$u.api = {getSearch, getInfo};
}

export default {
	install
}