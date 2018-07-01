cc.Class({
    extends: cc.Component,
    name: "RankingView",
    properties: {
        groupFriendButton: cc.Node,
        friendButton: cc.Node,
        gameOverButton: cc.Node,
        rankingScrollView: cc.Sprite,//显示排行榜
    },
    onLoad() {

    },
    start() {
        if (window.wx != undefined) {
            window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 640;
            window.sharedCanvas.height = 960;
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU: "x1"
            });
        }
    },

    friendButtonFunc(event) {
        if (window.wx != undefined) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU: "x1"
            });
        } else {
            cc.log("获取好友排行榜数据。x1");
        }
    },

    groupFriendButtonFunc: function (event) {
        if (window.wx != undefined) {
        window.wx.shareAppMessage({
        title: "系兄弟，就来踢我！",
        imageUrl:'https://blockchain4.applinzi.com/remote/res/raw-assets/NewFolder/share.jpg',
        success: (res) => {
        if (res.shareTickets != undefined && res.shareTickets.length > 0) {
        window.wx.postMessage({
        messageType: 5,
        MAIN_MENU: "x1",
        shareTicket: res.shareTickets[0]
        });
        }
        }
        });
        } else {
        cc.log("获取群排行榜数据。x1");
        }
        },

    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubDomainCanvas();
    },
});
