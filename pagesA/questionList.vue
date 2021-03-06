<template>
	<view class="content">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			<view class='question_content'><span class='choose' style="margin-right: 4rpx;">{{item.multipleChoice | choiceFilter}}</span>
				<span style=" color:#5192ff"> {{item.questionStem}}</span></view>
			<view class='radioChoose'>
				<view class="u-flex radio"  v-for="(item, index) in item.optionsArr" :key="index">
					<view>{{item.name || ''}} </view>
					<view>{{item.text || ''}} </view>
				</view>
			</view>
			<u-button type="primary" @click="deleteQuestion(item)" >删除</u-button>
			<view class="answer_box" >
				答案:{{item.answer}}
			</view>
			<view class="answer_box" >
				解析:{{item.analysis}}
			</view>
		</view>
		<u-loadmore :status="status"  @loadmore="getList()" :load-text="loadText" />
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
				currPage:0,
				pageSize:10,
				list:[]
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
		onLoad() {
		},
		onShow(){
			this.getList()
		},
		onReachBottom(){
			this.getList()
		},
		methods: {
			async	deleteQuestion(item){
				const res = await this.$u.api.deleteNoAnswer(item.id);
				this.currPage = 0
				this.getList()
			},
			async	getList(){
				if(	this.status === 'loading'){
					return
				}
				this.status = 'loading';
				const obj = {
					userId:this.userId,
					currPage:this.currPage,
					pageSize:this.pageSize
				}
				const res = await this.$u.api.noAnswerQuestion(obj);
				const {data	} = res
				const {list,total} = data
				const arr = list.map(e => {
					return {
						optionsArr: this.getOpionts(e.options),
						answerArr: e.answer.split(','),
						...e,
					}
				})
				this.list = [...this.list,...arr]
				this.currPage++
				if((total/this.pageSize) - this.currPage>0){
					this.status = 'loadmore';
				}else{
					this.status = 'nomore';
				}
			},
			judge(str, options) {
				return options.some((e) => str === e)
			},
			getOpionts(str = '') {
				if (!str) return []
				return str.split(';').map((e = '') => {
					const arr = e.split(':')
					return {
						name: arr[0],
						text: arr[1]
					}
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
