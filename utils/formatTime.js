// 时间选择器格式化
export const formatter = (type, value) =>{
			                if (type === 'year') {
			                    return `${value}年`
			                }
			                if (type === 'month') {
			                    return `${value}月`
			                }
			                if (type === 'day') {
			                    return `${value}日`
			                }
							if(type === 'hour') {
								return `${value}时`
							}
							if(type === 'minute') {
								return `${value}分`
							}
			                return value
			            };
						
						// 格式化毫秒数
					export const formatTime = (date)=> {
							date = new Date(date);
							let Y = date.getFullYear();
							
							let M = date.getMonth()+1;
							let D = date.getDate();
							let h = date.getHours();
							let m = date.getMinutes();
							console.log('测试时间',Y);
							return `${Y}年${M}月${D}日 ${h}时${m}分`;
						};