class Filter {
    /***
     * author:zlife@vip.qq.com
     * params:
     *  node:对应节点的cc.Sprite
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
    constructor(node) {
        this.node = node;
    }
    _createCanvas(callBack) {
        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            texture = this.node.spriteFrame.getTexture(),
            img = new Image();
        canvas.width = texture.width;
        canvas.height = texture.height;
        img.src = `${CC_WECHATGAME?wx.env.USER_DATA_PATH+'/':''}${texture.url}`;
        img.onload = function (res) {
            ctx.drawImage(img, 0, 0);
            callBack && callBack(canvas)
        }.bind(this)
    }
    //灰度
    grayScale(callBack) {
        this._createCanvas(canvas => {
            this._grayscale(canvas.getContext('2d'), canvas.width, canvas.height);
            callBack && callBack(canvas)
        });
    }
    _grayscale(ctx, width, height) {
        let imgData = ctx.getImageData(0, 0, width, height), 
        data = imgData.data;
        for (let i = 0; i < width * height; ++i) {
            let p = (data[4 * i + 0] + data[4 * i + 1] + data[4 * i + 2]) / 3;
            data[4 * i + 0] = p;
            data[4 * i + 1] = p;
            data[4 * i + 2] = p;
        }
        ctx.putImageData(imgData, 0, 0);

    }
    //反色
    antiColor(callBack) {
        this._createCanvas(canvas => {
            this._anticolor(canvas.getContext('2d'), canvas.width, canvas.height);
            callBack && callBack(canvas)
        });
    }
    _anticolor(ctx, width, height) {
        let imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data;
        for (let i = 0; i < width * height; ++i) {
            data[4 * i + 0] = 255 - data[4 * i + 0];
            data[4 * i + 1] = 255 - data[4 * i + 1];
            data[4 * i + 2] = 255 - data[4 * i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
    }
    //黑白
    blankWhite(callBack) {
        this._createCanvas(canvas => {
            this._blankwhite(canvas.getContext('2d'), canvas.width, canvas.height);
            callBack && callBack(canvas)
        });
    }
    _blankwhite(ctx, width, height) {
        let imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data;
        for (let i = 0; i < width * height; ++i) {
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
    //params:type:default 1,可选 2,3分别表示绿红蓝
    greenRedBlue(callBack,type) {
        let colorType = arguments[1] || 1;
        this._createCanvas(canvas => {
            this._greenredblue(canvas.getContext('2d'), canvas.width, canvas.height,colorType);
            callBack && callBack(canvas)
        });
    }
    _greenredblue(ctx, width, height,type=1) {
        let imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data;
        for (let i = 0; i < width * height; ++i) {
            if(type === 1)data[4 * i + 0] = 0;  //绿
            else if(type === 2)data[4 * i + 1] = 0;  //红
            else data[4 * i + 2] = 0; //蓝
        }
        ctx.putImageData(imgData, 0, 0);
    }
    //模糊滤镜
    /****
     * 
     * blur:默认1，模糊尺度
     * ***/
    vague(callBack,blur){
        let blurs = arguments[1] || 1;
        this._createCanvas(canvas => {
            this._vague(canvas.getContext('2d'), canvas.width, canvas.height,blurs);
            callBack && callBack(canvas)
        });
    }
    _vague(ctx, width, height,blurs){
        let imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data,
        imgData1 = ctx.getImageData(0, 0, width, height),
        data1 = imgData1.data,
        tpoint=(2 * blurs + 1) * (2 * blurs + 1);
        for(let i = blurs;i<height-blurs;++i){
            for(let j = blurs;j<width-blurs;++j){
                let tr=0,tg=0,tb=0;
                for(let dx = -blurs;dx<=blurs;++dx){
                    for(let dy = -blurs;dy<=blurs;++dy){
                        let x = i + dx,
                        y = j +dy,
                        p = x * width + y;
                        tr += data[p * 4 + 0];
                        tg += data[p * 4 + 1];
                        tb += data[p * 4 + 2];
                    }
                }
                let p = i * width + j;
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
    mosaic(callBack,size){
        let sizes = arguments[1] || 1;
        this._createCanvas(canvas => {
            this._mosaic(canvas.getContext('2d'), canvas.width, canvas.height,sizes);
            callBack && callBack(canvas)
        });
    }
    _mosaic(ctx, width, height,size){
        let imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data,
        imgData1 = ctx.getImageData(0, 0, width, height),
        data1 = imgData1.data,
        tpoint=size*size;
        for(let i = 0;i<height;i+=size){
            for(let j = 0;j<width;j+=size){
                let tr=0,tg=0,tb=0;
                for(let dx = 0;dx < size;++dx){
                    for(let dy = 0;dy < size;++dy){
                        let x = i + dx,
                        y = j + dy,
                        p = x * width + y;
                        tr += data[p * 4 + 0];
                        tg += data[p * 4 + 1];
                        tb += data[p * 4 + 2];
                    }
                }
                let rr = tr / tpoint,
                rg = tg / tpoint,
                rb = tb / tpoint;
                for(let dx = 0;dx < size;++dx){
                    for(let dy = 0;dy < size;++dy){
                        let x = i + dx,
                        y = j + dy,
                        p = x * width + y;
                        data1[p * 4 + 0] = rr;
                        data1[p * 4 + 1] = rg;
                        data1[p * 4 + 2] = rb;
                    }
                }
            }
        }
        ctx.putImageData(imgData1, 0, 0);
    }
}

export default Filter;
