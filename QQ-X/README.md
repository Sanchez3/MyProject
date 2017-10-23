#QQ空间南极探索招募令

##[Skrollr.js](https://github.com/Prinzhorn/skrollr)视差滚动效果
手机端 原生`overflow:scroll`被禁用。通过手势移动距离，控制dom移动。与swiper插件可共存。

详细资料：[使用Skrollr.js實作視差滾動](http://lala0812.logdown.com/posts/240837-skrollr-easily-implement-css3-html5-parallax-scrolling)



##swiper与slick的选择

swiper的结构更明确，重写样式更为方便。slide需要jquery支持。总体大小相比较差不多。

当禁止touchmove （e.preventDefault();），进而禁止了原生scroll，若需要scroll场景时需要swiper模仿。

###swiper  

- 最新版本分页器原方法更改，参考最新api！！！！

- display none 时，swiper初始化无效。

  ​







## rem与px

**项目前期就应该确认单位的选用**

单位的选择，影响到动画、雪碧图以及排版重要内容。

- rem使用场景：不适用于 css animation steps做序列帧动画。不适用于 制作雪碧图。**很适用于制作canvas动画固定大小的页面**
- px使用场景：**很适用于可scroll的页面**。雪碧图，css序列帧动画。





##禁止scroll的方法

js:

```javascript
function handler(e) {
	e.preventDefault();
}
document.addEventListener('touchmove', handler, false);
document.removeEventListener('touchmove', handler, false);
```

Css:

```css
overflow: hidden;
overflow: scroll;
```



