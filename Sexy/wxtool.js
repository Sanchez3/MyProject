/**
 * Created by sanchez on 16/4/25.
 */

/*
 微信分享
 @wx 配置信息Json格式
 {
 debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
 appId: '', // 必填，公众号的唯一标识
 timestamp: , // 必填，生成签名的时间戳
 nonceStr: '', // 必填，生成签名的随机串
 signature: '',// 必填，签名，见附录1
 jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
 }
 */

var wxTool = function(wx) {
    return {
        shareData: {
            link: "http://www.baidu.com",
            imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
            title: 'Baidu',
            desc: "BD",
            success: function() {},
            cancel: function() {}
        },
        config: function(opts) {
            wx.config(opts)
        },
        shareInit: function(data) {
            data = data || this.shareData;
            wx.onMenuShareAppMessage({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                type: 'link',
                dataUrl: '',
                success: data.success,
                cancel: data.cancel
            });
            wx.onMenuShareTimeline({
                title: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });
            wx.onMenuShareQQ(data);
            wx.onMenuShareWeibo(data);
            return this;
        },
        update: function(data) {
            return this.shareInit(data);
        },
        reset: function() {
            return this.shareInit(this.shareData);
        },
        init: function(config, data) {
            var _ = this;
            //继承设置
            if (data) {
                for (var key in data) {
                    _.shareData[key] = data[key];
                }
            }
            _.config(config);
            wx.ready(function() {
                _.shareInit()
            });
            return _;
        }
    };
};