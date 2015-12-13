//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';//资源文件地址
var filelist = ['images/bg.jpg','images/star.png','images/award.png','images/y1.png','images/y2.png','images/y3.png','images/y4.png','images/y5.png','images/y6.png','images/y7.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png','images/share.png'];
var audio;
var canv;
var swiper;
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
		derection:'vertival',
		allowSwipeToPrev:false,
		initialSlide:0,
		slideActiveClass:'on',
		touchMoveStopPropagation:false,
		onInit:function(){
			$('#cover').addClass('first');
		}
	});
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
$('#swiper').addClass('out');
$('.upload-page').addClass('in');
$('.upload-page').one('webkitTransitionEnd',function(){
	$('#swiper').hide();
});
createImg();
function createImg(){
	$('.sharebtn').on('click',function(){
		$('.shareDiv').fadeIn();
	})
	$('#file').on('change',function(){
		var simpleFile = document.getElementById("file").files[0];
        if(!/image\/\w+/.test(simpleFile.type)) {
            alert("请确保文件类型为图像类型");
            return false;
        }
        $('.file').fadeOut();
        canvasFn(simpleFile);
	});
}



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
function exifImg(){
	var expectWidth = this.naturalWidth;
	var expectHeight = this.naturalHeight;
	
	if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
		expectWidth = 800;
		expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
	} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
		expectHeight = 1200;
		expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
	}
	alert(expectWidth+','+expectHeight);
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = expectWidth;
	canvas.height = expectHeight;
	ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
	alert(canvas.width+','+canvas.height);
	
	var base64 = null;
	var mpImg = new MegaPixImage(image);
		mpImg.render(canvas, {
			maxWidth: 800,
			maxHeight: 1200,
			quality: 0.8,
			orientation: Orientation
		});
		
	base64 = canvas.toDataURL("image/jpeg", 0.8);
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