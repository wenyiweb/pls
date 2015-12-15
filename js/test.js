var audio;
var canv;
var swiper;
var transform;
var _$ = Zepto;


$('.upload-page').addClass('in');
$('.upload-page').one('webkitTransitionEnd',function(){
	$('#swiper').hide();
});
createImg();
function createImg(){
	$('.sharebtn').on('click',function(){
		generate();
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
		$('.sharebtn').fadeIn();
		var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fill();
		var  Orientation;
        EXIF.getData(imgfile, function() {
		    EXIF.getAllTags(this); 
		    Orientation = EXIF.getTag(this, 'Orientation');
		});
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
				
				var base64 = canvas;//;canvas.toDataURL("image/jpeg", 1);
				//$('#cc').attr('src',base64);
				draw();
				data[0] = base64;
				ee();*/
				/*draw();
				canvasEvent();*/
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
function generate(){
	
	 transform = {//30 94
		        translate: { x: 0, y: 0 },
		        scale: 1.4,
		        angle: 34,
		        rx: 0,
		        ry: 0,
		        rz: 1
		    };
	var w = 510,h = 700;
	//$('#hh').html($('#cc').width()+"::"+$('#cc').height()+"<br>::"+transform.translate.x+"::"+transform.translate.y+"<br>::"+transform.scale+"::"+transform.angle+"<br>::"+transform.rx+"::"+transform.ry+"::"+transform.rz);
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = transform.scale*w;
	canvas.height = transform.scale*h;
	/*canvas.width = 510;
	canvas.height = 700;*/
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#fff';
	ctx.fill();
	var img = new Image();
	img.src = $('#cc').attr('src');
	//ctx.translate(canvas.width/2,canvas.height/2);
	ctx.scale(transform.scale,transform.scale);
	//ctx.rotate(transform.angle);
	//ctx.translate(-canvas.width/2,-canvas.height/2);
	//ctx.drawImage(img,transform.translate.x,transform.translate.y,transform.scale*w,transform.scale*w);
	ctx.drawImage(img,transform.translate.x,transform.translate.y,canvas.width,canvas.height);
	$('#cc').hide();
	$('#cc2').attr('src',canvas.toDataURL("image/jpeg", 1))
}