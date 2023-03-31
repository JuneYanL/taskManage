<template>
	<view class="v-wait">
		 <u-navbar title="群组任务" :placeholder="true"  :autoBack="true"/>
		
		<view class="block">
			<view class="title" @click="toGroup">群组1</view>
			<view class="list">
				<view class="item" @click="toTask">
					<text>任务1</text>
					<text>今天 10：12</text>
				</view>
				<view class="item" @click="toTask">
					<text>任务2</text>
					<text>明天 12：12</text>
				</view>
			</view>
		</view>
		
		<view class="block">
			<view class="title" @click="toGroup">群组2</view>
			<view class="list">
				<view class="item" @click="toTask">
					<text>任务1</text>
					<text>后天 9：10</text>
				</view>
				<view class="item" @click="toTask">
					<text>任务2</text>
					<text>2022/5/18 12：12</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			if(!this.$store.state.loginInfo.objectId && this.$store.state.tixing===false) {
				this.$store.commit('set_tixing',true);
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		methods: {
			toGroup() {
				uni.navigateTo({
					url:'./group'
				})
			},
			toTask() {
				uni.navigateTo({
					url:'./task'
				})
			}
		}
	}
</script>

<style lang="scss">
	.v-wait {
		overflow: auto;
		.block {
			margin-bottom: 30rpx;
			width: 100%;
			background-color: #FFFFFF;
			
			.title {
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}
			
			.list {
				background-color: #f5f5f5;
			}
			.item {
				display: flex;
				justify-content: space-between;
				margin-top: 4rpx;
				padding: 20rpx;
				background-color: #FFFFFF;
			}
		}
	}
</style>
