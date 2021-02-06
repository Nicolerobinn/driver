<template>
	<view class="conetnt u-flex">
		<authModal ref="authModal" @onChange="userInfoSuccess" />
		<view class="canvas_box  u-flex" ref="sure">
			<image :src="sureCode" mode=""></image>
		</view>
		<u-button type="primary" size="medium" shape="circle" @click="save">保存海报</u-button>
		
	</view>
</template>

<script>
	import authModal from '../components/authModal'
	import { mapState,mapGetters,mapActions } from 'vuex'
	import html2canvas from 'html2canvas'
	export default {
		data() {
			return {
				
			};
		},
        computed: {
            ...mapState([ 'token' ,'buffer']),
			...mapGetters(['sureCode'])
        },
		components:{
			authModal
		},
		onShow () {
			console.log(this.token,this.buffer,this.sureCode)
			if(!this.token){
				uni.getSetting({
					success:(res)=> {   
						if(!res.authSetting['scope.userInfo']){
							this.$refs.authModal.show() 
						}else{
							this.login()
						}
					}
				})
				return 
			}
		},
		methods:{
			...mapActions(['login']),
			userInfoSuccess(){
				// html2canvas(this.$refs.sure, {
				// 	width: '100%',
				// 	useCORS: true, // 允许图片跨域
				// 	height: '100%'
				// }).then((canvas) => {
				// 	let url = canvas.toDataURL('image/png');
				// })
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
	flex-wrap: wrap;
	.canvas_box{
		justify-content: center;
		flex-wrap: wrap;
		margin: 20rpx;
		height:1000rpx;
		width: 100%;
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}
}
</style>
