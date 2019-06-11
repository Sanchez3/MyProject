#Georgia

## 滑动交互Scroll Interactions

### 参考Reference:

- [一镜到底Demo](https://coding.net/u/MomentStudio/p/long-take-demo/git) 
- [从零到一：实现通用一镜到底H5](https://segmentfault.com/a/1190000017848401)

### 利用 gsap 的TweenMax 和TimelineMax处理动画进度（时间轴）

简单逻辑如下

```javascript
var timeline = new TimelineMax({ paused: true });
var tw=new TweenMax.fromTo(obj, duration, from, to);
var tl = new TimelineMax({ delay: delay });
tl.add(tw, 0);
tl.play()
timeline.add(tl, 0);
```


### 利用[Zynga Scroller](https://github.com/pbakaus/scroller)监控滑动距离，以及滑动惯性等
```javascript
//scroller totalH
//window height window.cfg.height
scroller=new Scroller(function(left,top){
  //timeline progress
  timeline.progress(top/(totalH-window.cfg.height))
  }, { bouncing: false, scrollingY: true});
scroller.setDimensions(window.cfg.width, window.cfg.height, window.cfg.width, totalH);

//pixi.js view
var canvasElement = document.getElementById('canvas-element');
canvasElement.addEventListener('touchstart', function(e) {
    e.preventDefault();
    scroller.doTouchStart(e.touches, e.timeStamp);
    touchstart = true;
}, { passive: false })
canvasElement.addEventListener('touchmove', function(e) {
    if (!touchstart) return;
    scroller.doTouchMove(e.touches, e.timeStamp);
}, { passive: false })
canvasElement.addEventListener('touchend', function(e) {
    if (!touchstart) return;
    touchstart = false;
    scroller.doTouchEnd(e.timeStamp);

}, { passive: false })
canvasElement.addEventListener("touchcancel", function(e) {
    if (!touchstart) return;
    touchstart = false;
    scroller.doTouchEnd(e.timeStamp);
}, { passive: false });
```

### 事件监听方法
`on trigger off`事件在Scroller中调用`trigger('progress', timeline.time())`

```javascript
// ────────────────────────────────────────────────────────────────────────────────
// 事件
// ────────────────────────────────────────────────────────────────────────────────
function on(name, callback) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(callback)
}

function off(name, callback) {
    const callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
        const index = callbacks.indexOf(callback)
        if (index !== -1) callbacks.splice(index, 1)
    }
}

function trigger(name, params) {
    const callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
        callbacks.forEach((cb) => {
            cb(params)
        })
    }
}
```



## Bug

**视频** 播放问题

- 视频播放，通过监控手势触发，***touchstart触发在Android上出现问题***

  - click

  - touchend

  - doubleclick

  - pointerup  (pixi.js)

  - tap (pixi.js touch-only)

  - click (pixi.js mouse-only)

    

- 视频A播放结束后，接着播放视频B 。**目前待解决**

  


**Pixi.js**

- 适配问题 Resizing Renderer 
  - https://github.com/pixijs/pixi.js/wiki/v4-Tips,-Tricks,-and-Pitfalls#resizing-renderer

  - [PIXI.Application need to been resizeable when window resize](https://github.com/pixijs/pixi.js/issues/4757)

- 