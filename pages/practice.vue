<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" @change="authPhoneModalChange" />
		<view class="question">
			<view class='question_content'><span class='choose' style="margin-right: 4rpx;">判断题</span> 同方向积分绝地反击非基督教覅记得覅绝地反击地方的积分绝地反击飞机的积分ID就飞机的积分ID积分绝地反击飞机抵积分IDf。</view>
			<view class='radioChoose'>
				<u-radio-group v-model="value" @change="radioGroupChange" wrap='true'>
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="answer_box" v-if="answerShow">
				
			</view>
			<view class="button_box">
				<view class="choose" @click="before()">
					上一题
				</view>
				<view class="choose" @click="confirm()">
					确认选择
				</view>
				<view class="choose" @click="after()">
					下一题
				</view>
			</view>
		</view>
		<view class="blank" >
			
		</view>
		<view class="bottom_box">
			<view class="reset">
				重置
			</view>
			<view class="right_button">
				<view class="button_box">
						<u-icon name="checkmark-circle-fill" color="#2979ff" size="28"></u-icon>
					    0
				</view>
				<view class="button_box">
						<u-icon name="close-circle-fill" color="red" size="28"></u-icon>
					    0
				</view>
				<view class="button_box" @click="popupShow=true">
						<u-icon name="grid" color="gray" size="28"></u-icon>
					    0/20
				</view>
				
			</view>
		</view>
		<u-popup v-model="popupShow" mode="bottom">
			<view class="popup">
				<view class="qid" v-for="(obj,i) in arr" @click="chooseProblem(i)" :key="i">
					{{i+1}}
				</view>
			</view>
		</u-popup>
		<authModal ref="authModal" />
	</view>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	import {authModal} from '../components/authModal'
	import {authPhoneModal} from '../components/authPhoneModal'
	export default {
		data() {
			return {
				title: 'Hello',
				popupShow:false,
				answerShow:false,
				list: [{
						name: '正确',
						disabled: false
					},
					{
						name: '错误',
						disabled: false
					}

				],
				value: '',
				arr:20
			}
		},
        computed: {
            ...mapState([ 'phoneNumber','openId','userInfo' ])
        },
		components:{
			authPhoneModal,
			authModal
		},
		onShow () {
			if(!this.openId){
				uni.getSetting({
					success:(res)=> {  
						// 判断是否获取到用户信息权限
						if(!res.authSetting['scope.userInfo']){
							// 弹出权限弹框
							this.$refs.authModal.show() 
						}else{
							// 获取手机号
							if(!this.userInfo){
								this.$refs.authModal.show() 
							}else{
								this.authModalChange()
							}
						}
					}
				})
				return
			}
			this.questionEqual()
		},
		methods: {
			...mapActions(['getQuestion','questionArr']),
			questionEqual(){
				if(this.questionArr.length === 0){
					this.getQuestion()
				}
			},
			authPhoneModalChange(){
				this.questionEqual()
			},
			authModalChange(){
				this.$refs.authPhoneModal.show()
			},
			goTo(url){
				this.$u.route({
					url: url,
				})
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			confirm(e){
				
			},
			after(){
				
			},
			before(){
				
			},
			chooseProblem(i){
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
		.blank{
			flex:1
		}
		.popup{
			display: flex;
			padding:10rpx;
			flex-wrap: wrap;
			.qid{
				margin: 20rpx;
				width:50rpx;
				height:50rpx;
				border-radius: 50%;
				border: 1px solid black;
				line-height: 50rpx;
				text-align: center;
			}
			
		}
		.question {
			background-color: #ffff;
			width: 100%;
			padding: 10rpx;
			.button_box{
				padding-top: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.bottom_box{
			padding: 30rpx;
			width: 100%;
			height:20rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.reset{
				font-size: 20rpx;
			}
			.right_button{
				display: flex;
				align-items: center;
				.button_box{
					margin-left: 12rpx;
				}
			}
		}
	}
	.radioChoose {
		margin-top: 10px;
	}
	.question_content {
	/* 	display: inline;
		padding: 0 0 0 3px;
		font-family: sans-serif; */
		/* letter-spacing: 1px; */
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
