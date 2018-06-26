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
        id: 0,
        match_begin_time: cc.Label,
        score: cc.Label,
        team1_logo: cc.Sprite,
        team2_logo: cc.Sprite,
        team1_name: cc.Label,
        team2_name: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        var self=this;
        this.init = function(data) {
            self.id = data.id;
            self.match_begin_time.string = data.match_begin_time;
            self.score.string = data.score1+" : "+data.score2;
            self.team1_name.string = data.team1_name;
            self.team2_name.string = data.team2_name;

            //加载网络图片
            cc.loader.load({url: data.team1_logo, type: 'png'}, function(err,img1){
                let mylogo1  = new cc.SpriteFrame(img1); 
                self.team1_logo.spriteFrame = mylogo1; 
            });
            //加载网络图片
            cc.loader.load({url: data.team2_logo, type: 'png'}, function(err,img2){
                let mylogo2  = new cc.SpriteFrame(img2); 
                self.team2_logo.spriteFrame = mylogo2;
            });
        };  


        // var toggleContainer=self.node.getChildByName("toggleContainer");
        // var toggle2=toggleContainer.node.getChildByName("toggle2");
        // toggle2.getComponent(cc.Toggle).isChecked=true;
    },


    start () {

    },

    // update (dt) {},

    toBet () {
        // var self=this;
        // var toggleContainer=self.node.getChildByName("toggleContainer");
        // var toggle2=toggleContainer.node.getChildByName("toggle2");
        // toggle2.getComponent(cc.Toggle).isChecked=true;
    },
});
