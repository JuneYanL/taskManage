let baseUrl = 'https://6zl0snvm.lc-cn-n1-shared.com';
		// 数据请求
const $http = function(url,method,data={}) {
		return new Promise((resolve,reject)=>{
			uni.request({
				url: baseUrl+url,
				method,
				data,
				header: {
					"X-LC-Id": "6zl0SNVm3IOBBPtEUSXea5su-gzGzoHsz",
					"X-LC-Key": "6QrXp3mYKnT2z7Xb5c3PtGbt",
					"Content-Type": "application/json"
				},
				
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject('请求失败',err);
				}
			})
		});
}

export const $get = function(url,data={}) {
	return $http(url,'GET',data);
}
export const $post = function(url,data={}) {
	return $http(url,'POST',data);
}
export const $put = function(url,data={}) {
	return $http(url,'PUT',data);
}
export const $delete = function(url,data={}) {
	return $http(url,'DELETE',data);
}