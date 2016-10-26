//todo 渲染基本的UI结构
			function ReaderBaseFrame(container){
				//完成两步的事情：1、调用获得的数据；2、把解析完的数据添加到DOM节点
				function parseChapterData(jsonData){
					var jsonObj = JSON.parse(jsonData);
					var html = '<h4>' + jsonObj.t + '</h4>';
					//遍历jsonObj的p数组
					for(var i=0;i<jsonObj.p.length;i++){
						html += '<p>' + jsonObj.p[i] +'</p>';
					}
					return html;
				}
				return function(jsonData){
					//container.html():获得container的html代码
					container.html(parseChapterData(jsonData));
				}
			}