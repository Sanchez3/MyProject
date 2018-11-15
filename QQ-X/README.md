# QQ空间南极探索招募令

## [Skrollr.js](https://github.com/Prinzhorn/skrollr)视差滚动效果
手机端 原生`overflow:scroll`被禁用。通过手势移动距离，控制dom移动。与swiper插件可共存。

详细资料：[使用Skrollr.js實作視差滾動](http://lala0812.logdown.com/posts/240837-skrollr-easily-implement-css3-html5-parallax-scrolling)



## swiper与slick的选择

swiper的结构更明确，重写样式更为方便。slide需要jquery支持。总体大小相比较差不多。

当禁止touchmove （e.preventDefault();），进而禁止了原生scroll，若需要scroll场景时需要swiper模仿。

### swiper  

- 最新版本分页器原方法更改，参考最新api！！！！

- display none 时，swiper初始化无效。

  ​



## rem与px

**项目前期就应该确认单位的选用**

单位的选择，影响到动画、雪碧图以及排版重要内容。

- rem使用场景：不适用于 css animation steps做序列帧动画。不适用于 制作雪碧图。**很适用于制作canvas动画固定大小的页面**
- px使用场景：**很适用于可scroll的页面**。雪碧图，css序列帧动画。





## 禁止scroll的方法

js:

```javascript
function handler(e) {
	e.preventDefault();
}
document.addEventListener('touchmove', handler, { passive: false });
document.removeEventListener('touchmove', handler, { passive: false });
```

Css:

```css
overflow: hidden;
overflow: scroll;
```



## CSS3动画帧数

CSS3 Animation steps

![Step timing functions](https://github.com/Sanchez3/MyProject/blob/master/QQ-X/step-timing-func-examples.png)

制作纯CSS的序列帧动画  [在线计算器](http://tid.tenpay.com/labs/css3_keyframes_calculator.html)

设计组提供序列帧个数n张图，即是动作个数n个（动画类型：单向循环动画，动作停顿：不停顿）

使用[TexturePacker](https://www.codeandweb.com/texturepacker) 生成sprite sheets，data format: `CSS(simple)`  Algorithm: `Basic`  Sort by: `Name` 

[demo](https://github.com/Sanchez3/MyProject/tree/master/QQ-X/spritesheet)

素材：[选取图片gif](https://bbs.hupu.com/17346388.html)

steps(1)

```css
@-webkit-keyframes anim-name{
    0%{  /* 动作1 */  }
    11.1%{  /* 动作2 */  }
    22.2%{  /* 动作3 */  }
    33.3%{  /* 动作4 */  }
    44.4%{  /* 动作5 */  }
    55.5%{  /* 动作6 */  }
    66.6%{  /* 动作7 */  }
    77.7%{  /* 动作8 */  }
    88.8%{  /* 动作9 */  }
    100%{  /* 动作10 */  }
}
```



```css
.sprite {display:inline-block; overflow:hidden; background-repeat: no-repeat;background-image:url(basketball.png);}

.图层-1 {width:171px; height:196px; background-position: -1px -1px}
.图层-10 {width:171px; height:196px; background-position: -174px -1px}
.图层-2 {width:171px; height:196px; background-position: -347px -1px}
.图层-3 {width:171px; height:196px; background-position: -520px -1px}
.图层-4 {width:171px; height:196px; background-position: -693px -1px}
.图层-5 {width:171px; height:196px; background-position: -866px -1px}
.图层-6 {width:171px; height:196px; background-position: -1039px -1px}
.图层-7 {width:171px; height:196px; background-position: -1212px -1px}
.图层-8 {width:171px; height:196px; background-position: -1385px -1px}
.图层-9 {width:171px; height:196px; background-position: -1558px -1px}
```

将上述两个code合体（注意图层位置，请重新排序1-10）（sublimetxt 超级好用超方便）

```css
 
animation: b1 1s steps(1) infinite;

@keyframes b1{
    0%{ background-position: -1px -1px;}
    11.1%{ background-position: -347px -1px;}
    22.2%{ background-position: -520px -1px;}
    33.3%{ background-position: -693px -1px;}
    44.4%{ background-position: -866px -1px;}
    55.5%{ background-position: -1039px -1px;}
    66.6%{ background-position: -1212px -1px;}
    77.7%{ background-position: -1385px -1px;}
    88.8%{ background-position: -1558px -1px;}
    100%{  background-position: -174px -1px;}
}
```

当然也可以利用animation的steps(n)，n=关键帧数－1，不需计算每一个百分比关键帧，只需要最后一帧`background-position`，使用Texturepacker时还建议设置，Trim mode: `None`  Trim Margin: `0` Extrude: `0` 

但是所有序列帧图片必须顺序排成一行（一列不成），注意有长度限制。

> Note: The maximum texture size for mobile devices should not exceed 2048. Bigger textures might not be displayed on some devices or might cause jittering sprites.

```css
animation: b2-h 1s steps(9) infinite;

@keyframes b2-h {
    100% {
        background-position: -1539px -0px;
    }
}
```


