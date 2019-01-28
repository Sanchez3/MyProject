# 中信银行 人脸融合项目



## 用户上传图片

```html
<label class="upload-btn" for="inputImage" title="Upload image file"></label>
<input type="file" class="sr-only" id="inputImage" name="file" accept="image/png, image/jpeg, image/jpg">
```

- `accept`属性应设为`image/*`，否则 若为 `accept="image/png, image/jpeg, image/jpg"`，安卓手机显示打开摄像头的选项。
- `capture`属性，设置后手机只会调取摄像头，而无法从相册中选择。

