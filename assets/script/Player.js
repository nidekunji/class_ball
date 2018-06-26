var Enemy=require('Enemy');
cc.Class({
    extends: cc.Component,
     
    
    
    properties: {
        enemy:Enemy,
       
    },
   
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        
        this.node.x=0;
        this.node.y=-209;
        console.log(this.node.x+"<br>"+this.node.y);

        console.log(this.enemy);

          
     },

    start () {

        this.body = this.getComponent(cc.RigidBody);//获取刚体
            this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                var delta = event.touch.getDelta();
                var playerX = this.x+ delta.x;
                var playerY = this.y+ delta.y;//触摸移动
              
               if(playerX<-189||playerX>185){playerX=this.x;}
               if(playerY<-388||playerY>-35){playerY=this.y;}

               this.x = playerX;
               this.y = playerY;
        
            }, this.node);
    

    },




         
    
    //       // 只在两个碰撞体开始接触时被调用一次
    //       onBeginContact: function (contact, selfCollider, otherCollider) {
    //         console.log("发生碰撞啦");
    //         console.log("最后发生碰撞的位置"+selfCollider.node.x);
    //         console.log("最后发生碰撞的位置"+selfCollider.node.y);
    //         var x = selfCollider.node.x;
    //         var y = selfCollider.node.y;
    //        this.enemy.playerPosition(x,y);
    //       console.log("x"+x,"y"+y);
           
           
           
    //         if(otherCollider.node.groupIndex == 2) {
                
    //             // 隔1秒一种，要把足球放回原处;
    //            this.node.scale = 0; 
    //            this.scheduleOnce(this.reset.bind(this), 1);
    
    //             //增加分数,添加音乐
    //             cc.audioEngine.play(this.scoreAudio, false, 1);
    //             this.score.addScore();
    //             return;
    //          }


         
    //          var worldManifold = contact.getWorldManifold();//获取世界坐标
    //          var points = worldManifold.points;//碰撞点坐标
    //          var normal = worldManifold.normal;//碰撞点上的法向量，由自身碰撞体指向对方碰撞体
         
           
       
       
    // },

  
    
    

     update (dt) {
       
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
           
        // var playx = this.node.x;
        // var playy = this.node.y;
        // var delta = event.touch.getDelta();

        // this.node.x+=playx;
        // this.node.x+
            
        // }, this.node);//触摸移动
        
     },
});
