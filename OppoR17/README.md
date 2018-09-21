# 项目

## 项目准备

- [ ] 项目流程图

- [ ] 广告投放量：各类媒体上投放的广告数量与额度统计。
      广告资源量：可投放广告的各类媒体的数量。

- [ ] 项目推广周期

- [ ] 项目总访问量：估算CDN费用 `总量 * 页面大小`

- [ ] 项目峰值QPS `QPS = req/sec = 请求数/秒`：决定服务器数（单台qps 低于500 巅峰过1000 就得备3台）。对于读>800QPS以上，写>300QPS（基于1台AP（8核心/16G的情况下），其他服务器任意）

- [ ] 项目后端接口，接口文档及接口密钥

- [ ] 所有页面都要部署埋点统计，并保证数据的准确性。建议使用[百度统计](https://tongji.baidu.com/) 

- [ ] 项目搭建。提供网络拓扑图、使用的组件清单

- [ ] 后端需求文档，需要记录的数据（时间，地点，渠道，活动码状态，人数，分享）

- [ ] 访问、提交比例（leads提交率），一般在1%-5%

- [ ] 项目成本估计：ECS CDN SLB MQ RDS 验证服务 短信服务 等

- [ ] 前端测评：

  > 1、首屏时间在4G或WIFI环境须控制在3秒内，Yslow评级不得低于B，PageSpeed。
  >
  > 2、兼容测试（机型及浏览器视活动情况商定）和压力测试。
  >
  > 3、防止泄密灰度测试

- [ ] 前端优化：

  > 1、减少http请求，减小cookie体积
  >
  > 2、优化图片大小并使用分屏加载
  >
  > 3、js按需加载
  >
  > 4、压缩html、css、js代码
  >
  > 5、使用cdn和gzip压缩，并开启缓存



## 项目关键点

- AJAX [玩不转AJAX](https://github.com/Sanchez3/MyProject/issues/11)
  - ajax错误一定要提示清楚，有利于调试bug，排除问题
  - [jQuery.ajax](https://www.jquery123.com/jQuery.ajax/) 各个参数

  ```javascript
  $.ajax({
      url: url, //你要请求的api的URL
      type: 'POST', //GET
      async: true, //异步
      crossDomain: true, //跨域
      cache: false, //缓存
      headers: { 'Access-Control-Allow-Origin': '*' }, //添加额外的请求头
      data: { //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
      },
      timeout: 5000, //超时时间
      dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text 
      beforeSend: function (jqXHR) {
          console.log(jqXHR)
          console.log('发送前')
      },
      success: function (data, textStatus, jqXHR) {
          console.log(data)
          console.log(textStatus)
          console.log(jqXHR)
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log('错误')
          console.log(jqXHR)
          console.log(textStatus)
          switch (textStatus) {
              case 'timeout':
                  console.log('timeout');
                  break;
              case 'error':
                  console.log('Error');
                  break;
              case 'abort':
                  console.log('Abort');
                  break;
              case 'parsererror':
                  console.log('Parser Error');
                  break;
              default:
                  console.log('Null');
          }
      },
      complete: function (jqXHR, textStatus) {
          console.log('结束')
      }
  })
  ```

- [clipboard.js](https://clipboardjs.com/)

  -  IOS设备，  若对象不是`a` 或者 `button`  ，`click` 点击事件会失效

     添加 `href='javascript:;'` 

     或者 添加 `selector {cursor: pointer;}` 

     ​

- [html2canvas](https://github.com/niklasvh/html2canvas) ＋  `canvas.toDataURL()`

  - 同类型 js插件 [DOM to Image](https://github.com/tsayen/dom-to-image) 失败。 错误原因未知

- TweenMax 失去焦点，继续动作 

  ```javascript
    TweenMax.ticker.useRAF(false);
    TweenMax.lagSmoothing(0);
  ```


- [Swiper](http://idangero.us/swiper/) 

  - HTMLElement  `display:none` Swiper初始化失败
  - HTMLElement `autoAlpha : 0` ( `opacity : 0; visibility : hidden;` ) Swiper初始化失败

- 输入法键盘导致布局混乱 [X5同层播放器试用报告](https://x5.tencent.com/tbs/guide/web/x5-video.html)

  - 安卓端，当键盘出现时，`document.documentElement.clientHeight`会发生变化。解决办法：设置html、body为固定值 `window.innerHeight` `window.screen.height`

  - 安卓端，保证用户体验。当输入框过多时，当焦点在最顶端输入框，保证其不会因为浮动被遮挡住（设置固定高度）；当焦点在底端输入框，要保证底端输入框不会被键盘遮挡住（设置固定）。

    ​

- [scrollmagic](http://scrollmagic.io/) 

  - 当页面 `document.documentElement.clientHeight`会发生变化时，元素会受到影响
  - 长度单位为rem

- 生成QRcode [QRCode.js](https://github.com/Sanchez3/qrcodejs)

- [微信扫一扫](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455871652)

- 解决`Rem`单位的逐帧动画抖动解决  [Reference](https://aotu.io/notes/2017/08/14/fix-sprite-anim/)

    - 方法1
    ```html

    <body>
      <div class="load-sprite sprite-scale" id="load-sprite"></div>
    </body>

    <style>
    .load-sprite {
        position: absolute;
        width: 349px;
        height: 288px;
        /*left: 0;
        right: 0;
        margin: auto;*/
      	left: 50%;
      	margin-left:-174.5px;
        top: 28%;
        display: inline-block;
        overflow: hidden;
        background-repeat: no-repeat;
        background-image: url(../img/load-sprite.png);
        transform-origin: top center;
        background-size: 8725px 288px; 
        -webkit-animation: load-anim 1s steps(24) infinite;
        animation: load-anim 1s steps(24) infinite;
    }
    @keyframes load-anim {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 100% 0;
        }
    }
    @-webkit-keyframes load-anim {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 100% 0;
        }
    }
    </style>

    <script>
      function rootResize(){
        // `${}` es6 模板字符串
        
        //document.getElementById('load-sprite').style.transform = `scale(${wFsize/100})`;
        
        //插入css样式 sprite-scale 针对于有多个sprite情况
        /* specify our style rules in a string */
        var cssRules = `.sprite-scale{ transform:scale(${wFsize / 100}); -webkit-transform:scale(${wFsize / 100}) }`;
        /* create the style element */
        var styleElement = document.createElement('style');
        /* add style rules to the style element */
        styleElement.appendChild(document.createTextNode(cssRules));
        /* attach the style element to the document head */
        document.getElementsByTagName('head')[0].appendChild(styleElement);
      }
      window.onresize = rootResize;
      rootResize();
    </script>
    ```

    - ​方法2
    ```html
    <body>
      <svg viewBox="0, 0, 349, 288" class="svg-sprite">
        <image xlink:href="../img/load-sprite.png" width="8725" height="288" />
      </svg>
    </body>

    <style>
    .svg-sprite {
        position: absolute;
        width: 3.49rem;
        height: 2.88rem;
        left: 0;
        right: 0;
        margin: auto;
        top: 28%;
    }
    .svg-sprite image {
     	/* steps次数 不同于方法1*/
        -webkit-animation: svg-anim 1s steps(25) infinite;
        animation: svg-anim 1s steps(25) infinite;
    }
    @keyframes svg-anim {
        100% {
             transform: translate3d(-8725px, 0, 0);
        }
    }
    @-webkit-keyframes svg-anim {
        100% {
             transform: translate3d(-8725px, 0, 0);
        }
    }

    </style>
    ```

- 阻止跨站解析器阻断脚本通过document.write调用`document.write intervention and 3rd-party scripts`

  - [Intervention: Blocking the load of cross-origin, parser-blocking scripts inserted via document.write for users on 2G](https://www.chromestatus.com/feature/5718547946799104)
  - [CNZZ的JS统计代码被Chrome警告，如何解决？](https://www.jianshu.com/p/ec0bfb5fdf2f)
  ```javascript
  var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://")
  var cnzz_s_tag = document.createElement('script');
  cnzz_s_tag.type = 'text/javascript';
  cnzz_s_tag.async = true;
  cnzz_s_tag.charset = 'utf-8';
  cnzz_s_tag.src = cnzz_protocol+'w.cnzz.com/c.php?id=XXXXXXXX&async=1';
  var root_s = document.getElementsByTagName('script')[0];
  root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
  ```

- 清除DNS

  - MAC ：`sudo dscacheutil -flushcache;sudo killall -HUP mDNSResponder;say flushed`
  - Chrome：1、`chrome://net-internals/#dns `   2、`clean host cache`