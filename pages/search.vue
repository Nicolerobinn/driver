<template>
	<view class="content">
		<authModal ref="authModal" />
	</view>
</template>

<script>
	import { mapState, mapMutations,mapActions } from 'vuex'
	import authModal from '../components/authModal'
	import { PHOTOGRAPH } from '../utils/constant.js'
	export default {
		data() {
			return {
			}
		},
        computed: {
            ...mapState([
                'searchInteraction','token'
            ])
        },
		components:{
			authModal
		},
		onShow () {
			if(!this.token){
				uni.getSetting({
					success:(res)=> {   
						if(!res.authSetting['scope.userInfo']){
							this.$refs.authModal.show() 
						}else{
							this.login()
						}
					}
				})
			}
			if(this.searchInteraction){
				this.searchInteraction === PHOTOGRAPH?this.takePhoto():this.getPicture()
				this.setSearchInteraction('')
			}
		},
		methods: {
            ...mapMutations(['setSearchInteraction']),
			filterChooseImage(obj){
				const {count=6,sizeType=['original', 'compressed'],sourceType=['album', 'camera'],callback} = obj
				uni.chooseImage({
					count: count, //默认9
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: (res)=> {
						callback(JSON.stringify(res.tempFilePaths))
					},
					fail:(err)=>{
						console.log(err)
					}
					
				});
			},
			getPicture(){
				const picture = (string)=>{
					console.log(string)
				}
				this.filterChooseImage({sourceType: ['album'],callback:picture})
			},
			takePhoto() {
				const picture = (string)=>{
					console.log(string)
				}
				this.filterChooseImage({sourceType: ['camera'],callback:picture})
			},
			chooseImage() {
				const picture = (string)=>{
					console.log(string)
				}
				this.filterChooseImage({sourceType: ['album', 'camera'],callback:picture})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
