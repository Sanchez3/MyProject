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



## PIXI模糊问题

Pixijs blurry [Retina support](https://github.com/pixijs/pixi.js/issues/621)

- [ ] :question: `!!CanvasRenderingContext2D && (CanvasRenderingContext2D.imageSmoothingEnabled = false);`
- [ ] :question:`loadapp.context.imageSmoothingEnabled = true;`
- [x] :heavy_exclamation_mark:  `PIXI.autodetectRenderer(100, 100, {resolution:2})`
> Note:还需要根据尺寸缩放元素




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



## Textarea技术关键点

可以换行但是也要在规定行数内 css的`rows`无法限制，但是可以利用rows标识，通过js控制

参考：[如何精确控制textarea的行数，若输入超过指定的行数，则禁止输入？](https://www.zhihu.com/question/41044053)

最终采用如下方案：

利用两个textarea，计算`line-height`解决

```javascript
var styles = getComputedStyle(t);
var lineHeight = parseFloat(styles.lineHeight);
var old = t.value;
var maxLines = 5;

t.addEventListener('input', function () {
  g.value = t.value;
  var lines = Math.round(g.scrollHeight / lineHeight);
  if (lines > maxLines) {
    t.value = old;
    w.textContent = '最多输入' + maxLines + '行！';
  } else {
    old = t.value;
    o.textContent = lines;
    w.textContent = '';
  }
});
```



通过监控`onscroll`方法判断是否超过行数有bug，待解决

```javascript
window.onload=function(){
          var  textArea = document.getElementById("ta");
            textArea.style.overflow="hidden";
            textArea.rows=2;
            textArea.flag =false;
            textArea.onscroll=function(){
              if(textArea.flag)
                   return;
              this.disabled = true;
              this.value=this.value.slice(0,this.value.length-1);
              textArea.flag=true;
          };
        };
```

两种方法都要注意 `textArea.value` 和`textArea.innerHTML`

> Note：CSS中textarea是没有value属性的!!!



## 广告劫持!!!

H5 被插入广告，原因可能如下：

1. DNS劫持，域名解析方面出现问题。
2. js注入，页面未对特殊字符限制。
3. iframe注入，页面被拦截之后加入了iframe标签，或者利用js注入后加载了广告的iframe标签。
4. 服务器被黑。

其中原因2之前项目中遇到过[Sexy](https://github.com/Sanchez3/MyProject/tree/master/Sexy),[NBfuel](https://github.com/Sanchez3/MyProject/tree/master/NBfuel)，需要特殊字符转义

目前最佳最稳妥方法就是HTTPS

[使用阿里云免费SSL证书实现全站HTTPS化](https://weiya.me/item/66.html) **方法借鉴，目前已无免费证书**



## 玩转Console

```
 _____ ___ ____ _      _   
|  ___|_ _/ ___| | ___| |_ 
| |_   | | |  _| |/ _ \ __|
|  _|  | | |_| | |  __/ |_ 
|_|   |___\____|_|\___|\__|
```

[FiGlet](http://www.figlet.org/)  以及[FlGlet初识](https://aotu.io/notes/2016/11/22/figlet/)

npm上的FiGlet插件

[figlet](https://www.npmjs.com/package/figlet)

[asciify](https://www.npmjs.com/package/asciify) 

[AlphabetJS](https://github.com/starkwang/alphabetJS)



## 抛弃Jquery 

ajax的替代品：[Ajax](https://github.com/fdaciuk/ajax)

其他语法相关 [You-Dont-Need-jQuery](https://github.com/nefe/You-Dont-Need-jQuery)



## BUG待解决

- [ ] 给iframe写css样式后，会影响页面排版？？？

