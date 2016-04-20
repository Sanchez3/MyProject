#腾讯视频重磅内容缤纷呈现

主要利用[Swiper3](http://www.swiper.com.cn/)

##Swiper
* Swiper Animate 完成入场动画

* Swiper Load 属性完成分段加载

* Swiper 多个间跳转时,需要重新初始化及销毁上一个swiper

* 重写Swiper的样式表,完成所需要的swiper-bar和swiper-pagination

```js
   var myswiper = new Swiper(obj, {
            pagination: '.swiper-pagination',
            direction: 'vertical',
            width: window.innerWidth,
            height: window.innerHeight,
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper);
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
            }
        });
```


##Video视频

ios与Android在这方面有很大差异,video属性在android上不能生效

[移动端HTML5 video标签 视频播放优化实践](http://www.xuanfengge.com/html5-video-play.html)


* ios的视频加载,通过监听canplaythrough事件 
当video只要播放后就会触发canplaythrough事件(不论之后是否停止)  
所以要v.play() v.stop()





```js
        var c = function () {
            if (android) {
                //播放时检测是否加载完毕
                canplay_f = true;
                $("#mvideo")[0].currentTime = 0;
//                mvideo.removeEventListener("canplaythrough", c);
            } else {
                //加载时检测是否加载完毕
                $("#loadprogress").html("100%");
                $("#mvideo")[0].pause;
                $("#loader").fadeOut("fast", function () {
                    $("#loader").remove();
                    $(".video_p", $("#main")).css({"display": "block"});
                    $(".video_t1", $(".video_p")).css({"display": "block"});
                    $(".video_t2", $(".video_p")).css({"display": "block"});
                    $("#video_btn", $(".video_p")).css({"display": "block"});
                    $("#mvideo")[0].currentTime = 0;
                    canplay_f = true;
                    mvideo.removeEventListener("canplaythrough", c);
                });
            }
        }
        mvideo.addEventListener("canplaythrough", c);
```

* 安卓 视频直接play就好,同时监控ended事件,结束时销毁video……
* 安卓 微信上 视频置于最上层,无法有任何遮盖.
* 安卓 微信上 当视频未播放完毕退出时,下次进入该html继续上次断点播放
* 安卓 微信上 视频controls必出现,隐藏方法只能是该视频尺寸大于屏幕画面,正好控制条不可见
                          



