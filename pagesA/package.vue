<template>
	<view class="content">
		
		<view class="box" v-for="(item ,i) in arr" :key="i"  >
			<text>套餐{{item.id}}</text>
			<text>次数:{{item.count}}</text>
			<text>代理价格:{{item.memberPrice}}</text>
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
            ...mapState(['openId'])
        },
		async   onShow() {
				const res =	await this.$u.api.getSetMeal()
				const { data,msg } = res
				this.arr = data
		},
		methods: {
			async   get(item){
				const s = wx.getSystemInfoSync()
				if( s.platform ==='ios'){
					uni.showToast({
						icon:'none',
						title: 'ios用户不可用，如需购买请联系管理员'
					});
					return
				}
				
				const res =	await this.$u.api.prePay({openid:this.openId,setMealId:item.id})
				const { nonceStr,out_trade_no,package:a,paySign,timestamp } = res.data  || {}
			      uni.requestPayment({
					timeStamp:timestamp,
					 nonceStr: nonceStr,
					 package: a,
					 signType: 'RSA',
					 paySign: paySign,
					   success: (res)=> {
						uni.showToast({
						 title: '支付成功',
						 icon: 'none',
						 duration: 2000
						});
					   },
						fail: function (err) {
						  if(JSON.stringify(err.errMsg) == 'requestPayment:fail:[payment微信:-1]General errors'){
						   uni.showToast({
							 icon:'none',
							   title: '签名错误、未注册APPID、APPID不正确、注册的APPID与设置的不匹配'
						   });
						  }
						  if(JSON.stringify(err.errMsg) == 'requestPayment:fail:[payment微信:-2]General errors'){
						   uni.showToast({
							 icon:'none',
							   title: '用户取消'
						   });
						  }
						}
			      });
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
