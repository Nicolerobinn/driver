<template>
	<view class="conetnt u-flex">
		<authModal ref="authModal" @onChange="userInfoSuccess" />
		<view ref="modelasd" class="canvas_box  u-flex" >
			
			<image v-show="path"  show-menu-by-longpress="1"  :src="path"></image>
			<l-painter
				custom-style="position: fixed; z-index:-1;left:1000000px"
				isRenderImage
				:board="base"
				@success="pathSuccess"
				@fail="fail"
			></l-painter>
		</view>
		<u-button type="primary" size="medium" shape="circle" @click="auth">保存海报</u-button>
		
	</view>
</template>

<script>
	
	const scope = 'scope.writePhotosAlbum';
	import lPainter from '@/components/painter'
	import authModal from '@/components/authModal'
	import { mapState,mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				path:'',
				base: {
					width: '550rpx',
					height: '1000rpx',
					views: [
						{
							type: 'image',
							src: '../static/img/terre.jpg',
							css: {
								left: '0rpx',
								top: '0rpx',
								width: '550rpx',
								height: '1000rpx',
							}
						},
					]
				}
			};
		},
        computed: {
            ...mapState([ 'token' ,'buffer']),
			...mapGetters(['sureCode']),
        },
		watch:{
			sureCode:{
				handler(base64){
						if(base64){
							setTimeout(()=>this.onRender(base64))
						}
				},
				immediate:true
			}
		},
		components:{
			authModal,
			lPainter
		},
		onShow () {
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
			fail(err){
				console.log('fail',fail)
			},
			pathSuccess(url){
				this.path = url
				console.log(url)
			},
		    onRender(url) {
				this.base.views.push(
					{
						type: 'image',
						src:url,
						css: {
							background:'transparent',
							left: '175rpx',
							top: '700rpx',
							width: '200rpx',
							height: '200rpx'
						}
				})
			},
			userInfoSuccess(){
			},
			saveModal(){
				uni.showModal({
					title: '授权提醒',
					content: '请允许小程序获取您的相册权限，点击确定获取授权',
					confirmText:'允许',
					cancelText:'拒绝',
					success:({confirm})=>{
						 if (confirm) {
							this.confirm()
						} 
					}
				})
			},
			confirm(){
				uni.openSetting({
					success:(res)=> {
						const boole = res.authSetting['scope.writePhotosAlbum']
						if(boole){
							uni.showToast({
								icon: "none",
								title: '设置成功',
								position: 'center'
							})
						}
					}
				});
			},
			auth(){
				uni.getSetting({
					success:(res)=> {
						if (res.scope) {
							this.saveImage()
							return
						}
						uni.authorize({
							scope: scope,
							success:()=> {
								this.saveImage()
							},
							fail:(res)=>{
								// TODO 此处应该引导用户打开相册
								this.saveModal()
							}
						})
					}
				})
			},
			//  保存到手机
			saveImage(ip) {
				uni.saveImageToPhotosAlbum({
					filePath: this.path,
					success: function(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					},
					fail: function() {
						uni.showToast({
							title: "保存失败，请稍后重试",
							icon: "none"
						});
					}
				});
			},  
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
		height: 1000rpx;
		width: 550rpx;
		image{
			height: 1000rpx;
			width: 550rpx;
		}
	}
}
</style>
