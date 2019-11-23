(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Filter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '72b40IxsJVNboxxlxcYfTxN', 'Filter', __filename);
// script/Filter.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
    /***
     * author:zlife@vip.qq.com
     * parms:
     *  node:对应节点的cc.Sprite
     * 
     * desc:
     *  可以继续自定义，使用说明，基于cocos
     *  let f=new Filter(this.node.getComponent(cc.Sprite));
        f.blankWhite(canvas=>{
            var texture = new cc.Texture2D();
            texture.initWithElement(canvas);
            texture.handleLoadedTexture();
            var newframe = new cc.SpriteFrame(texture);
            this.node.getComponent(cc.Sprite).spriteFrame = newframe;
        })
     * **/
    function Filter(node) {
        _classCallCheck(this, Filter);

        this.node = node;
    }

    _createClass(Filter, [{
        key: '_createCanvas',
        value: function _createCanvas(callBack) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                texture = this.node.spriteFrame.getTexture(),
                img = new Image();
            canvas.width = texture.width;
            canvas.height = texture.height;
            img.src = '' + texture.url;
            img.onload = function (res) {
                ctx.drawImage(img, 0, 0);
                callBack && callBack(canvas);
            }.bind(this);
        }
        //灰度

    }, {
        key: 'grayScale',
        value: function grayScale(callBack) {
            var _this = this;

            this._createCanvas(function (canvas) {
                _this._grayscale(canvas.getContext('2d'), canvas.width, canvas.height);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_grayscale',
        value: function _grayscale(ctx, width, height) {
            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data;
            for (var i = 0; i < width * height; ++i) {
                var p = (data[4 * i + 0] + data[4 * i + 1] + data[4 * i + 2]) / 3;
                data[4 * i + 0] = p;
                data[4 * i + 1] = p;
                data[4 * i + 2] = p;
            }
            ctx.putImageData(imgData, 0, 0);
        }
        //反色

    }, {
        key: 'antiColor',
        value: function antiColor(callBack) {
            var _this2 = this;

            this._createCanvas(function (canvas) {
                _this2._anticolor(canvas.getContext('2d'), canvas.width, canvas.height);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_anticolor',
        value: function _anticolor(ctx, width, height) {
            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data;
            for (var i = 0; i < width * height; ++i) {
                data[4 * i + 0] = 255 - data[4 * i + 0];
                data[4 * i + 1] = 255 - data[4 * i + 1];
                data[4 * i + 2] = 255 - data[4 * i + 2];
            }
            ctx.putImageData(imgData, 0, 0);
        }
        //黑白

    }, {
        key: 'blankWhite',
        value: function blankWhite(callBack) {
            var _this3 = this;

            this._createCanvas(function (canvas) {
                _this3._blankwhite(canvas.getContext('2d'), canvas.width, canvas.height);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_blankwhite',
        value: function _blankwhite(ctx, width, height) {
            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data;
            for (var i = 0; i < width * height; ++i) {
                var p = (data[4 * i + 0] + data[4 * i + 1] + data[4 * i + 2]) / 3;
                if (p > 128) {
                    data[4 * i + 0] = 255;
                    data[4 * i + 1] = 255;
                    data[4 * i + 2] = 255;
                } else {
                    data[4 * i + 0] = 0;
                    data[4 * i + 1] = 0;
                    data[4 * i + 2] = 0;
                }
            }
            ctx.putImageData(imgData, 0, 0);
        }
        //绿红蓝
        //parms:type:default 1,可选 2,3分别表示绿红蓝

    }, {
        key: 'greenRedBlue',
        value: function greenRedBlue(callBack, type) {
            var _this4 = this;

            var colorType = arguments[1] || 1;
            this._createCanvas(function (canvas) {
                _this4._greenredblue(canvas.getContext('2d'), canvas.width, canvas.height, colorType);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_greenredblue',
        value: function _greenredblue(ctx, width, height) {
            var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data;
            for (var i = 0; i < width * height; ++i) {
                if (type === 1) data[4 * i + 0] = 0; //绿
                else if (type === 2) data[4 * i + 1] = 0; //红
                    else data[4 * i + 2] = 0; //蓝
            }
            ctx.putImageData(imgData, 0, 0);
        }
        //模糊滤镜
        /****
         * 
         * blur:默认1，模糊尺度
         * ***/

    }, {
        key: 'vague',
        value: function vague(callBack, blur) {
            var _this5 = this;

            var blurs = arguments[1] || 1;
            this._createCanvas(function (canvas) {
                _this5._vague(canvas.getContext('2d'), canvas.width, canvas.height, blurs);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_vague',
        value: function _vague(ctx, width, height, blurs) {
            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data,
                imgData1 = ctx.getImageData(0, 0, width, height),
                data1 = imgData1.data,
                tpoint = (2 * blurs + 1) * (2 * blurs + 1);
            for (var i = blurs; i < height - blurs; ++i) {
                for (var j = blurs; j < width - blurs; ++j) {
                    var tr = 0,
                        tg = 0,
                        tb = 0;
                    for (var dx = -blurs; dx <= blurs; ++dx) {
                        for (var dy = -blurs; dy <= blurs; ++dy) {
                            var x = i + dx,
                                y = j + dy,
                                _p = x * width + y;
                            tr += data[_p * 4 + 0];
                            tg += data[_p * 4 + 1];
                            tb += data[_p * 4 + 2];
                        }
                    }
                    var p = i * width + j;
                    data1[p * 4 + 0] = tr / tpoint;
                    data1[p * 4 + 1] = tg / tpoint;
                    data1[p * 4 + 2] = tb / tpoint;
                }
            }
            ctx.putImageData(imgData1, 0, 0);
        }
        //马赛克
        /****
         * size:默认1，马赛克大小
         * ***/

    }, {
        key: 'mosaic',
        value: function mosaic(callBack, size) {
            var _this6 = this;

            var sizes = arguments[1] || 1;
            this._createCanvas(function (canvas) {
                _this6._mosaic(canvas.getContext('2d'), canvas.width, canvas.height, sizes);
                callBack && callBack(canvas);
            });
        }
    }, {
        key: '_mosaic',
        value: function _mosaic(ctx, width, height, size) {
            var imgData = ctx.getImageData(0, 0, width, height),
                data = imgData.data,
                imgData1 = ctx.getImageData(0, 0, width, height),
                data1 = imgData1.data,
                tpoint = size * size;
            for (var i = 0; i < height; i += size) {
                for (var j = 0; j < width; j += size) {
                    var tr = 0,
                        tg = 0,
                        tb = 0;
                    for (var dx = 0; dx < size; ++dx) {
                        for (var dy = 0; dy < size; ++dy) {
                            var x = i + dx,
                                y = j + dy,
                                p = x * width + y;
                            tr += data[p * 4 + 0];
                            tg += data[p * 4 + 1];
                            tb += data[p * 4 + 2];
                        }
                    }
                    var rr = tr / tpoint,
                        rg = tg / tpoint,
                        rb = tb / tpoint;
                    for (var _dx = 0; _dx < size; ++_dx) {
                        for (var _dy = 0; _dy < size; ++_dy) {
                            var _x2 = i + _dx,
                                _y = j + _dy,
                                _p2 = _x2 * width + _y;
                            data1[_p2 * 4 + 0] = rr;
                            data1[_p2 * 4 + 1] = rg;
                            data1[_p2 * 4 + 2] = rb;
                        }
                    }
                }
            }
            ctx.putImageData(imgData1, 0, 0);
        }
    }]);

    return Filter;
}();

exports.default = Filter;
module.exports = exports['default'];

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Filter.js.map
        