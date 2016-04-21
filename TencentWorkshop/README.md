#腾讯视频Workshop

上下划屏利用jquery.transition.js完成.

##滑屏
###.toggle(function, function, … )
```
link .toggle(function, function, ... ) removed
This is the "click an element to run the specified functions" signature of .toggle(). It should not be confused with the "change the visibility of an element" of .toggle() which is not deprecated. The former is being removed to reduce confusion and improve the potential for modularity in the library. The jQuery Migrate plugin can be used to restore the functionality.

需要注意的是该.toggle()是“绑定两个或多个处理程序，在点击时循环执行”；另一个.toggle()仍然存在，它是“控制相应组件的显示和隐藏”；中文晦涩，官方对此二方法的说明如下：

Categories: Deprecated > Deprecated 1.8 | Events > Mouse Events

.toggle(handler(eventObject), handler(eventObject) [,handler(eventObject)])

Returns:jQuery

version deprecated: 1.8, removed: 1.9

Description:Bind two or more handlers to the matched elements, to be executed on alternate clicks.

Categories: Effects > Basics

.toggle( [duration ] [, complete ] )

Returns:jQuery

Description:Display or hide the matched elements.
```

这个变化值得注意。对于删除的这个“.toggle()”方法，官方没有给出升级措施，但我发现一个方法名和描述都比较相似的方法“.trigger()”，不知道可不可以替代，还请大家赐教。

针对此改动：
给点击的按钮添加一个class名字用来判断是否已经点击过了

```js
$(".btn").on("click",function(){
    //通过判断按钮btn有没有active这个class名判断是否已经点击过
    if($(this).hasClass("active")){
    //如果有了active，假设已经点击过了
    //执行你的代码
    //把active去掉
    $(this).removeClass("active");
    }else{
    //没有active，假设还没有点击过
    //执行你的代码
    $(this).addClass("active");
    }
})
```

###trigger
jquery  trigger() 方法触发被选元素的指定事件类型。(自动触发被选元素的指定事件类型。)

元素绑定bind,on某一事件,这时会触发该事件
```js
  $page.eq(t).addClass("cur").attr("relindex", c).trigger("pageIn", beback, during);


  $page.eq(t).on("pageIn", function (e, beback, timeline) {
   var c = $(".page").index($(".page.cur"));
   $("#bk_button").css({display: "block"});
   var $page = $(this);
   //动作时间
   // timeline = timeline || 800;
   $(".p3_cloud1").stop().transition({"top": "30%"}, 900, function () {
        $(".p3_cloud1").addClass("huxi");
   })
});
```

