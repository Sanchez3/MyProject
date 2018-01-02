
# AR技术兼容性
其中核心技术为WebGL和WebRTC
## WebGL

如图所示，极少数设备（Opera Mini）不支持

## WebRTC 

- [ ] Android设备版本要求Android4以上

- [ ] IOS设备要求IOS11及其以上
- [ ] 除此之外，针对于微信app，IOS设备需要用户跳出微信app，转至浏览器Safari观看
- [ ] IOS用户分享请自行使用原生浏览器分享


## 现有技术AR平台
**微信AR** ar接口开放，需要绑定域名，以及具体ar应用，可以向tbs tbs@tencent.com 咨询。
**视+AR**（EasyAR）制作webar是定制服务，与他们商业合作，提供需求，他们技术来完成。
**Vuforia** AR应用引擎需要后端实时数据交互，待测

> Note: 其他AR平台各自依赖app，目前无微信or web端AR应用


## AR设计建议以及要求
###简单图片：训练集

图片训练测试 iteration约为300次 [ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/demo/image_regression.html)

 图1![图1](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p1.png)
 图2![图2](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p2.png)
 图3![图3](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p3.png)
 图4![图4](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p4.png)
 图5![图5](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p5.png)
 图6![图6](https://github.com/Sanchez3/MyProject/blob/master/2018NewYear/p6.png)

如上述Maker图片得到结论：
1.	Maker图像可以进行取样得到“独特”的训练图（色块分明）
  2.色彩对比度要高，如图3
  3.避免使用细线和小的色块，如图5和图6
  4.可以使用简单取样后训练图来代表原图，如图4和图1
  5.Maker图片可以有细节，前提不影响训练图，如图2 美国国旗星星
  6.多种Maker图像（即多个贴纸）的训练图，要有特别区分


###复杂图片：特征值提取（待测）
eg. 如下图红点即为特征点

