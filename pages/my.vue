<template>
	<view class="content">  
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" @onChange="authPhoneModalChange()" />
		<view class="top_box">
			<view class=" u-flex user-box u-p-r-20 " @click="goTo('pagesA/personal')">
				<view class="top u-m-r-10">
					<u-avatar :src="userInfo.avatarUrl" size="100"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view style="font-weight: 600;" class="u-font-14 u-p-l-20 ">{{userInfo.nickName}}</view>
					<view class="u-font-10">{{phoneNumber}}</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>
			<view class="residue">
				<u-line color="#e4e7ed" />
				<text class="title">剩余次数 </text> &nbsp;
				<text class="number">{{number}}</text>
			</view>
		</view>
		<u-gap height="30" ></u-gap>
			<u-image class="center_box" width="100%" height="100rpx" :src="src"></u-image>
		<u-gap height="30" ></u-gap>
		<view class="bottom_box ">
			<u-cell-group>
				<u-cell-item @click="goTo('pagesA/personal')" icon="file-text" title="答题记录"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/personal')" icon="rmb" title="佣金"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/personal')" icon="account-fill" title="我的团队"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/promotion')" icon="plus-people-fill" title="推广二维码"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/personal')" icon="server-man" title="客服"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	import {authModal} from '../components/authModal'
	import {authPhoneModal} from '../components/authPhoneModal'
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				number:''
			}
		},
		components:{
			authPhoneModal,
			authModal
		},
		onLoad() {

		},
        computed: {
            ...mapState(['loginCode','phoneNumber','openId','userInfo' ])
        },
		onShow () {
			if(!this.openId){
				if(this.loginCode){
					this.getSetting()
				}else{
					uni.login({
							provider: 'weixin',
							success: async ({
								code
							}) => {
								this.setLoginCode(code)
								this.getSetting()
							}
					})
				}
				return
			}
			this.authPhoneModalChange()
		},
		methods: {
			...mapMutations(['setLoginCode']),
			...mapActions(['getUserInfo']),
			getSetting(){
				uni.getSetting({
					success:(res)=> {  
						// 判断是否获取到用户信息权限
						if(!res.authSetting['scope.userInfo']){
							// 弹出权限弹框
							this.$refs.authModal.show() 
						}else{
							this.authModalChange()
						}
					}
				})
			},
			async	authPhoneModalChange(){
				const res =	await this.$u.api.getUser(this.openId)
				const { data } = res
				this.number = data
			},
			authModalChange(){
				this.$refs.authPhoneModal.show()
			},
			goTo(url){
				this.$u.route({
					url: url,
				})
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.content {
		padding:50rpx 30rpx;
		position: relative;
		.top_box{
			background-color: #fff;
			padding: 15rpx 0 0 32rpx ;
			.residue{
				padding:0  20rpx 10rpx 0 ;
				.title{
					margin-top: 15rpx;
					margin-right: 10rpx;
					font-size: 24rpx;
				}
				.number{
					font-size: 20rpx;
					color: skyblue;
				}
			}
		}
		.bottom_box{
			/deep/.u-cell__left-icon-wrap{
				color: #5aa2e0!important;
			}
		}
		.top_box,.center_box,.bottom_box{
			border-radius:10rpx;
			overflow: hidden;
		}
		&::before{
			position: absolute;
			content: "";
			top: 0;
			left: 0;
			background-color:#1296db;
			height: 150rpx;
			width: 100%;
			z-index: -1;
			border-bottom-left-radius: 95%;
			border-bottom-right-radius: 95%;
		}
	}
</style>
