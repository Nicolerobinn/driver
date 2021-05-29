<template>
	<view class="content">  
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" @onChange="authPhoneModalChange()" />
		<view class="top_box">
			<u-cell-item v-if="!isMember" @click="getmember()" icon="level"  title="成为会员"></u-cell-item>
			<view v-if="isMember" class="member">
				<u-icon name="level" color="#972528" size="60"></u-icon>
				尊贵的会员
			</view>
			<view v-else class="member"  @click="getmember()">
				<u-icon name="level" color="#969799" size="60"></u-icon>
				点击成为会员，享受优质的服务
			</view>
			<u-gap height="30" ></u-gap>
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
				<text class="title">剩余次数 ： </text> &nbsp;
				<text class="number">{{number}}</text>
			</view>
		</view>
		<u-gap height="30" ></u-gap>
		<u-button open-type="contact" type="primary" >点击联系客服</u-button>
		<u-gap height="30" ></u-gap>
		<view class="bottom_box ">
			<u-cell-group>
				<u-cell-item @click="goTo('pagesA/package')" icon="coupon" title="套餐详情"></u-cell-item>
				<u-cell-item v-if="openId" @click="goTo('pagesA/myTeam')" icon="integral-fill" title="我的团队"></u-cell-item>
				<u-cell-item v-if="isAdministrator" @click="goTo('pagesA/questionList')" icon="file-text-fill" title="题库"></u-cell-item>
				<u-cell-item v-if="isAdministrator" @click="goTo('pagesA/addQuestion')" icon="plus-square-fill" title="添加题目"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/announcementList')" icon="order" title="答题记录"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/commission')" icon="rmb" title="佣金"></u-cell-item>
				<u-cell-item @click="goTo('pagesA/promotion')" icon="plus-people-fill" title="推广二维码"></u-cell-item>
			</u-cell-group>
		</view>
		<image style="width: 100%;" src="https://changpingwanglou.cn/file/guanggao/2.jpg" mode=""></image>
	</view>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	import {authModal} from '../components/authModal'
	import {authPhoneModal} from '../components/authPhoneModal'
	export default {
		data() {
			return {
				show:true,
				number:'',
				isMember:true,
				isAdministrator:false
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
		onShareAppMessage(options){
     　// 设置菜单中的转发按钮触发转发事件时的转发内容
			　　var shareObj = {
			　　　　title: "学法减分邀请您来~",        // 默认是小程序的名称(可以写slogan等)
			　　　　path: '/pages/my',        // 默认是当前页面，必须是以‘/’开头的完整路径
			　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			　　　　success: (res)=>{
			　　　　　　// 转发成功之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
			　　　　　　}
			　　　　},
			　　　　fail: ()=>{
			　　　　　　// 转发失败之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
			　　　　　　　　// 用户取消转发
			　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
			　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
			　　　　　　}
			　　　　},
			　　　　complete: ()=>{
			　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
			　　　　}
			　　};
			　　// 返回shareObj
			　　return shareObj;
		},
		methods: {
			...mapMutations(['setLoginCode']),
			async   getmember(){
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
				const s = wx.getSystemInfoSync()
				if( s.platform ==='ios'){
					uni.showToast({
						icon:'none',
						title: 'ios用户不可用，如需购买请联系管理员'
					});
					return
				}
				const res =	await this.$u.api.prePay({openid:this.openId,setMealId:0})
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
						this.authPhoneModalChange()
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
			getSetting(){
							this.$refs.authModal.show() 
			},
			async	authPhoneModalChange(){
				const res =	await this.$u.api.getUser(this.openId)
				const { data } = res
				const { count ,member,role} = data ||{}
				this.number = count
				this.isAdministrator = role ==1 ?true:false
				this.isMember = member==1
			},
			authModalChange(){
				this.$refs.authPhoneModal.show()
			},
			goTo(url){
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
		.member{
			display: flex;
			align-items: center;
			font-weight: bold;
		}
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
	}
</style>
