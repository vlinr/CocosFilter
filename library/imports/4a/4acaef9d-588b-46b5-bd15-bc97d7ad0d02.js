"use strict";
cc._RF.push(module, '4acae+dWItGtb0VvJfXrQ0C', 'filters');
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