<template>
	<view>
		<!-- 新增清单 -->
		<!-- 新增清单项 -->
		 <i class="iconjia iconfont icon-jia" @click="show = true"></i>
		 
		 
		 <!-- 从下弹出新增弹窗 -->
		 <u-popup :show="show" @close="show = false">
			 <view>
				 <input v-model="form.title" placeholder="请输入清单名"/>
				 <input v-model="form.description" placeholder="请输入内容"/>
				 <u-button @click="calshow = true">截止日期：{{time}}</u-button>
				 
			 </view>
		    
			<Judge :index="index" @val_type="add" opt="添加"/>
				
			<!-- 时间选择器 -->
			<u-datetime-picker
						ref="datetimePicker"
						:show="calshow"
			            v-model="value1"
						mode="datetime"
						:formatter="formatter"
						@confirm="getTime"
						@cancel="calshow = false"
			        ></u-datetime-picker>
		</u-popup>
	</view>
</template>

<script>
	import Judge from './judge.vue';
	export default {
		name:"add",
		components: {
			Judge
		},
		data() {
			return {
				show :false,
				calshow: false,
				value1: Number(new Date()),
				form: {
					    title: '',
						description: '',
						time: 0,  //.getTime()
				},
				time: 0
			};
		},
		onReady() {
				// 微信小程序需要用此写法
				this.$refs.datetimePicker.setFormatter(this.formatter);
				
			},
		props:['index','shortId'],
		methods:{
			
			// 传入type,选择对应的清单列表格式
			add(obj) {
				let resObj = {};
				
				if(obj.type !== '等待清单') {
					resObj = {
						shortId: this.$store.state.loginInfo.shortId,   //判断用户的唯一标识
						...obj,
						tag: ['测试'],
						finish: false,
						...this.form
					}
				} else {
					resObj = {
						
					}
				}

				this.$emit('add',resObj);
				
				this.show = false;
				this.form.title = '';
				this.form.description = '';
				this.form.time = 0;
				this.time = 0;
				this.value1 = 0;
				
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
							
							let M = date.getMonth()+1;
							let D = date.getDate();
							let h = date.getHours();
							let m = date.getMinutes();
							
							return `${Y}年${M}月${D}日 ${h}时${m}分`;
						},
			
			// 点击确认获取时间
			getTime(time) {
				// {value: 1652421114276, mode: "datetime"}
				this.calshow = false;
				this.form.time = time.value;
				this.time = this.formatterTime(time.value);
			},
		}
	}
</script>

<style lang="scss">
// 加号
		.iconjia {
			position: fixed;
			right: 50rpx;
			bottom: 100rpx;
			color: #ff5566;
			border: 3px solid #ff5566;
			border-radius: 999rpx;
			font-size: 60rpx;
			z-index: 999;
		}
</style>
