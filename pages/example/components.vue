<template>
	<view class="wrap">
		<page-nav :desc="desc" title="nav.components"></page-nav>
		<!-- <u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			desc() {
				return this.$t('components.desc');
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('nav.components')
			});
		},
		created() {
			
		},
		methods: {
			openPage(path) {
				this.$u.route({ 
					url: path
				})
			},
			getGroupTitle(item) {
				return this.$i18n.locale == 'zh' ? item.groupName : item.groupName_en
			},
			getFieldTitle(item) {
				return this.$i18n.locale == 'zh' ? item.title : item.title_en
			}
		}
	}
</script>

<style>
	/* page {
		background-color: rgb(240, 242, 244);
	} */
</style>

<style lang="scss" scoped>
	
	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
</style>
