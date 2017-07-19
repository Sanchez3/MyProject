# NB fuel

## 微信video Bug
> 部分ios手机Bug
- video poster属性 ，poster覆盖video视频，不消失。

- ios手机点击后才能播放

- video canplay 和 canplay事件 触发ended事件，视频并没有播放，且video play后才能监听该事件

- preload="auto" 也无法触发video load事件

- 在ended事件里启动一段音频或视频，使用插件[Howler](https://howlerjs.com/)也不成

  - ```javascript
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

移动端的H5页面被广告植入是因为被网络劫持了，被网络劫持的原因如下，一种是http劫持，一种是DNS劫持，XSS攻击
DNS劫持是网络运营商的强制劫持，很多时候我们用联通，电信的网络或者WiFi，下面都会弹出他们自己的广告。
http劫持的解决办法是加密成https，成本并不高，而且安全有效，这个需要企业的技术开发者进行处理。
XSS攻击

### [XSS攻击](http://www.cnblogs.com/coco1s/p/5777260.html)
跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

### Solution

- 使用https而不是http

- 禁止引用未知插件、引用也要使用https

- 进行转义，用户输入、地址分析等（http://127.0.0.1/?key=1）

  - ```javascript
    //& 转成 &amp;“ 转成 &quot;< 转成 &lt;> 转成 &gt;‘ 转成 &#39;
    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
     }
    //参数key为name的值
     function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var searchURL=escapeHtml(window.location.search);
        var r =searchURL.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    ```

# rem应用与orientationchange事件响应

## rem

从网易与淘宝的font-size思考前端设计稿与工作流](http://www.cnblogs.com/lyzg/p/4877277.html)

从网易上扒下源代码，[rootResize](https://github.com/Sanchez3/MyProject/blob/master/NBfuel/rootResize.js)

DOMContentLoaded，当初始HTML文档被完全加载和解析时，**DOMContentLoaded **事件被触发。这时再触发rootResize

## orientationchange事件

[Managing screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation)

> Orientation change needs a delay to pick up on the new heights and widths. This works 80% of the time.

- Solution1

  > Note that 200ms is nowhere near enough (iOS, Safari). The actual time is somewhere between 600-1000ms. 

  ```javascript
  //Note that 200ms is nowhere near enough (iOS, Safari). The actual time is somewhere between 600-1000ms. 
  window.setTimeout(function() {
      //insert logic with height or width calulations here.
  }, 500);
  ```

- Solution2

  ```javascript
  var noChangeCountToEnd = 100,
      noEndTimeout = 1000;

  window
      .addEventListener('orientationchange', function() {
          var interval,
              timeout,
              end,
              lastInnerWidth,
              lastInnerHeight,
              noChangeCount;

          end = function() {
              clearInterval(interval);
              clearTimeout(timeout);

              interval = null;
              timeout = null;

              // "orientationchangeend"
          };

          interval = setInterval(function() {
              if (global.innerWidth === lastInnerWidth && global.innerHeight === lastInnerHeight) {
                  noChangeCount++;

                  if (noChangeCount === noChangeCountToEnd) {
                      // The interval resolved the issue first.

                      end();
                  }
              } else {
                  lastInnerWidth = global.innerWidth;
                  lastInnerHeight = global.innerHeight;
                  noChangeCount = 0;
              }
          });
          timeout = setTimeout(function() {
              // The timeout happened first.

              end();
          }, noEndTimeout);
      });    
  ```



# Console

彩蛋 or Note

通过调试工具提醒用户（同行、大神……）

```javascript
console.log('%c一张网页，要经历多少艰难过程，才能抵达你面前？\n 请各位高抬贵手，若有bug or question，\n 可以邮件指点（sanchezliu@lxustudio.com）', 
    'background-color:green;color:white');
```
### 参考资料
[Console - Web APIs | MDN](https://developer.mozilla.org/en/docs/Web/API/console)
[[译] 如何充分利用 JavaScript 控制台](https://juejin.im/post/59510ac45188250d8860c908)