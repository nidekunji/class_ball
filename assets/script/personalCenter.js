
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
      

        // opt_item_prefab: {
        //     type: cc.Prefab,
        //     default: null,
        // },

        // scrollview: {
        //     type: cc.ScrollView,
        //     default: null,
        // },
    },

    onLoad: function () {
        // for(var i = 0; i < 10; i ++) {
        //     var opt_item = cc.instantiate(this.opt_item_prefab);
        //     this.scrollview.content.addChild(opt_item);
        //     console.log("渲染10个");
        // }
    },

    
    start () {

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene("personalCenter");
        }, this.node);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

