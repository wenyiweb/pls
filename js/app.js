var audio;
var canv;
var swiper;
var transform;
var _$ = Zepto;
function fade(id,type,cb){
	var ele = document.querySelector(id);
	if(type == 'out'){
		ele.style.cssText += ';opacity:0;';
	}else if (type == 'in'){
		ele.style.cssText += ';opacity:0;';
		ele.style.display = 'block';
		setTimeout(function(){
			ele.style.cssText += ';opacity:1;';
		},10);
	}
	ele.addEventListener('webkitTransitionEnd',function(){
		if(type == 'out') {
			ele.style.display = 'none';
		}
		if(cb) cb();
		ele.removeEventListener('webkitTransitionEnd', arguments.callee);
	} ,false);
}
function  load(cb){
  var _load = document.querySelector('.loading'),
	per = _load.querySelector('.loadingpercent'),
	logo = document.querySelector('.loading .logo'),
	timer,
	src = 'images/bg.jpg',
	img = new Image();
	logo.addEventListener('webkitTransitionEnd',function(){
		if(timer) return;
		timer = setTimeout(function(){
		  num();
		  timer = null;
		},300)
	  },false)
  var n = 5,t;
  function num(){
	n++;
	if(document.readyState == 'complete'){
	  clearTimeout(t);
	  t= null;
	  per.innerHTML = 100 + '%';
	  // start
	  setTimeout(function(){
		hide()
	  },1000)
	  return;
	}
	per.innerHTML = n + '%';
	if(n==90){
	  n--;
	}
	t = setTimeout(num,100)
  }

  function hide(){
  	fade('.loading','out',function(){
  		cb&&cb();
  	});
  }
  img.onload = function(){
	_load.classList.add('on');
  }
  img.src = src;
}
function initSwiper(){
	swiper = new Swiper("#swiper",{
		//derection:'vertival',
		allowSwipeToPrev:false,
		initialSlide:0,
		slideActiveClass:'on',
		touchMoveStopPropagation:false,
		onInit:function(){
			$('#cover').addClass('first');
		}
	});
	swiperEventInit();
	$('#page1 .ms.ms2').one('webkitTransitionEnd',function(){
		$('#page1 .tip').fadeIn();
		$('#page1').removeClass('swiper-no-swiping');
	});
	//点击图片swiper-no-swiping
	$('#page2 .content1').one('tap',function(){
		$('#page2 .content1').addClass('out');
		$('#page2 .content1 .dp').one('webkitTransitionEnd',function(){
			$('#page2 .tip2').fadeOut();			
			$('#page2 .content1 .girl').fadeOut(function(){
				$('#page2 .content1').hide();
			});
		})
		$('#page2 .content2').addClass('in');
		$('#page2 .ms.ms3').one('webkitTransitionEnd',function(){
			$('#page2 .tip').fadeIn();
			$('#page2').removeClass('swiper-no-swiping');
		})
	});
	//点击图片swiper-no-swiping
	$('#page3 .content1').one('tap',function(){
		$('#page3 .content1').addClass('out');
		$('#page3 .content1 .dp').one('webkitTransitionEnd',function(){
			$('#page3 .tip2').fadeOut();			
			$('#page3 .content1 .girl').fadeOut(function(){
				$('#page3 .content1').hide();
			});
		})
		$('#page3 .content2').addClass('in');
		$('#page3 .ms.ms4').one('webkitTransitionEnd',function(){
			$('#page3 .tip').fadeIn();
			$('#page3').removeClass('swiper-no-swiping');
		})
	});
	//电话铃声
	$('#page4 .ms.ms4').one('webkitTransitionEnd',function(){
		setTimeout(function(){
			$('#cwpb,#page4 .mscontent').css('opacity',0);
			$('.hand-tip').addClass('on');
			$('#cwpb').one('webkitTransitionEnd',function(){
				$('.phone').addClass('on');
			})
		},1000);
	});
	$('.phone').on('click',function(){
		if($(this).hasClass('on')){
			$('#cwpb2').css('opacity',0);
			$('#cwpb2').one('webkitTransitionEnd',function(){
				$('#dialog').fadeIn(function(){
					setTimeout(function(){
						$('.dialog-tip').fadeIn();
					},2000)
				});
			});
		}
	});
	$('.zzdj').on('click',function(){
		if($(this).hasClass('zz')){
			$('#swiper').addClass('out');
			$('.upload-page').addClass('in');
			$('.upload-page').one('webkitTransitionEnd',function(){
				$('#swiper').hide();
			});
			createImg();
		}
	});
}
function swiperEventInit(){
	var f = true;
	_$('#swiper').swipeRight(function(e){
		$('#cover .bg1').addClass('on');
		$('#cover .bg1').on('webkitTransitionEnd',function(){
			if(f){
				f = false;
				//$('#cover .bg1').addClass('onon');
			}
		})
	})
}
/*$('#swiper').addClass('out');
$('.upload-page').addClass('in');
$('.upload-page').one('webkitTransitionEnd',function(){
	$('#swiper').hide();
});
createImg();*/
function createImg(){
	$('.sharebtn').on('click',function(){
		$('.shareDiv').fadeIn();
	})
	var f = document.getElementById('file');
	var data = ['','images/canv.png'];
	f.addEventListener('change', function(){
		var imgfile = f.files[0];
		if(!/image\/\w+/.test(imgfile.type)) {
            alert("请确保文件类型为图像类型");
            return false;
        }
        oriImg(imgfile);
	}, false);
	function oriImg(imgfile){
		$('.file').fadeOut();
		var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fill();
		/*var  Orientation;
        EXIF.getData(imgfile, function() {
		    EXIF.getAllTags(this); 
		    Orientation = EXIF.getTag(this, 'Orientation');
		});*/
        var reader = new FileReader();
        reader.readAsDataURL(imgfile);
        reader.onload = function(e){
        	$('#cc').attr('src',this.result);
        	ee();
        	/*var image = new Image();
	    	image.src = this.result;
	    	image.onload = function(){
	    		var base64 = null;
				var mpImg = new MegaPixImage(image);
					mpImg.render(canvas, {
						maxWidth: 510,
						maxHeight: 700,
						quality: 0.75,
						orientation: Orientation
					});
				
				var base64 = canvas;//canvas.toDataURL("image/jpeg", 1);
				data[0] = base64;
				draw();
				canvasEvent();
	    	}*/
        }
	}
	function draw(x,yrotate,scale){
		var c=document.getElementById('canvas'),
			ctx=c.getContext('2d'),
			len=data.length;
		var x = x||0;
		var y = y||0;
		var scale = scale || 1;
		var rotate = rotate || 0;
		var base64;
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		/*ctx.clearRect(0,0,c.width,c.height);
		ctx.fillStyle='#fff';
		ctx.fill();*/
		/*var img=new Image;
		img.src=data[1];
		img.onload=function(){
			ctx.drawImage(img,0,0,c.width,c.height);
		}*/
		ctx.save();
		ctx.clearRect( 0, 0, c.width, c.height);
		//ctx.translate( clientWidth / 2 , clientHeight / 2 );
		ctx.rotate( rotate );
		ctx.scale( scale, scale );
		//ctx.drawImage( img, -img.width / 2, -img.height / 2 );
		
		function drawing(n){
			if(n == 0){
				ctx.drawImage(data[0],x,y,c.width,c.height);
				ctx.restore();
				//drawing(1);
			}else if(n == 1){
				/*var img=new Image;
				img.src=data[n];
				img.onload=function(){*/
					//ctx.drawImage(img,0,0,c.width,c.height);
					//drawing(2);
				//}
			}/*else{
				//保存生成作品图片
				base64 = c.toDataURL("image/jpeg",1);
				$('.sharebtn').fadeIn();
				//uploadPic(JSON.stringify(base64))
				//fn();
			}*/
		}
		drawing(0);
	}
	function ee(){
		var reqAnimationFrame = (function () {
		    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
		        window.setTimeout(callback, 1000 / 60);
		    };
		})();

		var screen = document.querySelector(".upload-page .content");
		var el = document.querySelector("#cc");

		var START_X = 0;//Math.round((screen.offsetWidth - el.offsetWidth) / 2);
		var START_Y = 0;//Math.round((screen.offsetHeight - el.offsetHeight) / 2);
		var sX = 0;
		var sY = 0;
		var ticking = false;
		
		var timer;

		var mc = new Hammer.Manager(el);

		mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

		/*mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));*/
		mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
		mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

		/*mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
		mc.add(new Hammer.Tap());*/

		mc.on("panstart", onPan);
		mc.on("panmove", onPanmove);
		mc.on("rotatestart rotatemove", onRotate);
		mc.on("pinchstart pinchmove", onPinch);
		/*mc.on("swipe", onSwipe);
		mc.on("tap", onTap);
		mc.on("doubletap", onDoubleTap);*/

		/*mc.on("hammer.input", function(ev) {
		    if(ev.isFinal) {
		        //resetElement();
		    }
		});*/

		function logEvent(ev) {
		    //el.innerText = ev.type;
		}

		function resetElement() {
		    el.className = 'animate';
		    transform = {
		        translate: { x: START_X, y: START_Y },
		        scale: 1,
		        angle: 0,
		        rx: 0,
		        ry: 0,
		        rz: 0
		    };
		    requestElementUpdate();
		}

		function updateElementTransform() {
		    var value = [
		        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
		        'scale(' + transform.scale + ', ' + transform.scale + ')',
		        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
		    ];

		    value = value.join(" ");
		    el.style.webkitTransform = value;
		    el.style.mozTransform = value;
		    el.style.transform = value;
		    ticking = false;
		}

		function requestElementUpdate() {
		    if(!ticking) {
		        reqAnimationFrame(updateElementTransform);
		        ticking = true;
		    }
		}

		function onPan(ev) {
		    el.className = '';
		        sX =  -transform.translate.x + ev.deltaX,
		        sY =  -transform.translate.y + ev.deltaY

		   /* logEvent(ev);
		    requestElementUpdate();*/
		}
		function onPanmove(ev) {
		    el.className = '';
		    transform.translate = {
		        x: -sX + ev.deltaX,
		        y: -sY + ev.deltaY
		    };

		    logEvent(ev);
		    requestElementUpdate();
		}

		var initScale = 1;
		function onPinch(ev) {
		    if(ev.type == 'pinchstart') {
		        initScale = transform.scale || 1;
		    }

		    el.className = '';
		    transform.scale = initScale * ev.scale;

		    logEvent(ev);
		    requestElementUpdate();
		}

		var initAngle = 0;
		function onRotate(ev) {
		    if(ev.type == 'rotatestart') {
		        initAngle = transform.angle || 0;
		    }

		    el.className = '';
		    transform.rz = 1;
		    transform.angle = initAngle + ev.rotation;

		    logEvent(ev);
		    requestElementUpdate();
		}

		function onSwipe(ev) {
		    var angle = 50;
		    transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
		    transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
		    transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

		    clearTimeout(timer);
		    timer = setTimeout(function () {
		        resetElement();
		    }, 300);

		    logEvent(ev);
		    requestElementUpdate();
		}

		function onTap(ev) {
		    transform.rx = 1;
		    transform.angle = 25;

		    clearTimeout(timer);
		    timer = setTimeout(function () {
		        resetElement();
		    }, 200);

		    logEvent(ev);
		    requestElementUpdate();
		}

		function onDoubleTap(ev) {
		    transform.rx = 1;
		    transform.angle = 80;

		    clearTimeout(timer);
		    timer = setTimeout(function () {
		        resetElement();
		    }, 500);

		    logEvent(ev);
		    requestElementUpdate();
		}

		resetElement();
	}
	function canvasEvent(){
		//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
         var harmmer = new Hammer(document.getElementById("canvas"));
         harmmer.startScale = harmmer.initScale = 1;
		 harmmer.startRotate = harmmer.initRotate = 0;	
		harmmer.initX = harmmer.startX = 0;
		harmmer.maxW = 510;
		 harmmer.get("rotate").set({ enable: true });
		 harmmer.get("pinch").set({ enable: true });

		harmmer.on("pinchstart rotatestart panstart", function(e) {
			harmmer.startScale = harmmer.startScale || 1;
			harmmer.initScale = harmmer.startScale || 1;
			harmmer.startRotate = harmmer.startRotate || 0;
			harmmer.initRotate = harmmer.startRotate || 0;
			harmmer.initX = harmmer.startX || 0;
		});

		harmmer.on("pinchout rotatemove panmove", function(e) {
			harmmer.startScale = harmmer.initScale + (e.scale - 1); // 使用toFixed可能会导致不缩放，比如保留两位小数，可能计算出来的还是那个值
		    harmmer.startRotate = harmmer.initRotate + e.rotation;
		    if(harmmer.maxW > 0){
		    	harmmer.startX = harmmer.initX + e.deltaX
		    }
		    setTimeout(function(){
		    	draw(left,top,e.rotation,harmmer.startScale)
		    },20);			    
		});

		harmmer.on("pinchin rotatemove", function(e) {
			harmmer.startScale = harmmer.initScale - (1 - e.scale);
			harmmer.startRotate = harmmer.initRotate + e.rotation;
			if(harmmer.startScale <= 0.5) {
				harmmer.startScale = 0.5;
			};

			setTimeout(function(){
		    	draw(left,top,e.rotation,harmmer.startScale)
		    },20);
		});
		/*harmmer.on("rotatestart", function(e) {
			harmmer.startRotate = harmmer.startRotate || 0;
			harmmer.initRotate = harmmer.startRotate || 0;
		});

		harmmer.on("rotatemove", function(e) {
			harmmer.startRotate = harmmer.initRotate + e.rotation;
			setTimeout(function(){
		    	draw(harmmer.startRotate,harmmer.startScale)
		    },20);
			//harmmer.html(e.rotation);
			//$("#f").html($("#f").html() + e.rotation + "\n");
		});*/

			/*harmmer.on("pinchmove", function(e) {
				pinchBox.css({
					"color" : "#fff",
					"background" : "#75845c"
				});
				
			});

			harmmer.on("pinchend", function(e) {
			    pinchBox.css({
					"color" : "#333",
					"background" : "#ccc"
				});
			});*/

		var cc = document.getElementById('canvas');
		var left = 0,top = 0;
		cc.addEventListener('touchstart', function(e){
			var startX = 0,startY = 0,currentX = 0,currentY = 0,move = false;
			startX = e.touches[0].pageX - left;
			startY = e.touches[0].pageY - top;
			move = true;
			cc.addEventListener('touchmove', function(ev){
				left = ev.touches[0].pageX - startX;
				top = ev.touches[0].pageY - startY;
				setTimeout(function(){
					draw(left,top);
				},10);
			}, false);
		}, false);
	}
}


