<template>
	<u-cell-group>
		<u-cell-item :arrow="false" title="头像">
			<u-avatar :src="userInfo.avatarUrl"></u-avatar>
		</u-cell-item>
		<u-cell-item :arrow="false" title="名字">{{userInfo.nickName}}</u-cell-item>
		<u-cell-item :arrow="false" title="手机号码">{{phoneNumber}}</u-cell-item>
		<u-cell-item :arrow="false" title="ID号">{{openid}}</u-cell-item>
	</u-cell-group>
</template>

<script>
	import { mapMutations,mapState,mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
        computed: {
            ...mapState([ 'phoneNumber','userInfo','openid' ])
        },
	}
</script>

<style lang="scss">

</style>
