<template>
	<view class="conetnt u-flex">
		<authModal ref="authModal" @onChange="userInfoSuccess" />
		<view class="canvas_box">
			
		</view>
		<u-button type="primary" size="medium" shape="circle" @click="save">保存海报</u-button>
		
	</view>
</template>

<script>
	import authModal from '../components/authModal'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
        computed: {
            ...mapState([ 'token' ])
        },
		components:{
			authModal
		},
		onShow () {
			if(!this.token){
				uni.getSetting({
					success:(res)=> {   
						if(!res.authSetting['scope.userInfo']){
							this.$refs.authModal.show() 
						}
					}
				})
				return 
			}
		},
		methods:{
			userInfoSuccess(){
				
			},
			save(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.conetnt{
	margin: 0 auto;
	width: 80%;
	justify-content: center;
	.canvas_box{
		margin: 20rpx;
		height:2000rpx;
	}
}
</style>
