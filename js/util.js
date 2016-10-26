//*********  本地存储的存取
			var Util = (function(){
			//localStorage在同一个域名下是共享的，为了防止被人误操作，给key加上前缀
				var prefix = 'html5_reader_';
				var StorageSetter = function(key,val){
					return localStorage.setItem(prefix + key,val);
				}
				var StorageGetter = function(key){
					return localStorage.getItem(prefix + key);
				}

				//获得加密后的json数据
				var getJSONP = function(url,callback){
					//调用插件js/jquery.jsonp-2.4.0.min.js封装好的方法
					return $.jsonp({
						url : url,
						cache : true,
						//此callback不是参数里的callback，duokan_fiction_chapter：data1.json的方法名
						callback : 'duokan_fiction_chapter',
						//数据请求成功后的回调，拿到了结果集（最终要的数据）
						success : function(result){
							//设置断点，查看获取到的结果集
							//debugger
							//对数据进行解码，使用base64插件
							var data = $.base64.decode(result);
							//将http的URI编码作解码处理
							var json = decodeURIComponent(escape(data));
							callback(json);
						}
					})
				}
				//把StorageGetter方法暴露出去，相当于得到了一个object
				return {
					getJSONP:getJSONP,
					StorageSetter:StorageSetter,
					StorageGetter:StorageGetter
				}
			})();