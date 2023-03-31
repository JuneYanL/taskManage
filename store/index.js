import  Vue  from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 用户信息,
			userInfo: uni.getStorageSync('userInfo'),
				// 一般登录之后才有
				// username: uni.getStorageSync('username'), 
				// phone: uni.getStorageSync('phone'),
				// token: uni.getStorageSync('token'),
		// 登录的信息
		loginInfo: uni.getStorageSync('loginInfo'),
		isLogin: false,//用于个人清单页的数据获取
		tixing: false,
			// objectId: '',
			// phone: '',
			// sessionToken: '',
			// shortId: '',
			// username: ''
			
	},
	getters: {
		
	},
	mutations: {
		
		set_userInfo(state,userInfo) {
			state.userInfo = userInfo;
			uni.setStorageSync('userInfo', userInfo);
			
		},
		set_loginInfo(state,loginInfo) {
			state.loginInfo = loginInfo;
			uni.setStorageSync('loginInfo', loginInfo);
		},
		set_isLogin(state,isLogin) {
			state.isLogin = isLogin;
			uni.setStorageSync('isLogin', isLogin);
		},
		set_tixing(state,tixing) {
			state.tixing = tixing;
			uni.setStorageSync('tixing', tixing);
		},
		
	},
	actions: {
		
	}
})

export default store;