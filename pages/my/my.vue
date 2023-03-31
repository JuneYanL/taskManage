<template>
	<view class="container">
		<u-navbar class="text-white" title="个人中心" :placeholder="true" leftIconColor="#fff"></u-navbar>
	  <view class="userinfo">
	    <!-- <view v-if="!hasUserInfo">
	      <button @click="getUserProfile" class="logoutbtn"> 微信一键登录 </button>
	    </view> -->
	    <!-- <view v-else> -->
	      <view class="flex flex-direction align-center">
			  <image @click="bindViewTap" class="avatar" :src="avatarUrl" mode="cover"></image>
			  <text class="margin-top-xl text-xl">{{hasUserInfo?loginInfo.username:'尚未登录'}}</text>
		  </view>
		  <button @click="logout" class="logoutbtn">{{hasUserInfo?'退出登录':'微信一键登录'}}</button>
	    <!-- </view> -->
	  </view>
	  
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				hasUserInfo: false,
				form: {
					username: '',
					password: '',
					avatarUrl: ''
				},
				
			}
		},
		 onLoad() {
			 console.log('用户信息存在否',this.$store.state.loginInfo);
			 if(this.$store.state.loginInfo) {
				this.hasUserInfo = true;
			 	// this.loginInfo = this.$store.state.loginInfo;
			 }
		  },
		onShow() {
			
		},
		computed: {
			loginInfo() {
				return this.$store.state.loginInfo;
			},
			avatarUrl() {
				return this.hasUserInfo?this.$store.state.loginInfo.avatarUrl:'/static/img/avatar.png';
			}
		},
		methods: {
			// 一键注册和登录，先获取头像和昵称，先注册，后登录
			 async getUserProfile() {
				 const res = await wx.getUserProfile({
				  desc: '获取您的头像和昵称',
				});
				
				 // 获取头像和昵称
				let obj = {
										  username: res.userInfo.nickName,
										  avatarUrl: res.userInfo.avatarUrl,
										  password: 'mimashishenme'
				 }
				const wait = await this.register(obj);
				this.login(obj);
				
			  },
			// 注册请求
			register(obj) {
				return this.$post('/1.1/users',obj);
			},
			// 登录请求
			login(obj) {
				this.$post('/1.1/login',obj).then(res=>{
					console.log('登陆成功',res);
					// 把信息存入vuex
					if(res.data.code) {
					uni.showToast({
						title: res.data.error,
						icon:'error	'
					});
					}else {
					this.$store.commit('set_loginInfo',res.data);
					// console.log(this.$store.state.loginInfo,'检查vuex');
					this.hasUserInfo = true;
					}

				}).catch(err=>console.log('登陆失败',err))
			},
			// 退出登录
			logout() {
				if(this.hasUserInfo) {
					// 退出登录
					this.hasUserInfo = false;
					this.$store.commit('set_loginInfo',"");
					this.$store.commit('set_isLogin',false);
				} else {
					// 登录
					this.getUserProfile();
				}
				
			}
		}
	}
</script>

<style lang="scss">

.avatar{
	width: 150rpx;
	height: 150rpx;
	border-radius: 50%;
	margin-top: 100rpx;
}

// .u-navbar__content__title {
// 	color: #fff !important;
// }

// 退出登录按钮
.logoutbtn {
	position: fixed;
	bottom: 50rpx;
	width: 100%;
	color: white;
	background-color: #ff5566;
}
</style>
