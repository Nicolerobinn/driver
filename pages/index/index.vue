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
				<u-swiper :list="list"></u-swiper>
	</view>
</template>

<script
	const wx = require('jweixin-module');
	import { mapMutations } from 'vuex'
	import { PHOTOGRAPH,PICTURE,TENCENT_KEY } from '../../utils/constant.js'
	export default {
		data() {
			return {
				PHOTOGRAPH:PHOTOGRAPH,
				PICTURE:PICTURE,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					}
				],
			}
		},
		onLoad() {
			const map  = new wx({
			  key: TENCENT_KEY // 必填
			});
			uni.getLocation({
			      type: 'wgs84',
			      success({latitude,longitude}) {
			        map.reverseGeocoder({
			          location: {
			            latitude,
			            longitude
			          },
			          success (res) {
			            console.log(res.result);
			          },
			          fail (res) {
			            console.log(res);
			          },
			          
			        })
			      }
			})
		},
		methods: {
            ...mapMutations([
                'setSearchInteraction'
            ]),
			goTo(string){
				this.$u.route({
					url: 'pages/search/index',
					params: {
						type: string
					},
					type:'tab'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.top_view{
		padding-left: 12rpx;
		.iconfont{
			color: #1296db;
		}
	}
	.location{
		font-size: 24rpx;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
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
		&>view{
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			background-color: #fff;
			position: relative;
			&::before{
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
			&::after{
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
			.box{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				text{
					font-size: 16rpx;
					color:#1296db ;
				}
			}
		}
	}
</style>
