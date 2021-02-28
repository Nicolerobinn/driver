<template>
	<view class="content">
		<view class="box">
			<text>佣金</text>
			<view class="">
				{{money}}
			</view>
		</view>
		<view class="withdrawal">
			<view class="title">
				提现
			</view>
			<u-input border-color="" v-model="value" type="number" :border="true" :height="30"  />
		</view>
		<u-button shape="square" @click="withdraw" size	="medium" type="primary">立即提现</u-button>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				money:0.00,
				value:0
			}
		},
		onshow() {

		},
        computed: {
            ...mapState(['openId'])
        },
		methods: {
			async	withdraw(){
				if(!(/(^[1-9]\d*$)/.test(this.value))){
					uni.showToast({
						icon: "none",
						title: '请输入有效数字',
						position: 'center'
					})
				    return
				}
				if(this.number ==0 ){
					uni.showToast({
						icon: "none",
						title: '当前可提现余额为0',
						position: 'center'
					})
					return
				}
				if(this.value > this.number){
					uni.showToast({
						icon: "none",
						title: '输入金额超过可提余额',
						position: 'center'
					})
					return
				}			
				const res =	await this.$u.api.withdraw({openid:this.openId,count:this.value})
				const { data,msg } = res
				uni.showToast({
					icon: "none",
					title: msg,
					position: 'center'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.box{
		width: 100%;
		background-color: #2B85E4;
		height: 400rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text{
			color: #fff;
			margin: 20rpx;
			font-size: 24rpx;
		}
		view{
			color: #fff;
			font-size: 100rpx;
		}
	}
	.withdrawal{
		width: 100%;
		display: flex;
		margin: 20rpx;
		align-items: center;
	}
</style>
