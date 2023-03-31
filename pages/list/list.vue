<template>
	<view>
		<!-- 顶部导航栏和侧边栏 -->
		<ListType :isLogin="isLogin" :index="id" :avatarUrl="loginInfo.avatarUrl" @toLogin="toLogin" :name="loginInfo.username" @turnSide="turnSide"/>
			 

			 
			 <!-- 未完成且未过期 -->
			 <u-swipe-action >
			 	<!-- 清单项 -->
			        <u-swipe-action-item
			        :options="options"
			        v-for="(item, index) in list"
			        :key="item.objectId"
			        @click="del_com"
			        :name="item.objectId"
			 		v-if="list[0]"
			        >
			          <view
			            class="swipe-action u-border-top"
			            :class="[index === list.length - 1 && 'u-border-bottom']"
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
			 			:value="['0','1']"
						ref="collapse">
			    <u-collapse-item
				v-for="(item,index) in fold"
				:key="index"
			    :title="item.title"
			    :name="index"
			 	class="cell"
				ref="collapseItem"
			    >
			      
			 			  <u-swipe-action-item
			 			    :options="options"
			 			    v-for="(item2, index2) in item.lists"
			 			    :key="item2.objectId"
			 			  	@click="del_com"
			 			  	:name="item2.objectId"
			 			  >
			 			    <view
			 			    class="swipe-action u-border-top"
			 			    :class="[index2 === item.lists.length - 1 && 'u-border-bottom']"
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
				// ----------------判断登录--------------------------------
				
				allList: [],//全部列表
				
				today: new Date().getTime(),//当前时间戳
				
				
				
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
		onShow() {
			
			
			if(this.loginInfo.objectId && this.isLogin === false) {
				this.today = new Date().getTime();
				setInterval(()=>{
					this.today = new Date().getTime();
				},10000);
				
				// let time = setInterval(()=>{
					
					this.getListType();
				// },3000);
				// if(this.allList.length !== 0) {
				// 	clearInterval(time);
				// }
			}
		},
		computed: {
			
			// ------------------vuex存储-------------------------------
			...mapState(['loginInfo','isLogin']),
			
			// 未完成且未过期
			list() {
				
				return this.allList.filter(item=>{
					return item.type === this.type && !item.finish && (item.time === 0 || item.time > this.today);
				});	
			},
			fold() {
				// 必须要重新计算折叠栏高度
				this.$nextTick(()=>{
					this.$refs.collapse.init();
				});
				// 已过期
				let overdue = this.allList.filter(item=>{
					return item.type === this.type && !item.finish && item.time !== 0 && item.time < this.today;
				})
				// 已完成
				let done = this.allList.filter(item=>{
					return item.type === this.type && item.finish ;
				});
				return [
					{
						title:'已过期',
						lists: overdue
					},
					{
						title:'已完成',
						lists: done
					},
				];
			}
		},
		watch: {
		},
		methods: {
			
			// -------------------------获取后台数据---------------------------
			// 根据清单类型编号进行条件查询
			getListType() {
				// 先获取当前类型的全部列表
				// api.$getCurrList('收集箱').then(res=>{
				// 	console.log('收集箱',res);
				// 	this.shoujixiang = res.data.results;
					
				// });
				// api.$getCurrList('备忘录').then(res=>{
				// 	console.log('备忘录',res);
				// 	this.beiwanglu = res.data.results;
					
				// });
				// api.$getCurrList('执行清单').then(res=>{
				// 	console.log('执行清单',res);
				// 	this.zhixingqingdan = res.data.results;
					
				// })
				api.$getList(this.loginInfo.shortId).then(res=>{
					console.log('全部清单',res);
					
					if(res.data.results.length>0) {
						this.allList = res.data.results;
						this.$store.commit('set_isLogin',true);
					}
					
				})

			},
			
			// ------------------------对获取的数据进行处理-----------------------
			
			
			// 添加数据时,获取add组件返回的obj
			add(obj) {
				console.log('添加',obj);
				// 当前清单类型
				
				// 增加清单项到对应清单
				let url = '/1.1/classes/lists';
				// 提交后台
				this.$post(url,obj).then(res=>{
					// console.log(res);
					obj.objectId = res.data.objectId;
					// 前端添加到列表
					this.allList.push(obj);
					uni.showToast({
						title:'添加成功'
					})
					
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
						// this.getListType();
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
				// 	name,		//objectId
				// console.log(e,'e')
				
				// 根据objectId找出下标
				
				let index = this.allList.findIndex(item=>{
					return item.objectId == e.name;
						
				})
				
				let obj = this.allList[index];
				
				if(e.index) {
					api.$editFinish(e.name,{finish:!obj.finish}).then(res=>{
						uni.showToast({
							title:'修改成功'
						});
						obj.finish = !obj.finish;
						this.allList.splice(index,1,obj);
					})
				} else {
					api.$deleteList(e.name).then(res=>{
						
						
						if(index === -1) {
							uni.showToast({
								title:'删除失败'
							})
						}else {
								this.allList.splice(index,1);
								uni.showToast({
									title:'删除成功'
								})
						}
						
					})
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
			this.getListType();
			uni.showToast({
				icon:'loading'
			})
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
