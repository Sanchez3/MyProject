# GD教你穿Kappa

## 二维码识别问题

```Html
<meta content="width=device-width,initial-scale=1.0,user-scalable=no" name="viewport">
<meta name="viewport" content="target-densitydpi=device-dpi,width=750,user-scalable=no">
```

两种viewport
对于二维码有很大影响

目前本人遇到的情况下测试，
当width=750已定时，在微信中二维码识别位置错位；
eg. position absolute     left:0 top:0时二维码img处于屏幕左上角   识别无影响;
但是当二维码位置发生偏移时，其识别区域也发生偏移(具体偏移距离应该是与二维码的position位置有关系)
总之是无法正常使用二维码
除非二维码全屏or二维码全屏png 区域透明处理 or 
包含二维码的一张大图片填充全部画面


于是只能使用`width=device-width,initial-scale=1.0,user-scalable=no` 
这种情况下使用rem、em、百分比控制二维码大小位置，均可识别。



##  Howler.js 插件问题

使用该插件，在微信上，若未能正确加载音频文件，识别音频大小长度时，音频会出现噪音、慢放。
改写使用html原生audio，play stop pause  loop controls……

同时在ios可同时播放两种声音，但是android部分版本不能同时播放多种声音。


TweenMax常用插件   大小115kb

支持phaser，可代替phaser 的tween

## Phaser 手势

[Gesture.js](https://github.com/Sanchez3/MyProject/blob/master/Kappa/Gesture.js)

全页面的左右滑动（同理上下）

当页面中有区域点击时
应当绑定oninputup事件，防止与手势滑动冲突

## Phaser 陀螺仪与重力感应

`DeviceOrientationEvent` 

视觉滚动效果
phaser由于是2D渲染引擎，通过制作错位视觉滚动效果，增强视觉效果层次感

```javascript
var orientTool = {
    orientationHandler: function(evt) {
        var gamma = evt.gamma;
        var beta = evt.beta;
        if (this._lastGamma != gamma || this._lastBeta != beta) {
            TweenMax.to(window.game.camera, 0.2, { x: 95 + gamma / 45 * 40 });
            this._lastGamma = gamma;
            this._lastBeta = beta;
        }
    },
    bind: function() {
        var that = this;
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", that.orientationHandler, false);
        }
    },
    unbind: function() {
        var that = this;
        if (window.DeviceOrientationEvent) {
            window.removeEventListener("deviceorientation", that.orientationHandler);
        }
    }
};
```



> Note: 其中使用TweenMax而不是直接通过加减不同状态的xyz值，是因为这样滚动效果更平滑（android中显著改善）