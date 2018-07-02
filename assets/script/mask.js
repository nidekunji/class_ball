cc.Class({
    extends: cc.Component,

    properties: {
        
        // mask: {
        //     type: cc.Node,
        //     default: null,
        // },

        // mask_opacity: 128,

        // content: {
        //     type: cc.Node,
        //     default: null,
        // },

    },

   
    onLoad: function () {
        // this.content.active=false;
       
    },

    show_dlg: function() {

        // this.node.active = true;
        // // mask 渐变出来;
        // this.mask.opacity = 0;
        // var fin = cc.fadeTo(0.3, this.mask_opacity);
        // this.mask.runAction(fin);
        // // dlg由小到大

        // this.content.scale = 0;
        // var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
        // this.content.runAction(s);
    },

    hide_dlg: function() {
        // // 
        // var fout = cc.fadeOut(0.3);
        // this.mask.runAction(fout);

        // var s = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
        // var end_func = cc.callFunc(function() {
        //     this.node.active = false;
        // }.bind(this));

        // var seq = cc.sequence([s, end_func]);
        // this.content.runAction(seq);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
