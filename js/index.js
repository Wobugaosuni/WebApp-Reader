		(function(){
//todo 整个项目的入口函数	
			'use strict';		
			function main(){
				EventHandler();

	//文章内容的渲染			
				ReaderModel().init(function(data){
					readerUI = ReaderBaseFrame(fictionContainer);
					readerUI(data);
				});
			}
			main();
			
		})();