//废弃
function canvasFn(simpleFile){
	var base64 = '';
	var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	imgs = 'images/canv.png';
	ctx.rect(0, 0, canvas.width, canvas.height);
	function drawing(n){
		if(n == 0){
			var reader = new FileReader();
	        reader.readAsDataURL(simpleFile);
	        reader.onload = function(e){
	        	/*$('#canvas').hide();
	        	$('#cc').attr('src',e.target.result)*/
	        	var image = new Image;
				image.src = e.target.result;
				image.onload=function(){
					ctx.drawImage(image,0,0,canvas.width, canvas.height);
					drawing(1);	
				}
			}
		}else if(n==1){
			var img=new Image;
			//img.crossOrigin = 'Anonymous'; //解决跨域
			img.src=imgs;
			img.onload=function(){
				ctx.drawImage(img,0,0,510,700);	
				drawing(2);		
			}			
			
		}else{
			//保存生成作品图片
			base64 = canvas.toDataURL("image/jpeg",0.8);
			//$('#canvas').hide()
			$('.sharebtn').fadeIn();
			//console.log(JSON.stringify(base64));
			//uploadPic(JSON.stringify(base64))
		}
	}
	drawing(0);
}
	
	
function uploadPic(){
	$.ajax({
	  type: "POST",
	  url: "savePic.php?rand="+Math.random() ,
	  data: { 
		name: $('#nickName').val(),
		mobile: $('#phone').val(),
		imgBase64: imgString 
	  }
	}).done(function(o) {
		var obj = $.parseJSON(o);
		if(obj.status){ //成功
			successFn(obj.msg);//id,url
		}else{ //失败
			alert(obj.msg);
			failFn();
		}
	});	
    //成功  根据返回的图片地址替换分享url
    function successFn(img){
    	shareData.link = window.location.origin + window.location.pathname + '?fimg='+img+'&fname='+$('#nickName').val()+'&fmobile='+$('#phone').val(); 
		$('.share').fadeIn();
    }
    //失败
    function failFn(){
    	subf = true;
    	$('#submitForm').html('提交');
    }

}
var wh =  $(window).height();
$('body').css('height',wh);

