<script>
	import {MAP_KEY} from './utils/constant.js'
	import { mapMutations,mapState,mapActions } from 'vuex'
	
	export default {
		onLaunch() {
			this.getLocation()
			uni.login({
    			provider:'weixin',
				success: res => {
					console.log(res)
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
				'setToken',
				'setLocation',
				'setLocationModel'
			]),
			...mapActions(['getAccurate']),
			getLocation(){
				uni.getSetting({
					  success:(res)=> {                    
						  if (!res.authSetting['scope.userLocation']) {
							  // 未授权
							  uni.authorize({
								  scope: 'scope.userLocation',
								  success:()=> { //1.1 允许授权
									   this.getAccurate()
								  },
								  fail:()=>{    //1.2 拒绝授权
								      this.setLocationModel(true)
								  }
							  })
						  }else{
							  this.getAccurate()
						  }
					  }
				})
			},
			getUserInfo(obj){
				uni.getUserInfo({
					success: async (res) => {
						console.log(res)
						// const res = await this.$u.api.getSearch({code: obj.code})	
						// const {openid,session_key,token} = res.data || {}
						// this.setUserInfo(obj)
						// this.setToken(token)
					},
					
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/deep/.u-tabbar__content__item__text>text{
		font-size: 20rpx;
	}

</style>
