#维秘性感测试手册

##微信分享tool
1. [WxMoment](http://wximg.qq.com/wxp/wxmoment-doc/3.3.html)
当域名为qq.com时,可使用WxMoment是由微信朋友圈广告团队面向广告详情页开发者提供的一个 JavaScript库。通过使用WxMoment，开发者可以简单的实现详情页中的常见功能，例如：微信分享、横屏提示、网页统计等。

2. [wxtool](https://github.com/Sanchez3/MyProject/blob/master/Sexy/wxtool.js)
 需要注入权限验证配置
 引用
 ```html
 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>
 ```
```js
 {
     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     appId:'', // 必填，公众号的唯一标识
     timestamp: 2, // 必填，生成签名的时间戳
     nonceStr: '', // 必填，生成签名的随机串
     signature:'',// 必填，签名，见附录1
     jsApiList:[
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'chooseImage',
      'uploadImage',
      'downloadImage',
      'previewImage'
     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
 }
 ```
 详情见微信[JS-SDK说明文档](http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html)



##动画序列帧与雪碧图

使用texturepacker 完成序列帧动画 [雪碧图](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/CSS_Image_Sprites)

- 需要添加padding，防止css定位后，图片有白边，非必须图片顺序排布，图片透明自动截去（没亲试验过，影响？）
- 应当对小图片进行 CSS 雪碧图 合并，因低版本系统及低端设备渲染问题，单张图片尺寸不超过 2000x2000 像素，超过时需切分成多张雪碧图；
- 生成css 与png

帧动画生成的图片顺序排和随机排，所用css  steps（1） 与steps（n）

其中steps（1）的keyframes 用 [css帧动画计算器](http://tid.tenpay.com/labs/css3_keyframes_calculator.html)

```css
.test1{
 background:url(http://img.xiaoho.com/2014/12/test.png) no-repeat 0 0;
 -webkit-animation:run 350ms steps(1) infinite 0s;}
@-webkit-keyframes run {
        0% {
        background-position:0;
    }
        20% {
       background-position:-90px 0;
    }
        40% {
       background-position:-180px 0;
    }
        60% {
       background-position:-270px 0;
    }
        80% {
       background-position:-360px 0;
    }
        100% {
       background-position:-450px 0;
    }
}
.test2{
 background:url(http://img.xiaoho.com/2014/12/test.png) no-repeat 0 0;
 -webkit-animation:run 350ms steps(5) infinite 0s;}

@-webkit-keyframes run {
        100% {
       background-position:-450px 0;
    }

}
```

#调用图片接口，生成图片

 eg.项目：[测测你有多少粉丝](http://wx.ig28.com/fvalue/maker.html)

 - FileReader：读取本地图片文件并显示
```js
 var reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = function(e){
     alert(this.result);
     select_img.innerHTML = '<img src="'+this.result+'" alt=""/>'
 }
 ```

 - 转为data64
 但是data64的img需要转为绝对地址时，才能够在移动端长按保存

 生成图片 img与div or img与img叠加生成新图片

 [html2canvas](https://github.com/niklasvh/html2canvas)  加上 [Canvas2image](https://github.com/devgeeks/Canvas2ImagePlugin)
 (生成图片为img为date64)

 具体步骤 :
 -  js data64 img解码
 -  上传至服务器,服务器返回绝对地址提供下载图片


 使用微信自带调用图片接口，上传图片，下载图片，详见微信JS-SDK说明文档



#预加载图片声音视频

用的是以前公司员工一位大神写的js插件

[imgloader](https://github.com/wow0218/imgloader)

#Jquery图片剪切插件
http://hammerjs.github.io/

手势支持js 支持手势放大 手势移动 等等

由于项目需求,图片拖动or放大or旋转操作后,仍要保证图片充满屏幕(奇葩的要求);
这部分自己写,目前未能完成,所以采用以下js插件


http://www.croppic.net/

支持手势移动、点击实现缩放旋转、自带图片加载的load功能
不支持手势放大,支持点击功能zoom pinch


##网站安全问题

站点：omgmkt.qq.com
站点负责人：jimmycui（若域名负责人有变更，请在gslb进行更新）
漏洞详情：
  [1] http://omgmkt.qq.com/sexy/share_index.html?url=' onclick="document.write('<iframe/onload=alert(19890611520)></iframe>');" x='存在DOM-XSS漏洞。    漏洞日志      已修复，进行扫描验证
漏洞危害：黑客可以利用该漏洞执行任意HTML/JS代码，可导致如下危害：窃取用户cookie信息，传播蠕虫等

漏洞修复

修复参考：特殊字符',",>,<展示时转义为html实体。

更多修复参考，请查看:km.oa.com/group/17969/articles/show/175246
提醒：
[1]  手工测试时，如果被门神防御，请设置代理10.217.105.153:80
备注
请按修复指引修复，如还有疑问请联系menshen(门神-网站安全助手);
关注人
;jima;alanshao;alanlai;anthonywu;zedanli;avewang;casparliu;janejiang;xiaoboli;

检测是否是URL
```js
// 建议的正则
    function isURL(str){
        return!!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
    }
```
特殊字符’ ” > <转义
```js
//特殊字符转义
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
```

