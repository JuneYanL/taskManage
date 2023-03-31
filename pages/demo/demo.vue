<template>

	<view >

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
			
			<view class="typeBox">
				<u--text :text="type" @click="show = !show"></u--text>
				<!-- 选择清单类型 -->
				<view class="typePop" v-show="show">
					
					 <u-radio-group
					    v-model="type"
					    placement="row"
					 
					  >
					    <u-radio
					      :customStyle="{marginBottom: '8px'}"
					      v-for="(item, index) in typelist"
					      :key="index"
					      :label="item.name"
					      :name="item.name"
					      @change="typeChange"
					    >
					    </u-radio>
					  </u-radio-group>
				</view>
			</view>
			
	</view>
</template>

<script>
	// import {$getList,$getListTime} from '../../utils/api.js';
	export default {
		
		data() {
			return {
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
						  
				type : this.index,
				typelist: [{
				  name: '收集箱',
				  disabled: false
				},
				  {
				    name: '备忘录',
				    disabled: false
				  },
				  {
				    name: '执行清单',
				    disabled: false
				  },
				  {
				    name: '等待清单',
				    disabled: false
				  },
				],
				
				show : false,
			};
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
		}
	}
</script>

<style lang="scss">

</style>
