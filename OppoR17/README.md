# 项目

## 项目准备

- [ ] 项目流程图

- [ ] 广告投放量：各类媒体上投放的广告数量与额度统计。
      广告资源量：可投放广告的各类媒体的数量。

- [ ] 项目推广周期

- [ ] 项目总访问量：估算CDN费用 `总量 * 页面大小`

- [ ] 项目峰值QPS `QPS = req/sec = 请求数/秒`：决定服务器数（单台qps 低于500 巅峰过1000 就得备3台）。对于读>800QPS以上，写>300QPS（基于1台AP（8核心/16G的情况下），其他服务器任意）

- [ ] 项目后端接口，接口文档及接口密钥

- [ ] 所有页面都要部署埋点统计，并保证数据的准确性

- [ ] 项目搭建。提供网络拓扑图、使用的组件清单

- [ ] 后端需求文档，需要记录的数据（时间，地点，渠道，活动码状态，人数，分享）

- [ ] 访问、提交比例（leads提交率），一般在1%-5%

- [ ] 项目成本估计：ECS CDN SLB MQ RDS 验证服务 短信服务 等

- [ ] 前端测评：

      1、首屏时间在4G或WIFI环境须控制在3秒内，Yslow评级不得低于B，PageSpeed。

      2、兼容测试（机型及浏览器视活动情况商定）和压力测试。

      3、防止泄密灰度测试

- [ ] 前端优化：

      1、减少http请求，减小cookie体积

      2、优化图片大小并使用分屏加载

      3、js按需加载

      4、压缩html、css、js代码

      5、使用cdn和gzip压缩，并开启缓存

      ​

      ​

## 项目关键点

- AJAX [玩不转AJAX](https://github.com/Sanchez3/MyProject/issues/11)

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

- 输入法键盘导致布局混乱

  - 安卓端，当键盘出现时，`document.documentElement.clientHeight`会发生变化。解决办法：设置html、body为固定值 `window.innerHeight`

  - 安卓端，保证用户体验。当输入框过多时，当焦点在最顶端输入框，保证其不会因为浮动被遮挡住（设置固定高度）；当焦点在底端输入框，要保证底端输入框不会被键盘遮挡住（设置固定）。

    ​

- [scrollmagic](http://scrollmagic.io/) 

  - 当页面 `document.documentElement.clientHeight`会发生变化时，元素会受到影响
  - 长度单位为rem

- 生成QRcode [QRCode.js](https://github.com/Sanchez3/qrcodejs)

- [微信扫一扫](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455871652)

- 清除DNS

  - MAC ：`sudo dscacheutil -flushcache;sudo killall -HUP mDNSResponder;say flushed`
  - Chrome：1、`chrome://net-internals/#dns `   2、`clean host cache`