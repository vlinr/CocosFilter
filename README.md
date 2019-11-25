# CocosFilter
cocoscreator2d滤镜：
目前支持：模糊，红绿蓝，灰度，黑白，反色以及马赛克几种。
使用demo：
需要使用filter地方，只需要将Fliter引入，并且使用相应的方法即可，如：
import Filter from './Filter' //引入Filter
cc.Class({
    extends: cc.Component,
    properties: {

    },
    onLoad() { },
    start() {
        let filter=new Filter(this.node.getComponent(cc.Sprite));  //实例化filter，接收一个sprite精灵
        filter.mosaic(canvas=>{
            //成功以后，重新转换canvas为贴图并且设置到当前的精灵对象即可
            var texture = new cc.Texture2D();
            texture.initWithElement(canvas);
            texture.handleLoadedTexture();
            var newFrame = new cc.SpriteFrame(texture);
            this.node.getComponent(cc.Sprite).spriteFrame = newFrame;
        },3)
    },
    update(dt) { },
});
源码方法说明：
Filter.grayScale:表示灰度；
/*****
*params:
* callBack:回调函数
**/

Filter.antiColor:表示反色;
/*****
*params:
* callBack:回调函数
**/

Filter.blankWhite:表示黑白;
/*****
*params:
* callBack:回调函数
**/

Filter.greenRedBlue:表示红绿蓝其中一种;
/*****
*params:
* callBack:回调函数
* type:1|2|3,default:1,表示绿蓝红的其中一个
**/

Filter.vague:表示模糊;
/*****
*params:
* callBack:回调函数
* blur:default:1,表示模糊尺度
**/

Filter.mosaic:表示马赛克效果;
/*****
*params:
* callBack:回调函数
* size:default:1,马赛克块的大小
**/
