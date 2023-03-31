<template>
	<view class="v-wait">
		 <u-navbar title="群组名字" :placeholder="true"  :autoBack="true"/>
		
		
		
		<view class="block">
			<view class="title">成员列表</view>
			<view class="list">
				<view class="item" @click="toUser">
					<text>小朱</text>
					<text>超级管理员</text>
				</view>
				<view class="item" @click="toUser">
					<text>小李</text>
					<text>普通管理员</text>
				</view>
				<view class="item" @click="toUser">
					<text>小王</text>
					<text></text>
				</view>
				
				<view class="item" opentype="share">
					<text>添加成员</text>
					<text></text>
				</view>
			</view>
		</view>
		
		<view class="block">
			<view class="title" @click="show = true">创建任务</view>
		</view>
		
		<u-popup :show="show" @close="show = false">
		            <view class="flex flex-direction">
		                <text>任务名</text>
		                <text>任务内容</text>
		                <text @click="calshow = true">截止时间:{{time}}</text>
		            </view>
					<button @click="toWait">添加</button>
				</u-popup>
				
		<u-popup :show="usershow" @close="usershow = false">
		            <view class="flex flex-direction">
		                <text class="user_item">✔超级管理员</text>
		                <text  class="user_item">✔普通管理员</text>
		                <text  class="user_item">✔普通群成员</text>
		                <text  class="user_item">X 删除该成员</text>
		                
		            </view>
					<button @click="toWait">添加</button>
				</u-popup>
				
		<u-datetime-picker
					ref="datetimePicker"
					:show="calshow"
		            v-model="value1"
					mode="datetime"
					:formatter="formatter"
					@confirm="getTime"
					@cancel="calshow = false"
		        ></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,//添加
				calshow: false,//日历
				value1: Number(new Date()),
				time: 0,
				usershow: false,//用户权限设置
			};
		},
			onReady() {
					// 微信小程序需要用此写法
					this.$refs.datetimePicker.setFormatter(this.formatter)
				},
		methods: {
			toUser() {
				this.usershow = true;
				// uni.navigateTo({
				// 	url:'./usergroup'
				// })
			},
			toWait() {
				uni.switchTab({
					url:'./waitTask'
				})
			},
			   formatter(type, value) {
			                if (type === 'year') {
			                    return `${value}年`
			                }
			                if (type === 'month') {
			                    return `${value}月`
			                }
			                if (type === 'day') {
			                    return `${value}日`
			                }
							if(type === 'hour') {
								return `${value}时`
							}
							if(type === 'minute') {
								return `${value}分`
							}
			                return value
			            },
						
						// 格式化毫秒数
						formatterTime(date) {
							date = new Date(date);
							let Y = date.getFullYear();
							console.log(Y)
							let M = date.getMonth()+1;
							let D = date.getDate();
							let h = date.getHours();
							let m = date.getMinutes();
							
							return `${Y}年${M}月${D}日 ${h}：${m}`;
						},
			
			// 点击确认获取时间
			getTime(time) {
				console.log(time);
				this.calshow = false;
				this.time = this.formatterTime(time.value);
			},
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
		// 成员编辑
		.user_item {
			text-align: center;
			    height: 60rpx;
			    line-height: 60rpx;
		}
	}
</style>
