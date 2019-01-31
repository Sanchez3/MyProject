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

### Cos
- [腾讯云 COS JS SDK（XML API）](https://github.com/tencentyun/cos-js-sdk-v5)
- 在上面基础上修改的[doCos](https://github.com/Sanchez3/MyProject/blob/master/Citicbank/doCos.js)

## 图片压缩
发送图片。`nginx: 413 Request Entity Too Large`
判断`xhr.status == 413`前端提示用户上传图片过大
通常php默认上传大小2mb，然而目前美颜图片超大至少10mb，那么解决办法：
- 后端把 upload_max_filesize 和 post_max_size 修改为20M
- [localResizeIMG](https://github.com/think2011/localResizeIMG) 前端进行压缩，然后再将压缩后图片上传

两种办法，前者用户等待时间上传图片；后者前端压缩需要时间；但总体来说前端压缩会减轻后端压力（节省带宽），将压力转为用户机器承担（低配手机或性能低手机会出现卡顿情况）。

## 截取图片`base64,`后的字符串
```javascript
var _base64 = rst.base64.split(',')[1];
```
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
重写方法base64
```javascript
import * as PIXI from 'pixi.js'
PIXI.extract.webgl.prototype.base64 = function base64(target, format, quality) {
    return this.canvas(target).toDataURL(format, quality)
}

PIXI.extract.canvas.prototype.base64 = function base64(target, format, quality) {
    return this.canvas(target).toDataURL(format, quality)
}
```
## pixijs 加载图片地址问题
> Note:所有的html页面中的相对地址都是相对于服务器根目录(http://192.168.0.1/)的，而不是跟目录下的该Web应用的目录( http://192.168.0.1/webapp/的)。

推荐使用`/`

应该尽量避免使用类似 `.` `./` `../../` 等类似的相对该文件位置的相对路径

可能会出现问题：pixijs canvas加载过，而后dom若存在文件，再次被加载（或加载失败）

## 视频问题再探讨（还有bug）
### playsinline属性
webkit-playsinline="true"：视频播放时局域播放，不脱离文档流 。但是这个属性比较特别， 需要嵌入网页的APP比如WeChat中UIwebview 的allowsInlineMediaPlayback = YES webview.allowsInlineMediaPlayback = YES，才能生效。换句话说，如果APP不设置，你页面中加了这标签也无效，这也就是为什么安卓手机WeChat 播放视频总是全屏，因为APP不支持playsinline，而ISO的WeChat却支持。

### app内使用ts格式播放
微信播放顺畅，
**但是其他APP播放效率不能保证**

### 用户关闭（过渡的）视频
`x5videoexitfullscreen` 属性和`webkitendfullscreen` 属性，都要设置
```javascript
//进入全屏
function FullScreen() {
    var ele = document.documentElement;
    if (ele .requestFullscreen) {
        ele .requestFullscreen();
    } else if (ele .mozRequestFullScreen) {
        ele .mozRequestFullScreen();
    } else if (ele .webkitRequestFullScreen) {
        ele .webkitRequestFullScreen();
    }
}
//退出全屏
exitFullscreen(elem) {
    elem = elem || document;
    if (elem.cancelFullScreen) {
        elem.cancelFullScreen();
    } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
    } else if (elem.webkitCancelFullScreen) {
        elem.webkitCancelFullScreen();
    } else if (elem.webkitExitFullScreen) {
        elem.webkitExitFullScreen()
    }
}

// 播放结束时
$(video).on('ended',function(){
    //退出全屏
    exitFullscreen()
});

// 【进入全屏webkitbeginfullscreen】-【退出全屏webkitendfullscreen】
$(video).on('webkitbeginfullscreen', function() {
    video.play();
 }).on('webkitendfullscreen', function() {
    video.pause();
 });
```
以上`exitFullscreen`方法在手机端不一定生效

## H5监听后退事件与关闭事件
使用 [howler.js](https://howlerjs.com/)播放声音，在中信的App上，关闭h5页面后，声音仍播放。推荐使用原生audio，避免出现此类bug

- **window.unonload事件**，不一定生效
- **visibilitychange事件**，不一定生效
  ```javascript
  var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
  var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
  var onVisibilityChange = function(){
      if (document[hiddenProperty]) {    
          console.log('页面非激活');
      }else{
          console.log('页面激活')
      }
  }
  document.addEventListener(visibilityChangeEvent, onVisibilityChange); 
  ```
- **popstate方法**
  1. `pushState`，修改历史记录条目，同时这会影响到某些App的h5页面，出现App自带的返回按键标识（或关闭按键标识）
  2. 监听`popstate`，触发时调用自定义事件
  ```javascript
   pushHistory(); 
   window.addEventListener("popstate", function(e) { 
       alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
   }, false); 
   function pushHistory() { 
       var state = { 
           title: "title", 
           url: "#"
       }; 
       window.history.pushState(state, "title", "#"); 
   }
  ```
### Reference
- [移动端h5监听浏览器返回操作（目前在react项目中用到）](https://blog.csdn.net/sinat_17775997/article/details/81699492)
- [使用h5新特性，轻松监听任何App自带返回键](https://segmentfault.com/a/1190000013700474)


## 人脸融合
face++，真贵真不错。[demo体验](https://www.faceplusplus.com.cn/face-merging/#demo)

腾讯云，便宜凑活用。目前不是天天p图团队的技术支持了，效果明显下降。以前的案例参考(军装，民国以及微信小程序疯狂变脸)也不能算数。[具体分裂矛盾](https://www.huxiu.com/article/279376.html?h_s=h2)

当前技术支持，问题如下：
- 推荐配置 脸型参数：最低 脸型参数：最高
  > 脸型参数(融合数值越高，融合后的五官越像模特) ，模板越明显，用户越难分辨
  >
  > 脸型参数（脸型数值越高，融合后的脸型越像模特） ，模板被扭曲，强行匹配用户图
- 融合眉毛以下脸部位，眉毛保持跟模特一模一样！！！face++并不会。
- 融合肤质模糊或粗糙
- 脸部有遮挡时，结果图中脸庞四周会出现黑影
