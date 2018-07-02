var catch_popup_dlg = require("catch_popup_dlg");

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
        // ...
        dlg: {
            type: catch_popup_dlg,
            default: null,
        },
        
    },

    // use this for initialization
    onLoad: function () {

    },

    on_show_dlg_click: function() {
        this.dlg.show_dlg();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
