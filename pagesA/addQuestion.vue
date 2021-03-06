<template>
	<view class="content">

		<u-input v-model="questionStem" type="textarea" class="textarea" placeholder="题干" :border="true" :height="100" />

		<u-input v-model="answer" type="textarea" class="textarea" placeholder="答案 ABCDEF 正确错误" :border="true" :height="100" />

		<u-input v-model="analysis" type="textarea" class="textarea" placeholder="解析" :border="true" :height="100" />

		<u-radio-group v-model="multipleChoice" @change="radioGroupChange">
			<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.value">
				{{item.name}}
			</u-radio>
		</u-radio-group>
	
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				list: [{
						value: '0',
						name:'单选'
					},
					{
						value: '1',
						name:'多选'
					},
					{
						value: '2',
						name:'判断'
					}
				],
				multipleChoice: '0',
			}
		},
		computed: {
			...mapState(['userId'])
		},
		methods: {
			async deleteQuestion() {
				const obj = {

				}
				const res = await this.$u.api.saveQuestion(obj);
				uni.showToast({
					icon: 'none',
					title: '用户取消'
				});
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
