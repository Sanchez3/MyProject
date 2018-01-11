# Baby Siri

## ffmpeg

[ffmpeg](https://www.ffmpeg.org/)  Command line tool : 

`ffmpeg -i v1.mp4 -preset veryslow -crf 22 -strict experimental v_8.mp4`

## webm

![caniusewebm](/Users/sanchez/Desktop/caniusewebm.png)

如图所示，很多还是不支持webm格式的。此外webm格式大小远大于mp3(mp4)格式

## 防止触屏滚动

```Javascript
document.addEventListener('touchstart', function (e) {
}, false);
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
```

