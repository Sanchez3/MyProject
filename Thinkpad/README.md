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

     利用[phaser-list-view](https://github.com/mattcolman/phaser-list-view) 或者 canvas上层叠加dom，原生`overflow:scroll`、Swiper4 js插件

### 渲染，性能问题

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

具体至项目中，某些安卓设备例如对于webgl的支持并不好，所以`RendererType`使用`Phaser.CANVAS`