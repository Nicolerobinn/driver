<script>
	export default {
		onLaunch() {
		},
		onLoad(){
			console.log('onLoad')
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/deep/.u-tabbar__content__item__text>text{
		font-size: 20rpx;
	}
	page{
		height: 100%;
		background-color: #e4e3e3;
	}
</style>
