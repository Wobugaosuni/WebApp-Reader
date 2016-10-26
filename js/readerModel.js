//todo 实现和阅读器相关的数据交互的方法			
			function ReaderModel(){
	//获得章节列表信息——chapter.json，使用ajax方法
				
				var chapterTotal;

		//回调代码组织
				var getFictionInfo = function(callback){
					$.get('data/chapter.json',function(data){
						//todo 获得章节信息之后的回调
						//由于data[i].json数据有限，把data.chapters.length定为4
							if(!!chapter_id){
								chapter_id = data.chapters[1].chapter_id;
							}
							chapter_id = Util.StorageGetter('chapterId');	
							chapterTotal = data.chapters.length;
							callback && callback();
					},'json')
				};

		//使用promise代替回调作异步代码组织
				var getFictionInfoPromise = function(){
					return new Promise(function(resolve,reject){
						$.get('data/chapter.json',function(data){
								if(data.result == 0){
									if(!!chapter_id){
										chapter_id = data.chapters[1].chapter_id;
									}
									chapter_id = Util.StorageGetter('chapterId');	
									chapterTotal = data.chapters.length;

									resolve();
								}else{
									reject({'msg':'error'});
								}
								
						},'json')
					})
				} ;


		//通过章节ID获得章节的内容
				var getCurChapterContent = function(chapter_id,callback){
					//data:上面封装好的对json数据解密的方法，是jsonp返回的，而不是传递进来的
					$.get('data/data' + chapter_id + '.json',function(data){
						//查看服务器的状态是否ok
						if(data.result == 0){
							//获得jsonp请求的地址
							var url = data.jsonp;
							//获得数据后对数据进行渲染
							Util.getJSONP(url,function(data){
								//设置断点，然后console:JSON.parse(data)，查看得到的数据结构
								//debugger
								//把回调暴露出去
								//是if(callback){ callback(data) }的缩写，目的是代码健壮性的提升，防治不声明callback就运行导致的报错
								callback && callback(data);
								//console.log(callback)
							});
						}
					},'json');
					Util.StorageSetter('chapterId',chapter_id);
				};

		//使用promise进行异步代码组织
				var getCurChapterContentPromise = function(){
					return new Promise(function(resolve,reject){
						$.get('data/data' + chapter_id + '.json',function(data){
							if(data.result == 0){
								var url = data.jsonp;
								Util.getJSONP(url,function(data){
									resolve(data);
								});
							}else{
								reject();
							}
						},'json');
					})	
				}


	//页面加载时数据初始化
				var init = function(callback){
					// getFictionInfo(function(){
					// 	//根据章节的id获得章节的内容
					// 	getCurChapterContent(chapter_id,function(data){
					// 		//todo 
					// 		callback && callback(data);
					// 		//console.log(UIcallback);
					// 	})
					// })
					
					getFictionInfoPromise().then(function(){
						return getCurChapterContentPromise();
					}).then(function(data){
						callback && callback(data);
					});
				};

	//上一章翻页
				var prevChapter = function(callback){
					
					chapter_id = parseInt(chapter_id,10);
					if(chapter_id == 1){
						return;
					}
					chapter_id -=1;
					getCurChapterContent(chapter_id,callback);

		//保存章节ID
					Util.StorageSetter('chapterId',chapter_id);

		//加载到下一页时滚回顶部
					Win.scrollTop(0);

					console.log(chapter_id);

				}

	//下一章翻页
				var nextChapter = function(callback){
					
					chapter_id = parseInt(chapter_id,10);
					if(chapter_id == 4){
						return;
					}
					chapter_id +=1;
					getCurChapterContent(chapter_id,callback);

					Util.StorageSetter('chapterId',chapter_id);

		//加载到下一页时滚回顶部
					Win.scrollTop(0);

					console.log(chapter_id);
				}

		//把方法曝光
				return {
					init : init,
					prevChapter : prevChapter,
					nextChapter : nextChapter
				}
			}
