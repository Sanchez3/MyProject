# Thinkpad X1

## Phaser 

### 适配问题

[Phaser.ScaleManager](https://photonstorm.github.io/phaser-ce/Phaser.ScaleManager.html) 

```javascript
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
this.scale.pageAlignHorizontally = true;
this.scale.pageAlignVertically = true;
```
**元素`sprite`位置**，利用 `game.world.centerX / centerY`，Gets the X / Y position corresponding to the center point of the world. 或者 `实际px *  当前屏幕与设计稿长（宽）比例`

**元素`scale`尺寸**，注意元素父子关系以及父元素的类型（[Sprite](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html#scale) , [Group](https://photonstorm.github.io/phaser-ce/Phaser.Group.html#scale)）

**元素`scale`尺寸** 和 **元素`sprite`位置**，都要考虑到以下几个条件

- 使用rem进行屏幕适配，`实际px：rem * font-size` ; Phaser初始化canvas长宽。

  ```javascript
  var wWidth = (window.screen.width > 0) ? (window.innerWidth >= window.screen.width || window.innerWidth == 0) ? screen.width :window.innerWidth : window.innerWidth;
  var wHeight = (window.screen.height > 0) ? (window.innerHeight >= window.screen.height || window.innerHeight == 0) ?window.screen.height : window.innerHeight : window.innerHeight;
  if (wWidth > wHeight) {
      fontSize = wHeight / 750 * 100;
  } else {
      fontSize = wWidth / 750 * 100;
  }
  ```

- 根据viewport scale设置 `initial-scale=1`，实际的设计稿尺寸`750*1206`

- 设备像素比(device pixel ratio) `window.devicePixelRatio` 。



  做屏幕适配，主要的几个方法：

  1. 等比例缩放contain  cover  

  	在phaser中，cover和contain 当层级、群组过度复杂可直接操作 [World](https://photonstorm.github.io/phaser-ce/Phaser.World.html) 和 [Camera](https://photonstorm.github.io/phaser-ce/Phaser.Camera.html)
  	`setBounds(x, y, width, height)`更新`World`尺寸和位置，同时影响`Camera`的`bounds`

  2. 某一方向 scroll 

     利用[phaser-list-view](https://github.com/mattcolman/phaser-list-view) 或者 canvas上层叠加dom，原生`overflow:scroll`、[Swiper4](https://www.swiper.com.cn/) js插件

### 渲染，性能问题

某些机器上（少部分iphone，几乎全部Android）！sprite的图片或纹理（sprite sheet or texture atlas）尺寸超过**安全尺寸2048*2048**，**拖动效率**骤减！！！（同理 使用image，tilesprite等；无论渲染 renderer 是 CANVAS 还是 WEBGL ）

> Note: this is device / hardware specific, not restricted by the browser or Phaser.
>
> Game FPS drops, Some common causes:
>
> 1) Game size is too large. Asking it to render too many pixels per frame can cause significant lag.
>
> 2) Texture sizes are too large, or there are too many of them filling up memory.
>
> 3) Expensive operations in main loops - pixel perfect click tests for example.
>
> 4) HTML page hasn't been set-up properly for games (i.e. viewport scaling allowed, other elements causing slow down)



#### SpriteSheet Vs Atlas

选择`Atlas`更好

> Note: There is no technical advantage of using a sprite sheet at all. They tend to use more space both in memory and bandwidth because they don't pack frame data as efficiently as a texture atlas does.
>
> However, there are lots of legacy graphics out there in that format, and its still quite popular today. So we support them. But you should try and pack graphics into atlases where possible to save on ram.



#### 详细原理

