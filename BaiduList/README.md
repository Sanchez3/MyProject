# 百度数字品牌资产榜

前端入门的第一个项目
主要是抄写结构，JS封装，JS面向对象：Prototype模式、对象字面量……

## Prototype模式
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

## 对象字面量方式（比较清楚的查找对象包含的属性及方法）
 [引用](http://www.cnblogs.com/gaojun/archive/2013/10/24/3386552.html "Title")

[sample2](https://github.com/Sanchez3/MyProject/blob/master/BaiduList/sample2.js)

利用对象字面量 直接创建对象。

其中this作为对象方法调用

在JavaScript中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，this 被自然绑定到该对象。

ps.由于'某些情况下,this会被绑定到全局对象,而不是局部对象',JavaScript的设计缺陷，正确的设计方式是内部函数的this应该绑定到其外层函数对应的对象上，为了规避这一设计缺陷，聪明的JavaScript程序员想出了变量替代的方法，约定俗成，该变量一般被命名为that。

```js
var person = {
name : 'My name',
age : 18,
getName : function(){
    var that=this;
    return that.name;
    }
}
```
JS的对象可以使用‘.’操作符动态的扩展其属性，可以使用’delete’操作符或将属性值设置为’undefined’来删除属性。如下：
```js
person.newAtt='new Attr';//添加属性
alert(person.newAtt);//new Attr
delete person.age;
alert(person.age);//undefined(删除属性后值为undefined);
```
