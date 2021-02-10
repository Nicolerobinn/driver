<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	export default {
		onLaunch() {
		},
		onLoad(){
			if(!this.token){
				uni.getSetting({
					success:(res)=> {               
						if (res.authSetting['scope.userInfo']) {
							this.login()
						}
					}
				})
			}
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
		methods:{
			...mapActions(['login'])
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/deep/.u-tabbar__content__item__text>text{
		font-size: 20rpx;
	}
	page{
		height: 100%;
		background-color: #e4e3e3;
	}
</style>
