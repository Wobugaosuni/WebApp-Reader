//声明常量
			var Dom = {
				topNav : $('#topNav'),
				bottomMod : $('#bottomMod'),
				bottomIcon : $('#bottomIcon'),
				nightButton : $('#nightButton'),
				nightIcon : $('#nightIcon'),
				dayIcon : $('#dayIcon')
			}
			var fontContainer = $('#fontContainer');
			var fontButton = $('#fontButton')
			var Win = $(window);
			var Doc = $(document);
			var fictionContainer = $('#fictionContainer');
			var bkContainer = $('#bkContainer');
			var body = $('body');

//判断是否为夜间模式
			var nightMode = false;

			var readerUI;

//章节ID的本地存储
			var chapter_id;

//字体大小的本地存储
			var initFontSize = parseInt(Util.StorageGetter('test')) || 14;
			fictionContainer.css('fontSize',initFontSize+'px');

//从缓存中读取的信息进行展示
			var ModuleFontSwitch = (function(){
				var colorArr = [{
					value : '#f7eee5',
					name : '米白',
					font : ''
				},{
					value : '#e9dfc7',
					name : '纸张',
					font : '',
					id : "font_normal"
				},{
					value : '#a4a4a4',
					name : '浅灰',
					font : ''
				},{
					value : '#cdefce',
					name : '护眼',
					font : ''
				},{
					value : '#283548',
					name : '灰蓝',
					font : '#7685a2',
					bottomcolor : '#fff'
				},{
					value : '#0f1410',
					name : '夜间',
					font : '#4e534f',
					bottomcolor : 'rgba(255,255,255,0.7)',
					id : "font_night"
				}];

				var color = Util.StorageGetter('background-color');
				var font = Util.StorageGetter('font-color');
				var tool_bar = Util.StorageGetter('toolbar-background-color');
				var bkCurColor = Util.StorageGetter('background-color');

				for(var i = 0; i < colorArr.length; i++){
					var display = 'none';
					if(bkCurColor == colorArr[i].value){
						display = '';
					}
					bkContainer.append('<div class="bk-container" id="' + colorArr[i].id + '" data-font="' + colorArr[i].font + '"  data-bottomcolor="' + colorArr[i].bottomcolor + '" data-color="' + colorArr[i].value + '" style="background-color:' + colorArr[i].value + '"><div class="bk-container-current" style="display:' + display + '"></div><span style="display:none">' + colorArr[i].name + '</span></div>');
				}
				if (color) {
					body.css('background', color);
				}

				if (font) {
					$('.m-read-content').css('color', font);
				}

	//夜间模式的缓存
				var fontColor = Util.StorageGetter('font-color');
				if(fontColor == '#4e534f'){
					Dom.dayIcon.show();
					Dom.nightIcon.hide();
					nightMode = false;
				}else{
					Dom.dayIcon.hide();
					Dom.nightIcon.show;
					nightMode = true;
				}
			})();