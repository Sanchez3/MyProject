# 007推广

## 关键点

* phaser  state   解决不同场景切换
* IOS视频全屏播放 不能镶嵌至网页中
* phaser  canvas   序列帧   分辨率1/2  音频单播
* 适配问题

  ```html
  <meta content="width=device-width,initial-scale=1.0,user-scalable=no" name="viewport">
  ```

  ```javascript
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  ```


## RadarChart 能力图  

[RadarChart.js](https://github.com/Sanchez3/MyProject/blob/master/007/RadarChart.js)

基于[Phaser](http://phaser.io/)

五角形 5档位，通过坐标点绘制五角形，如图所示![radarchart](https://github.com/Sanchez3/MyProject/blob/master/007/radarchart.jpg)

