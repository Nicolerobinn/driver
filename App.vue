<script>
	import { mapMutations,mapState } from 'vuex'
	export default {
		onLaunch() {
			uni.login({
    			provider:'weixin',
				success: res => {
					this.getUserInfo(res)
				}
			})
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		},
		computed:{
			...mapState(['token'])
		},
		methods: {
            ...mapMutations([
				'setUserInfo',
				'setToken'
			]),
			getUserInfo(obj){
				uni.getUserInfo({
					success: async (res) => {
						const res = await this.$u.api.getSearch({code: obj.code})	
						const {openid,session_key,token} = res.data || {}
						this.setUserInfo(obj)
						this.setToken(token)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
