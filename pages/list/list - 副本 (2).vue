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
			         :key="item.objectId"
			        	@click="del_com"
			        	:name="JSON.stringify({index,listid:2})"
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
			 			:value="['2']"
						ref="collapse"
			  >
			    
			    <u-collapse-item
			      :title="zheTitle[index]"
			      name="2"
			 			  class="cell"
			 			  v-for="(item,index) in zheLists"
			 			  :key="index"
						  ref="collapseItem"
			    >
			      
			 			  <u-swipe-action-item
			 			    :options="options"
			 			    v-for="(item2, index2) in item"
			 			    :key="item2.objectId"
			 			  						  @click="del_com"
			 			  						  :name="JSON.stringify({index:index2,listid:index})"
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
			 <!-- 已完成 -->
			 
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
				
				allList: [],//全部列表
				currList:[],//当前类型列表
				curr: [],//未完成未过期数据
				guo: [],//已过期
				done: [],//已完成
				list: [],//当前显示的数据
				
				zheTitle:['已过期','已完成'],
				zheLists: [
						[
							{
								title: '收集箱111',
								finish: false
							},
							{
								title: '收集箱121',
								finish: false
							},
						],
						 [
							{
								title: '收集箱333',
								finish: true
							},
							{
								title: '收集箱321',
								finish: true
							},
						],
				],
				// ----------------判断登录--------------------------------
				isLogin: false,
				
				// ----------顶部导航栏和侧边栏-----------------------------
				
				id: 0,//先为全部列表，然后再获取数据后改为0触发watch
				type:'收集箱',
				
				
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

					// 获取当前清单类型的数据
					this.getListType();
					// this.id = 0;
					
				this.isLogin = true;	

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
				// 先获取当前类型的全部列表
				api.$getList().then(res=>{
					console.log('全部列表',res);
					this.allList = res.data.results;
					this.getDiffList();//把列表分类
				})
				
				// 先清空
				this.curr = [];
				this.guo = [];
				this.done = [];
				this.zheLists = [];
				// 获取未过期未完成的列表
				api.$getListWei(this.type,false).then(res=>{
					if(res.data.results.length > 0) {
						this.curr = res.data.results;
					}
					
					// console.log(11,res.data.results);
				})
				// 获取已过期的列表
				api.$getListGuo(this.type,false).then(res=>{
					if(res.data.results.length > 0) { 
						this.guo = res.data.results;
						this.zheLists.push(res.data.results);

					}
					
					// console.log(res);
				});
				// 获取未完成的列表
				api.$getListType(this.type,true).then(res=>{
					if(res.data.results.length > 0) {
						this.done = res.data.results;
						this.zheLists.push(res.data.results);
					}
					// console.log(res);
				});
				
			},
			
			// ------------------------对获取的数据进行处理-----------------------
			// 传入列表,分成分类,未完成,已过期,已完成
			getDiffList() {
				
			},
			
			// 添加数据时,获取add组件返回的obj
			add(obj) {
				console.log('添加',obj);
				// 当前清单类型
				
				// 增加清单项到对应清单
				let url = '/1.1/classes/lists';
				
				this.$post(url,obj).then(res=>{
					console.log(res);
					obj.objectId = res.data.objectId;
					// 前端添加到列表
					if(this.type === obj.type) {
						// 添加的任务就在当前页显示
						// 一般新增都是未完成的
						
						if(obj.time >new Date().getTime() || obj.time == 0) {
						// 	// 未过期未完成
							this.curr.push(obj);
						} else if(this.zheLists[0]){
						// 	// 已过期未完成
						console.log('更新',this.zheLists);
							this.zheLists[0].push(obj);
							
							this.$nextTick(()=>{
								this.$refs.collapse.init();
								// this.$refs.collapseItem[0].queryRect();
								// console.log(1);
							})
							
							// this.guo.push(obj);
						} else {
							this.getListType();
						}
					}
				});
				
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
						this.type = ['收集箱','备忘录','执行清单','等待清单'][this.id];
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
				// {
				// 	index,		//0删除，1完成
				// 	name:{
				// 		index,		//该列表的下标
				// 		listid		//0已过期列表，1已完成列表，2未完成列表
				// 	}
				// }
				e.name = JSON.parse(e.name);
				// 先获得objectId
				let id = null,obj = null;
				let listid = e.name.listid;
				let index = e.name.index;
				switch(listid) {
					case 0: obj = this.zheLists[0][index]; id = obj.objectId; break;
					case 1: obj = this.zheLists[1][index]; id = obj.objectId; break;
					case 2: obj = this.curr[index]; id = obj.objectId; break;
				}
				// 先完成删除操作
				// console.log('id是：',id);
				if(e.index == 0) {
					api.$deleteList(id).then(res=>{
						uni.showToast({
							title:'删除成功'
						})
						if(listid == 2) {
							this.curr.splice(index,1);
						} else {
							this.zheLists[listid].splice(index,1);
						}
					})
					
				} else {
					
					if(listid == 1) {
					// 已完成变未完成	
					let obj = {
						objectId:id,
						finish:false
					};
					
					let overdue  = true;
					// 判断是否过期
					if(obj.time == 0 || obj.time > new Date().getTime()) {
						overdue = false;
					}
					
					api.$editlist(obj).then(res=>{
						uni.showToast({
							title: overdue?'放入已过期中':'已给你重新添加任务'
						})
						obj.finish = false;
						if(overdue) {
							this.zheLists[1].splice(index,1);//删除
							this.zheLists[0].push(obj);//添加
							
							this.$nextTick(()=>{
								this.$refs.collapse.init();
								// this.$refs.collapseItem[0].queryRect();
								// console.log(1);
							})
						} else {
							this.zheLists[1].splice(index,1);
							this.curr.push(obj);
						}
					});
					
					} else {
					// 未完成变已完成	
					
						let obj2 = {
							objectId:id,
							finish:true
						};
					// 发送修改请求
						api.$editlist(obj2).then(res=>{
							uni.showToast({
								title: '完成'
							});
							// 判断列表，0已过期，2未过期
							if(listid == 2) {
								this.curr.splice(index,1);
								
							} else {
								this.zheLists[0].splice(index,1);
								
							}
							// 添加
							// 判断当前是否有已完成折叠版
							if(this.zheLists[1]) {
								this.zheLists[1].push(obj);//添加
								
								this.$nextTick(()=>{
									this.$refs.collapse.init();
									// this.$refs.collapseItem[0].queryRect();
									// console.log(1);
								})
							} else {
								this.getListType();
							}
						})
					}
					
				}
				
				
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