$('.loading').height(wh).css({'overflow':'hidden'});
load(function(){
	initSwiper();
	//blingFn.testplay();
	//audio = new Audio();
	//audio.init();
});
function Audio(){
	this.aud = document.querySelector('.audio');
	this.audio = document.querySelector('.audio audio');
}
Audio.prototype = {
	init:function(){
		this.aud.style.display = 'block';
		this.eventFn();
		this.autoplay();
	},
	autoplay:function(){
		var _this = this;
		_this.audio.play();
		_this.aud.classList.add('on');
	},
	play:function(){
		var _this = this;
		if(_this.audio.pause) {
			_this.audio.play();
			this.aud.classList.add('on');
		}
	},
	pause:function(){
		var _this = this;
		if(_this.audio.play){
			 _this.audio.pause();
			 this.aud.classList.remove('on');
		}
	},
	eventFn:function(){
		var _this = this;
		_this.aud.addEventListener('touchstart', function(){
			if(this.classList.contains('on')){
				_this.pause();
			}else{
				_this.play();
			}
		}, false);
	}
}
/**
 * 定制音乐
 * @return {[type]} [description]
 */
var blingFn = {
	ad: document.querySelector('.bling audio'),
	init: function(){
		//audio.pause();
		this.ad.play();
		////blingFn.eventInit();
	},
	m1play:function(){
		document.querySelector('.bling #m1').play();
	},
	m2play:function(){
		document.querySelector('.bling #m2').play();
	},
	m3play:function(){
		document.querySelector('.bling #m3').play();
	},
	m4play:function(){
		document.querySelector('.bling #m4').play();
	},
	testplay:function(){
		var _this = this;
		for(var i=0;i<_this.ad.length;i++){
			_this.ad[i].play();
			_this.ad[i].pause();
		}
	},
	eventInit: function(){
		this.ad.addEventListener('ended', blingFn.endContr, false);
	},
	endContr: function(){
		//audio.play();
		this.ad.pause();
	}
}
//share
$(function(){
	$.getJSON('http://m.cosmopolitan.com.cn/files/eventapi.php?c=Cosmom_Jssdk&type=json&url='+String(window.location.href),function(data){
		wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'previewImage'
          ]
      });
	});
});
	
wx.ready(function () {
	wx.error(function(res){
	    //console,log(res);
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

	});

	wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	    }
	});

	wx.onMenuShareAppMessage(shareData);
	wx.onMenuShareTimeline(shareData);
	wx.onMenuShareQQ(shareData);
	wx.onMenuShareWeibo(shareData);
});