var popup_dlg = require("popup_dlg");

cc.Class({
    extends: cc.Component,

    properties: {
       
        dlg: {
            type: popup_dlg,
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
