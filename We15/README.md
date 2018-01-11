# 我们15个

## Phaser  add vs addOnce
```js
addOnce(listener, listenerContext, priority, args)
Add a one-time listener -
the listener is automatically removed after the first execution.

eg. this.sprite.onInputUp.addOnce(btn_func, this);

```


- add为sprite添加新的响应事件，保留原有的事件
- 某些情况下,防止add多次加载,内存泄


## Phaser 利用字体
[生成fnt](http://kvazars.com/littera/)
```js
this.load.bitmapFont('mday', 'assets/fonts/mday.png', 'assets/fonts/mday.fnt');
```

## 适配问题
当viewport为
```html
<meta content="width=device-width,initial-scale=1.0,user-scalable=no" name="viewport">
```
某些情况下,使用百分比or em rem单位控制尺寸不方便
```js
function OnResize() {
    var screenRate = 1206 / 750;
    var mWidth;
    var mHeight;
    var spriteScale;
    var bgScale;
    //横竖屏幕
    var mWidth = $("#main").width();
    var mHeight = $("#main").height();
    if ((mHeight / mWidth) > (1206 / 750)) {
        mHeight = screenRate * mWidth;
        spriteScale = mWidth / 750;
        bgScale = 750 / mWidth;
    } else {
        mWidth = mHeight / screenRate;
        spriteScale = mHeight / 1206;
        bgScale = 1206 / mHeight;
    }
    $("#main").css({
        left: "50%",
        marginLeft: -mWidth / 2,
        width: 750,
        height: 1206,
        "transform": "scale(" + spriteScale + ")",
        transformOrigin: "left top",
        top: 0
    });

}

```