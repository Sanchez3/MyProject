# 中信银行 人脸融合项目

## 用户上传图片

```html
<label class="upload-btn" for="inputImage" title="Upload image file"></label>
<input type="file" class="sr-only" id="inputImage" name="file" accept="image/png, image/jpeg, image/jpg">
```

- `accept`属性应设为`image/*`，否则 若为 `accept="image/png, image/jpeg, image/jpg"`，安卓手机显示打开摄像头的选项。
- `capture`属性，设置后手机只会调取摄像头，而无法从相册中选择。

## 动态效果与时间消耗
> Note: 不单要注意动态过渡顺畅，也要避免因增强动态效果，而让用户过多等待！有时候**增强动态效果**会影响整个项目效率与速度


## 图片压缩
 发送图片。`nginx: 413 Request Entity Too Large`
通常php默认上传大小2mb，然而目前美颜图片超大至少10mb，那么解决办法：
- 后端把 upload_max_filesize 和 post_max_size 修改为20M
- [localResizeIMG](https://github.com/think2011/localResizeIMG) 前端进行压缩，然后再将压缩后图片上传

两种办法，前者用户等待时间上传图片；后者前端压缩需要时间；但总体来说前端压缩会减轻后端压力（节省带宽），将压力转为用户机器承担（低配手机或性能低手机会出现卡顿情况）。

## pixijs canvas生成图片
> **PIXI.extract**
>
> This namespace provides renderer-specific plugins for exporting content from a renderer. For instance, these plugins can be used for saving an Image, Canvas element or for exporting the raw image data (pixels).
>

Example
```javascript
// Create a new app (will auto-add extract plugin to renderer)
const app = new PIXI.Application();

// Draw a red circle
const graphics = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawCircle(0, 0, 50);

// Render the graphics as an HTMLImageElement
const image = app.renderer.plugins.extract.image(graphics);
document.body.appendChild(image);
```
有专门将pixijs对象（Graphics, Container, Sprite, etc.）转为图片的方法。
但是[image方法](http://pixijs.download/release/docs/PIXI.extract.CanvasExtract.html#image) （同理WebGLExtract） 核心是调用`toDataURL()`，且为默认生产png格式图片，该类型大小相对于jpeg、jpg过大。建议重写`image方法`，调用`toDataURL("image/jpeg", encoderOptions)` 
>encoderOptions 可选
>
>在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
