#让你在现场 NBA  ***已下线***

##phaser 的序列动画

1. 整张图片 setinterval or  setTimeout 完成切换
2. 使用CSS3动画 steps 
3. 使用canvas phaser spritesheet  animation


###[VideoConfig](https://github.com/Sanchez3/MyProject/blob/76966ee3b9feec8baa2bb186e639487cab1b02aa/NBA/VideoConfig.js)
```js
/*
 视频序列帧配置类
 @filepath 路径
 @prefix 前缀
 @postfix 后缀
 @start 序列帧素材开始索引
 @end  序列帧素材结束索引
 @frameWidth 帧宽度
 @frameHeight 帧高度
 @frames 每张图片所包含的总帧数
 @totalFrame 视频总帧数
 @frameRate 帧速率 每秒多少帧
 */
 
 //eg
 window.enterConfig = new VideoConfig(this,"video/griffin/","griffin_",".jpg",0,14,320,520,9,130,15);

```

###[MovieClip](https://github.com/Sanchez3/MyProject/blob/76966ee3b9feec8baa2bb186e639487cab1b02aa/NBA/MovieClip.js)

```js
/*
 视频序列帧播放类
 @startIndex 开始图片文件序列
 @endIndex 结束图片文件序列
 @x y width height 视频的位置及宽高
 @frameWidth,frameHeight  序列帧纹理宽高
 @totalFrames 视频序列帧总帧数
 @frameRate  帧速率 每秒帧数
 @onComplete 播放结束回调
 */
 
 //eg
var movieClip = new MovieClip(this,0,0,750,1206,window.enterConfig,function(){});
```
