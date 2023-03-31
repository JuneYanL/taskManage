<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="navbar text-white">
			<u-navbar
			          @leftClick="show = true"
					  :placeholder="true"
					  bgColor="#ff5566"
					  >
				<!-- 自定义内容 -->
				<i slot="left" class="iconfont icon-mianbaoxie3"></i>
				<view slot="center" class="flex">
					<i  :class="sideList[index].icon"></i>
					<text class="margin-left-xs">{{sideList[index].name}}</text>
				</view>
				<!-- 小程序本身有分享按钮 -->
				<!-- <i slot="right" class="iconfont icon-shezhi1"></i> -->
			</u-navbar>
					  
		</view>
		
		<!-- 侧边弹窗 -->
		<view class="sideBar">
			<u-popup :show="show" @close="show = false"  mode="left">
			        <view >
						<!-- 侧边弹窗内容 -->
						<view class="over">
							<view class="top flex align-center padding-left-sm">
								<!-- 头像 -->
								<u--image :src="aurl" shape="circle" width="80px" height="80px"></u--image>
								<!-- 昵称 -->
								<text class="text-white text-xl margin-left-xs" @click="$emit('toLogin')">{{isLogin?name:'立即登录'}}</text>
							</view>
							<!-- 清单列表 -->
							<view class="list  text-lg">
								<view v-for="(item,index) in sideList" :key="index" class="item" @click="turnSide(index)">
									<i :class="item.icon"></i>
									<text class="margin-left-xs">{{item.name}}</text>
								</view>
							
							</view>
							
							<!-- 新增清单 -->
						</view>
			        </view>
			</u-popup>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"listType",
		data() {
			return {
				show:false,//显示与隐藏侧边栏
				sideList: [
					{
						name: '收集箱',
						icon: 'iconfont icon-shoujixiang',
					},
					{
						name: '备忘录',
						icon: 'iconfont icon-zhihangqingdan'
					},
					{
						name: '执行清单',
						icon: 'iconfont icon-danchuang-chenggongicon'
					},
					{
						name: '等待清单',
						icon: 'iconfont icon-pie-chart'
					},
					// {
					// 	name: '全部清单',
					// 	icon: 'iconfont icon-shoujixiang1'
					// },
				],
			};
		},
		props:['isLogin','index','avatarUrl','name'],
		computed:{
			aurl() {
			// console.log(this.isLogin)
				if(this.isLogin) {
					return this.avatarUrl;
				} else {
					return '/static/img/avatar.png';
				}
			}
		},
		methods:{
			// 返回类型index
			turnSide(index) {
				this.$emit('turnSide',index);
				this.show = false;
			},
			
		}
	}
</script>

<style lang="scss">
// 侧边弹窗
		.sideBar {
			
			// 侧边弹窗宽度
			.over {
				width: 500rpx;
			}
			// 侧边弹窗顶部
			.top {
				width: 100%;
				height: 20vh;
				background-color: #ff5566;
			}
			// 清单
			
			.item {
				height: 7vh;
				display: flex;
				align-items: center;
				margin-left: 30rpx;
			}
		}
</style>
