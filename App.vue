<script>
import {mapMutations} from 'vuex'
	export default {
		onLaunch() {
		},
		onLoad(options){
			const obj = wx.getLaunchOptionsSync()
			//部分版本在无referrerInfo的时候会返回 undefined,可以做一下判断
			if (options.referrerInfo && options.referrerInfo.appId) {
				const { shareCode  }= obj.query || {}
				if(shareCode){
					this.setShareCode(shareCode)
				}
			}
			console.log('onLoad')
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['setShareCode'])
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
