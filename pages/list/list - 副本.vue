<template>
	<view>
		<!-- 顶部导航栏和侧边栏 -->
		<ListType :isLogin="isLogin" :index="id" :avatarUrl="loginInfo.avatarUrl" @toLogin="toLogin" :name="loginInfo.username" @turnSide="turnSide"/>
			 
			 
			 
			 <!-- 未完成且未过期 -->
			 <u-swipe-action >
			 	<!-- 清单项 -->
			        <u-swipe-action-item
			         :options="options"
			         v-for="(item, index) in curr"
			         :key="index"
			        	@click="del_com"
			        	:name="item.title"
			 		v-if="curr[0]"
			        >
			          <view
			            class="swipe-action u-border-top"
			            :class="[index === curr.length - 1 && 'u-border-bottom']"
			 			@click="getListId(item.objectId)"
			          >
			            <view class="swipe-action__content">
			              <text class="swipe-action__content__text">{{ item.title }}</text>
			            </view>
			 		   
			          </view>
			        </u-swipe-action-item>
			      </u-swipe-action>
			 
			 <!-- 已过期 和已完成-->
			 <u-collapse
			 			:value="['1']"
			 			v-if="guo[0]"
			  >
			    
			    <u-collapse-item
			      title="已过期"
			      name="1"
			 			  class="cell"
			 			  
			    >
			      
			 			  <u-swipe-action-item
			 			    :options="options"
			 			    v-for="(item, index) in guo"
			 			    :key="index"
			 			  						  @click="del_com"
			 			  						  :name="item.title"
			 			  >
			 			    <view
			 			      class="swipe-action u-border-top"
			 			      :class="[index === item.list.length - 1 && 'u-border-bottom']"
			 			  				   @click="getListId(item.objectId)"
			 			    >
			 			      <view class="swipe-action__content">
			 			        <text class="swipe-action__content__text">{{ item.title }}</text>
			 			      </view>
			 			    </view>
			 			  </u-swipe-action-item>
			    </u-collapse-item>
			    
			  </u-collapse>
			 <!-- 已完成 -->
			 <u-collapse
			 			:value="['2']"
			 			v-if="done[0]"
			  >
			    
			    <u-collapse-item
			      title="已完成"
			      name="2"
			 			  class="cell"
			 			  
			    >
			      
			 			  <u-swipe-action-item
			 			    :options="options"
			 			    v-for="(item2, index2) in done"
			 			    :key="index2"
			 			  						  @click="del_com"
			 			  						  :name="item2.title"
			 			  >
			 			    <view
			 			      class="swipe-action u-border-top"
			 			      :class="[index2 === item.list.length - 1 && 'u-border-bottom']"
			 			  				   @click="getListId(item2.objectId)"
			 			    >
			 			      <view class="swipe-action__content">
			 			        <text class="swipe-action__content__text">{{ item2.title }}</text>
			 			      </view>
			 			    </view>
			 			  </u-swipe-action-item>
			    </u-collapse-item>
			    
			  </u-collapse>
			 <!-- 新增基础清单 -->
			<Add :shortId="loginInfo.shortId" :index="id" @add="add"/>
			 
	</view>
</template>

