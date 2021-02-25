<template>
		<u-modal v-model="modalShow" :title="title" :show-confirm-button="false"  :content="123">
			<view class="content">
				{{content}}
			</view>
			<view class="butotn_box u-flex">
				<view class="left">
					<u-button open-type="getUserInfo" type="primary" @getuserinfo="getUserInfo" :custom-style="leftCustomStyle" >允许</u-button>
				</view>
				<view class="right" @click="modalShow = false" >
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
		onLoad() {

		},
		computed:{
			...mapState(['openId'])	
		},
		methods: {
			...mapMutations(['setUserInfo']),
			show(){
				this.modalShow = true
			},
			getUserInfo({detail}){   //授权个人信息
				if (detail.userInfo){
					this.setUserInfo(detail.userInfo)
					this.modalShow = false
					this.$emit('onChange')
				} else {
					uni.showToast({
						icon: "none",
						title: '请授权相关功能，否则无法使用',
						duration: 2000,
						position: 'center'
					})
				}
			},
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
