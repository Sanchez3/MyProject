# NB fuel

## 微信video Bug
> 部分ios手机Bug
- video poster属性 ，poster覆盖video视频，不消失。

- ios手机点击后才能播放

- video canplay 和 canplay事件 触发ended事件，视频并没有播放，且video play后才能监听该事件

- preload="auto" 也无法触发video load事件

- 在ended事件里启动一段音频或视频，使用插件[Howler](https://howlerjs.com/)也不成

  - ```
    video.addEventListener('timeupdate',function (){
        //当视频的currentTime大于0.1时表示黑屏时间已过，已有视频画面，可以移除浮层（.pagestart的div元素）
        if ( !video.isPlayed && this.currentTime>0.1 ){
            $('.pagestart').fadeOut(500);
            video.isPlayed = !0;
        }
    })
    ```




### 参考资料

[视频H5 video标签最佳实践](https://github.com/gnipbao/iblog/issues/11)

[视频video标签在移动端的播放总结](http://www.xiabingbao.com/video/2016/09/03/phone-video.html)



## H5被植入广告

移动端的H5页面被广告植入是因为被网络劫持了，被网络劫持的原因有两种，一种是http劫持，一种是DNS劫持。

DNS劫持是网络运营商的强制劫持，很多时候我们用联通，电信的网络或者WiFi，下面都会弹出他们自己的广告。http劫持的解决办法是加密成https，成本并不高，而且安全有效，这个需要企业的技术开发者进行处理。（但是影响资源加载）