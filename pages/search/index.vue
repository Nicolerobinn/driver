<template>
	<view class="content">
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { PHOTOGRAPH,PICTURE } from '../../utils/constant.js'
	export default {
		data() {
			return {
			}
		},
        computed: {
            ...mapState([
                'searchInteraction'
            ])
        },
		onShow (option) {
			const {type=''} = option || {}
			if(type){
				type === PHOTOGRAPH?this.takePhoto():this.getPicture()
			}
		},
		methods: {
            ...mapMutations([
                'setSearchInteraction'
            ]),
			filterChooseImage(obj){
				const {count=6,sizeType=['original', 'compressed'],sourceType=['album', 'camera'],callback} = obj
				uni.chooseImage({
					count: count, //默认9
					sizeType: sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //从相册选择、摄像头
					success: function(res) {
						callback(JSON.stringify(res.tempFilePaths))
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
			error(e) {
				console.log(e.detail);
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
