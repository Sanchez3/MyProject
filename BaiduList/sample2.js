/**
 * Created by Sanchez on 16/4/12.
 */
/*
 对象字面量方式
 整个project html的主要函数
 */
var mproject = {
    viewport: {w: 0, h: 0, scale: 1, scaleX: 1, scaleY: 1, cur: -1, curH: 1206},
    resizeHandler: function () {
        var that = this;
        var ww = window.innerWidth,
            wh = window.innerHeight;
        that.curH = (750 / ww) * wh;
        var main=document.getElementById("main");
        main.style.height=that.curH;
        // main.style.scale=ww/750;
        // $("#main").css({"height": that.curH, "scale": ww / 750});
        that.viewport.scaleY = wh / 1206;
        that.viewport.scaleX = ww / 750;
        //Share page
        // $("#weixinPage").css({"height": that.curH, "scale": ww / 750});
    },
    init: function (argument) {
        var that = this;
        window.scrollTo(0, 0);
        that.cssInit().eventInit();
        return that;
    },
    eventInit: function (argument) {
        var _ = this;
        document.addEventListener('touchstart', function (e) {
        }, false);
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        //禁止弹出选择菜单
        document.documentElement.style.webkitTouchCallout = "none";
        return _;
    },
    cssInit: function (argument) {
        var that = this;
        that.viewport.w = window.innerWidth;
        that.viewport.h = window.innerHeight;
        that.viewport.deg = Math.asin((that.viewport.w * 0.5 + 110) / 600) * 180 / Math.PI;
        //初始化 resize
        //手机端 不需要触发resize事件
        that.resizeHandler();
        //横竖屏幕
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            if (window.orientation != 0) {
                //that.renderShuping();
            } else {
                //that.closeShuping();
            }
        }, false);
        return that;
    },
    renderPage: function (argument) {

    }
};
window.onload = function () {
    mproject.init();
};