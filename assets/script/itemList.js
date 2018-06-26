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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self=this;
        HttpRequest.GET("http://119.23.224.88:443/api/getAllMatches", function(err, data){//http://localhost/api/getAllMatches
            if(!err){
                let matches = JSON.parse(data);
                //matches = JSON.parse(matches.matchData);
                matches = matches.matchData;
                for(let i=0; i<matches.length; i++){
                    let itemData = JSON.stringify(matches[i]);
                    cc.loader.loadRes('prefab/item', function(errorMessage, loadedResource){
                        console.log('c');
                        if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                        if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                        
                        let item = cc.instantiate(loadedResource);
                        self.node.addChild(item);
                        console.log(item.x+" "+item.y);
                        item.x=0;
                        item.y=0;
                        
                        itemData = JSON.parse(itemData); 
                        item.getComponent('itemTemplate').init({
                            id: itemData.id,
                            match_begin_time: itemData.date,
                            score1: itemData.score1,
                            score2: itemData.score2,
                            team1_logo: itemData.team1_logo,
                            team2_logo: itemData.team2_logo,
                            team1_name: itemData.team1_name,
                            team2_name: itemData.team2_name,
                        })
                    });
                }
            }
        });
    },


    // update (dt) {}
});
