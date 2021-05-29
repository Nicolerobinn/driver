<template>
	<view class="content">
		<view class="my_team">
			<view class="item " v-for="(e,i) in arr" :key="i">
				<view class="u-flex">
					<u-avatar :src="e.avatarUrl"></u-avatar>
					<view class="u-flex ">
						<text>昵称:{{e.nickName}}</text>
						<text style="color:red;font-size: 26rpx;">佣金:{{e.commission}}</text>
						<text style="color:gray;font-size: 22rpx;">剩余次数:{{e.count}}</text>
						<text style="color:gray;font-size: 22rpx;">加入时间:{{$u.timeFormat(e.createTime, 'yyyy年mm月dd日') }}</text>
					</view>
				</view>
				<u-line color="gray"></u-line>
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
				arr: []
			};
		},
		methods: {
			async getList() {
				const res = await this.$u.api.getMyTeam({
					openid: this.openId
				});
				const {
					data = []
				} = res ||{}
				this.arr  = data
				console.log(data)
			}
		},
		computed: {
			...mapState(['openId', ]),
		},
		onShow() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.content{
		height: 100%;
		padding: 20rpx;
		display: flex;
		.my_team{
			flex: 1;
			overflow-y: auto;
		.item{
			background-color: #FFF;
			padding: 20rpx;
			padding-bottom: 0;
			&>view>view{
				padding-left: 20rpx;
				align-items: start;
				flex-direction: column;
				text{
					margin-bottom: 10rpx;
				}
			}
		}
			
		}
	}
</style>
