<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar
				  leftText="返回"
				  leftIconColor="white"
		          @leftClick="back"
				  :placeholder="true"
				  bgColor="#ff5566"
				  >
			<!-- 自定义内容 -->
				<text slot="center" class="text-white text-lg">编辑</text>
		</u-navbar>
		<!-- 标题 -->
		<view class="block">
			
		
		<view class="flex align-center padding-top-xl ">
			<view class="text-bold margin-right-xl">清单标题:</view>
			<input placeholder="请输入标题" v-model="form.title"/>
		</view>
		<!-- 内容 -->
		<view class="margin-bottom-xl">
			<view class="padding-top-xl text-bold">内容描述:</view>
			<input placeholder="请输入清单内容" v-model="form.description"/>
		</view>
		
		<!-- 时间 -->
		<u-datetime-picker
					ref="datetimePicker"
					:show="show"
		            v-model="value1"
					mode="datetime"
					:formatter="formatter"
							 @confirm="getTime" @cancel="show=false"
		        ></u-datetime-picker>
		        <u-button @click="show = true">设置截止时间：{{time}}</u-button>
				
		
		<view class="padding-top-xl">
			<Judge :index="index" @val_type="val_type" opt="修改"/>
		</view>
		

		
		</view>		
	</view>
</template>
<script>
	import Judge from 'components/judge.vue';
	import {$getDetail,$editlist} from '../../utils/api.js';
	import {formatTime,formatter} from '../../utils/formatTime.js';
	export default {
		components:{
				Judge
		},
		data() {
			return {
				show: false,//显示日历
				value1: Number(new Date()),
				
				index: '收集箱', //清单类型
				
				form: {
					// // "objectId":"区分哪个清单项，用于增删改查",
					// // "id": "用于区分是哪个清单类",
					// "title":"",
					// "description":"",
					// "time": '',
					// "tag": {
					// 						complete:false,  
					// 						carry: 0,//0不执行即备忘录，1执行
					// 						// immediately: false
					// },
					
					// "distribute":false
					
				},
				time: 0,//该时间是显示的时间，要与选择器同步
				objectId: ''
			}
		},
		onReady() {
					// 微信小程序需要用此写法
					this.$refs.datetimePicker.setFormatter(this.formatter)
				},
		onLoad(option) {
			// console.log('获取id',option.objectId);
			this.objectId = option.objectId;
			// 获取该清单数据
			$getDetail(option.objectId).then(res=>{
				this.form = res.data;
				this.time = formatTime(this.form.time);
				if(this.form.type == '收集箱') {
					this.index = 0;
				} 
				if(this.form.type == '备忘录') {
					this.index = 1;
				} 
				if(this.form.type == '执行清单') {
					this.index = 2;
				} 
			})
			
		},
		
		computed: {
			
			
		},
		methods:{
			
			
			
			//返回详情页
			back() {
					uni.navigateBack();
			},
			// 点击修改并跳转
			val_type(obj) {
				if(!this.form.title) {
					uni.showToast({
						title:'标题不能为空',
						icon:'error'
					})
					return ;
				}

				if(obj.type === '等待清单') {
					console.log('等待清单，需要展示可以发布任务的群组，然后是否要发送到群上');
				}else {
				obj.title = this.form.title;
				obj.description = this.form.description;
				obj.time = this.form.time;
				obj.objectId = this.form.objectId;
				$editlist(obj).then(res=>{
					uni.showToast({
						title:'修改成功'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:'./list'
						});
					},500);
					console.log(res);
				})
				}
				
			},
			 formatter(type, value) {
			            return formatter(type,value);
			            },
						
			// 获取日期时间
			getTime(time) {
				this.form.time = time.value;
				this.time = formatTime(time.value);
				this.show = false;
			},
			
		},
		onShareAppMessage(res) {
				if (res.from === 'button') {// 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: `请接受任务：${this.form.name}\n任务描述：${this.form.description}`,
					path: '/pages/demo/demo'
				}
				
		    },
			
		
	}
</script>

<style lang="scss">
	.block {
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}
</style>