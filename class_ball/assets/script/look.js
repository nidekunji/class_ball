
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

   



    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene("look");
        }, this.node);
       
    },

});
