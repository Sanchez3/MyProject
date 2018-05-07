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





## phaser bug

- [x] phaser canvas 旋转后，input事件出现bug
- [x] phaser全屏 width height  resolution (window.devicePixelRatio) CANVAS缩放比例

