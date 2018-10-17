(function (exports) {
    'use strict';

    var asyncGenerator = function () {
        function AwaitValue(value) {
            this.value = value;
        }

        function AsyncGenerator(gen) {
            var front, back;

            function send(key, arg) {
                return new Promise(function (resolve, reject) {
                    var request = {
                        key: key,
                        arg: arg,
                        resolve: resolve,
                        reject: reject,
                        next: null
                    };

                    if (back) {
                        back = back.next = request;
                    } else {
                        front = back = request;
                        resume(key, arg);
                    }
                });
            }

            function resume(key, arg) {
                try {
                    var result = gen[key](arg);
                    var value = result.value;

                    if (value instanceof AwaitValue) {
                        Promise.resolve(value.value).then(function (arg) {
                            resume("next", arg);
                        }, function (arg) {
                            resume("throw", arg);
                        });
                    } else {
                        settle(result.done ? "return" : "normal", result.value);
                    }
                } catch (err) {
                    settle("throw", err);
                }
            }

            function settle(type, value) {
                switch (type) {
                case "return":
                    front.resolve({
                        value: value,
                        done: true
                    });
                    break;

                case "throw":
                    front.reject(value);
                    break;

                default:
                    front.resolve({
                        value: value,
                        done: false
                    });
                    break;
                }

                front = front.next;

                if (front) {
                    resume(front.key, front.arg);
                } else {
                    back = null;
                }
            }

            this._invoke = send;

            if (typeof gen.
            return !=="function") {
                this.
                return = undefined;
            }
        }

        if (typeof Symbol === "function" && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
                return this;
            };
        }

        AsyncGenerator.prototype.next = function (arg) {
            return this._invoke("next", arg);
        };

        AsyncGenerator.prototype.
        throw = function (arg) {
            return this._invoke("throw", arg);
        };

        AsyncGenerator.prototype.
        return = function (arg) {
            return this._invoke("return", arg);
        };

        return {
            wrap: function (fn) {
                return function () {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function (value) {
                return new AwaitValue(value);
            }
        };
    }();





    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var WebFonts = function () {
        function WebFonts() {
            classCallCheck(this, WebFonts);

            console.log('WebFonts 1.0.0 change');
        }

        createClass(WebFonts, [{
                key: 'getFontPng',
                value: function getFontPng(_ref) {
                    var str = _ref.str,
                        type = _ref.type,
                        _progress = _ref.progress,
                        _complete = _ref.complete;

                    var urlList = this.getWordUrl({
                        str: str,
                        type: type
                    });
                    // console.log(urlList);
                    this.loadList({
                        urlList: urlList,
                        progress: function progress(pro) {
                            // console.log('pro:',pro);
                            _progress(pro);
                        },
                        complete: function complete(arr) {
                            _complete(arr);
                            // console.log('arr:',arr);
                        }
                    });
                }
    }, {
                key: 'loadList',
                value: function loadList(_ref2) {
                    var urlList = _ref2.urlList,
                        progress = _ref2.progress,
                        complete = _ref2.complete;

                    if (!urlList || urlList.length == 0) return;
                    // console.log('loadList');
                    var current = 0,
                        max = urlList.length,
                        imgArr = [];
                    var callBack = function callBack(img, success) {
                        if (success) {
                            imgArr.push({
                                img: img,
                                word: urlList[current].word,
                                src: img.src
                            });
                        } else {
                            imgArr.push({
                                img: null,
                                word: urlList[current].word,
                                src: null
                            });
                        }
                        current += 1;
                        var pro = current / max;
                        progress(pro);
                        if (current == max) {
                            // console.log('all complete');
                            complete(imgArr);
                        } else {
                            loadImg({
                                src: urlList[current].src
                            });
                        }
                    };
                    var loadImg = function loadImg(_ref3) {
                        var src = _ref3.src;

                        var img = new Image();
                        img.src = src;
                        img.onload = function () {
                            // console.log('loadSuccess',img);
                            callBack(img, true);
                        };
                        img.onerror = function () {
                            // console.log('loadFail');
                            callBack(img, false);
                        };
                    };
                    loadImg({
                        src: urlList[current].src
                    });
                }
    }, {
                key: 'getWordUrl',
                value: function getWordUrl(_ref4) {
                    var str = _ref4.str,
                        type = _ref4.type;

                    var arr = str.split('');
                    var path = this.getPath({
                        type: type
                    });
                    var filename = '';
                    var urlList = [];
                    // console.log(arr);
                    for (var i = 0; i < arr.length; i++) {
                        var word = arr[i];
                        filename = '';
                        if (this.checkChinese({
                            str: word
                        }))
                        // if(true)
                        {

                            filename = path + 'uni' + word.charCodeAt(0).toString(16).toUpperCase() + '.png';
                            // console.log(filename,word,'isChinese');
                        } else {
                            filename = path + 'uni' + (65248 + word.charCodeAt(0)).toString(16).toUpperCase() + '.png';
                            // console.log(filename,word);
                        }
                        if (filename != '') urlList.push({
                                src: filename,
                                word: word
                            });
                    }
                    return urlList;
                }
    }, {
                key: 'checkChinese',
                value: function checkChinese(_ref5) {
                    var str = _ref5.str;

                    var bn = new RegExp('^[\\u4e00-\\u9fa5]$').test(str);
                    var reg =
                        /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
                    if (reg.test(str)) bn = true;
                    return bn;
                }
    }, {
                key: 'getPath',
                value: function getPath(_ref6) {
                    var type = _ref6.type;

                    var allPath = {
                        0: '//game.gtimg.cn/images/tgideas/act/a20180823fonts/fontSXSBZBJ/'
                    };
                    var path = allPath[type];
                    return path;
                }
    }]);
        return WebFonts;
    }();
    WebFonts.FONTTYPELIST = [{
            type: 0,
            name: '苏新诗爨宝子碑简'
        }];

    exports.WebFonts = WebFonts;

}((this.MMD = this.MMD || {})));
//# sourceMappingURL=mmd.WebFonts.min.1.0.0.js.map