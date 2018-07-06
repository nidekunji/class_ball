
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

  

    start () {



        var self=this;
        let param = "token="+Global.token;
        console.log(Global.token + "Global.token");
            
        HttpRequest.POST("https://blockchain4.applinzi.com/api/getAllBets",param,function(err, data){ 
            if(!err){
                let matches = JSON.parse(data);
              
                matches = matches.bet_history;
                console.log("bet_history: "+JSON.stringify(matches));
                for(let i=0; i<matches.length; i++){
                    //self.node.height = 200 * matches.length;
                    console.log(self.node.height +"高度");
                    let recordData = JSON.stringify(matches[i]);
                    cc.loader.loadRes('prefab/record', function(errorMessage, loadedResource){
                      
                        if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                        if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                        
                        let record = cc.instantiate(loadedResource);
                      
                        self.node.addChild(record);
                        console.log(record.x+" "+record.y);
                        // record.x = 0;
                        // record.y = 0;
                      
                       
                        recordData = JSON.parse(recordData); 
                        console.log(recordData);
                        record.getComponent('record').init({     
                        time: recordData.date,
                        team:  recordData.select,
                        score: recordData.amount,
                        
                        });
                    });
                }
            }
       
    });
    },
   
});
