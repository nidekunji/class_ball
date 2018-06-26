// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        bgmAudio: {
            default: null,
            url: cc.AudioClip
        },//背景音乐
       
    },

    // LIFE-CYCLE CALLBACKS:

   
    onLoad: function () {
        cc.audioEngine.play(this.bgmAudio, false, 1);
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.bgmAudio);
    },
       


    start () {


        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene("game_scene");
        }, this.node);

       
        // this.node.on('mousedown', function ( event ) {
           
           
        //   }.bind(this));

    },

    // update (dt) {},
});
