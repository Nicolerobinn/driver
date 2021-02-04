import {BASE_URL} from './http.url'
// common/http.interceptor.js

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: BASE_URL,
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
		// ......
    });
 	// 请求拦截部分，如配置，每次请求前都会执行
     Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		config.header.token = vm.$store.state.token;
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/user/login') config.header.noToken = true; //例子
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求 //例子
    }
    	// 响应拦截，如配置，每次请求结束都会执行本方法
	// Vue.prototype.$u.http.interceptor.response = (res) => {
	// 	return res.result;
	// }
}

export default {
	install
}