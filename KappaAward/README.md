# Kappa抽奖活动

## 常用的正则表达式

pattern的用法都一样，这里不再啰嗦各种详细写法了，只是列出来一些常用的正则就好了：

- 信用卡 [0-9]{13,16}
- 银联卡 ^62[0-5]\d{13,16}$
- Visa: ^4[0-9]{12}(?:[0-9]{3})?$
- 万事达：^5[1-5][0-9]{14}$
- QQ号码： [1-9][0-9]{4,14}
- 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
- 身份证：^([0-9]){7,18}(x|X)?$
- 密码：^[a-zA-Z]\w{5,17}$ 字母开头，长度在6~18之间，只能包含字母、数字和下划线
- 强密码：^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,10}$ 包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
- 7个汉字或14个字符：^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$

## input 输入插件js
[formatter.js](http://firstopinion.github.io/formatter.js/index.html)

## 禁用移动Webkit的选择高亮
```css
body {

-webkit-touch-callout: none;

-webkit-user-select: none;

-khtml-user-select: none;

-moz-user-select: none;

-ms-user-select: none;

user-select: none;
}

```