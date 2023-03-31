// 参数说明：
// carry:1:未分类，2:执行，3：不执行
// immediately:是否在2分钟内可以完成该清单
// step:是否能一步完成，是否需要多步
// distribute：是否需要派发给他人完成
// time：设置的时间
// complete:是否完成

// 返回说明：(清单类型)
// type: 
// 0:收集箱（未分类），1：备忘录，2：执行清单，3：等待清单，4：已完成,5:全部清单显示

// 在创建清单或修改清单结束时调用

// 是否完成
// 是否需要执行   carry = true
// 是否能2分钟内搞定  imm = true , carry = true
// 是否要自己做 wait = true  ，carry = true  ， 
export const gtd(complete,carry,dis) {
	let type = 0;//初始化，只有名字的未分类的清单类型
	if(!complete) {
		if(carry === 1) {
			type = 0;//未分类
		} else if(carry === 2){
			//是否派发任务
			if(dis) {
				//派发
				type = 3；
			} else {
				type = 2;
			}
		} else {
			type = 1;//备忘录
		}
	}else {
		type = 4;//已完成
	}
	return type;
}