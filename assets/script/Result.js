cc.Class({
    extends: cc.Component,

    properties: {

        onceAgain:{
            type:cc.Node,
            default:null,
            
        },
        share:{
            type: cc.Node,
            default:null,
           
        },

        allScore:{
           type:cc.Node,
           default:null,
        },
        
        win: {
            type: cc.Node,
            default: null,
           
        },
        mask_opacity:128,
      
       
    //    mask_opacity:128,

        failed: {
            type: cc.Node,
            default: null,
          
        },

        // find:{
        //     type:cc.Button,
        //     default:null,
        // }

    },

   
    onLoad: function () {
        this.node.active = false; 
    },
    init: function(){
        this.node.active = false; 
    },

    win_match: function() {

        this.node.active = true;
        // // mask 渐变出来;
        // this.win.opacity = 0;
        // var fin = cc.fadeTo(0.3, this.mask_opacity);
        // this.win.runAction(fin);
        // // dlg由小到大

        // this.content.scale = 0;
        // var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
        // this.content.runAction(s);

    //   var action = cc.scaleTo(0.5, 2, 2);
    //   action.easing(cc.easeIn(3.0));
        
        // var fin = cc.fadeTo(0.3, this.mask_opacity);
        // this.win.runAction(fin);
        // dlg由小到大
        
    },
    allScore_show: function(score){
        this.allScore.getChildByName("Label").getComponent(cc.Label).string=score;
    },
    again: function(){
        cc.director.loadScene("game_sence");
    },
    look: function(){
        cc.director.loadScene("look");
    }


    // show_dlg: function() {
    //     this.node.active = true;
    //     // mask 渐变出来;
    //     this.mask.opacity = 0;
    //     var fin = cc.fadeTo(0.3, this.mask_opacity);
    //     this.mask.runAction(fin);
    //     // dlg由小到大

    //     this.content.scale = 0;
    //     var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
    //     this.content.runAction(s);
    // },

    // hide_dlg: function() {
       
    //     var fout = cc.fadeOut(0.3);
    //     this.mask.runAction(fout);

    //     var s = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
    //     var end_func = cc.callFunc(function() {
    //         this.node.active = false;
    //     }.bind(this));

    //     var seq = cc.sequence([s, end_func]);
    //     this.content.runAction(seq);
    // },
    // hide_dlg: function() {
    //     // // 
    //     // var fout = cc.fadeOut(0.3);
    //     // this.mask.runAction(fout);

    //     // var s = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
    //     // var end_func = cc.callFunc(function() {
    //     //     this.node.active = false;
    //     // }.bind(this));

    //     // var seq = cc.sequence([s, end_func]);
    //     // this.content.runAction(seq);
    // },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
