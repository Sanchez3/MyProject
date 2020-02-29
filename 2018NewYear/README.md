# AR项目实际应用

基于AR.js和three.js结合进行的3D渲染

**其中AR部分：**核心AR库使用到开源的artoolkit5，通过封装改进可以更好的应用于Web端包括手机端Android和ios。

**基本原理：**

摄像头获取的实时视频去识别一个的特殊图像（AR标记），识别成功时会在视频之上展现Threejs构建3D场景和物体动画。

**限制：**

·    3D建模模型的面，模型的复杂度，面越多，模型越大，加载所需开销就越大

- Android设备版本要求Android4以上
-  IOS设备要求IOS11及其以上
-  除此之外，针对于微信app，IOS设备需要用户跳出微信app，转至浏览器Safari观看
- IOS用户分享请自行使用原生浏览器分享

**参考见：**

**①** https://ngd.lxustudio.cn/  ![noar_bazhuayu.png](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/ngd-marker.png) 

**②** To try it on your phone, it is only 2 easy steps, check it out!

1. ![https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/hiro-marker.png)Open this [hiro marker image](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg) in your     desktop browser.
2. ![rcode pointing to the webapp](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/qrcode.png)Open this [augmented reality webapps](https://jeromeetienne.github.io/AR.js/three.js/examples/mobile-performance.html) in your     phone browser, and point it at your screen. 

 

**技术障碍：**

1. AR标记 需要如上图所示（可进行一些修改）
    由于是前端实时抓取摄像头画面帧，通过分析处理当前帧具体像素匹配标识码，那么过于复杂的标记方法（例如，特征点计算和训练图形等），在前端计算能力不足，以至于3D展现部分性能不足。

 

**其他方法：**

1. 前端将视频流传到给后端，后端在进行处理
    前端提供每秒多大的图片给后端处理
    后端也是使用现有的ar供应商的api

2. 我们可提供建模动画效果但集装到小米app上需要另外合作ar供应商案例参考：http://www.sightp.com/case/107.html



# AR技术兼容性

其中核心技术为WebGL和WebRTC


## WebGL

![WebGL](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/webgl.png)

如图所示，极少数设备（Opera Mini）不支持

## WebRTC 

![WebRTC](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/webrtc.png)

- [ ] Android设备版本要求Android4以上
- [ ] IOS设备要求IOS11及其以上
- [ ] 除此之外，针对于微信app，IOS设备需要用户跳出微信app，转至浏览器Safari观看
- [ ] IOS用户分享请自行使用原生浏览器分享




## 现有技术AR平台
**微信AR** ar接口开放，需要绑定域名，以及具体ar应用，可以向tbs tbs@tencent.com 咨询。

**视+AR**（EasyAR）制作webar是定制服务，与他们商业合作，提供需求，他们技术来完成。

**Vuforia** AR应用引擎需要后端实时数据交互，***待测***

> Note: 其他AR平台各自依赖app，目前无微信or web端AR应用




## AR设计建议以及要求
### [AR.js](https://github.com/jeromeetienne/AR.js) 

简单讲利用[Artoolkit](https://www.artoolkit.org/)的技术识别Marker，利用threejs展现3d动画（也可用2D WebGL renderer）

> There are also range issues in optical tracking, since as markers are move further away from the camera, the markers occupy fewer pixels in the camera's view and results in having insufficient detail for recognition, tracking and identification. The larger the physical embedded marker pattern, the further away the embedded marker pattern can be detected and so the greater the track-ability of the marker.

Marker的尺寸，影响到远近识别。

[AR.js Marker Training](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html) 的Marker生成尺寸 512px * 512px 





### 简单图片：训练集 :x:

> Note: 经测试，web端做训练占用大量CPU，再加上层WebGL动画效率很低，且训练精度低，影响识别效果。

 [ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/demo/image_regression.html) 图片训练测试 iteration约为300次

 图1

![图1](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p1.png)

 图2

![图2](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p2.png)

 图3

![图3](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p3.png)

 图4

![图4](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p4.png)

 图5

![图5](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p5.png)

 图6

![图6](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p6.png)


如上述Maker图片得到结论：
1.	Maker图像可以进行取样得到“独特”的训练图（色块分明）
2.	色彩对比度要高，如图3
3.	避免使用细线和小的色块，如图5和图6
4.	可以使用简单取样后训练图来代表原图，如图4和图1
5.	Maker图片可以有细节，前提不影响训练图，如图2 美国国旗星星
6.	多种Maker图像（即多个贴纸）的训练图，要有特别区分


### 复杂图片：特征值提取（待测）
eg. 如下图红点即为特征点
![图7](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p7.png)