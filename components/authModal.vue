<template>
		<u-modal v-model="modalShow" :title="title" :show-confirm-button="false"  :content="123">
			<view class="content">
				{{content}}
			</view>
			<view class="butotn_box u-flex">
				<view class="left">
					<button @click="handleClick">点我授权</button>
				</view>
				<view class="right" @click="cacel()" >
					拒绝
				</view>
			</view>	
		</u-modal>	
</template>

<script>
	import { mapState,mapActions,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				modalShow:false,
				title:'授权提醒',
				content:'请授权头像等信息，以便为您提供更好的服务',
				leftCustomStyle:{
					borderRadius:0,
					border:0,
					background:'#1296db'
				}
			}
		},
		methods: {
			...mapMutations([ 'setUserInfo']),
			show(){
				this.modalShow = true
			},
			handleClick(){
				   uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				     success: res => {
						console.log(res)
						this.setUserInfo(res.userInfo)
						this.modalShow = false
						this.$emit('onChange')
				     },
					 fail:(res)=>{
							console.log(res)
						 	this.cacel()
					 }
				   })
			},
			cacel(){
				this.modalShow = false
				uni.showToast({
					icon: "none",
					title: '请授权相关功能，否则无法使用',
					duration: 2000,
					position: 'center'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		text-align: center;
		padding: 30rpx;
		font-size: 30rpx;
		color: gray;
	}
	.butotn_box{
		&>view{
			width: 50%;
			text-align: center;
		}
	}
</style>
