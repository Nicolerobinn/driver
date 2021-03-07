<template>
	<view class="content">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			<view class='question_content'>题干： <span style=" color:#5192ff"> {{item.questionStem}}</span></view>
			<view  class="radio_box" v-if="item.multipleChoice == 3 ">
				<u-radio-group v-model="item.radio" >
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
					<u-button type="primary" size="mini" v-if="item.arr.length > 1" @click="radioRed(index)">选项-
					</u-button>
				</view>
				<u-gap height="30"></u-gap>
				<view class="radio" v-for="(a ,b) in item.arr" :key="b">
					<u-input v-model="item.arr[b]" class="textarea" placeholder="请输入选项,默认为ABC正序" :border="true" />
				</view>
			</view>
			<u-gap height="30"></u-gap>
			<u-input v-if="item.multipleChoice != 3 " v-model="item.answer" placeholder="请输入正确答案,格式为ABCD" :border="true" />
			<u-gap height="30"></u-gap>
			<u-input v-model="item.analysis" type="textarea" class="textarea" placeholder="解析" :border="true"
				:height="100" />

			<u-gap height="30"></u-gap>
			<u-radio-group v-model="item.multipleChoice" @change="radioGroupChange(index)">
				<u-radio v-for="(obj, i) in radioList" :key="i" :name="obj.value">
					{{obj.name}}
				</u-radio>
			</u-radio-group>

			<u-gap height="30"></u-gap>
			<view class="button_box">
				<u-button type="error" size="mini" @click="deleteQu(item.id)">删除</u-button>
				<u-button type="warning" size="mini" @click="clear(index)">重置</u-button>
				<u-button type="primary" size="mini" @click="add(index)">添加</u-button>
			</view>
		</view>
		<u-loadmore :status="status" @loadmore="getList()" :load-text="loadText" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉或者点击',
					loading: '正在加载，请喝杯茶',
					nomore: '我也是有底线的'
				},
				currPage: 0,
				pageSize: 10,
				list: [],
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
				multipleChoice: '0',
			}
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
		computed: {
			...mapState(['userId'])
		},
		onLoad() {},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			radioRed(i) {
				if (this.list[i].arr.length === 1) {
					return
				}
				this.list[i].arr.shift()

			},
			radioAdd(i) {
				this.list[i].arr.push('')

			},
			clear(i) {
				const art = {
					...this.list[i],
					multipleChoice: 1,
					arr: [''],
					answer: '',
					analysis: '',
				}
				this.$set(this.list, i, art)
			},
			async add(i) {
				const s = this.list[i]
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
							icon: "error",
							title: '多选题答案最少为两个',
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
				}
				const o = {
					options,
					answer,
					questionStem: s.questionStem,
					analysis: s.analysis,
					multipleChoice: s.multipleChoice,
					id: s.id
				}
				const res = await this.$u.api.saveQuestion(o);
				this.currPage = 0
				const obj = {
					userId: this.userId,
					currPage: 0,
					pageSize: this.pageSize
				}
				const respone = await this.$u.api.noAnswerQuestion(obj);
				const {
					data
				} = respone
				const {
					list,
					total
				} = data
				const a = list.map(e => {
					return {
						...e,
						multipleChoice: 1,
						arr: [''],
						answer: '',
						analysis: '',
						radio:''
					}
				})
				this.list = a
			},
			async deleteQu(i) {
				const res = await this.$u.api.deleteNoAnswer(i);
				this.currPage = 0
				const obj = {
					userId: this.userId,
					currPage: 0,
					pageSize: this.pageSize
				}
				const respone = await this.$u.api.noAnswerQuestion(obj);
				const {
					data
				} = respone
				const {
					list,
					total
				} = data
				const a = list.map(e => {
					return {
						...e,
						multipleChoice: 1,
						arr: [''],
						answer: '',
						analysis: '',
					}
				})
				this.list = a
			},
			async getList() {
				if (this.status === 'loading') {
					return
				}
				this.status = 'loading';
				const obj = {
					userId: this.userId,
					currPage: this.currPage,
					pageSize: this.pageSize
				}
				const res = await this.$u.api.noAnswerQuestion(obj);
				const {
					data
				} = res
				const {
					list,
					total
				} = data
				const a = list.map(e => {
					return {
						...e,
						multipleChoice: 1,
						arr: [''],
						answer: '',
						analysis: '',
					}
				})
				this.list = [...this.list, ...a]
				this.currPage++
				if ((total / this.pageSize) - this.currPage > 0) {
					this.status = 'loadmore';
				} else {
					this.status = 'nomore';
				}
			},
			judge(str, options) {
				return options.some((e) => str === e)
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			}
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