<script>
	// 导入组件
	import ListType from 'components/listType.vue';
	import Add from 'components/add.vue';
	import {mapState} from 'vuex';
	// 获取数据
	import * as api from '../../utils/api.js';

	export default {
		components: {
			ListType,
			Add
		},
		data() {
			return {
				// ---------------------清单列表---------------------------
				//当前显示数据是计算属性
				curr: [],//未完成未过期数据
				guo: [],//已过期
				done: [],//已完成
				list: [],//当前显示的数据
				
				zheTitle:['已过期','已完成'],
				
				// ----------------判断登录--------------------------------
				isLogin: false,
				
				// ----------顶部导航栏和侧边栏-----------------------------
				
				id: 0,//先为全部列表，然后再获取数据后改为0触发watch
				
				
				
				//---------滑动单元格选项（删除和完成）----------------
				options:  [
							{
				                text: '删除',
				                style: {
				                    backgroundColor: '#3c9cff',
				                        }
				            },
				            {
				                text: '完成',
				                style: {
				                        backgroundColor: '#f9ae3d',
				                        }
				            },
				        ],
						
						
				//---------------------------新增清单---------------------
				
			};
		},
		onShow() {
			// 判断用户是否登录,没登陆跳转登录页
			if(!this.loginInfo.objectId) {
				// 用户没登陆
				uni.switchTab({
					url:'../my/my'
				})
			} else {
				// console.log('进来了');
				if(this.isLogin == false) {
					// 获取当前清单类型的数据
					this.getListType();
					// this.id = 0;
					
					this.isLogin = true;
				}
			}
		},
		computed: {
			
			// ------------------vuex存储-------------------------------
			...mapState(['loginInfo'])
		},
		watch: {
		},
		methods: {
			// -------------------------获取后台数据---------------------------
			
			// 根据清单类型编号进行条件查询
			getListType() {
				let type = ['收集箱','备忘录','执行清单','等待清单'][this.id];
				// 先清空
				this.curr = [];
				this.guo = [];
				this.done = [];
				
				// 获取未过期未完成的列表
				api.$getListWei(type,false).then(res=>{
					if(res.data.results.length > 0) {
						this.curr = res.data.results;
					}
					
					// console.log(11,res.data.results);
				})
				// 获取已过期的列表
				api.$getListGuo(type,false).then(res=>{
					if(res.data.results.length > 0) { 
						this.guo = res.data.results;
						
					}
					
					// console.log(res);
				});
				// 获取未完成的列表
				api.$getListType(type,true).then(res=>{
					if(res.data.results.length > 0) {
						this.done = res.data.results;
						
					}
					// console.log(res);
				});
				
			},
			
			// ------------------------对获取的数据进行处理-----------------------
			
			// 添加数据时,获取add组件返回的obj
			add(obj) {
				console.log('添加',obj);
				// 当前清单类型
				let type = ['收集箱','备忘录','执行清单','等待清单'][this.id];
				// 增加清单项到对应清单
				let url = '/1.1/classes/lists';
				
				this.$post(url,obj).then(res=>{
					console.log(res);
					obj.objectId = res.data.objectId;
					// 前端添加到列表
					if(type === obj.type) {
						// 添加的任务就在当前页显示
						// 一般新增都是未完成的
						
						if(obj.time >new Date().getTime() || obj.time == 0) {
						// 	// 未过期未完成
							this.curr.push(obj);
						} else {
						// 	// 已过期未完成
							// let list = this.guo;
							// list.push(obj);
							// this.guo = [];
							// this.guo = list;
							this.getListType();
							// let list = this.guo.push(obj);
							// this.guo 
						console.log('adas',this.guo);
						}
					}
				});
				
			},
			// 删除数据时,传入id，找到该清单在列表的位置，删除，传给后台删除
			delete(objectId) {
				
				let url = '/1.1/classes/lists/'+ objectId;
				this.$delete(url).then(res=>console.log('删除成功',res));
			},
			// 编辑数据时
			
			
			
			
			
			// ---------------新增清单---------------------
			
			
			// -------------导航栏和侧边栏---------------------
			turnSide(index) {
				if(index === 3) {
					uni.switchTab({
						url:'../waitTask/waitTask'
					})
				} else{
						this.id = index;
						this.getListType();
				}
				
			},
			toLogin() {
				uni.switchTab({
					url:'../my/my'
				})
			},
			
			// -------------------------滑动单元格---------------------------
			
			// 点击删除和完成,返回objectId和操作
			del_com(e) {
				console.log('删除和完成',e);
			},
			// 跳转详情
			getListId(objectId) {
				uni.navigateTo({
					url:'../list/detail?objectId=' + objectId
				});
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getList();
		
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss">
	// 滑动单元格
	.u-page {
	       padding: 0;
	   }
	
	   .u-demo-block__title {
	       padding: 10px 0 2px 15px;
	   }
	
	   .swipe-action {
	       &__content {
	            padding: 25rpx 0;
	   
	           &__text {
	                font-size: 15px;
	                color: $u-main-color;
	                padding-left: 30rpx;
	            }
	       }
		}
		
		
		
		
</style>
