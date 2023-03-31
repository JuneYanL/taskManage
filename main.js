
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 挂载全局异步请求方法
import * as api from './utils/request.js';
for(let key in api) {
	Vue.prototype[key] = api[key];
}

// 导入uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 导入仓库
import store from "./store/index.js"

// 引入uView对小程序分享的mixin封装
let mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif