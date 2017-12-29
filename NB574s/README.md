# NB 574s

## 前端图片处理

[croppery.js](https://github.com/fengyuanchen/cropperjs) JavaScript image cropper

使用注意事项

- [ ] div处于block时 初始化cropper

- [ ] canvas大小限制问题，影响到`getCroppedCanvas()`的结果，需设置`maxHeight` `maxWidth`，并且需要控制并判断处理的图片大小。

      > Note: [the size limits of a canvas element](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element)

- [ ] 当cropper初始化后再调整CropBox大小位置

```javascript
cropper = new Cropper(image, {
    viewMode: 0,
    aspectRatio: 1 / 1,
    cropBoxResizable: false,
    cropBoxMovable: false,
    dragMode: 'move',
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
    zoom: function(e) {
        var canvasData = this.cropper.getCanvasData();
        if (canvasData.width > 3000) {
            if (e.detail.ratio > e.detail.oldRatio) {
                e.preventDefault(); // Prevent zoom in
            }
        }
        if (canvasData.width < 100) {
            if (e.detail.ratio < e.detail.oldRatio) {
                e.preventDefault(); // Prevent zoom in
            }
        }
    },
    ready: function() {
        this.cropper.setCropBoxData({ 'top': 24 , 'left': _left, 'width': 100, 'height': 200 });
    }
});
cropper.getCroppedCanvas({
    width: 160,
    height: 90,
    minWidth: 256,
    minHeight: 256,
    maxWidth: 4096, 
    maxHeight: 4096,
    fillColor: '#fff',
    imageSmoothingEnabled: false,
    imageSmoothingQuality: 'high',
});
```



## 微信分享工具

将之前Sexy项目中的[wxtool.js](https://github.com/Sanchez3/MyProject/blob/master/Sexy/wxtool.js)改为字面量方式（方便使用即正义）



## Blur效果

尝试使用css `filter:blur`但是 [html2canvas](http://html2canvas.hertzen.com/) 不支持filter

> Note: [Not working for webkit-filter](https://github.com/niklasvh/html2canvas/issues/493)

于是使用 [pixijs](http://www.pixijs.com/) WebGL的Blur效果实现

- [ ] pixijs 必须初始化时设置 `preserveDrawingBuffer: true`

- [ ] 必须刷新stage

      ```javascript
      var ticker = new PIXI.ticker.Ticker();
      ticker.autoStart = false;
      ticker.stop();
      ticker.add(function() { app.renderer.render(app.stage); });
      ticker.start();
      ```

OR 可尝试原生Canvas blur 但是由于使用rem作为单位，页面resize时不能很好的处理canvas大小，导致加载显示的图片尺寸不正确。



## 广告劫持!!!

H5 被插入广告，原因可能如下：

1. DNS劫持，域名解析方面出现问题。
2. js注入，页面未对特殊字符限制。
3. iframe注入，页面被拦截之后加入了iframe标签，或者利用js注入后加载了广告的iframe标签。
4. 服务器被黑。

其中原因2之前项目中遇到过[Sexy](https://github.com/Sanchez3/MyProject/tree/master/Sexy),[NBfuel](https://github.com/Sanchez3/MyProject/tree/master/NBfuel)，需要特殊字符转义