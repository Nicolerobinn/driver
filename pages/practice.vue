<template>
	<view class="content">
		<view class="question">
			<span class='choose'>判断题</span>
			<span class='content'>同方向积分绝地反击非基督教覅记得覅绝地反击地方的积分绝地反击飞机的积分ID就飞机的积分ID积分绝地反击飞机抵积分IDf。</span>
			<view class='radioChoose'>
				<u-radio-group v-model="value" @change="radioGroupChange" wrap='true'>
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="next">
				下一题
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
						name: '正确',
						disabled: false
					},
					{
						name: '错误',
						disabled: false
					}

				],
				value: '正确'
			}
		},
		onLoad() {

		},
		computed: {
			...mapState([
				'searchInteraction'
			])
		},
		methods: {
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

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		clear: both;
	}

	.next {
		margin-left:300px;
		width: max-content;
		padding: 2px 4px;
		border-radius: 5px;
		font-size: 12px;
		color: #fff;
		line-height: 20px;
		background-color: #5192ff;
	}

	.radioChoose {
		margin-top: 10px;
	}

	.content {
		display: inline;
		padding: 0 0 0 3px;
		font-family: sans-serif;
		/* letter-spacing: 1px; */
	}

	.question {
		background-color: #ffff;
		width: 100%;
		padding: 10px;
	}

	.choose {
		display: inline;
		width: max-content;
		/* height: 20px; */
		padding: 2px 4px;
		border-radius: 5px;
		font-size: 12px;
		color: #fff;
		line-height: 20px;
		background-color: #5192ff;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
