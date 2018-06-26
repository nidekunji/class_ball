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
        bgmAudio: {
            default: null,
            url: cc.AudioClip
        },//背景音乐
    },

    onLoad: function () {
        cc.audioEngine.play(this.bgmAudio, false, 1);
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.bgmAudio);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene("game_scene");
        }, this.node);
        // this.node.on('mousedown', function ( event ) {
           
           
        //   }.bind(this));

    },

    // update (dt) {},
});
