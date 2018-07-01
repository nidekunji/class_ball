
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

  


    start () {
    
        var width = cc.director.getWinSize().width;
        var height = cc.director.getWinSize().height;
        console.log(width, height);
        if (width < 640) { // ipad ;
            this.node.scale = 0.85;            
        }
        else {
            console.log(width, height);
        } 
    },
   

   


});
