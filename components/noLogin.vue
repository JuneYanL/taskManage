<template>
	<view>
		<!-- 前往登陆页面 -->
		<u-action-sheet :actions="list1" :title="title1" :show="show" :closeOnClickOverlay="true" :closeOnClickAction="true" @select="selectClick" @close="clickClose"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		name:"noLogin",
		data() {
			return {
				title1:'您当前没有登录，是否要前往登陆页面',
				list1: [
					{
						name:'确定',
						subname:"前往登录页面",
						color:'#ff5566',
						fontSize:'20'
					},
					{
						name:'取消',
						subname:"继续留在当前页面，但无法页面使用功能",
						color:'#5555ff',
						fontSize:'20'
					},
				],
			};
		},
		
		props:['show'],
		methods:{
			clickClose(e) {
				this.$emit('update:show',false);
				// this.show = false;
			},
			selectClick(index) {
				if(index.name === '确定') {
					uni.switchTab({
						url:'../my/my'
					})
				}else {
					this.$emit('update:show',false);
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