> # [Advanced Rendering Tutorial](https://phaser.io/tutorials/advanced-rendering-tutorial)
>
> #### The effect of Multi-Texturing
>
> So, what can we do about it?
>
> If the device supports it, WebGL is capable of using more than one texture at a time in a shader. This is entirely GPU dependent, but thankfully very easy to determine. An iPhone 5S with its A7 GPU can support up to 16 texture image units at once, in a single shader. Even a lowly iPhone 4 can support up to 8. The difference it makes is remarkable:
>
> ![image](https://phaser.io/content/tutorials/advanced-rendering-tutorial/multitexturing3.png)
>
> This is the exact same example as above, with multi-texturing enabled in Phaser. We've gone from 212 draw ops down to just 2, and one of those was clearing the screen. 1911 WebGL calls, down to 19.
>
> It's painfully clear which one is better for overall performance.

具体至项目中，某些安卓设备例如对于`WEBGL`的支持并不好 or 仅仅是图片元素等普通动画，`RendererType`使用`Phaser.CANVAS`，效果更好。

### 操作框 虚线

**Phaser** 利用 `bitmapData` 做 `canvas context` 的任何操作；并且可作为 `Images/Sprites` 的纹理 `texture` 。

> Important note: Every BitmapData creates its own Canvas element. Because BitmapData's are now Game Objects themselves, and don't live on the display list, they are NOT automatically cleared when you change State. Therefore you *must* call BitmapData.destroy in your State's shutdown method if you wish to free-up the resources the BitmapData used, it will not happen for you.

**虚线** `ctx.setLineDash(segments);` 

参考：[CanvasRenderingContext2D.setLineDash()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)  [Canvas学习：绘制虚线和圆点线](https://www.w3cplus.com/canvas/draw-dashed-and-dotted-lines.html)

```javascript
var bmd= game.add.bitmapData(w, h);
var ctx = bmd.ctx;
ctx.lineWidth = '4';
ctx.strokeStyle = 'white';
ctx.setLineDash([9, 3]);
ctx.beginPath()
ctx.moveTo(0, 0);
ctx.lineTo(w, 0);
ctx.lineTo(w, h);
ctx.lineTo(0, h);
ctx.closePath();
ctx.stroke();
var sprite=game.make.sprite(0, 0, bmd);
//若需要重新调整大小，建议以下方法调整，而不是重新创建个bitmapData。
// bmd.resize(nw,nh); 
// sprite.loadTexture(bmd);
```




### 手势操作

两个触点，缩放，旋转。

**Reference:** [Rotate and Scale using Multitouch Gestures](https://codepen.io/hanseklund/pen/izloq?editors=1010)

```javascript
var inputHelper = { isGesture: false, dragStartX: 0, dragStartY: 0, dragX: 0, dragY: 0, dragDX: 0, dragDY: 0, dragging: false, touchStartDistance: 0, touchStartAngle: 0 };
function handleGestureStart(p1, p2, sprite) {
    inputHelper.isGesture = true;
    //calculate distance and angle between fingers
    // var dx = p2.x - p1.x;
    // var dy = p2.y - p1.y;
    // inputHelper.touchStartDistance = Math.sqrt(dx * dx + dy * dy);
    inputHelper.touchStartDistance = Phaser.Math.distance(p2.x, p2.y, p1.x, p1.y)
    // inputHelper.touchStartAngle = Math.atan2(dy, dx);
    inputHelper.touchStartAngle = Phaser.Math.angleBetweenPoints(p1, p2)
    //we also store the current scale and rotation of the actual object we are affecting. This is needed because to enable incremental rotation/scaling. 
    inputHelper.startScale = sprite.scale;
    inputHelper.startAngle = sprite.rotation;
}
function handleGesture(p1, p2, sprite) {
    if (inputHelper.isGesture) {
        // var dx = p2.x - p1.x;
        // var dy = p2.y - p1.y;
        var touchDistance = Phaser.Math.distance(p2.x, p2.y, p1.x, p1.y)
        // var touchAngle = Math.atan2(dy, dx);
        var touchAngle = Phaser.Math.angleBetweenPoints(p1, p2)
        //calculate the difference between current touch values and the start values
        var scalePixelChange = touchDistance - inputHelper.touchStartDistance;
        var angleChange = touchAngle - inputHelper.touchStartAngle;
        //calculate how much this should affect the actual object
        // currentScale = this.inputHelper.startScale.x + scalePixelChange * 0.01;
        var currentRotation = inputHelper.startAngle + angleChange;
        var currentScale = Math.min(Math.max(0.25, inputHelper.startScale.y + scalePixelChange * 0.008), 2);
        sprite.rotation = currentRotation;
		// if flip, change scale
        if (sprite.flipF) {
            sprite.scale = new PIXI.Point(-currentScale, currentScale);
        } else {
            sprite.scale = new PIXI.Point(currentScale, currentScale);
        }
        // update Selection box
        sprite.updateBox(currentScale, sprite.flipF)
    }
}
```
### 插件 phaser-list-view.js

插件具体实践问题

- 初始化后，位于场景最上层，其他元素需再次`bringToTop`，以及它监控整个game全局input事件，**注意事件冲突**。

- 由于尺寸问题，listview中**子元素的大小也需要重新调整**，重写具体方法

  `list_view_core.js`中 `add` 方法  改写 ：

  ```javascript
  xy = lastChild[this.p.xy] + (0, _util.getWidthOrHeight)(lastChild, this.p.wh)/window.devicePixelRatio + this.o.padding;
  this.length = (xy + child[this.p.wh]/window.devicePixelRatio);
  ```

- `destory()`方法，destroy the list view and clean up all event listeners，同时他会**销毁listview中所有子元素**。若想重利用子元素，需要重新创建。




## 敏感词过滤

**全文搜索，逐个匹配。** 利用词库，[数组+正则](https://www.imcyk.com/post/87.html) 

```javascript
function filterkeyWords(data, str) {
    var s = str;
    var r = 0;
    var a = new Object();
    for (var i in data) {
        var patt = new RegExp('(' + data[i] + ')', 'gi');
        var ret_test = patt.test(s);
        if (ret_test) {
            s = s.replace(patt, '***');
            r = r + 1;
        }
    }
    a.s = s;
    a.r = r;
    return a;
}
// example
//var rs = filterkeyWords(keyWordArray,'fuck');
//console.log(rs)
```



**[DFA 敏感词过滤](https://github.com/wangjinglian/DFA)** 使用*Node.js* 文件系统（*fs* 模块）模块，读取词库；利用DFA算法（确定有限状态自动机）实现匹配。

> ### DFA算法介绍
>
> DFA是一种计算模型，数据源是一个有限个集合，通过当前状态和事件来确定下一个状态,即 状态+事件=下一状态，由此逐步构建一个有向图，其中的节点就是状态，所以在DFA算法中只有查找和判断，没有复杂的计算，从而提高算法效率

*Reference:* [js实现敏感词过滤算法](https://juejin.im/post/5b5456ec6fb9a04fe91a7834)



## 数据埋点 事件分析

利用统计工具或者ajax传数据 进行埋点

主要几个方面：

- [ ] 微信分享（朋友圈，对话）
- [ ] 特殊途径，来源（各种平台，地点，官网，二次传播的图片……）
- [ ] 设备操作（ios、android）
- [ ] 预测行为（长按保存，双击）长按保存，Android和IOS识别时间不同，通常超过400ms即可。