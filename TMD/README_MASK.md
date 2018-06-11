# CSS Masks
Method of displaying part of an element, using a selected image as a mask
![caniusemask](https://github.com/Sanchez3/MyProject/blob/master/TMD/caniusemask.png)

`-webkit-mask` 其属性与`background`语法基本相同。

- [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image): `none`
- [`mask-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode): `match-source`
- [`mask-repeat`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat): `no-repeat`
- [`mask-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position): `center`
- [`mask-clip`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-clip): `border-box`
- [`mask-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-origin): `border-box`
- [`mask-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size): `auto`
- [`mask-composite`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite): `add`



## KEY

利用`animation`的`steps()`做逐帧动画，控制mask的图片位置实现蒙版的帧动画

```css
.mask{
  	-webkit-mask: url(../img/mask_sprite.png);
	mask: url(../img/mask_sprite.png);
	-webkit-mask-size: 7500% 100%;
	mask-size: 7500% 100%;
	-webkit-animation: mask-play 1s steps(74) forwards;
	animation: mask-play 1s steps(74) forwards;
}

@-webkit-keyframes mask-play {
    from {
        -webkit-mask-position: 0% 0;
        mask-position: 0% 0;
    }
    to {
        -webkit-mask-position: 100% 0;
        mask-position: 100% 0;
    }
}

@keyframes mask-play {
    from {
        -webkit-mask-position: 0% 0;
        mask-position: 0% 0;
    }
    to {
        -webkit-mask-position: 100% 0;
        mask-position: 100% 0;
    }
}
```
利用`TimelineMax` `TweenMax` 控制slide的class

```javascript
var slide0 = document.getElementById('slide0');
var slide1 = document.getElementById('slide1');
var tl = new TimelineMax({ repeat: -1, paused: false });
tl.set(slide0, {
    delay: 3,
    css: { className: '+=mask', zIndex: 20 }
})
tl.set(slide0, {
    delay: 1.2,
    css: { className: '-=mask', zIndex: 10 }
})
tl.set(slide0, {
    delay: 3,
    css: { className: '+=mask', zIndex: 20 }
})
tl.set(slide0, {
    delay: 1.2,
    css: { className: '-=mask', zIndex: 10 }
})
```


> Note: This function is the heart of our slideshow: we set the class **“mask”** to the current slide and once the animation is over, we reduce the z-index of the previous slide, increase the one of the current slide and then remove the **mask** class of the previous slide.



## Masking vs. Clipping

[Masking vs. Clipping: When to Use Each](https://css-tricks.com/masking-vs-clipping-use/)

[Clipping and Masking in CSS](https://css-tricks.com/clipping-masking-css/)

![caniuseclip](https://github.com/Sanchez3/MyProject/blob/master/TMD/caniuseclip.png)



## REFERENCE

- [Can I use mask?](https://caniuse.com/#search=mask)
- [mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask)
- [Transition Effect with CSS Masks](https://tympanus.net/codrops/2016/09/29/transition-effect-with-css-masks/)