//添加参数
function addParam(url, param, value) {
    var a = document.createElement('a');
    try {
        param = encodeURIComponent(param);
        param += (value ? "=" + encodeURIComponent(value) : "");
    } catch (error) {
        param = mencodeURLC(param);
        param += (value ? "=" + mencodeURLC(value) : "");
    }

    a.href = url;
    a.search += (a.search ? "&" : "") + param;
    return a.href;
};

//获取参数
function getQueryString(param) {
    var that = this;
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    var searchURL = window.location.search;

    var r = searchURL.substr(1).match(reg);

    if (r != null) {
        try {
            return decodeURIComponent(r[2]);
        } catch (error) {
            return mdecodeURLC(r[2]);
        }
    } else return null;
}

function mencodeURLC(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
}

function mdecodeURLC(str) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
}