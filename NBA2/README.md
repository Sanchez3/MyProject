# NBA 福利在现场
## Phaser运动抛物线

```js
var moveSprite = this.game.add.sprite(startX, startY, 'spritekey');
var tween = game.add.tween(moveSprite).to({
x: [startX, firstBezierPointX, secondBezierPointX, endX],
y: [startY, firstBezierPointy, secondBezierPointY, endY],
}, 1000,Phaser.Easing.Quadratic.Out, true).interpolation(function(v, k){
    return Phaser.Math.bezierInterpolation(v, k);
});
```
- [Sprite Motion Paths Tutorial](http://phaser.io/tutorials/coding-tips-008)

- interpolation [wiki](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)

firstBezierPointX and firstBezierPointY are "control points" on the curve. You set the control points based on what you want the bezier curve to look like. For example if you set just one x/y control point, it would be a quadratic curve.

## 横竖屏旋转提示
从WxMoment中摘取相关代码,以此做模板根据项目需要做改动


## 动态插入js代码
```js
var hm = document.createElement("script");
hm.src = "http://tajs.qq.com/stats?sId=53604919";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
```