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

