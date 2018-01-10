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

- [ ] 使用单位rem/px

      - [ ] rem，屏幕旋转，rem重设，全局font-size重设。css逐帧动画与雪碧图 使用复杂
      - [ ] px  transform scale 等比缩放 适配  

- [ ] 使用pixijs、phaser、createjs

      | Framework                        | Size (+loader) | Problem + Challenge       |
      | :------------------------------- | :------------- | :------------------------ |
      | Pixijs                           | 424kb          |                           |
      | Phaser                           | 540kb          | resize, orientationchange |
      | createjs ( easeljs + preloadjs ) | 128kb+65kb     | few demos                 |


- [ ] 横竖屏 [rootResize.js](https://github.com/Sanchez3/MyProject/blob/master/TMD/rootResize.js) / 横屏提示[orientLayer](https://github.com/Sanchez3/MyProject/blob/master/NBA2/orientLayer.html) 

- [ ] 复制淘命令 [clipboard.js](https://github.com/zenorocha/clipboard.js)，succes 浮窗成功提示，error 浮窗提示(长按复制框内信息打开天猫app/淘宝)

- [ ] 微信排版测试  

      **5s/SE尺寸:** 640 1008  / 320 504

      **普通尺寸:** 750 1206  / 375 603

      **iphoneX尺寸:** 750 1448 / 375 724



### BUG

- [ ] video播放不了，多测几台机子，重启。

- [ ] 微信传播h5，严格遵守传播规定。（🚫天猫等字样出现，网络爬虫会抓获文本）

      ​

