# 学习分析

针对当前热门、不错的H5，利用Chrome开发者工具等现有工具，在法律范围内进行学习分析，取其精华。



## [王者荣耀x数字供养人计划](https://pvp.qq.com/act/a20180921dunhuang/)

填色游戏

- 填色，点击区域，区域变色

  - 每个固定区域对应的不同颜色，已存为雪碧图。即1、点击取色，2、点击区域 3、显示该色的区域的图片

- **输入字，字有特殊中文字体（苏新诗爨宝子碑简）。**
  - 字体对应字图，输入后，向服务器请求具体字图。
  - 字图应该是之前已经生成好了，利用 [mmd.WebFonts.js](https://github.com/Sanchez3/MyProject/blob/master/!!!Learn/mmd.WebFonts.js) 判断中英文字符（字图文件名即为字符编码）

- IOS设备上，点击有水墨浸染效果。

  ![水墨浸染效果](https://github.com/Sanchez3/MyProject/blob/master/!!!Learn/%E6%B0%B4%E5%A2%A8%E6%B5%B8%E6%9F%93%E6%95%88%E6%9E%9C.gif)

- 选择壁画页面，轮播图效果，可拖动，可点击，且有惯性缓动。

- 剩下的过场动画（神奇效果），不是视频就是序列帧。

  ​



## [测测你的哲学气质](https://c.m.163.com/nc/qa/activity/dada_philosophy_7/index.html)
测试

- 过场动画以及一些效果，由序列帧实现。eg.点击后水波效果；画面旋转转场效果；

- 第五题 乌鸦 场景，有鸟在自由飞。实现参考：[PaperPlanes](https://github.com/Sanchez3/paperplanes)



## [留声40年](https://st.music.163.com/c/reform40-h5/z/index.html)

人脸识别技术

- 一些主流的技术供应商：[Face++](https://www.faceplusplus.com.cn/)、[百度人脸识别](https://ai.baidu.com/tech/face)、[腾讯人脸识别](https://ai.qq.com/doc/detectface.shtml)……
  - 可识别关键属性：男性女性，年龄，眼镜，笑容，人脸姿势，眼睛状态（睁着、闭着），情绪，人种肤色，嘴状态，面部特征（健康，色斑，青春痘，黑眼圈）
  - 人脸关键点：精准定位并返回最多 106 个高精度关键点，让您的应用可以进行人脸贴纸、3D 动画模型等复杂变换操作。
- ajax实现使用[It's AJAX](https://github.com/ded/reqwest)
- wave动画  canvas绘制，根据音频频率，绘制波形图
  - [打造跳跃音波播音乐放器(Electron+Nodejs+React)](https://juejin.im/post/5af02453518825672c00dfd4) 其中绘制波形图
  - [JS | Web Audio API (下) 我的音乐浪](https://www.jianshu.com/p/b52d09ee4c7c)
  - [wayou/**3D_Audio_Spectrum_VIsualizer**](https://github.com/Wayou/3D_Audio_Spectrum_VIsualizer)
  - [tone.js](https://tonejs.github.io/)

## [有人喊你收快递](http://cai.heymeo.net/)
语音合成技术
- 技术供应商 [百度语音合成](https://ai.baidu.com/tech/speech/tts) 
  - 提供男声，女声；控制音频播放速度；情感合成


