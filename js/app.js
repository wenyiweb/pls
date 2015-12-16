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
  	$('#cover,.jk').css('opacity',1);
  	$('#cc2').hide();
  	fade('.loading','out',function(){
  		cb&&cb();
  	});
  }
  img.onload = function(){
	_load.classList.add('on');
  }
  img.src = src;
}
var wh =  $(window).height();
$('body').css('height',wh);

$('.loading').height(wh).css({'overflow':'hidden'});
load(function(){
	initSwiper();
	blingFn.testplay();
	//audio = new Audio();
	//audio.init();
});
function initSwiper(){
	swiper = new Swiper("#swiper",{
		//derection:'vertival',
		//allowSwipeToPrev:true,
		//allowSwipeToNext:false,
		speed:1500,
		initialSlide:4,
		//slideActiveClass:'on',
		touchMoveStopPropagation:false,
		onInit:function(){
			$('#swiper .swiper-wrapper').css('opacity',1);
			$('#cover').addClass('first');
			$('#cover .tip').fadeIn();
		},
		onSlideChangeEnd:function(swiper){
			$(swiper.slides[swiper.activeIndex]).toggleClass('on');

		}
	});
	swiperEventInit();
}
function swiperEventInit(){
	var f = true;
	_$('#cover,.jk').swipeRight(function(e){
		$('.jk,#cover .dm').addClass('on');
		$('.jk').on('webkitTransitionEnd',function(){
			if(f){
				f = false;
				$('#cover').hide();
				$('.jk').addClass('onon');
			}else{
				$('.jk #jkn').hide();
				$('#jj').css('opacity',1);
				/*$('#eng').fadeIn(function(){
					$('#jj').css({
						'-webkit-transform':'translate3d(-'+(2610-640)+'px,0,0)'
					});
					blingFn.m1play();
					$('#page1').addClass('first');
				});*/
				setTimeout(function(){
					$('#jj').css({
						'-webkit-transform':'translate3d(-'+(2610-640)+'px,0,0)'
					});
					blingFn.m1play();
					$('#page1').addClass('first');
				},10);
			}
		})
		/*$('#cover .bg1,#cover .dm').addClass('on');
		$('#cover .bg1').on('webkitTransitionEnd',function(){
			if(f){
				f = false;
				$('#cover .bg1').addClass('onon');
			}else{
				$('#jj').css({
					'opacity':1,
					'-webkit-transform':'translate3d(-2415px,0,0)'
				});
				blingFn.m1play();
				$('#page1').addClass('first');
			}
		})*/
	})
	var page = 1;
	$('#jj').on('webkitTransitionEnd',function(){
		blingFn.m1pause();
		
		if(page == 1){
			$('#eng').fadeIn();
			blingFn.m2play();
			$('#cover').fadeOut();
			page = 2;
		}else if(page==2){
			page = 3;
		}else if(page == 3){
			page = 4;
		}else if(page == 4){
			blingFn.m2play();
			page = 5;
		}else if(page == 5){
			page = 6;
		}
	});
	$('#page1 .ms.ms2').one('webkitTransitionEnd',function(){
		blingFn.m2pause();
		$('#page1 .tip').fadeIn();
		_$('#page1').swipeRight(function(){
			blingFn.m1play();
			swiper.slidePrev();
			$('#jj').css({
					'-webkit-transform':'translate3d(-'+(2610-640*2)+'px,0,0)'
			});
		})
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
		var timmer = setTimeout(function(){
			clearTimeout(timmer);
			blingFn.m2play();
		},3000)
		$('#page2 .ms.ms3').one('webkitTransitionEnd',function(){
			blingFn.m2pause();
			$('#page2 .tip').fadeIn();
			_$('#page2').swipeRight(function(){
				blingFn.m1play();
				swiper.slidePrev();
				$('#jj').css({
						'-webkit-transform':'translate3d(-'+(2610-640*3)+'px,0,0)'
				});
			})
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
		var timmer = setTimeout(function(){
			clearTimeout(timmer);
			blingFn.m2play();
		},3000)
		$('#page3 .ms.ms4').one('webkitTransitionEnd',function(){
			blingFn.m2pause();
			$('#page3 .tip').fadeIn();
			_$('#page3').swipeRight(function(){
				blingFn.m1play();
				swiper.slidePrev();
				$('#jj').css({
						'-webkit-transform':'translate3d(-'+(2610-640*4)+'px,0,0)'
				});
			})
			
			//$('#page3').removeClass('swiper-no-swiping');
		})
	});
	//电话铃声
	$('#page4 .ms.ms4').one('webkitTransitionEnd',function(){
		blingFn.m2pause();
		setTimeout(function(){
			blingFn.m3play();
			$('#cwpb,#page4 .mscontent').css('opacity',0);
			$('.hand-tip').addClass('on');
			$('#cwpb').one('webkitTransitionEnd',function(){
				blingFn.m3pause();
				$('.phone').addClass('on');
			})
		},1000);
	});
	$('.phone').on('click',function(){
		if($(this).hasClass('on')){
			$('#cwpb2').css('opacity',0);
			$('.phone').fadeOut();
			$('#cwpb2').one('webkitTransitionEnd',function(){
				$('#dialog').fadeIn(function(){
					setTimeout(function(){
						$('.dialog-tip').fadeIn();
					},2000)
					var swiper2 = new Swiper('.ifcontent.swiper-container', {
						scrollbar: '.swiper-scrollbar',
				        direction: 'vertical',
				        slidesPerView: 'auto',
				        freeMode: true,
				    });

				});
			});
		}
	});
	$('.zzdj').on('click',function(){
		if($(this).hasClass('zz')){
			blingFn.m1play();
			swiper.slidePrev();
			$('#jj').css({
					'-webkit-transform':'translate3d(0,0,0)'
			});
			/*$('#swiper').addClass('out');
			$('.upload-page').addClass('in');
			$('.upload-page').one('webkitTransitionEnd',function(){
				$('#swiper').hide();
			});*/
			createImg();
		}
	});
}
function createImg(){
	$('.sharebtn').on('click',function(){
		$('.jk').fadeOut();
		$('#swiper').addClass('out');
		$('.shareDiv').addClass('in');
	})
	var f = document.getElementById('file');
	//var data = ['','images/canv.png'];
	f.addEventListener('change', function(){
		//blingFn.m4play();
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
        	//上传操作
        	$('#cc').attr('src',this.result);
        	$('#cc2').show();
        	$('.sharebtn').fadeIn();
        	//ee();
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
	m1pause:function(){
		document.querySelector('.bling #m1').pause();
	},
	m2play:function(){
		document.querySelector('.bling #m2').play();
	},
	m2pause:function(){
		document.querySelector('.bling #m2').pause();
	},
	m3play:function(){
		document.querySelector('.bling #m3').play();
	},
	m3pause:function(){
		document.querySelector('.bling #m3').pause();
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