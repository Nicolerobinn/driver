<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" />
		<u-navbar class="self-nav" :is-back="false" title-color="black" title="首页">
			<view class="top_view">
				<u-icon name="map-fill" color="#1296db"></u-icon> <text class="location">{{location}}</text>
			</view>
		</u-navbar>
		<view class="wecat_title">
			{{ location }}学法减分
		</view>
		<u-swiper height="300" :list="list"></u-swiper>
		<u-gap height="30"></u-gap>
		<view style="background-color: #fff;">
			<u-grid :col="3" :border="false">
				<u-grid-item @click="$u.route({
							url: 'pagesA/tutorial',
						})">
					<u-icon name="question-circle-fill" color="#5aa2e0" :size="100"></u-icon>
					<view class="grid-text">使用教程</view>
				</u-grid-item>
				<u-grid-item >
					<u-icon @click="tabGoTo(PHOTOGRAPH)" name="camera-fill" color="#5aa2e0" :size="150"></u-icon>
					<view class="grid-text">拍照答题</view>
				</u-grid-item>
				<u-grid-item @click="goTo('pagesA/promotion')">
					<u-icon name="plus-people-fill" color="#5aa2e0" :size="100"></u-icon>
					<view class="grid-text">我要推广</view>
				</u-grid-item>
			</u-grid>
			
		</view>
		<u-gap height="30"></u-gap>
		<u-button open-type="contact" type="primary">点击联系客服</u-button>
		<u-gap height="30"></u-gap>
		<image style="width: 100%;" src="https://changpingwanglou.cn/file/guanggao/1.jpg" mode=""></image>
	</view>
</template>

<script>
	import {
		PHOTOGRAPH,
		PICTURE
	} from '../utils/constant.js'
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	import {
		authModal
	} from '../components/authModal.vue'
	import {
		authPhoneModal
	} from '../components/authPhoneModal.vue'
	export default {
		data() {
			return {
				PHOTOGRAPH: PHOTOGRAPH,
				PICTURE: PICTURE,
				list: [],
			}
		},
		onShareAppMessage(options){
     　// 设置菜单中的转发按钮触发转发事件时的转发内容
			　　var shareObj = {
			　　　　title: "学法减分邀请您来~",        // 默认是小程序的名称(可以写slogan等)
			　　　　path: '/pages/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
			　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			　　　　success: (res)=>{
			　　　　　　// 转发成功之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
			　　　　　　}
			　　　　},
			　　　　fail: ()=>{
			　　　　　　// 转发失败之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
			　　　　　　　　// 用户取消转发
			　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
			　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
			　　　　　　}
			　　　　},
			　　　　complete: ()=>{
			　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
			　　　　}
			　　};
			　　// 返回shareObj
			　　return shareObj;
		},
		onLoad() {
			this.getImg()
			if (!this.openId) {
				uni.login({
					provider: 'weixin',
					success: async ({
						code
					}) => {
						this.setLoginCode(code)
					}
				})
			}
			this.getLocation()
		},
		computed: {
			...mapState(['phoneNumber', 'location', 'openId', 'userInfo'])
		},
		components: {
			authPhoneModal,
			authModal
		},
		methods: {
			...mapMutations(['setSearchInteraction', 'setLoginCode']),
			...mapActions(['getAccurate']),
			getImg() {
				this.$u.api.getImgCount().then(res => {
					const {
						data
					} = res
					let arr = []
					for (let index = 1; index <= data; index++) {
						arr.push(`https://changpingwanglou.cn/file/lbt/${index}.jpg`)
					}
					this.list = arr
				})
			},
			localtionModal() {
				uni.showModal({
					title: '授权提醒',
					content: '请允许小程序获取您的定位，点击确定获取授权',
					confirmText: '允许',
					showCancel: false,
					success: () => {
						this.confirm()
					}
				})
			},
			getLocation() {
				uni.getSetting({
					success: (res) => {
						if (!res.authSetting['scope.userLocation']) {
							// 未授权
							uni.authorize({
								scope: 'scope.userLocation',
								success: () => { //1.1 允许授权
									this.getAccurate()
								},
								fail: () => { //1.2 拒绝授权
									this.localtionModal()
								}
							})
						} else {
							this.getAccurate()
						}
					}
				})
			},
			confirm() {
				uni.openSetting({
					success: (res) => {
						const boole = res.authSetting['scope.userLocation']
						if (boole) {
							this.getAccurate()
						} else {
							this.localtionModal()
						}
					}
				});
			},
			authModalChange() {
				this.$refs.authPhoneModal.show()
			},
			auth(){
								this.$refs.authModal.show() 
			},
			goTo(url) {
				if (this.openId) {
					this.$u.route({
						url: url,
					})
				} else {
					this.auth()
				}
			},
			tabGoTo(string) {
				if (this.openId) {
					uni.switchTab({
						url: '/pages/search'
					});
					this.setSearchInteraction(string)
				} else {
					this.auth()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wecat_title {
		background-color: #1296db;
		color: #fff;
		padding: 20rpx;
		font-size: 40rpx;
		text-align: center;
	}

	.top_view {
		padding-left: 12rpx;

		.iconfont {
			color: #1296db;
		}
	}

	.location {
		font-size: 24rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.interaction {
		height: 200rpx;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		display: flex;
		background-color: #1296db;

		&>view {
			height: 130rpx;
			width: 130rpx;
			background-color: #fff;
			position: relative;

			.box {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				text {
					font-size: 20rpx;
					color: #1296db;
				}
			}
		}
	}

	.grid-text {
		font-size: 30rpx;
	}
</style>
