# 天猫推广

## 项目前期搭建问题点

### Video

```html
<video id="mv" width="750" height="1206" x5-video-orientation="portrait" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline="true">
    <source src="./assets/media/*.mp4" type="video/mp4">
</video>
<div class="video-poster"></div>
```
- [ ] 点击播放

- [ ] 无法提前loading

- [ ] 适配问题（视频是否有安全区域，`object-fit`和`object-position`）

- [ ] 视频播放完毕，无法自动播放音频（bgm需要），微信bug

- [ ] 横竖屏提示（video是否需要暂停播放，Android视频全屏播放，（qq域名下不用全屏））

- [ ] Android Video播放结束时bug，全屏框停留n秒（添加空白canvas填充）

- [ ] 避免使用video 属性poster，在低版本IOS上有bug！(已播放但是poster没有消失)，建议使用div写poster，并利用js控制消失:
```javascript
 var _video = document.getElementsByTagName('video')[0];
 _video.addEventListener('timeupdate', timeupdatef);
 function timeupdatef() {
     if (_video.currentTime > 0.1) {
         document.getElementsByClassName('video-poster')[0].style.display = 'none';
         _video.removeEventListener('timeupdate', timeupdatef);
     }
 }
```
> Note:其中`video-poster`的样式应该与`video`的样式相同，`object-fit`和`object-position`

- [ ] 启用H5同层播放器时，首先要了解安卓微信分享问题，其次注意HTML  <video> 标签的样式，如下：

```html
<video id="video" width="750" height="1206" x5-video-orientation="portrait" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline="true" src="./assets/media/tmgc.mp4" type="video/mp4"</video>
```
#### 安卓视频问题解决方法

> Notice: 微信tbs 3个属性  `tbsCoreVersion` `tbsSdkVersion` `x5JsCoreEnabled`

