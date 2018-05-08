# 天猫二十四节气

## 立夏 
[我的夏之歌](https://tm24.lxustudio.cn/)



## 利用 History 保持项目链接一致性
项目防止循环跳转，保证项目分享出去的链接一致。

[改变URL且不刷新页面](https://github.com/Sanchez3/MyProject/issues/5)

使用  `window.history.pushState()`  `window.history.replaceState()` 可能会影响微信分享

- [ ] 待测



## 编码、解码

利用URL 传递参数，分享并展现不同用户信息。

安全性 需要对URL再编码 [H5被植入广告](https://github.com/Sanchez3/MyProject/tree/master/NBfuel#h5%E8%A2%AB%E6%A4%8D%E5%85%A5%E5%B9%BF%E5%91%8A)

`encodeURIComponent()`是对统一资源标识符（URI）的组成部分进行编码的方法

`decodeURIComponent()` 方法用于解码由 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 方法或者其它类似方法编码的部分统一资源标识符（URI）。

> Notice: 存在bug :bug:
>
> 部分手机微信端不支持该方法，需要利用 `try...catch` 或者查看方法是否存在。



## 点在矩形，矩形相交

### 点在矩形中

当矩形边与坐标轴平行，判断坐标点在不在矩形的left - right，bottom- top

```javascript
function isPointIn (r, x, y) {
return (x >= (r.left) && x < r.right && y >= r.bottom && y < r.top);
};
```
当矩形不平行于坐标轴时，

方法1，将矩形经过旋转还原成平行

方法2，判断该点的横纵坐标是否分别夹在于行的左右边和上下边中。

​	eg. 矩形顶点P1，P2，P3，P4，判断P是否包含在矩形中

​		判断|P2P|×|P1P2|*|P3P|×|P3P4|<=0  &&  |P1P|×|P1P4|*|P2P|×|P2P3|<=0

```javascript
function isPoinIn(mp1, mp2, mp3, mp4, mp) {
    if (Multiply(mp, mp1, mp2) * Multiply(mp, mp4, mp3) <= 0 && Multiply(mp, mp4, mp1) * Multiply(mp, mp3, mp2) <= 0)
        return true;
    return false;
}
// 计算叉乘 |P0P1| × |P0P2| 
function Multiply(p1, p2, p0) {
    return ((p1.X - p0.X) * (p2.Y - p0.Y) - (p2.X - p0.X) * (p1.Y - p0.Y));
}
```

引申 点在不规则图形中

```JavaScript
//定义点的结构体
function point(){
 this.x=0;
 this.y=0;
}

//计算一个点是否在多边形里,参数:点,多边形数组
function PointInPoly(pt, poly) { 
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) 
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) 
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) 
        && (c = !c); 
    return c; 
}
```

更多方法：

[Point in polygon](https://en.wikipedia.org/wiki/Point_in_polygon)

[Point in Polygon Strategies](http://erich.realtimerendering.com/ptinpoly/)



相关用途：[“等一下，我碰！”——常见的2D碰撞检测 ](https://github.com/JChehe/blog/issues/8)



## Phaser bug

- [x] phaser canvas 旋转后，input事件出现bug
- [x] phaser全屏 width height  resolution (window.devicePixelRatio) CANVAS缩放比例

