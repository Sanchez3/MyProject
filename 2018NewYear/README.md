
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

简单讲利用Artoolkit的技术识别Marker，利用threejs展现3d动画（也可用2D WebGL renderer）

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