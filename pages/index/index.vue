<template>
	<view class="content">
	   <!-- 自定义顶部导航 -->
		<u-modal v-model="show"  ref="uModal" :title="title"  @confirm="confirm" :async-close="true" :content="content"></u-modal>
		<u-navbar class="self-nav" :is-back="false" title-color="black"  title="首页">
			<view class="top_view"><u-icon name="map-fill"  color="#1296db"></u-icon>   <text class="location" >{{location}}</text></view> 
		</u-navbar>
		<view class="interaction">
			<view @click="goTo(PHOTOGRAPH)"  class="left_photograph">
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
		<u-gap height="30" bg-color="#ccc"></u-gap>
		<u-notice-bar @click="noticeClick" :volumeIcon="true" :moreIcon="true" mode="vertical" :list="barList"></u-notice-bar>
		<u-gap height="30" bg-color="#ccc"></u-gap>
		<u-swiper height="300" :list="list"></u-swiper>
	</view>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	import { PHOTOGRAPH,PICTURE } from '../../utils/constant.js'
	export default {
		data() {
			return {
				title:'提示',
				content: '请允许小程序获取您的定位，点击确定获取授权',
				PHOTOGRAPH:PHOTOGRAPH,
				PICTURE:PICTURE,
				barList: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
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
		},
		computed:{
			...mapState(['location','locationModel']),
			show: {

				get(){
					return this.locationModel;
				},
				set(v) {
					// TODO UI组件库问题，更改了locationModel的值，导致报错，暂不解决
				}

			},
		},
		methods: {
            ...mapMutations(['setSearchInteraction']),
			...mapActions(['getAccurate']),
		    confirm(){
				this.$refs.uModal.clearLoading()
				uni.openSetting({
				  success:(res)=> {
					const boole = res.authSetting['scope.userLocation']
					if(boole){
						this.getAccurate()
					}
				  }
				});
			},
			noticeClick(e){	
				this.$u.route({
					url: 'pages/announcementList/index',
				})
			},
			goPromote(){
				this.$u.route({
					url: 'pages/promote/index',
				})
			},
			goTo(string){
				uni.switchTab({
					url: '/pages/search/index'
				});
				this.setSearchInteraction(string)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		height: 400rpx;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		display: flex;
		background-color:#1296db ;
		&>view{
			height: 130rpx;
			width: 130rpx;
			border-radius: 50%;
			background-color: #fff;
			position: relative;
			&::before{
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				height: 155rpx;
				width: 155rpx;
				border-radius: 50%;
				background-color:rgba(255, 255, 255, 0.4);
			}
			&::after{
				content: "";
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				height: 195rpx;
				width: 195rpx;
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
					font-size: 20rpx;
					color:#1296db ;
				}
			}
		}
	}
</style>
