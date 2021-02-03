<template>
	<view class="content">
		       <!-- 自定义顶部导航 -->
		        <u-navbar class="self-nav" :is-back="false" title-color="black"  title="首页">
		            <view class="top_view"><u-icon name="map-fill"  color="#1296db"></u-icon>   <text class="location" >上海市</text></view> 
		        </u-navbar>
				<view class="interaction">
					<view @click="goTo(PHOTOGRAPH)" class="left_photograph">
						<view class="box">
								<u-icon name="camera"  size="40" color="#1296db"></u-icon>   
								<text class="photograph" >拍照答题</text>
						</view>
					</view>
					<view @click="goTo(PICTURE)" class="right_picture">
						<view class="box">
								<u-icon name="photo"  size="40" color="#1296db"></u-icon>   
								<text class="photograph" >拍照答题</text>
						</view>
					</view>
				</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	import { PHOTOGRAPH,PICTURE } from '../../utils/constant.js'
	export default {
		data() {
			return {
				PHOTOGRAPH:PHOTOGRAPH,
				PICTURE:PICTURE
			}
		},
		onLoad() {

		},
		methods: {
            ...mapMutations([
                'setSearchInteraction'
            ]),
			goTo(string){
				this.setSearchInteraction(string)
				uni.switchTab({
					url: '/pages/search/index'
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.top_view{
		padding-left: 12rpx;
	}
	.location{
		font-size: 24rpx;
	}
	.top_view>.iconfont{
		color: #1296db;
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
	.interaction{
		height: 350rpx;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		display: flex;
		background-color:#1296db ;
	}
	.interaction>view{
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background-color: #fff;
		position: relative;
	}
	.interaction>view::before{
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		height: 135rpx;
		width: 135rpx;
		border-radius: 50%;
		background-color:rgba(255, 255, 255, 0.4);
	}
	.interaction>view::after{
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		height: 175rpx;
		width: 175rpx;
		border-radius: 50%;
		border:1px solid rgba(255, 255, 255, 0.4);
	}
	.interaction .box{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.interaction .box>text{
		font-size: 16rpx;
		color:#1296db ;
	}
</style>
