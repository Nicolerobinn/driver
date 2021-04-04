<template>
	<view class="content">
		<view class="item u-border-bottom" >
			<u-gap height="30"></u-gap>
			<u-input v-model="obj.questionStem" class="textarea" placeholder="请输入题干" :border="true" />
			<view  class="radio_box" v-if="obj.multipleChoice == 3 ">
				<u-radio-group v-model="obj.radio" >
					<u-radio  name="正确">
						正确
					</u-radio>
					<u-radio  name="错误">
						错误
					</u-radio>
				</u-radio-group>
			</view>
			<view class="radio_box" v-else>
				<view class="button_box">
					<u-button type="primary" size="mini" @click="radioAdd(index)">选项+</u-button>
					<u-button type="primary" size="mini" v-if="obj.arr.length > 1" @click="radioRed(index)">选项-
					</u-button>
				</view>
				<u-gap height="30"></u-gap>
				<view class="radio" v-for="(a ,b) in obj.arr" :key="b">
					<u-input v-model="obj.arr[b]" class="textarea" placeholder="请输入选项,默认为ABC正序" :border="true" />
					<u-gap height="10"></u-gap>
				</view>
			</view>
			<u-gap height="30"></u-gap>
			答案:
			<u-input v-if="obj.multipleChoice != 3 " v-model="obj.answer" placeholder="请输入正确答案,格式为ABCD" :border="true" />
			<u-gap height="30"></u-gap>
			解析:
			<u-input v-model="obj.analysis" type="textarea" class="textarea" placeholder="解析" :border="true"
				:height="100" />

			<u-gap height="30"></u-gap>
			<u-radio-group v-model="obj.multipleChoice" >
				<u-radio v-for="(obj, i) in radioList" :key="i" :name="obj.value">
					{{obj.name}}
				</u-radio>
			</u-radio-group>

			<u-gap height="30"></u-gap>
			<view class="button_box">
				<u-button type="warning" size="mini" @click="clear()">重置</u-button>
				<u-button type="primary" size="mini" @click="add()">添加</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				obj: {
						multipleChoice: 1,
						arr: ['','','',''],
						answer: '',
						analysis: '',
						questionStem:'',
						radio:'正确'
				},
				radioList: [{
						value: '1',
						name: '单选'
					},
					{
						value: '2',
						name: '多选'
					},
					{
						value: '3',
						name: '判断'
					}
				],
			}
		},
		computed: {
			...mapState(['userId'])
		},
		methods: {
			radioRed(i) {
				if (this.obj.arr.length === 1) {
					return
				}
				this.obj.arr.shift()

			},
			radioAdd(i) {
				this.obj.arr.push('')
			},
			clear(i) {
				this.obj =  {
					multipleChoice: 1,
					arr: ['','','',''],
					answer: '',
					analysis: '',
					id:0
				}
			},
			async add(i) {
				const s = this.obj
				if(s.questionStem === ''){
					uni.showToast({
						icon: "none",
						title: '题干',
						position: 'center'
					})
					return
				}
				if (s.multipleChoice != 3) {
					const a = s.arr.some(e => e === '')
					if (a) {
						uni.showToast({
							icon: "none",
							title: '选项不得为空',
							position: 'center'
						})
						return
					}
					if (s.answer.length === 0) {
						uni.showToast({
							icon: "error",
							title: '答案不得为空',
							position: 'center'
						})
						return
					}
				}
				if (s.multipleChoice == 2) {
					if (s.answer.length < 2) {
						uni.showToast({
							icon: "none",
							title: '答案最少为两个',
							position: 'center'
						})
						return
					}
				}
				let  answer = ''
				let options = ''
				if(s.multipleChoice == 3){
					answer = s.radio
				}else{
					answer = s.answer.split('').join(',')
					s.arr.map((e, i) => {
						options += `${String.fromCharCode(64 + parseInt(i+1))}:${e};`
					})
					options = options.substr(0, options.length - 1);  
				}
				const o = {
					options,
					answer,
					questionStem: s.questionStem,
					analysis: s.analysis,
					multipleChoice: s.multipleChoice,
					id: 0
				}
				const res = await this.$u.api.saveQuestion(o);
						uni.showToast({
							icon: "success",
							title: '添加成功',
							position: 'center'
						})
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.item {
		background-color: #ffff;
		width: 100%;
		padding: 10rpx;

		.button_box {
			padding-top: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.radioChoose {
			margin-top: 10px;
		}

		.choose {
			padding: 4rpx 8rpx;
			border-radius: 8rpx;
			font-size: 22rpx;
			color: #fff;
			line-height: 28rpx;
			background-color: #5192ff;
		}

	}
</style>
