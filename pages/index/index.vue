<template>
	<view class="v-index">
		<!-- 顶部导航栏-->
		 <u-navbar title="首页" :placeholder="true"/>
		<!-- <view class="navBar">
			<text>首页</text>
		</view> -->
		
		<!-- 收集箱没有清空的提示 -->
		<u-notice-bar text="收集箱还有灵感未解决哦,快去看看吧" mode="link"  url="/pages/list/list" linkType="switchTab"></u-notice-bar>
		
		<view class="content">
			<!-- 即将要过期的清单和任务 -->
			<view class="block">
			    <view class="block_title">以下为3天内截止的任务</view>
				<view class="block_item">
					<view class="item_title">
							<text>超级猪猪侠</text>
							
							<text>2022-5-11</text>
					</view>
					<view class="mb-10">
							<u--text size="14" :lines="1" text="检查宿舍卫生"></u--text>
					</view>
					<u--text type="info" size="12" :lines="2" text="宿舍表格在群上,一一对应,完成的打卡"></u--text>
					
				</view>
				
				<view class="block_item">
					<view class="item_title">
							<text>超级猪猪侠</text>
							
							<text>2022-5-11</text>
					</view>
					<view class="mb-10">
							<u--text size="14" :lines="1" text="检查宿舍卫生"></u--text>
					</view>
					<u--text type="info" size="12" :lines="2" text="宿舍表格在群上,一一对应,完成的打卡"></u--text>
					
				</view>
				
				
			</view>
			<!-- 今日已完成的清单和任务 -->
			<view class="block">
			    <view class="block_title">今天你完成的任务</view>
				<view class="block_item">
					<view class="item_title">
							<text>超级猪猪侠</text>
							
							<text>2022-5-11</text>
					</view>
					<view class="mb-10">
							<u--text size="14" :lines="1" text="检查宿舍卫生"></u--text>
					</view>
					<u--text type="info" size="12" :lines="2" text="宿舍表格在群上,一一对应,完成的打卡"></u--text>
				</view>
			</view>
			<!-- 昨日已完成的清单和任务 -->
			
			<view class="block">
			    <view class="block_title">昨天你完成的任务</view>
				<view class="block_item">
					<view class="item_title">
							<text>超级猪猪侠</text>
							
							<text>2022-5-11</text>
					</view>
					<view class="mb-10">
							<u--text size="14" :lines="1" text="检查宿舍卫生"></u--text>
					</view>
					<u--text type="info" size="12" :lines="2" text="宿舍表格在群上,一一对应,完成的打卡"></u--text>
				</view>
				
				<view class="block_item">
					<view class="item_title">
							<text>超级猪猪侠</text>
							
							<text>2022-5-11</text>
					</view>
					<view class="mb-10">
							<u--text size="14" :lines="1" text="检查宿舍卫生"></u--text>
					</view>
					<u--text type="info" size="12" :lines="2" text="宿舍表格在群上,一一对应,完成的打卡"></u--text>
				</view>
			</view>


			</view>
		
		<NoLogin :show.sync="show"/>
	</view>
</template>

<script>
	// 导入组件
	
	
	import {mapState} from 'vuex';
	// 获取数据
	import * as api from '../../utils/api.js';
	import NoLogin from 'components/noLogin.vue';
	export default {
		components:{
			NoLogin
		},
		onLoad() {
			if(!this.$store.state.loginInfo.objectId) {
				this.show = true;
			} else {
				this.show = false;
			}
		},
		data() {
			return {
				show:false,
			}
		},
		methods:{
			// 跳转收集箱
			toColl() {
				uni.switchTab({
					url:'../list/list'
				})
			}
		}
	}
</script>

<style lang="scss">
	.v-index {
		// 导航栏
		.navBar {
			width: 100%;
			height: 120rpx;
			line-height: 160rpx;
			color: #FFFFFF;
			background-color: #ff5e6d;
			text-align: center;
		}
		// 卡片内容
		.content {
			overflow: auto;
		}
		.block {
			box-sizing: border-box;
			width: 95%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx auto;
			padding: 20rpx;
			
			.block_title {
				text-align: center;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			
			.block_item {
				width: 100%;
				padding: 10rpx;
				margin: 0 auto;
				border-bottom: 4rpx solid #f5f5f5;
			}
			
			.item_title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				font-size: 30rpx;
			}
			.mb-10 {
				margin-bottom: 20rpx;
			}
			
		}
	}
</style>
