<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>



<style lang="scss">
	// 导入iconfont
	@import url("./static/font/iconfont.css");
	// color-ui导入
	@import "colorui/animation.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	// 引入uView基础样式
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	
	// 重置业务样式
	@import '@/static/style/common.scss';
	
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	
</style>
