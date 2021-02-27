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
		<view class="question" v-if="Object.keys(questionObj).length>0">
			<view class='question_content'><span class='choose' style="margin-right: 4rpx;">{{questionObj.multipleChoice}}</span> <span style="color:#5192ff">{{questionObj.questionStem}}</span></view>
			<view class='radioChoose'>
				<view v-for="(text,i) in questionObj.options" :key="i" class="number">{{text}}</view>
			</view>
			<view>答案 : {{questionObj.answer}}</view>
			<view v-if="questionObj.analysis">解析 : {{questionObj.analysis}}</view>
		</view>

		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	import {BASE_URL,imgSearchUrl} from '../utils/http.url'
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
				value:'',
				questionObj:{}
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
							this.authModalChange()
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
				if(this.number == 0){
					uni.showToast({
						icon: "none",
						title: '搜索次数已经用光',
						duration: 1000,
						position: 'center'
					})
					return
				}
				const {
					count = 6, sizeType = ['original'], sourceType = ['album', 'camera'], callback
				} = obj
				uni.chooseImage({
					count: count, //默认9
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						wx.uploadFile({
							url:`${BASE_URL}/${imgSearchUrl}`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								openid: this.openId
							},
							success (res){
								const data = res?.data || {}
								console.log(321,data)
								console.log(123,JSON.stringify(data))
							}
						})
					},
					fail: (err) => {
					}

				});
			},
			getPicture() {
				this.filterChooseImage({
					sourceType: ['album'],
				})
			},
			takePhoto() {
				this.filterChooseImage({
					sourceType: ['camera'],
				})
			},
			chooseImage() {
				if(this.auth()){
					return
				}
				this.filterChooseImage({
					sourceType: ['album', 'camera']
				})
			},
			async	textSearch(){
				if(this.number == 0){
					uni.showToast({
						icon: "none",
						title: '搜索次数已经用光',
						duration: 1000,
						position: 'center'
					})
					return
				}
				if(this.value.trim() ===''){
					uni.showToast({
						icon: "none",
						title: '请输入题干内容',
						duration: 1000,
						position: 'center'
					})
					return
				}
				const res = await this.$u.api.searchQuestion({questionStem:this.value})
				const { data = {} } = res ||{}
				switch (data.multipleChoice) {
					case 0:
						data.multipleChoice = '单选'
						break;
					case 1:
						data.multipleChoice = '多选'
						
						break;
					case 3:
						data.multipleChoice = '判断'
						
						break;		
				}
				data.options    =	data.options.split(';')
				this.questionObj = data
				this.show = false
			},
		}
	}
</script>

<style lang="scss" scoped>
		.question {
			background-color: #ffff;
			width: 100%;
			padding: 20rpx;
			.choose {
				padding: 4rpx 8rpx;
				border-radius: 8rpx;
				font-size: 22rpx;
				color: #fff;
				line-height: 28rpx;
				background-color: #5192ff;
			}
			.radioChoose{
				color:gray;
				margin: 10rpx;
			}
		}
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
