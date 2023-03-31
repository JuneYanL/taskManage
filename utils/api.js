import { $get,$post,$put,$delete } from "./request.js";

import store from "../store/index.js";
let shortId = store.state.loginInfo.shortId;

// // 格式化时间
// function formatter(date) {
// 	let Y,M,D,h,m,s;
// 	Y = date.getFullYear();
// 	M = date.getMonth()+1;
// 	D = date.getDate();
// 	h = date.getHours();
// 	m = date.getMinutes();
// 	s = date.getSeconds();
	
// 	M = M<10?'0'+M:M;
// 	D = D<10?'0'+D:D;
// 	h = h<10?'0'+h:h;
// 	m = m<10?'0'+m:m;
// 	s = s<10?'0'+s:s;
	
// 	return `${Y}-${M}-${D} ${h}:${m}:${s}`;
// }
// 格式化后2022-05-08 13:09:11
// let today = formatter(new Date());
let today = new Date().getTime();

// --------------获取清单列表---------------------------------------

// 获取全部清单列表
export const $getList = (shortId) =>{
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}"}`;
	return $get(url);
}

// 获取当前类型的全部列表
// 获取收集箱、、、等的清单列表
export const $getCurrList = (type)=>{
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}"}`;
	return $get(url);
}

export const $getDetail = (id) =>{
	let url = `/1.1/classes/lists/${id}`;
	return $get(url);
}

// 获取收集箱、、、等的清单列表
export const $getListType = (type,finish)=>{
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}","finish":${finish}}`;
	return $get(url);
}

// 根据时间升序获取清单列表
export const $getListTime = (type,finish)=>{
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}","finish":${finish}}&order=time`;
	return $get(url);
}

// 获取今天的清单列表
export const $getListToday = (type,finish)=>{
	let pre = new Date('2022-5-8').getTime();//今天零点
	let hou = new Date('2022-5-9').getTime();//明天零点
	
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}","finish":${finish},"time":{"$gte":${pre},"$lt":${hou}}}`;
	return $get(url);
}

// $getListToday(0,false).then(res=>console.log(res));
// 获取已过期且未完成的清单列表
export const $getListGuo = (type,finish)=>{
	
	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}","finish":${finish},"time":{"$lt":${today},"$ne":0}}`;
	return $get(url);
}

// 获取未过期且未完成的清单列表
export const $getListWei = (type,finish)=>{

	let url = `/1.1/classes/lists?where={"shortId":"${shortId}","type":"${type}","finish":${finish},"$or":[{"time":{"$gte":${today}}},{"time":0}]}`;
	return $get(url);
}
// $getListWei('收集箱',false).then(res=>{console.log(res)});

// --------------------创建对象-----------------------------------
// 创建清单
export const $add = (obj)=>{
	let url = `/1.1/classes/lists`;
	return $post(url,obj);
}
// 创建收集箱
let obj = {
	shortId,   //判断用户的唯一标识
	type: 3,			 //对应清单分类的type
	title: '等待清单3',
	time: today+10000000,
	tag: ['测试'],
	finish: false
}
// $add(obj).then(res=>console.log(res));

// ---------------------删除对象-------------------------------
export const $deleteList = (id)=>{
	let url = `/1.1/classes/lists/${id}`;
	return $delete(url);
}
// --------------------------编辑对象-----------------------------

export const $editlist = (obj)=>{
	let url = `/1.1/classes/lists/${obj.objectId}`;
	return $put(url,obj);
}

// 清单模块
// 修改完成情况
export const $editFinish = (id,obj)=>{
	let url = `/1.1/classes/lists/${id}`;
	return $put(url,obj);
}


// 首页提醒模块
// 获取数据
// export const $editFinish = (shortId,obj)=>{
// 	let url = `/1.1/classes/lists/`;
// 	return $put(url,obj);
// }
// 在项目运行的时候，删除该用户非今日的任务，在今日完成任务的时候，加一个时间戳并保存
// 直接获取收集箱数据
// {
// 	shoujixiang:false,
// 	guo: [],//即将过期列表
//	
// }