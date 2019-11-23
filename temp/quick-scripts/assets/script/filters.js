(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/filters.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4acae+dWItGtb0VvJfXrQ0C', 'filters', __filename);
// script/filters.js

'use strict';

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function onLoad() {},
    start: function start() {
        var _this = this;

        //创建原生canvas
        var f = new _Filter2.default(this.node.getComponent(cc.Sprite));
        f.mosaic(function (canvas) {
            var texture = new cc.Texture2D();
            texture.initWithElement(canvas);
            texture.handleLoadedTexture();
            var newframe = new cc.SpriteFrame(texture);
            _this.node.getComponent(cc.Sprite).spriteFrame = newframe;
        }, 3);
    },
    update: function update(dt) {}
});

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
        //# sourceMappingURL=filters.js.map
        