<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange()" />
		<authPhoneModal ref="authPhoneModal" @onChange="authPhoneModalChange()" />
		<u-popup v-model="show" mode="top">
			<view class="alert-box">
				<u-input v-model="value" :maxlength="100000" type="textarea" auto-height="autoHeight" class="textarea"
					placeholder="搜索题目" :border="true" :height="300" />
				<u-gap height="10" bg-color="#fff"></u-gap>
				<view class="u-flex u-row-between">
					<u-button class="button" size="mini" type="primary" @click="textSearch">搜索</u-button>
					<u-button class="button" size="mini" type="primary" @click="value = ''">重置</u-button>
				</view>
			</view>
		</u-popup>
			<view class="residue" v-if="openId">
				<view>
					<text class="title">您剩余的搜索次数 : </text> &nbsp;
					<text class="number">{{number}}</text>
				</view>
			</view>
		<view class="top">
			<view class="input" @click="inputClick()">
				<u-icon name='search' size="60" class='search'></u-icon>
				<u-input v-model="value" :maxlength="100000" type="textarea" :disabled="true" auto-height="autoHeight"
					@click="inputClick()" />
			</view>
			<u-gap height="10" bg-color="#fff"></u-gap>
			<u-line color="#f5f5f5" />
			<view v-if="openId">
				<view  class="question_button">
					<u-button open-type="contact" size="mini"  type="primary" >点击联系客服</u-button>
					<u-button type="primary" size="mini" @click="addQuestion()"> 扫不出来，点添加题库</u-button>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="blueBox" @click="chooseImage()">
			<u-icon name='camera-fill' size="55" class='camera' color='#ffff'></u-icon>
			拍照或者从图库选择图片搜索
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>
		<view class="scroll-Y">
			<view class="notice" v-if="list.length === 0">
				<text>拍照须知： </text> <br/>
				<text>1.拍的时候，主要对准题目，要拍清楚的，不要拍糊，反光，或在灯光下拍照。</text> <br/>
				<text>2.扫不出来的时候看一下识别出来的字，有没有比原题多出来如:（多选题）或(单选题).或（正确）（错误）等小数点少了，如果有就删掉了或加上小数点，再重新点搜索就可以出来答案。
				</text>
			</view>
			<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
				<view class='question_content'><span class='choose'
						style="margin-right: 4rpx;">{{item.multipleChoice | choiceFilter}}</span>
					<span> {{item.questionStem}}</span>
				</view>
				<view class='radioChoose' v-if="item.multipleChoice !=3">
					<view class="u-flex radio" v-for="(obj, index) in item.optionsArr" :key="index">
						<view>{{obj.name || ''}}、</view>
						<view>{{obj.text || ''}} </view>
					</view>
				</view>
				<u-gap height="20"></u-gap>
				<u-gap height="2" bg-color="#f5f5f5"></u-gap>
				<view class="answer_box">
					<u-gap height="2"></u-gap>
					参考答案
					<u-gap height="2"></u-gap>
					<view class="answer_options">
						<view v-for="(e,i) in item.answerArr" :key="i">
							<template v-if="e.text">
								* {{e.text}}
							</template>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const textArr = [{
		name: '正确',
		text: '正确',
		checked: false
	}, {
		name: '错误',
		text: '错误',
		checked: false
	}]
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	import {
		BASE_URL,
		imgSearchUrl
	} from '../utils/http.url'
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
				number: 0,
				value: '',
				isMember: true,
				list: []
			}
		},
		computed: {
			...mapState(['phoneNumber', 'loginCode', 'userId', 'openId', 'userInfo', 'searchInteraction'])
		},
		components: {
			authPhoneModal,
			authModal
		},
		onShow() {
			if (this.auth()) {
				return
			}
			if (this.searchInteraction) {
				this.searchInteraction === PHOTOGRAPH ? this.getPicture() : this.takePhoto()
				this.setSearchInteraction('')
			}
			this.authPhoneModalChange()
		},

		filters: {
			choiceFilter(number) {
				switch (number) {
					case 1:
						return '单选';
					case 2:
						return '多选';
					case 3:
						return '判断';
				}
			}
		},
		methods: {
			...mapMutations(['setSearchInteraction', 'setLoginCode']),
			async addQuestion() {
				if (!this.value.trim()) {
					return
				}
				const res = await this.$u.api.saveNoAnswerQuestion({
					questionStem: this.value,
					userId: this.userId
				})
				uni.showToast({
					icon: "none",
					title: '添加成功',
					duration: 1000,
					position: 'center'
				})
			},
			auth() {
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
				if (this.auth()) {
					return
				}
				this.show = true
			},
			async authPhoneModalChange() {
				const res = await this.$u.api.getUser(this.openId)
				const {
					data
				} = res
				const {
					count,
					member
				} = data || {}
				this.number = count
				this.isMember = member != 1
			},
			authModalChange() {
				this.$refs.authPhoneModal.show()
			},
			filterChooseImage(obj) {
				if (this.number == 0) {
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
				wx.chooseImage({
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						uni.showLoading({
							title: '加载中'
						});
						wx.uploadFile({
							url: `${BASE_URL}/${imgSearchUrl}`,
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								openid: this.openId
							},
							success: (res) => {
								const str = res.data
								const arr = JSON.parse(str).data
								uni.hideLoading();
								if (Array.isArray(arr)) {
									this.list = this.listFilter(arr)
								} else {
									this.list = []
									this.value = arr
									uni.showToast({
										icon: "none",
										title: '未匹配到数据',
										duration: 1000,
										position: 'center'
									})
								}
								this.authPhoneModalChange()
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									icon: "none",
									title: '搜索失败',
									duration: 1000,
									position: 'center'
								})
							}
						})
					}
				})
			},
			getOpionts(str = '') {
				if (!str) return []
				return str.split(';').map((e = '') => {
					const arr = e.split(':')
					return {
						name: arr[0],
						text: arr[1],
						checked: false
					}
				})
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
				if (this.auth()) {
					return
				}
				this.filterChooseImage({
					sourceType: ['album', 'camera']
				})
			},
			listFilter(arr) {
				return arr.map(e => {
					if (e.multipleChoice == 3) {
						return {
							optionsArr: textArr,
							answerArr: [{
								text: e.answer
							}],
							...e,
						}
					}
					const a = this.getOpionts(e.options)
					const b = e.answer.split(',')
					const c = b.map(d => a.filter(s => s.name == d)[0])
					return {
						optionsArr: a,
						answerArr: c,
						...e,
					}
				})
			},
			async textSearch() {
				this.show = false
				if (this.number == 0) {
					uni.showToast({
						icon: "none",
						title: '搜索次数已经用光',
						duration: 1000,
						position: 'center'
					})
					return
				}
				if (this.value.trim() === '') {
					uni.showToast({
						icon: "none",
						title: '请输入题干内容',
						duration: 1000,
						position: 'center'
					})
					return
				}
				const res = await this.$u.api.searchQuestion({
					questionStem: this.value
				})
				this.authPhoneModalChange()
				const {
					data = []
				} = res || {}
				if (!Array.isArray(data)) {
					return
				}
				this.list = this.listFilter(data)
				this.show = false
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
		.notice {
			background-color: #fff;
			padding: 20rpx;
		}
		.residue{
			padding: 20rpx;
			font-size: 40rpx;
			font-weight: bold;
		}
		.top {
			width: 100%;
			padding: 20rpx;
			box-sizing: border-box;

			.input {
				width: 100%;
				background-color: #f7f7f7;
				border-radius: 20px;
				padding: 20rpx;
				margin-top: 2px;
			}
		}

		.button {
			margin: 0 20rpx;
		}

		.textarea {
			background-color: #f5f5f5;
		}

		.alert-box {
			padding: 20rpx;
		}

		.blueBox {
			margin: 20rpx;
			height: 35px;
			background-color: #2c96fc;
			border-radius: 5px;
			text-align: center;
			display: flex;
			justify-content: space-around;
			color: #fff;
			align-items: center;
		}

		.question_button {
			padding: 10rpx;
			display: flex;
			justify-content: space-between;
		}

		.scroll-Y {
			flex: 1;
			overflow-y: auto;

			.item {
				background-color: #ffff;
				width: 100%;
				padding: 20rpx;

				.button_box {
					padding-top: 20px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.radioChoose {
					margin-top: 10px;
					color: gray;
				}

				.choose {
					padding: 4rpx 8rpx;
					border-radius: 8rpx;
					font-size: 22rpx;
					color: #fff;
					line-height: 28rpx;
					background-color: #5192ff;
				}

				.answer_box {
					font-size: 30rpx;

					.answer_options {
						padding: 30rpx;
						color: #2B85E4;
						background-color: #f5f5f5;
					}
				}

			}
		}
	}
</style>
