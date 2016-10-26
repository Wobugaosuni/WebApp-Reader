//todo 交互的事件绑定
		function EventHandler(){
//点击、滑动时上下模块的显示隐藏
			//不用touch?
			//不用zepto tap? tap事件是touchstart和touchend两个事件的封装，本质上代码越简单性能越好--不支持PC端
			//在老版的webkit内核和安卓4.0之前，使用click会有300ms的延时
			//Android 4.0以后click相应时间和tap响应时间差不多
			$('#actionMid').click(function(){
				if(Dom.topNav.css('display') == 'none'){
					Dom.topNav.show();
					Dom.bottomMod.show();
				}else{
					Dom.topNav.hide();
					Dom.bottomMod.hide();
					fontContainer.hide();
					Dom.bottomIcon.removeClass('current');
				}
			});
			Win.scroll(function(){
				Dom.topNav.hide();
				Dom.bottomMod.hide();
				fontContainer.hide();
				Dom.bottomIcon.removeClass('current');
			});

//点击“字体”时的icon变化
			fontButton.click(function(){
				if(fontContainer.css('display') == 'none'){
					fontContainer.show();
					Dom.bottomIcon.addClass('current');
				}else{
					fontContainer.hide();
					Dom.bottomIcon.removeClass('current');
				}
			});

//字体的缩放
			$('#largeFont').click(function(){
				if(initFontSize>19){
					return;
				}
				initFontSize += 1;
				fictionContainer.css('fontSize',initFontSize+'px');
				console.log(initFontSize);

				//把用户自定义的字号进行本地存储
				Util.StorageSetter('test',initFontSize);
			});
			$('#smallFont').click(function(){
				if(initFontSize<12){
					return;
				}
				initFontSize -= 1;
				fictionContainer.css('fontSize',initFontSize+'px');
				console.log(initFontSize);

				Util.StorageSetter('test',initFontSize);
			});


//背景色变化，事件代理方法
			bkContainer.delegate('.bk-container','click',function(){
				var color = $(this).data('color');
				var font = $(this).data('font');
				var bottomcolor = $(this).data('bottomcolor');
				var tool_bar = font;
				bkContainer.find('.bk-container-current').hide();
				$(this).find('.bk-container-current').show();
				if(!font){
					font = '#000';
				}
				if(!tool_bar){
					tool_bar = '#fbfcfc';
				}
				body.css('background',color);
				$('.m-read-content').css('color',font);

				Util.StorageSetter('background-color',color);
				Util.StorageSetter('font-color',font);
				Util.StorageSetter('toolbar-background-color',tool_bar);

	//背景切换时，夜间模式的变化
				var fontColor = Util.StorageGetter('font-color');

				if(fontColor == '#4e534f'){
					nightMode = true;
					Dom.dayIcon.show();
					Dom.nightIcon.hide();
				}else{
					nightMode = false;
					Dom.dayIcon.hide();
					Dom.nightIcon.show();
				}
			});

//白天黑夜切换			
			Dom.nightButton.click(function(){
				if(nightMode){
					Dom.dayIcon.show();
					Dom.nightIcon.hide();

			//trigger() 方法触发被选元素的指定事件类型
					$('#font_normal').trigger('click');

					nightMode = false;
				}else {
					Dom.dayIcon.hide();
					Dom.nightIcon.show();
					$('#font_night').trigger('click');
					nightMode = true;
				};
			});

//上一页翻页
//获得章节的翻页数据 -> 把数据拿出来渲染
			$('#prevButton').click(function(){
				ReaderModel().prevChapter(function(data){
					readerUI(data);
				});
			})		

//下一页翻页
			$('#nextButton').click(function(){
				ReaderModel().nextChapter(function(data){
					readerUI(data);
				});
			})			
			
		}