# Baby Siri

## ffmpeg

[ffmpeg](https://www.ffmpeg.org/)  Command line tool : 

`ffmpeg -i v1.mp4 -preset veryslow -crf 22 -strict experimental v_8.mp4`

## webm

![caniusewebm](https://github.com/Sanchez3/MyProject/blob/master/BabySiri/caniusewebm.png)


## 防止触屏滚动

```Javascript
document.addEventListener('touchstart', function (e) {
}, false);
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
```

