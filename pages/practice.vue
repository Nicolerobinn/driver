<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" @onChange="authPhoneModalChange" />
		<view v-if="openId" class="question">
			<view class='question_content'><span class='choose' style="margin-right: 4rpx;">{{questionObj.multipleChoice | choiceFilter}}</span>
				<span style=" color:#5192ff"> {{questionObj.questionStem}}</span></view>
			<view class='radioChoose'>
				<label class="u-flex radio" @click="checkboxGroupChange(index)" v-for="(item, index) in optionsArr" :key="index">
					<view>
						<radio  :disabled="questionObj.isComplete"  :checked="item.checked" />
					</view>
					<view>{{item.text || ''}} </view>
					<view class="icon">
						<u-icon v-if="questionObj.isComplete && judge(item.name,questionObj.answerArr)" name="checkmark" color="blue"
						 size="28"></u-icon>
						<u-icon v-else-if="questionObj.isComplete" name="close" color="red" size="28"></u-icon>
					</view> 
				</label>
			</view>
			<view class="answer_box" v-if="questionObj.wrong">
				答案:{{questionObj.answer}}
			</view>
			<view class="button_box">
				<u-button v-if="index!==0" type="primary" size="mini"  @click="before()" >上一题</u-button>
				<u-button v-if="questionObj.multipleChoice==2 && !questionObj.isComplete" @click="confirm()" type="primary" size="mini"   >确认选择</u-button>
				<u-button v-if="index!==questionArr.length-1" type="primary" size="mini"  @click="after()" >下一题</u-button>
			</view>
		</view>
		<view class="blank">

		</view>
		<view class="bottom_box" v-if="openId">
			<!-- <view class="reset" @click="getQuestion()">
				重置
			</view> -->
			<view class="right_button">
				<view class="button_box">
					<u-icon name="checkmark-circle-fill" color="#2979ff" size="28"></u-icon>
					{{correctCount}}
				</view>
				<view class="button_box">
					<u-icon name="close-circle-fill" color="red" size="28"></u-icon>
					{{errorCount}}
				</view>
				<view class="button_box" @click="popupShow=true">
					<u-icon name="grid" color="gray" size="28"></u-icon>
					{{index+1}}/{{questionArr.length}}
				</view>

			</view>
		</view>
		<u-popup v-model="popupShow" mode="bottom">
			<view class="popup">
				<view class="qid" v-for="(obj,i) in questionArr" :class="{ correct: obj.correct,wrong:obj.error }" @click="chooseProblem(i)"
				 :key="i">
					{{i+1}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	const textArr =  [ {
				name: '正确',
				text: '正确',
				checked: false
			},{
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
		authModal
	} from '../components/authModal'
	import {
		authPhoneModal
	} from '../components/authPhoneModal'
	export default {
		data() {
			return {
				title: 'Hello',
				popupShow: false,
				answerShow: false,
				questionObj: {
					questionStem: '',
					analysis: '',
					answer: '',
					multipleChoice: '',
					options: '',
					optionsArr: [],
					answerArr: []
				},
				optionsArr: [],
				index: 0,
				correctCount:0,
				errorCount:0,
				count:0
			}
		},
		computed: {
			...mapState(['loginCode', 'questionArr', 'phoneNumber', 'openId','userId'])
		},
		components: {
			authPhoneModal,
			authModal
		},
		onShareAppMessage(options){
     　// 设置菜单中的转发按钮触发转发事件时的转发内容
			　　var shareObj = {
			　　　　title: "学法减分邀请您来~",        // 默认是小程序的名称(可以写slogan等)
			　　　　path: '/pages/practice',        // 默认是当前页面，必须是以‘/’开头的完整路径
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
		onShow() {
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
				return
			}
			this.authPhoneModalChange()
		},
		methods: {
			...mapMutations(['setLoginCode', 'setQusetionArr']),
			judge(str, options) {
				return options.some((e) => str === e)
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
			getSetting() {
				this.$refs.authModal.show()
			},
			async getQuestion() {
				const res = await this.$u.api.getQuestion();
				const {
					data
				} = res
				const arr = data.map(e => {
					if(e.multipleChoice == 3){
						return {
							optionsArr:textArr,
							answerArr:[e.answer],
							...e,
							}
					}
					return {
						optionsArr: this.getOpionts(e.options),
						answerArr: e.answer.split(','),
						...e,
					}
				})
				this.optionsArr = arr[0].optionsArr
				this.questionObj = arr[0]
				this.setQusetionArr(arr)
				this.index= 0
				this.correctCount=0
				this.errorCount=0
				this.count=0
				
			},
			authPhoneModalChange() {
				if (this.questionArr.length === 0) {
					this.getQuestion()
				}
			},
			authModalChange() {
				this.$refs.authPhoneModal.show()
			},
			goTo(url) {
				this.$u.route({
					url: url,
				})
			},
			// 选中任一radio时，由radio-group触发
			checkboxGroupChange(e) {
				this.optionsArr[e].checked = !this.optionsArr[e].checked
				if (this.questionObj.multipleChoice == 2) {
					return
				}
				this.save()
				if (this.optionsArr[e].name === this.questionObj.answer) {
					this.questionObj.correct = true
					this.correctCount +=1
				} else {
					this.questionObj.error = true
					this.errorCount +=1
				}
					this.count +=1
				this.questionObj.isComplete = true
			},
			confirm(e) {
				const arr = this.optionsArr.filter(e=>e.checked)
				let n = 0
				for(let i = 0;i<arr.length;i++){
					if(arr[i]){
						n++
					}
				}
				if(n<=1){
					uni.showToast({
						icon: "none",
						title: '至少选择两个选项',
						position: 'center'
					})
					return
				}
				this.save()
				const boole = 	arr.every(e=>this.questionObj.answerArr.some(a=>a === e.name))
				if(boole){
					this.questionObj.correct = true
					this.correctCount +=1
				} else {
					this.questionObj.error = true
					this.errorCount +=1
				}
				this.$set(this.questionObj, 'isComplete', true)
			},
			save(){
				this.$u.api.saveAnswerRecord({
					questionId:this.questionObj.id,
					userId:this.userId
				});	
			},
			after() {
				this.questionObj.optionsArr = this.optionsArr
				const obj = this.questionArr[this.index + 1]
				this.optionsArr = obj.optionsArr
				this.questionObj = obj
				this.index += 1
			},
			before() {
				this.questionObj.optionsArr = this.optionsArr
				const obj = this.questionArr[this.index - 1]
				this.optionsArr = obj.optionsArr
				this.questionObj = obj
				this.index -= 1
			},
			chooseProblem(i) {
				this.questionObj.optionsArr = this.optionsArr
				this.index = i
				const obj = this.questionArr[this.index]
				this.optionsArr = obj.optionsArr
				this.questionObj = obj
				this.popupShow = false
			}

		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;

		.blank {
			flex: 1
		}

		.answer_box {
			background-color: '#f5f5f5';
			padding: 20rpx;
			font-weight: 700;
		}

		.popup {
			display: flex;
			padding: 10rpx;
			flex-wrap: wrap;

			.qid {
				margin: 20rpx;
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				border: 1px solid black;
				line-height: 50rpx;
				text-align: center;
			}

			.correct {
				color: blue;
				background-color: #a5cdf5;
				border: none !important;
			}

			.wrong {
				color: red;
				background-color: #f1c0c0;
				border: none !important;
			}
		}

		.question {
			background-color: #ffff;
			width: 100%;
			padding: 10rpx;

			.button_box {
				padding-top: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.bottom_box {
			padding: 30rpx;
			width: 100%;
			height: 20rpx;
			background: #fff;
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;

			.reset {
				font-size: 26rpx;
			}

			.right_button {
				display: flex;
				align-items: center;
				
				.button_box {
					margin-left: 12rpx;
				}
			}
		}
	}

	.radioChoose {
		margin-top: 10px;
		.radio{
			margin: 10rpx;
			.icon{
				padding: 0 30rpx;
			}
		}
	}

	.choose {
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #fff;
		line-height: 28rpx;
		background-color: #5192ff;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