- 启用同层播放 `x5-video-player-type:h5` 

  - 视频播放中无法调用微信分享JS-SDK。

  - 安卓手机未安装qq浏览器，微信tbs  `x5JsCoreEnabled:false`

    - 微信分享朋友圈，可以触发安卓微信分享朋友圈方法，即截取当前视频画面（触发分享那一刻的视频画面）作为分享图片，利用项目标题+项目链接作为分享标题（利用[history](https://github.com/Sanchez3/MyProject/issues/5)保证与用户分享链接无多余参数 eg. `?from=singlemessage`）
    - 分享给朋友，则是项目标题+项目链接作为分享标题

    > Notice: 注意html video标签的结构与属性，如上代码块所示

  - 安卓手机安装qq浏览器，微信tbs  `x5JsCoreEnabled:false`

    - 微信分享仍无法调用微信分享，且分享调用qq浏览器分享方法，默认qq浏览器分享图标，分享标题H5标题，分享详情为标题+@QQ浏览器

  - 微信tbs  `x5JsCoreEnabled:true`，该情况极少数，除非安装最新tbs，开启了`x5JsCoreEnabled`

    - 微信分享同未安装qq浏览器一样，但是某些属性失效`x5videoexitfullscreen`
    - bug多多，待测

- 放弃同层播放

  - 即视频区域之上的操作无响应。

  - 对于视频默认的进度条，解决方法：尝试视频高度大于屏幕高度，从而显示不了进度条。



### 关键点

- [ ] [Where should I put  tags in HTML markup?](https://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup)  防止阻断浏览器解析HTML

      `<script>` 放在 `<body/>`之前

      使用 async（script异步执行下载）和defer（script顺序执行）

> Note: 95.27%可支持该属性 https://caniuse.com/#feat=script-defer

- [ ] 使用单位rem/px
  **rem:** 屏幕旋转，rem重设，全局font-size重设。css逐帧动画与雪碧图 使用复杂
  **px:**  transform scale 等比缩放 适配

- [ ] 使用pixijs、phaser、createjs


| Framework                        | Size (+loader) | Problem + Challenge       |
| -------------------------------- | -------------- | ------------------------- |
| Pixijs                           | 424kb          |                           |
| Phaser                           | 540kb          | resize, orientationchange |
| createjs ( easeljs + preloadjs ) | 128kb+65kb     | few demos                 |

- [ ] 横竖屏 [rootResize.js](https://github.com/Sanchez3/MyProject/blob/master/TMD/rootResize.js) / 横屏提示[orientLayer](https://github.com/Sanchez3/MyProject/blob/master/NBA2/orientLayer.html) 

- [ ] 复制淘命令 [clipboard.js](https://github.com/zenorocha/clipboard.js)，succes 浮窗成功提示，error 浮窗提示(长按复制框内信息打开天猫app/淘宝)

- [ ] 微信排版测试

  使用[Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn) Setting - device - Add custom device

  **User agent string:**  `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`

  **iPhone 5s/SE尺寸:** 640 * 1008  / 320 * 504  

  **普通尺寸:** 750 * 1206  / 375 * 603  **Device pixel ratio: 2**

  **iPhone X尺寸:** 750 * 1448 / 375 * 724  **Device pixel ratio:** 3

  ​


- [ ] 微信media素材大小，参考[视频检测及压缩方法](https://wximg.qq.com/wxp/temp/VideoResizeMethod.pdf) 再加上通常习惯

  **视频 video:** 1min 不大于 10mb

  **音频 audio:** 30s 不大于 500kb  （建议1min左右，可循环）


### 项目链接

- [ ] 建议内链和外链统一使用网址末尾加反斜杠（/），为了网站URL地址更加标准。

> Note:    🚨注意网址末尾加上（/），路径也要因此而异！`./`代表当前目录，`../`代表上一级目录
>
> 在传统意义上说，网址末尾是没有反斜杠的。有没有反斜杠的意义在于该url是指向一个文件还是一个目录：
>
> http://tpro.lxustudio.cn/pet  指向的是网站根目录下pet文件
>
> http://tpro.lxustudio.cn/pet/  指向的是网站根目录下pet目录
>
> 假设 tpro.lxustudio.cn/pet 被URL重写转跳到 tpro.lxustudio.cn/pet/上的话，那么tpro.lxustudio.cn/pet 就会多一次URL重写的过程，性能和时间上有微小的损耗，同样的道理，用哪个网址全凭个人喜好了，但是一定要注意网址的统一，选定其中一个后，在做都使用这个，这是因为内容虽然一模一样，但搜索对搜索引擎而言这2个网址对应2个页面，同时使用会造成权重分散。
>
> 



### BUG :bug:

- [x] video播放不了，多测几台机子，重启。

- [x] 视频编码问题，使用`Video: h264 (Constrained Baseline)` （🚫不能使用 `Video: mpeg4 (Simple Profile)`，做转码处理`ffmpeg -i video.mp4 -preset veryslow -crf 22 -strict experimental video.mp4` ）

- [x] 微信传播h5，严格遵守传播规定。（🚫天猫等字样出现，网络爬虫会抓获文本）

- [x] 安卓手机启用H5同层播放器，`x5-video-player-type`支持的值类型：`h5`。播放视频时，无法调用微信分享。

- [x] `Error:  Unable to preventDefault inside passive event listener due to target being treated as passive.` [more](https://github.com/bevacqua/dragula/issues/468)  Add  `touch-action: none` or `{passive: false}`

```javascript
document.addEventListener('touchmove', function(event) { event.preventDefault(); }, { passive: false });
```
- ### [x] 阻止跨站解析器阻断脚本通过document.write调用`document.write intervention and 3rd-party scripts`   
- [x] [Intervention: Blocking the load of cross-origin, parser-blocking scripts inserted via document.write for users on 2G](https://www.chromestatus.com/feature/5718547946799104)
- [x] [CNZZ的JS统计代码被Chrome警告，如何解决？](https://www.jianshu.com/p/ec0bfb5fdf2f)
```javascript
var cnzz_s_tag = document.createElement('script');
cnzz_s_tag.type = 'text/javascript';
cnzz_s_tag.async = true;
cnzz_s_tag.charset = 'utf-8';
cnzz_s_tag.src = 'https://w.cnzz.com/c.php?id=XXXXXXXX&async=1';
var root_s = document.getElementsByTagName('script')[0];
root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
```

- [x] Pixijs canvas阻碍了与事件关联的默认动作，即阻止了click事件行为，导致父元素点击区域是排除canvas的区域。`PIXI.interaction.InteractionManager.autoPreventDefault=false` [PIXI.interaction.InteractionManager](http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html)

> Note: dom标准事件流的触发的先后顺序为：**先捕获再冒泡**

