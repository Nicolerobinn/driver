<template>
	<view class="conetnt u-flex">
		<view ref="modelasd" class="canvas_box  u-flex">
			<image :show-menu-by-longpress="true" :src="path"></image>
			<l-painter isRenderImage :board="board" custom-style="position: fixed; z-index:-1;left:1000000px" @success="pathSuccess" @fail="fail"></l-painter>
		</view>
		<u-button type="primary" size="medium" shape="circle" @click="auth">保存海报</u-button>

	</view>
</template>

<script>
	const scope = 'scope.writePhotosAlbum';
	import lPainter from './components/lime-painter'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				path: '',
				board: {
					width: '550rpx',
					height: '1000rpx',
					views: [{
						type: 'image',
						src:'https://changpingwanglou.cn/file/guanggao/3.jpg',
						css: {
							left: '0rpx',
							top: '0rpx',
							width: '550rpx',
							height: '1000rpx',
						}
					}]
				}
			};
		},
		computed: {
			...mapState(['openId', 'buffer', 'userInfo']),
			...mapGetters(['sureCode']),
		},
		components: {
			lPainter
		},
		mounted() {
			setTimeout(() => {
				this.onRender(this.sureCode), 1000
			})
		},
		onShow() {},
		methods: {
			fail(err) {
			},
			pathSuccess(url) {
				this.path = url
			},
			onRender(url) {
				this.board.views.push({
						type: 'image',
						url: url,
						css: {
							background: 'transparent',
							left: '175rpx',
							top: '700rpx',
							width: '200rpx',
							height: '200rpx'
						}
					}
				)
			},
			saveModal() {
				uni.showModal({
					title: '授权提醒',
					content: '请允许小程序获取您的相册权限，点击确定获取授权',
					confirmText: '允许',
					cancelText: '拒绝',
					success: ({
						confirm
					}) => {
						if (confirm) {
							this.confirm()
						}
					}
				})
			},
			confirm() {
				uni.openSetting({
					success: (res) => {
						const boole = res.authSetting['scope.writePhotosAlbum']
						if (boole) {
							uni.showToast({
								icon: "none",
								title: '设置成功',
								position: 'center'
							})
						}
					}
				});
			},
			auth() {
				uni.getSetting({
					success: (res) => {
						if (res.scope) {
							this.saveImage()
							return
						}
						uni.authorize({
							scope: scope,
							success: () => {
								this.saveImage()
							},
							fail: (res) => {
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
	.conetnt {
		margin: 0 auto;
		width: 80%;
		justify-content: center;
		flex-wrap: wrap;

		.canvas_box {
			justify-content: center;
			flex-wrap: wrap;
			margin: 20rpx;
			height: 1000rpx;
			width: 550rpx;

			image {
				height: 1000rpx;
				width: 550rpx;
			}
		}
	}
</style>
