var canv;
var swiper;
var transform;
var _$ = Zepto;
var img = '';
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
	audio = new Audio();
	audio.init();
});
function initSwiper(){
	swiper = new Swiper("#swiper",{
		//derection:'vertival',
		//allowSwipeToPrev:true,
		//allowSwipeToNext:false,
		speed:1500,
		initialSlide:4,//4
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
				setTimeout(function(){
					$('#jj').css({
						'-webkit-transform':'translate3d(-'+(2610-640)+'px,0,0)'
					});
					blingFn.m1play();
					$('#page1').addClass('first');
				},10);
			}
		})
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
			$('#page3 .content1 .g').addClass('out').fadeOut();			
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
			$('#page4 .mscontent').fadeOut();
			$('#cwpb').css('opacity',0);
			$('.hand-tip').addClass('on');
			$('#cwpb').one('webkitTransitionEnd',function(){
				blingFn.m3pause();
				$('.phone').addClass('on');
			})
		},1000);
	});
	$('.phone').on('click',function(){
		if($(this).hasClass('on')){
			$('.hand-tip').fadeOut();
			$('#cwpb2').css('opacity',0);
			$('.phone').fadeOut();
			$('#cwpb2').one('webkitTransitionEnd',function(){
				setTimeout(function(){
					$('#dialog').fadeIn(function(){
						setTimeout(function(){
							$('.dialog-tip2').fadeOut();
							$('.dialog-tip1').fadeIn(function(){
								$('.dialog-tip1').addClass('on');
							});
						},3000)
						$('.dialog-tip1').on('webkitAnimationEnd',function(){
							$('.dialog-tip1').fadeOut();
						})
						var swiper2 = new Swiper('.ifcontent.swiper-container', {
							scrollbar: '.swiper-scrollbar',
					        direction: 'vertical',
					        slidesPerView: 'auto',
					        freeMode: true,
					    });

					});
				},1200)
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
		$('.upload-page .mask').show();
		setTimeout(function(){
			blingFn.m4play();
			$('.upload-page .mask').addClass('on');
		},10);
		$('.upload-page .mask').one('webkitTransitionEnd',function(){
			$(this).removeClass('on');
		})
		setTimeout(function(){
			$('.upload-page .mask').fadeOut();
			$('#swiper,.jk').addClass('out');
			$('.jk').css('opacity',0);
			$('.shareDiv').addClass('in');
		},2200);
	})
	$('#file').localResizeIMG({
      width: 640,
      quality: 0.75,
      success: function (result) {  
		  var submitData={
				base64_string:result.clearBase64, 
			}; 
			$('.uploadmask').fadeIn();
			uploadPic(submitData);
			/*$('.uploadmask').fadeOut();
			$('#cc').attr('src',result.base64);
			$('#cc2').show();
			$('.touchtip').show();
			setTimeout(function(){
				$('.touchtip').fadeOut(function(){
					$('.sharebtn').fadeIn();
				});
			},2000)*/
			ee();
      }
  });
	
}
	
function uploadPic(submitData){
		$.ajax({
		   type: "POST",
		   url: "upload.php",
		   data: submitData,
		   dataType:"json",
		   success: function(data){
			 if (0 == data.status) {
				//alert(data.content);
				return false;
			 }else{
				//alert(data.content);
				$('.uploadmask').fadeOut();
				/*$('.touchtip').show();*/
				img = data.url;
				$('#cc').attr('src',data.url);
				$('#cc2').show();
				$('.touchtip').show();
				setTimeout(function(){
					$('.touchtip').fadeOut(function(){
						$('.sharebtn').fadeIn();
					});
				},3500)
				ee();
				//var attstr= '<img src="'+data.url+'" id="">'; 
				//$(".imglist").append(attstr);
				return false;
			 }
		   }, 
			complete :function(XMLHttpRequest, textStatus){
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){ //上传失败 
			   alert(XMLHttpRequest.status);
			   alert(XMLHttpRequest.readyState);
			   alert(textStatus);
			}
		}); 
	/*$.ajax({
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
    }*/

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
/* jpeg_encoder_basic.js  for android jpeg压缩质量修复 */
function JPEGEncoder(a){function I(a){var c,i,j,k,l,m,n,o,p,b=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99];for(c=0;64>c;c++)i=d((b[c]*a+50)/100),1>i?i=1:i>255&&(i=255),e[z[c]]=i;for(j=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],k=0;64>k;k++)l=d((j[k]*a+50)/100),1>l?l=1:l>255&&(l=255),f[z[k]]=l;for(m=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],n=0,o=0;8>o;o++)for(p=0;8>p;p++)g[n]=1/(8*e[z[n]]*m[o]*m[p]),h[n]=1/(8*f[z[n]]*m[o]*m[p]),n++}function J(a,b){var f,g,c=0,d=0,e=new Array;for(f=1;16>=f;f++){for(g=1;g<=a[f];g++)e[b[d]]=[],e[b[d]][0]=c,e[b[d]][1]=f,d++,c++;c*=2}return e}function K(){i=J(A,B),j=J(E,F),k=J(C,D),l=J(G,H)}function L(){var c,d,e,a=1,b=2;for(c=1;15>=c;c++){for(d=a;b>d;d++)n[32767+d]=c,m[32767+d]=[],m[32767+d][1]=c,m[32767+d][0]=d;for(e=-(b-1);-a>=e;e++)n[32767+e]=c,m[32767+e]=[],m[32767+e][1]=c,m[32767+e][0]=b-1+e;a<<=1,b<<=1}}function M(){for(var a=0;256>a;a++)x[a]=19595*a,x[a+256>>0]=38470*a,x[a+512>>0]=7471*a+32768,x[a+768>>0]=-11059*a,x[a+1024>>0]=-21709*a,x[a+1280>>0]=32768*a+8421375,x[a+1536>>0]=-27439*a,x[a+1792>>0]=-5329*a}function N(a){for(var b=a[0],c=a[1]-1;c>=0;)b&1<<c&&(r|=1<<s),c--,s--,0>s&&(255==r?(O(255),O(0)):O(r),s=7,r=0)}function O(a){q.push(w[a])}function P(a){O(255&a>>8),O(255&a)}function Q(a,b){var c,d,e,f,g,h,i,j,l,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,k=0;const m=8,n=64;for(l=0;m>l;++l)c=a[k],d=a[k+1],e=a[k+2],f=a[k+3],g=a[k+4],h=a[k+5],i=a[k+6],j=a[k+7],p=c+j,q=c-j,r=d+i,s=d-i,t=e+h,u=e-h,v=f+g,w=f-g,x=p+v,y=p-v,z=r+t,A=r-t,a[k]=x+z,a[k+4]=x-z,B=.707106781*(A+y),a[k+2]=y+B,a[k+6]=y-B,x=w+u,z=u+s,A=s+q,C=.382683433*(x-A),D=.5411961*x+C,E=1.306562965*A+C,F=.707106781*z,G=q+F,H=q-F,a[k+5]=H+D,a[k+3]=H-D,a[k+1]=G+E,a[k+7]=G-E,k+=8;for(k=0,l=0;m>l;++l)c=a[k],d=a[k+8],e=a[k+16],f=a[k+24],g=a[k+32],h=a[k+40],i=a[k+48],j=a[k+56],I=c+j,J=c-j,K=d+i,L=d-i,M=e+h,N=e-h,O=f+g,P=f-g,Q=I+O,R=I-O,S=K+M,T=K-M,a[k]=Q+S,a[k+32]=Q-S,U=.707106781*(T+R),a[k+16]=R+U,a[k+48]=R-U,Q=P+N,S=N+L,T=L+J,V=.382683433*(Q-T),W=.5411961*Q+V,X=1.306562965*T+V,Y=.707106781*S,Z=J+Y,$=J-Y,a[k+40]=$+W,a[k+24]=$-W,a[k+8]=Z+X,a[k+56]=Z-X,k++;for(l=0;n>l;++l)_=a[l]*b[l],o[l]=_>0?0|_+.5:0|_-.5;return o}function R(){P(65504),P(16),O(74),O(70),O(73),O(70),O(0),O(1),O(1),O(0),P(1),P(1),O(0),O(0)}function S(a,b){P(65472),P(17),O(8),P(b),P(a),O(3),O(1),O(17),O(0),O(2),O(17),O(1),O(3),O(17),O(1)}function T(){var a,b;for(P(65499),P(132),O(0),a=0;64>a;a++)O(e[a]);for(O(1),b=0;64>b;b++)O(f[b])}function U(){var a,b,c,d,e,f,g,h;for(P(65476),P(418),O(0),a=0;16>a;a++)O(A[a+1]);for(b=0;11>=b;b++)O(B[b]);for(O(16),c=0;16>c;c++)O(C[c+1]);for(d=0;161>=d;d++)O(D[d]);for(O(1),e=0;16>e;e++)O(E[e+1]);for(f=0;11>=f;f++)O(F[f]);for(O(17),g=0;16>g;g++)O(G[g+1]);for(h=0;161>=h;h++)O(H[h])}function V(){P(65498),P(12),O(3),O(1),O(0),O(2),O(17),O(3),O(17),O(0),O(63),O(0)}function W(a,b,c,d,e){var h,l,o,q,r,s,t,u,v,w,f=e[0],g=e[240];const i=16,j=63,k=64;for(l=Q(a,b),o=0;k>o;++o)p[z[o]]=l[o];for(q=p[0]-c,c=p[0],0==q?N(d[0]):(h=32767+q,N(d[n[h]]),N(m[h])),r=63;r>0&&0==p[r];r--);if(0==r)return N(f),c;for(s=1;r>=s;){for(u=s;0==p[s]&&r>=s;++s);if(v=s-u,v>=i){for(t=v>>4,w=1;t>=w;++w)N(g);v=15&v}h=32767+p[s],N(e[(v<<4)+n[h]]),N(m[h]),s++}return r!=j&&N(f),c}function X(){var b,a=String.fromCharCode;for(b=0;256>b;b++)w[b]=a(b)}function Y(a){if(0>=a&&(a=1),a>100&&(a=100),y!=a){var b=0;b=50>a?Math.floor(5e3/a):Math.floor(200-2*a),I(b),y=a,console.log("Quality set to: "+a+"%")}}function Z(){var c,b=(new Date).getTime();a||(a=50),X(),K(),L(),M(),Y(a),c=(new Date).getTime()-b,console.log("Initialization "+c+"ms")}var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;Math.round,d=Math.floor,e=new Array(64),f=new Array(64),g=new Array(64),h=new Array(64),m=new Array(65535),n=new Array(65535),o=new Array(64),p=new Array(64),q=[],r=0,s=7,t=new Array(64),u=new Array(64),v=new Array(64),w=new Array(256),x=new Array(2048),z=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],A=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],B=[0,1,2,3,4,5,6,7,8,9,10,11],C=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],D=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],E=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],F=[0,1,2,3,4,5,6,7,8,9,10,11],G=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],H=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250],this.encode=function(a,b){var d,e,f,m,n,o,p,y,z,A,B,C,D,E,F,G,H,I,J,K,c=(new Date).getTime();for(b&&Y(b),q=new Array,r=0,s=7,P(65496),R(),T(),S(a.width,a.height),U(),V(),d=0,e=0,f=0,r=0,s=7,this.encode.displayName="_encode_",m=a.data,n=a.width,o=a.height,p=4*n,z=0;o>z;){for(y=0;p>y;){for(D=p*z+y,E=D,F=-1,G=0,H=0;64>H;H++)G=H>>3,F=4*(7&H),E=D+G*p+F,z+G>=o&&(E-=p*(z+1+G-o)),y+F>=p&&(E-=y+F-p+4),A=m[E++],B=m[E++],C=m[E++],t[H]=(x[A]+x[B+256>>0]+x[C+512>>0]>>16)-128,u[H]=(x[A+768>>0]+x[B+1024>>0]+x[C+1280>>0]>>16)-128,v[H]=(x[A+1280>>0]+x[B+1536>>0]+x[C+1792>>0]>>16)-128;d=W(t,g,d,i,k),e=W(u,h,e,j,l),f=W(v,h,f,j,l),y+=32}z+=8}return s>=0&&(I=[],I[1]=s+1,I[0]=(1<<s+1)-1,N(I)),P(65497),J="data:image/jpeg;base64,"+btoa(q.join("")),q=[],K=(new Date).getTime()-c,console.log("Encoding time: "+K+"ms"),J},Z()}function getImageDataFromImage(a){var d,b="string"==typeof a?document.getElementById(a):a,c=document.createElement("canvas");return c.width=b.width,c.height=b.height,d=c.getContext("2d"),d.drawImage(b,0,0),d.getImageData(0,0,c.width,c.height)}

