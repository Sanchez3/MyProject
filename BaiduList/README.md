#百度数字品牌资产榜

前端入门的第一个项目
主要是抄写结构，JS封装，JS面向对象：Prototype模式、对象字面量……

##Prototype模式
[sample1](https://github.com/Sanchez3/MyProject/blob/master/BaiduList/sample1.js)

 [《Javascript高级程序设计（第二版）》](http://www.wrox.com/WileyCDA/WroxTitle/Professional-JavaScript-for-Web-Developers-2nd-Edition.productCd-047022780X.html "Title")
（Professional JavaScript for Web Developers, 2nd Edition)

Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。
这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。
```js
　　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};
```
　　
然后，生成实例。
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```
这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
```js
　　alert(cat1.eat == cat2.eat); //true
```
