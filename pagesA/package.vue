<template>
	<view class="content">
		
		<view class="box" v-for="(item ,i) in arr" :key="i"  >
			<text>套餐{{item.id}}</text>
			<text>次数:{{item.count}}</text>
			<text>会员价格:{{item.memberPrice}}</text>
			<text>普通价格:{{item.totalFee}}</text>
			<u-button type="primary" size="mini" shape="circle" @click="get(item)">点击购买</u-button>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex'
	export default {
		data() {
			return {
				arr :[]
			}
		},
        computed: {
            ...mapState(['loginCode'])
        },
		async   onShow() {
				const res =	await this.$u.api.getSetMeal()
				const { data,msg } = res
				this.arr = data
				console.log(data)
		},
		methods: {
			async   get(item){
				const res =	await this.$u.api.prePay({code:this.loginCode,setMealId:item.id})
				uni.showToast({
					icon: "none",
					title: res.msg,
					position: 'center'
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.box{
		padding:10rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
		text{
			font-size: 24rpx;
		}
	}
</style>
