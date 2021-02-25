<template>
	<view class="content">
		<authModal ref="authModal" @onChange="authModalChange" />
		<authPhoneModal ref="authPhoneModal" />
		<view class="top">
			<u-row>
				<u-col span="2">
					<view class="blueBox" @click="chooseImage()"> 
						<u-icon name='camera-fill' size="55" class='camera' color='#ffff'></u-icon>
					</view>
				</u-col>
				<u-col span="10">
					<view class="input"  @click="chooseImage()">
						<u-icon name='search' size="40" class='search'></u-icon>
						<view class="searchPractice">搜索题目</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<authModal ref="authModal" />
	</view>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	import { PHOTOGRAPH,PICTURE } from '../utils/constant.js'
	import {authModal} from '../components/authModal'
	import {authPhoneModal} from '../components/authPhoneModal'
	export default {
		data() {
			return {}
		},
        computed: {
            ...mapState([ 'phoneNumber','openId','userInfo','searchInteraction' ])
        },
		components:{
			authPhoneModal,
			authModal
		},
		onShow () {
			if(!this.openId){
				uni.getSetting({
					success:(res)=> {  
						// 判断是否获取到用户信息权限
						if(!res.authSetting['scope.userInfo']){
							// 弹出权限弹框
							this.$refs.authModal.show() 
						}else{
							// 获取手机号
							this.authModalChange()
						}
					}
				})
				return
			}
			if(this.searchInteraction){
				this.searchInteraction === PHOTOGRAPH?this.getPicture():this.takePhoto()
				return
			}
			this.setSearchInteraction('')
		},
		methods: {
			...mapMutations(['setSearchInteraction']),
			authModalChange(){
				this.$refs.authPhoneModal.show()
			},
			filterChooseImage(obj) {
				const {
					count = 6, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'], callback
				} = obj
				uni.chooseImage({
					count: count, //默认9
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: (res) => {
						callback(JSON.stringify(res.tempFilePaths))
					},
					fail: (err) => {
						console.log(err)
					}

				});
			},
			getPicture() {
				const picture = (string) => {
					console.log(string)
				}
				this.filterChooseImage({
					sourceType: ['album'],
					callback: picture
				})
			},
			takePhoto() {
				const picture = (string) => {
					console.log(string)
				}
				this.filterChooseImage({
					sourceType: ['camera'],
					callback: picture
				})
			},
			chooseImage() {
				const picture = (string) => {
					console.log(string)
				}
				this.filterChooseImage({
					sourceType: ['album', 'camera'],
					callback: picture
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		.top{
			width: 100%;
			padding:10px 0 10px 0;
			border-bottom: 5px solid #f5f5f5;
		}
		.blueBox {
			height: 35px;
			background-color: #2c96fc;
			width: 35px;
			border-radius: 5px;
			text-align: center;
			align-items: center;
			display: table;
			.camera {
				display: table-cell;
				vertical-align: middle;
			}
		}
		
		.input{
			width: 108%;;
			height: 35px;
			background-color: #f7f7f7;
			margin-left: -20px;
			border-radius: 20px;
			padding:0 5px;
			margin-top:2px;
			// vertical-align: middle;
			// align-items: center;
			display: table;
			.search {
				display: table-cell;
				vertical-align: middle;
			}
			.searchPractice{
				color:#dcdcdc;
				font-size: 15px;
				display: table-cell;
				vertical-align: middle;
				text-align: left;
			}
		}
	}
</style>
