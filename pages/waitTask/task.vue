<template>
	<view class="v-wait">
		 <u-navbar title="任务名字" :placeholder="true"  :autoBack="true"/>
		<!-- 图表 -->
		  <view class="charts-box">
		    <qiun-data-charts 
		      type="pie"
		      :opts="opts"
		      :chartData="chartData"
			  @getIndex="tap"
		    />
		  </view>
		
		<view class="block">
			<view class="title" @click="show = true">创建任务</view>
			<view class="title" @click="show = true">编辑任务</view>
			<view class="title" @click="show = true">删除任务</view>
		</view>
		
		<view class="block">
			<view class="title">未完成的成员列表</view>
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
			<view class="title">已完成的成员列表</view>
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
				// 图表
				 chartData: {},
				      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				      opts: {
				        // color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				        color: ["#EE6666","#3CA272"],
				        padding: [5,5,5,5],
				        extra: {
				          pie: {
				            activeOpacity: 0.5,
				            activeRadius: 10,
				            offsetAngle: 0,
				            labelWidth: 15,
				            border: true,
				            borderWidth: 3,
				            borderColor: "#FFFFFF",
				            linearType: "custom"
				          }
				        }
				      }
			};
		},
			onReady() {
					// 微信小程序需要用此写法
					this.$refs.datetimePicker.setFormatter(this.formatter);
					this.getServerData();
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
			// 图表
			 getServerData() {
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			        let res = {
			            series: [
			              {
			                data: [{"name":"未完成","value":50},{"name":"已完成","value":30}]
			              }
			            ]
			          };
			        this.chartData = JSON.parse(JSON.stringify(res));
			      }, 500);
			    },
				tap(e) {
					console.log(e);
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
		// 成员编辑
		.user_item {
			text-align: center;
			    height: 60rpx;
			    line-height: 60rpx;
		}
		// 图表
		 .charts-box {
		    width: 100%;
		    height: 300px;
		  }
	}
</style>