/* megapix-image.js for IOS(iphone5+) drawImage画面扭曲修复  */
!function(){function a(a){var d,e,b=a.naturalWidth,c=a.naturalHeight;return b*c>1048576?(d=document.createElement("canvas"),d.width=d.height=1,e=d.getContext("2d"),e.drawImage(a,-b+1,0),0===e.getImageData(0,0,1,1).data[3]):!1}function b(a,b,c){var e,f,g,h,i,j,k,d=document.createElement("canvas");for(d.width=1,d.height=c,e=d.getContext("2d"),e.drawImage(a,0,0),f=e.getImageData(0,0,1,c).data,g=0,h=c,i=c;i>g;)j=f[4*(i-1)+3],0===j?h=i:g=i,i=h+g>>1;return k=i/c,0===k?1:k}function c(a,b,c){var e=document.createElement("canvas");return d(a,e,b,c),e.toDataURL("image/jpeg",b.quality||.8)}function d(c,d,f,g){var m,n,o,p,q,r,s,t,u,v,w,h=c.naturalWidth,i=c.naturalHeight,j=f.width,k=f.height,l=d.getContext("2d");for(l.save(),e(d,l,j,k,f.orientation),m=a(c),m&&(h/=2,i/=2),n=1024,o=document.createElement("canvas"),o.width=o.height=n,p=o.getContext("2d"),q=g?b(c,h,i):1,r=Math.ceil(n*j/h),s=Math.ceil(n*k/i/q),t=0,u=0;i>t;){for(v=0,w=0;h>v;)p.clearRect(0,0,n,n),p.drawImage(c,-v,-t),l.drawImage(o,0,0,n,n,w,u,r,s),v+=n,w+=r;t+=n,u+=s}l.restore(),o=p=null}function e(a,b,c,d,e){switch(e){case 5:case 6:case 7:case 8:a.width=d,a.height=c;break;default:a.width=c,a.height=d}switch(e){case 2:b.translate(c,0),b.scale(-1,1);break;case 3:b.translate(c,d),b.rotate(Math.PI);break;case 4:b.translate(0,d),b.scale(1,-1);break;case 5:b.rotate(.5*Math.PI),b.scale(1,-1);break;case 6:b.rotate(.5*Math.PI),b.translate(0,-d);break;case 7:b.rotate(.5*Math.PI),b.translate(c,-d),b.scale(-1,1);break;case 8:b.rotate(-.5*Math.PI),b.translate(-c,0)}}function f(a){var b,c,d;if(window.Blob&&a instanceof Blob){if(b=new Image,c=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null,!c)throw Error("No createObjectURL function found to create blob url");b.src=c.createObjectURL(a),this.blob=a,a=b}a.naturalWidth||a.naturalHeight||(d=this,a.onload=function(){var b,c,a=d.imageLoadListeners;if(a)for(d.imageLoadListeners=null,b=0,c=a.length;c>b;b++)a[b]()},this.imageLoadListeners=[]),this.srcImage=a}f.prototype.render=function(a,b,e){var f,g,h,i,j,k,l,m,n,o,p;if(this.imageLoadListeners)return f=this,this.imageLoadListeners.push(function(){f.render(a,b,e)}),void 0;b=b||{},g=this.srcImage.naturalWidth,h=this.srcImage.naturalHeight,i=b.width,j=b.height,k=b.maxWidth,l=b.maxHeight,m=!this.blob||"image/jpeg"===this.blob.type,i&&!j?j=h*i/g<<0:j&&!i?i=g*j/h<<0:(i=g,j=h),k&&i>k&&(i=k,j=h*i/g<<0),l&&j>l&&(j=l,i=g*j/h<<0),n={width:i,height:j};for(o in b)n[o]=b[o];p=a.tagName.toLowerCase(),"img"===p?a.src=c(this.srcImage,n,m):"canvas"===p&&d(this.srcImage,a,n,m),"function"==typeof this.onrender&&this.onrender(a),e&&e()},"function"==typeof define&&define.amd?define([],function(){return f}):this.MegaPixImage=f}();

