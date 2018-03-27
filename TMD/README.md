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

### 关键点

- [ ] [Where should I put  tags in HTML markup?](https://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup)  防止阻断浏览器解析HTML
      - [x] `<script>` 放在 `<body/>`之前
      - [x] 使用 async（script异步执行下载）和defer（script顺序执行）
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



### BUG

- [ ] video播放不了，多测几台机子，重启。

- [ ] 微信传播h5，严格遵守传播规定。（🚫天猫等字样出现，网络爬虫会抓获文本）