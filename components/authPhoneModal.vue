<template>
	<u-modal v-model="modalShow" :title="title" :show-confirm-button="false" :content="123">
		<view class="content">
			{{content}}
		</view>
		<view class="butotn_box u-flex">
			<view class="left">
				<u-button open-type="getPhoneNumber" type="primary" @getphonenumber="getPhoneNumber" :custom-style="leftCustomStyle">允许</u-button>
			</view>
			<view class="right" @click="cancel">
				拒绝
			</view>
		</view>
	</u-modal>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				modalShow: false,
				title: '授权提醒',
				content: '请绑定手机号，以便为您提供更好的服务',
				leftCustomStyle: {
					borderRadius: 0,
					border: 0,
					background: '#1296db'
				}
			}
		},
		onLoad() {

		},
		computed: {
			...mapState(['openId'])
		},
		watch: {
			openId(a) {
				if (a) {
					this.modalShow = false
					this.$emit('onChange')
				}
			}
		},
		methods: {
			...mapActions(['getUserInfo']),
			show() {
				this.modalShow = true
			},
			cancel() {
				this.modalShow = false
				uni.showToast({
					icon: "none",
					title: '请授权相关功能，否则无法使用',
					duration: 2000,
					position: 'center'
				})

			},
			getPhoneNumber(e) { //授权手机号
				const {
					encryptedData,
					iv,
					errMsg
				} = e.detail
				//是否授权，授权通过进入下单页面，授权拒绝则手机号登录
				let title =''
				switch (errMsg) {
					case 'getPhoneNumber:ok':
						this.getUserInfo({
							isAurth: true,
							encryptedData,
							iv
						})
						return;
					case 'getPhoneNumber:fail user deny':
						title = '您拒绝了授权'
						break;
					case 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试':
						title = '用户未绑定手机，请先在微信客户端进行绑定后重试'
						break;
					default:
						title = '网络繁忙，请稍候再试'
				}
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 3000
				})
				this.modalShow = false
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		text-align: center;
		padding: 30rpx;
		font-size: 30rpx;
		color: gray;
	}

	.butotn_box {
		&>view {
			width: 50%;
			text-align: center;
		}
	}
</style>