/*exif*/
(function(){var j=false;var m=this;var e=function(v){if(v instanceof e){return v}if(!(this instanceof e)){return new e(v)}this.EXIFwrapped=v};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=e}exports.EXIF=e}else{m.EXIF=e}var q=e.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};var u=e.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"};var k=e.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};var h=e.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};function t(v,x,w){if(v.addEventListener){v.addEventListener(x,w,false)}else{if(v.attachEvent){v.attachEvent("on"+x,w)}}}function f(v){return !!(v.exifdata)}function d(z,B){B=B||z.match(/^data\:([^\;]+)\;base64,/mi)[1]||"";z=z.replace(/^data\:([^\;]+)\;base64,/gmi,"");var A=atob(z);var v=A.length;var y=new ArrayBuffer(v);var w=new Uint8Array(y);for(var x=0;x<v;x++){w[x]=A.charCodeAt(x)}return y}function p(w,x){var v=new XMLHttpRequest();v.open("GET",w,true);v.responseType="blob";v.onload=function(y){if(this.status==200||this.status===0){x(this.response)}};v.send()}function g(w,A){function y(D){var C=b(D);var B=c(D);w.exifdata=C||{};w.iptcdata=B||{};if(A){A.call(w)}}if(w.src){if(/^data\:/i.test(w.src)){var z=d(w.src);y(z)}else{if(/^blob\:/i.test(w.src)){var v=new FileReader();v.onload=function(B){y(B.target.result)};p(w.src,function(B){v.readAsArrayBuffer(B)})}else{var x=new XMLHttpRequest();x.onload=function(){if(this.status==200||this.status===0){y(x.response)}else{throw"Could not load image"}x=null};x.open("GET",w.src,true);x.responseType="arraybuffer";x.send(null)}}}else{if(window.FileReader&&(w instanceof window.Blob||w instanceof window.File)){var v=new FileReader();v.onload=function(B){if(j){console.log("Got file of length "+B.target.result.byteLength)}y(B.target.result)};v.readAsArrayBuffer(w)}}}function b(w){var z=new DataView(w);if(j){console.log("Got file of length "+w.byteLength)}if((z.getUint8(0)!=255)||(z.getUint8(1)!=216)){if(j){console.log("Not a valid JPEG")}return false}var y=2,v=w.byteLength,x;while(y<v){if(z.getUint8(y)!=255){if(j){console.log("Not a valid marker at offset "+y+", found: "+z.getUint8(y))}return false}x=z.getUint8(y+1);if(j){console.log(x)}if(x==225){if(j){console.log("Found 0xFFE1 marker")}return o(z,y+4,z.getUint16(y+2)-2)}else{y+=2+z.getUint16(y+2)}}}function c(y){var C=new DataView(y);if(j){console.log("Got file of length "+y.byteLength)}if((C.getUint8(0)!=255)||(C.getUint8(1)!=216)){if(j){console.log("Not a valid JPEG")}return false}var B=2,w=y.byteLength;var v=function(E,D){return(E.getUint8(D)===56&&E.getUint8(D+1)===66&&E.getUint8(D+2)===73&&E.getUint8(D+3)===77&&E.getUint8(D+4)===4&&E.getUint8(D+5)===4)};while(B<w){if(v(C,B)){var x=C.getUint8(B+7);if(x%2!==0){x+=1}if(x===0){x=4}var A=B+8+x;var z=C.getUint16(B+6+x);return s(y,A,z);break}B++}}var a={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};function s(z,x,w){var D=new DataView(z);var A={};var y,F,v,E,C;var B=x;while(B<x+w){if(D.getUint8(B)===28&&D.getUint8(B+1)===2){E=D.getUint8(B+2);if(E in a){v=D.getInt16(B+3);C=v+5;F=a[E];y=l(D,B+5,v);if(A.hasOwnProperty(F)){if(A[F] instanceof Array){A[F].push(y)}else{A[F]=[A[F],y]}}else{A[F]=y}}}B++}return A}function r(w,A,E,B,x){var y=w.getUint16(E,!x),D={},v,C,z;for(z=0;z<y;z++){v=E+z*12+2;C=B[w.getUint16(v,!x)];if(!C&&j){console.log("Unknown tag: "+w.getUint16(v,!x))}D[C]=i(w,v,A,E,x)}return D}function i(z,w,H,I,A){var E=z.getUint16(w+2,!A),G=z.getUint32(w+4,!A),D=z.getUint32(w+8,!A)+H,B,F,y,x,v,C;switch(E){case 1:case 7:if(G==1){return z.getUint8(w+8,!A)}else{B=G>4?D:(w+8);F=[];for(x=0;x<G;x++){F[x]=z.getUint8(B+x)}return F}case 2:B=G>4?D:(w+8);return l(z,B,G-1);case 3:if(G==1){return z.getUint16(w+8,!A)}else{B=G>2?D:(w+8);F=[];for(x=0;x<G;x++){F[x]=z.getUint16(B+2*x,!A)}return F}case 4:if(G==1){return z.getUint32(w+8,!A)}else{F=[];for(x=0;x<G;x++){F[x]=z.getUint32(D+4*x,!A)}return F}case 5:if(G==1){v=z.getUint32(D,!A);C=z.getUint32(D+4,!A);y=new Number(v/C);y.numerator=v;y.denominator=C;return y}else{F=[];for(x=0;x<G;x++){v=z.getUint32(D+8*x,!A);C=z.getUint32(D+4+8*x,!A);F[x]=new Number(v/C);F[x].numerator=v;F[x].denominator=C}return F}case 9:if(G==1){return z.getInt32(w+8,!A)}else{F=[];for(x=0;x<G;x++){F[x]=z.getInt32(D+4*x,!A)}return F}case 10:if(G==1){return z.getInt32(D,!A)/z.getInt32(D+4,!A)}else{F=[];for(x=0;x<G;x++){F[x]=z.getInt32(D+8*x,!A)/z.getInt32(D+4+8*x,!A)}return F}}}function l(x,y,v){var w="";for(n=y;n<y+v;n++){w+=String.fromCharCode(x.getUint8(n))}return w}function o(y,x){if(l(y,x,4)!="Exif"){if(j){console.log("Not valid EXIF data! "+l(y,x,4))}return false}var z,D,C,A,w,B=x+6;if(y.getUint16(B)==18761){z=false}else{if(y.getUint16(B)==19789){z=true}else{if(j){console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)")}return false}}if(y.getUint16(B+2,!z)!=42){if(j){console.log("Not valid TIFF data! (no 0x002A)")}return false}var v=y.getUint32(B+4,!z);if(v<8){if(j){console.log("Not valid TIFF data! (First offset less than 8)",y.getUint32(B+4,!z))}return false}D=r(y,B,B+v,u,z);if(D.ExifIFDPointer){A=r(y,B,B+D.ExifIFDPointer,q,z);for(C in A){switch(C){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":A[C]=h[C][A[C]];break;case"ExifVersion":case"FlashpixVersion":A[C]=String.fromCharCode(A[C][0],A[C][1],A[C][2],A[C][3]);break;case"ComponentsConfiguration":A[C]=h.Components[A[C][0]]+h.Components[A[C][1]]+h.Components[A[C][2]]+h.Components[A[C][3]];break}D[C]=A[C]}}if(D.GPSInfoIFDPointer){w=r(y,B,B+D.GPSInfoIFDPointer,k,z);for(C in w){switch(C){case"GPSVersionID":w[C]=w[C][0]+"."+w[C][1]+"."+w[C][2]+"."+w[C][3];break}D[C]=w[C]}}return D}e.getData=function(v,w){if((v instanceof Image||v instanceof HTMLImageElement)&&!v.complete){return false}if(!f(v)){g(v,w)}else{if(w){w.call(v)}}return true};e.getTag=function(w,v){if(!f(w)){return}return w.exifdata[v]};e.getAllTags=function(w){if(!f(w)){return{}}var v,y=w.exifdata,x={};for(v in y){if(y.hasOwnProperty(v)){x[v]=y[v]}}return x};e.pretty=function(x){if(!f(x)){return""}var v,y=x.exifdata,w="";for(v in y){if(y.hasOwnProperty(v)){if(typeof y[v]=="object"){if(y[v] instanceof Number){w+=v+" : "+y[v]+" ["+y[v].numerator+"/"+y[v].denominator+"]\r\n"}else{w+=v+" : ["+y[v].length+" values]\r\n"}}else{w+=v+" : "+y[v]+"\r\n"}}}return w};e.readFromBinaryFile=function(v){return b(v)};if(typeof define==="function"&&define.amd){define("exif-js",[],function(){return e})}}.call(this));var audio;

