    /**
     * 获得base64
     * @param {Object} obj
     * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
     * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
     * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
     * @param {Function} obj.success(obj) 处理后函数
     * @example
     *
     */
    $.fn.localResizeIMG = function(obj) {
        this.on('change', function() {
            var file = this.files[0];
            if(!/image\/\w+/.test(file.type)) {
                alert("请确保文件类型为图像类型");
                return false;
            }
            var URL = window.URL || window.webkitURL;
            var blob = URL.createObjectURL(file);
            $('.file').hide();
            // 执行前函数
            if ($.isFunction(obj.before)) {
                obj.before(this, blob, file)
            };

            _create(blob, file);
            this.value = ''; // 清空临时数据
        });

        /**
         * 生成base64
         * @param blob 通过file获得的二进制
         */
        function _create(blob,file) {
            var img = new Image();
            img.src = blob;
            var  Orientation;
            EXIF.getData(file, function() {
                EXIF.getAllTags(this); 
                Orientation = EXIF.getTag(this, 'Orientation');
            });
            img.onload = function() {
                var that = this;

                //生成比例
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = w / scale;

                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({
                    width: w,
                    height: h
                });
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.drawImage(that, 0, 0, w, h);

                /**
                 * 生成base64
                 * 兼容修复移动设备需要引入mobileBUGFix.js
                 */
                var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);

                // 修复IOS
                if (navigator.userAgent.match(/iphone/i)) {
                    var mpImg = new MegaPixImage(img);
                    mpImg.render(canvas, {
                        maxWidth: w,
                        maxHeight: h,
                        quality: obj.quality || 0.8,
                        orientation: Orientation
                    });
                    base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
                }

                // 修复android
                if (navigator.userAgent.match(/Android/i)) {
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
                }

                // 生成结果
                var result = {
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1)
                };

                // 执行后函数
                obj.success(result);
            };
        }
    };
function ee(){
        var reqAnimationFrame = (function () {
            return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        var screen = document.querySelector(".imglist");
        var el = document.querySelector("#cc");

        var START_X = 0;
        var START_Y = 0;
        var sX = 0;
        var sY = 0;
        var ticking = false;
        
        var timer;
        //var mc = new Hammer.Manager(el);
        var mc = new Hammer.Manager(screen);

        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

        mc.on("panstart", onPan);
        mc.on("panmove", onPanmove);
        mc.on("rotatestart rotatemove", onRotate);
        mc.on("pinchstart pinchmove", onPinch);

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
                'translate3d('+ transform.translate.x + 'px,'+ transform.translate.y +'px,0)',
                'scale('+ transform.scale + ',' + transform.scale + ')',
                'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
            ];
            shareData.link = window.location.origin + window.location.pathname + '?picurl='+img+'&cssStyle='+el.style.webkitTransform; 
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

        resetElement();
    }

    // 例子
    /*
    $('input:file').localResizeIMG({
        width: 100,
        quality: 0.1,
        //before: function (that, blob) {},
        success: function (result) {
            var img = new Image();
            img.src = result.base64;

            $('body').append(img);
            console.log(result);
        }
    });
*/