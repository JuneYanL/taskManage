<template>

	<view>
		
		
				<u-button>请在以下选项中选择清单类型</u-button>
				
		
		
		
		<view class="flex">
			<text class="margin-right-sm text-bold">是否执行:</text>
		
		 <u-radio-group
		    v-model="carryvalue"
		    placement="row"
		  >
		    <u-radio
		      :customStyle="{marginBottom: '8px'}"
		      v-for="(item, index) in carrylist"
		      :key="index"
		      :label="item.name"
		      :name="item.name"
		      @change="carryChange"
		    >
		    </u-radio>
		  </u-radio-group>
		</view>
		  
		  <view class="flex">
			  <text class="margin-right-sm text-bold">多久完成:</text>
		  
		  <u-radio-group
		     v-model="immvalue"
		     placement="row"

		   >
		     <u-radio
		       :customStyle="{marginBottom: '8px'}"
		       v-for="(item, index) in immlist"
		       :key="index"
		       :label="item.name"
		       :name="item.name"
		       @change="immChange"
		     >
		     </u-radio>
		   </u-radio-group>
		  </view>
		   
		   <view class="flex">
			   <text class="margin-right-sm text-bold">是否派发:</text>
		   
		   <u-radio-group
		      v-model="waitvalue"
		      placement="row"

		    >
		      <u-radio
		        :customStyle="{marginBottom: '8px'}"
		        v-for="(item, index) in waitlist"
		        :key="index"
		        :label="item.name"
		        :name="item.name"
		        @change="waitChange"
		      >
		      </u-radio>
		    </u-radio-group>
			</view>
			
			
			
			<choice-selected :choiceContent="type" :choiceIndex="choiceIndex" :choiceList="choiceList"
			              @onChoiceClick="onChoiceClick"></choice-selected>
			
			<view class="placeholder">
				<button @click="val_type" class="submit">{{opt}}</button>
			</view>
			
	</view>
</template>

<script>
	// import {$getList,$getListTime} from '../../utils/api.js';
	   import choiceSelected from './ChoiceSelected.vue'
	export default {
		components: {
		            choiceSelected
		        },
		name:"judge" ,
		onShow() {
				
		},
		data() {
			return {
				// 选择清单类
				title:'标题',
							list: [
								{
									name:'选项一',
									subname:"选项一描述",
									color:'#ffaa7f',
									fontSize:'20'
								},
								{
									name: '选项二禁用',
									disabled:true
								},
								{
									name: '开启load加载', //开启后文字不显示
									loading:true
								}
							],
							typeshow: false,
				 // 基本案列数据
				          carrylist: [{
				            name: '不确定',
				            disabled: false
				          },
				            {
				              name: '执行',
				              disabled: false
				            },
				            {
				              name: '不执行',
				              disabled: false
				            }
				          ],
				          carryvalue: '不确定',
						  
						  immlist: [{
						    name: '不确定',
						    disabled: false
						  },
						    {
						      name: '2分钟内完成',
						      disabled: false
						    },
						    {
						      name: '2分钟以上完成',
						      disabled: false
						    }
						  ],
						  immvalue: '不确定',
						  
						  waitlist: [{
						    name: '不确定',
						    disabled: false
						  },
						    {
						      name: '派发他人',
						      disabled: false
						    },
						    {
						      name: '自己完成',
						      disabled: false
						    }
						  ],
						  waitvalue: '不确定',
						  
				type : '收集箱',
				
				show : false,
				
				// 清单列表
				choiceList: [{
				                        choiceItemId: "0",
				                        choiceItemContent: "收集箱"
				                    },
				                    {
				                        choiceItemId: "P",
				                        choiceItemContent: "备忘录"
				                    },
				                    {
				                        choiceItemId: "L",
				                        choiceItemContent: "执行清单"
				                    },
				                    {
				                        choiceItemId: "X",
				                        choiceItemContent: "等待清单"
				                    }
				                ],
				                choiceContent: "收集箱", //选择的内容
				                choiceIndex: this.index //选择位置
				
			};
		},
		props:['index','opt'],
		watch: {
			index() {
				this.type = ['收集箱','备忘录','执行清单','等待清单'][this.index];
				this.choiceIndex = this.index;
				this.typeChange(this.type);
			}
		},
		methods: {	  
			carryChange(carry) {
				this.type = this.getType(carry,this.immvalue,this.waitvalue);
				// console.log(carry,this.immvalue,this.waitvalue,this.type)
			},
			
			immChange(imm) {
				this.type = this.getType(this.carryvalue,imm,this.waitvalue);
				// console.log(this.carryvalue,imm,this.waitvalue,this.type)
			},
			
			waitChange(wait) {
				this.type = this.getType(this.carryvalue,this.immvalue,wait);
				// console.log(this.carryvalue,this.immvalue,wait,this.type)
			},
			
			typeChange(type) {
				let obj = this.getV(type);
				this.carryvalue = obj.carry;
				this.immvalue = obj.value;
				this.waitvalue = obj.wait;
				this.show = false;
			},
			
			getType(carry,imm,wait) {
							let type;
							if(carry === '不确定'){
							  type = '收集箱';
							} else if(carry === '执行') {
							  if(wait == '派发他人') {
							    type = '等待清单';
							  } else {
							    type = '执行清单';
							  }
							} else {
							  type = '备忘录';
							}
							return type;
						},
			// 根据type计算carry\wait\imm变量
			getV(type) {
				// 执行否,立即做否,等待否
				let carry,imm,wait;
				switch(type) {
				  case '收集箱': carry ='不确定'; break;
				  case '备忘录': carry = '不执行'; wait = '自己完成';break;
				  case '执行清单': carry = '执行'; wait = '自己完成';break;
				  case '等待清单': carry = '执行'; wait='派发他人';break;
				  default : console.log('选择清单类型错误');break;
				}
				return {
					carry,
					imm,
					wait
				}
			},
			// 返回变量和类型
			val_type() {
				if(!this.carryvalue) {
					this.carryvalue = '不确定'
				}
				if(!this.immvalue) {
					this.immvalue = '不确定'
				}
				if(!this.waitvalue) {
					this.waitvalue = '不确定'
				}
				let obj = {
					judge: {
						carry:this.carryvalue,
						imm: this.immvalue,
						wait: this.waitvalue,
					},

					type:this.type
				}
				// console.log(obj);
				this.$emit('val_type',obj);
			},
			
			// 修改选择的数据
			            onChoiceClick: function(position) {
			                console.log("+++++++" + position)
			                var _this = this
			                _this.choiceIndex = position
							// 显示的内容
							this.type = ['收集箱','备忘录','执行清单','等待清单'][position];
							this.typeChange(this.type);
			            },
			
		}
	}
</script>

<style lang="scss">
  .selected-view {
        width: 80%;
        margin-top: 15rpx;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: white;
    }

    page {
        height: 100%;
        background-color: white;
    }

.submit {
	background-color: #ff5566;
	width: 100%;
	position: fixed;
	bottom: 0;
}
.placeholder {
	height: 124rpx;
}
</style>
