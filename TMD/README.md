# 天猫推广

## 项目前期搭建问题点

### Video

```html
<video id="mv" width="750" height="1206" x5-video-orientation="portrait" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline="true">
    <source src="./assets/media/*.mp4" type="video/mp4">
</video>
<div class="video-poster" id="video-poster"></div>
```
- [ ] 点击播放

- [ ] 无法提前loading

- [ ] 适配问题（视频是否有安全区域，`object-fit：cover|contain;`）

- [ ] 视频播放完毕，无法自动播放音频（bgm需要），微信bug

- [ ] 横竖屏提示（video是否需要暂停播放，Android视频全屏播放，（qq域名下不用全屏））

- [ ] Android Video播放结束时bug，全屏框停留n秒（添加空白canvas填充）


### 关键点

- [ ] 使用单位rem/px

      - [ ] rem，屏幕旋转，rem重设。css逐帧动画与雪碧图 使用复杂
      - [ ] px  transform scale 等比缩放 适配

- [ ] 使用pixijs、phaser、createjs

      | Framework                        | Size (+loader) | Problem + Challenge       |
      | :------------------------------- | :------------- | :------------------------ |
      | Pixijs                           | 424kb          |                           |
      | Phaser                           | 540kb          | resize, orientationchange |
      | createjs ( easeljs + preloadjs ) | 128kb+65kb     | few demos                 |


- [ ] 横竖屏 [rootResize.js](https://github.com/Sanchez3/MyProject/blob/master/TMD/rootResize.js) / 横屏提示[orientLayer](https://github.com/Sanchez3/MyProject/blob/master/NBA2/orientLayer.html) 
- [ ] 复制淘命令 [clipboard.js](https://github.com/zenorocha/clipboard.js),，succes 浮窗成功提示，error 浮窗提示(长按复制框内信息打开天猫app/淘宝)
- [ ] ​



### BUG

- [ ] video播放不了，多测几台机子，重启
- [ ] 天猫字样……