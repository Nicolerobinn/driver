<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange()" />
		<authPhoneModal ref="authPhoneModal" @onChange="authPhoneModalChange()" />
		<u-popup v-model="show" mode="top">
			<view class="alert-box">
				<u-input v-model="value" type="textarea" class="textarea" placeholder="搜索题目" :border="true" :height="100"  />
				<u-gap height="10" bg-color="#fff"></u-gap>
				<view class="u-flex u-row-center">
					<u-button class="button" size="mini"  type="primary" @click="textSearch">搜索</u-button>
					<u-button class="button" size="mini"  type="primary" @click="value = ''">重置</u-button>
				</view>
			</view>
		</u-popup>
		<view class="top">
			<u-row>
				<u-col span="2">
					<view class="blueBox" @click="chooseImage()">
						<u-icon name='camera-fill' size="55" class='camera' color='#ffff'></u-icon>
					</view>
				</u-col>
				<u-col span="10">
					<view class="input" @click="inputClick()">
						<u-icon name='search' size="40" class='search'></u-icon>
						<u-input v-model="value" :disabled="true"  @click="inputClick()" />
					</view>
				</u-col>
			</u-row>
			<u-gap height="10" bg-color="#fff"></u-gap>
			<u-line color="#f5f5f5" />
			<view style="padding: 10rpx;">
				<text class="title">剩余次数 </text> &nbsp;
				<text class="number">{{number}}</text>
			</view>
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view  class="scroll-Y">
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	import {
		PHOTOGRAPH,
		PICTURE
	} from '../utils/constant.js'
	import {
		authModal
	} from '../components/authModal'
	import {
		authPhoneModal
	} from '../components/authPhoneModal'
	export default {
		data() {
			return {
				show: false,
				number: '',
				value:''
			}
		},
		computed: {
			...mapState(['phoneNumber', 'loginCode', 'openId', 'userInfo', 'searchInteraction'])
		},
		components: {
			authPhoneModal,
			authModal
		},
		onShow() {
			if(this.auth()){
				return
			}
			if (this.searchInteraction) {
				this.searchInteraction === PHOTOGRAPH ? this.getPicture() : this.takePhoto()
				this.setSearchInteraction('')
			}
			this.authPhoneModalChange()
		},
		methods: {
			...mapMutations(['setSearchInteraction', 'setLoginCode']),
			auth(){
				if (!this.openId) {
					if (this.loginCode) {
						this.getSetting()
					} else {
						uni.login({
							provider: 'weixin',
							success: async ({
								code
							}) => {
								this.setLoginCode(code)
								this.getSetting()
							}
						})
					}
					return true
				}
			},
			getSetting() {
				uni.getSetting({
					success: (res) => {
						// 判断是否获取到用户信息权限
						if (!res.authSetting['scope.userInfo']) {
							// 弹出权限弹框
							this.$refs.authModal.show()
						} else {
							// 获取手机号
							if (!this.userInfo) {
								this.$refs.authModal.show()
							} else {
								this.authModalChange()
							}
						}
					}
				})
			},
			inputClick() {
				if(this.auth()){
					return
				}
				this.show = true
			},
			async authPhoneModalChange() {
				const res = await this.$u.api.getUser(this.openId)
				const {
					data
				} = res
				this.number = data
			},
			authModalChange() {
				this.$refs.authPhoneModal.show()
			},
			filterChooseImage(obj) {
				const {
					count = 6, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'], callback
				} = obj
				uni.chooseImage({
					count: count, //默认9
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: (res) => {
						callback(JSON.stringify(res.tempFilePaths))
					},
					fail: (err) => {
						console.log(err)
					}

				});
			},
			getPicture() {
				const picture = (string) => {
					this.search(string)
				}
				this.filterChooseImage({
					sourceType: ['album'],
					callback: picture
				})
			},
			takePhoto() {
				const picture = (string) => {
					this.search(string)
				}
				this.filterChooseImage({
					sourceType: ['camera'],
					callback: picture
				})
			},
			chooseImage() {
				if(this.auth()){
					return
				}
				const picture = (string) => {
					this.search(string)
				}
				this.filterChooseImage({
					sourceType: ['album', 'camera'],
					callback: picture
				})
			},
			textSearch(){
				
			},
			async search(str) {
				console.log(str)
				const res = await this.$u.api.imgSearch({
					file: str
				})
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.top {
			width: 100%;
			padding-top: 10px;
			flex: 0;
		}
		.button{
			margin: 0 20rpx;
		}
		.textarea{
			background-color: #f5f5f5;
		}
		.alert-box{
			padding: 20rpx;
			
		}
		.blueBox {
			height: 35px;
			background-color: #2c96fc;
			width: 35px;
			border-radius: 5px;
			text-align: center;
			align-items: center;
			display: table;

			.camera {
				display: table-cell;
				vertical-align: middle;
			}
		}

		.scroll-Y {
			flex: 1;
			overflow-y: auto;
		}

		.input {
			width: 108%;
			;
			height: 35px;
			background-color: #f7f7f7;
			margin-left: -20px;
			border-radius: 20px;
			padding: 0 5px;
			margin-top: 2px;
			// vertical-align: middle;
			// align-items: center;
			display: table;

			.search {
				display: table-cell;
				vertical-align: middle;
			}

			.searchPractice {
				color: #dcdcdc;
				font-size: 15px;
				display: table-cell;
				vertical-align: middle;
				text-align: left;
			}
		}
	}
</style>
