<template>
	<view class="content">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			<view class='question_content'>题干：	<span style=" color:#5192ff"> {{item.questionStem}}</span></view>
			<view class="radio_box" v-if="item.multipleChoice !=2 ">
				<view class="button_box">
					<u-button  type="primary" size="mini"  @click="radioAdd(index)" >选项+</u-button>
					<u-button  type="primary" size="mini"  @click="radioRed(index)" >选项-</u-button>
				</view>
			<u-gap height="30" ></u-gap>
				<view class="radio" v-for="(a ,b) in item.arr" :key="b">
					<u-input v-model="item.arr[b]"  class="textarea" placeholder="请输入答案,默认为ABC正序" :border="true" />
				</view>
			</view>
			<u-gap height="30" ></u-gap>
			<u-input v-model="analysis" type="textarea" class="textarea" placeholder="解析" :border="true" :height="100" />
			
			<u-gap height="30" ></u-gap>
			<u-radio-group v-model="item.multipleChoice" @change="radioGroupChange(index)">
				<u-radio  v-for="(obj, i) in radioList" :key="i" :name="obj.value">
					{{obj.name}}
				</u-radio>
			</u-radio-group>
			
			<u-gap height="30" ></u-gap>
			<view class="button_box">
				<u-button  type="error" size="mini"  @click="add(index)" >删除</u-button>
				<u-button  type="warning" size="mini"  @click="clear(index)" >重置</u-button>
				<u-button  type="primary" size="mini"  @click="deleteQu(index)" >添加</u-button>
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
				list:[],
				radioList: [{
						value: '0',
						name:'单选'
					},
					{
						value: '1',
						name:'多选'
					},
					{
						value: '2',
						name:'判断'
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
		onLoad() {
		},
		onShow(){
			this.getList()
		},
		onReachBottom(){
			this.getList()
		},
		methods: {
			radioRed(){
				
			},
			radioAdd(){
				
			},
			clear(){
				
			},
			async	add(item){
				const res = await this.$u.api.deleteNoAnswer(item.id);
				this.currPage = 0
				const obj = {
					userId:this.userId,
					currPage:0,
					pageSize:this.pageSize
				}
				const respone = await this.$u.api.noAnswerQuestion(obj);
				const {data	} = respone
				const {list,total} = data
				const a = list.map(e=>{
					return {
						...e,
						multipleChoice:1,
						arr:['']
					}
				})
				this.list = a
			},
			async	deleteQu(item){
				const res = await this.$u.api.deleteNoAnswer(item.id);
				this.currPage = 0
				const obj = {
					userId:this.userId,
					currPage:0,
					pageSize:this.pageSize
				}
				const respone = await this.$u.api.noAnswerQuestion(obj);
				const {data	} = respone
				const {list,total} = data
				const a = list.map(e=>{
					return {
						...e,
						multipleChoice:1,
						arr:['']
					}
				})
				this.list = a
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
				const a = list.map(e=>{
					return {
						...e,
						multipleChoice:1,
						arr:['']
					}
				})
				this.list = [...this.list,...a]
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
