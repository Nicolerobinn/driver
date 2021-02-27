<template>
	<u-cell-group>
		<u-cell-item :arrow="false" title="头像">
			<u-avatar :src="userInfo.avatarUrl"></u-avatar>
		</u-cell-item>
		<u-cell-item :arrow="false" title="名字">{{userInfo.nickName}}</u-cell-item>
		<u-cell-item :arrow="false"  title="手机号码">{{userInfo.phone}}<u-icon style="margin-left:10px ;" name="lock"  size="24"></u-icon></u-cell-item>
		<u-cell-item :arrow="false" title="ID号">{{userInfo.userId}}<u-icon style="margin-left:10px ;" name="lock"  size="24"></u-icon></u-cell-item>
	</u-cell-group>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
        computed: {
            ...mapState([ 'userInfo' ])
        },
	}
</script>
