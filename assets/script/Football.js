var Score=require('Score');
var Time=require('TimeCount');
var Result=require('Result');

cc.Class({
    extends: cc.Component,

    properties: {
        score: Score,
        time:Time,
        result:Result,
  
        // result:Result,
        player:{
            type:cc.Node,
            default:null
        },
        button:{
            type:cc.Node,
            default:null,
        },
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },//得分音乐
        scoreText:{
            type:cc.Label,
            default:null,
        },//总分&&也是用户的得分
        robotScore:{
            type:cc.Label,
            default:null,
        },
        timeText:{
            type:cc.Label,
            default:null,
        },//时间到
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },//得分音乐
        
        enemy:{
            type:cc.Node,
            default:null,
        },
        min_dis:10,  
        playerLastX:0,
        playerLastY:0,
        
        // onceAgain:{
        //     type:cc.Node,
        //     default:null,
        // }
       
    },

     onLoad () {
         console.log(this.result);
        this.score.init(this);
        this.time.init(this);
        this.result.init(this);
        console.log(this.score);
        this.enemy.x=0;
        this.enemy.y=229;
     },

    start () {
      
        this.start_x = this.node.x;
        this.start_y = this.node.y;
    
     this.bgm =  cc.audioEngine.play(this.gameAudio, false);
     var overTime=this.timeText.string;
     if(overTime=='00 ：00'){
         console.log("kasdlfj");
        cc.audioEngine.stop(this.bgm);
     }

     
              
        },
       
    
      // 只在两个碰撞体开始接触时被调用一次
      onBeginContact: function (contact, selfCollider, otherCollider) {

        this.body = this.getComponent(cc.RigidBody);
        this.node.scale = 1;
          
        if(otherCollider.node.groupIndex == 2) {
            console.log("进球啦！");
            // 隔1秒一种，要把足球放回原处;
           this.node.scale = 0; 
           this.scheduleOnce(this.reset.bind(this), 1);
           
            //增加分数,添加音乐
            cc.audioEngine.play(this.scoreAudio, false, 1);
            this.score.addScore();

            return;
        }//用户进球

        if(otherCollider.node.groupIndex == 8) {
         
            this.node.scale = 0; 
            this.scheduleOnce(this.reset.bind(this), 1);
            
             //增加分数,添加音乐
             cc.audioEngine.play(this.scoreAudio, false, 1);
             this.score.addRobotScore();
        }//机器人进球

        

        
        var worldManifold = contact.getWorldManifold();//获取世界坐标
        var points = worldManifold.points;//碰撞点坐标
        var normal = worldManifold.normal;//碰撞点上的法向量，由自身碰撞体指向对方碰撞
        
        this.body = this.getComponent(cc.RigidBody);
        var speed =this.body.linearVelocity;
     
       
        var mass = this.body.getMass();
        console.log("力的大小为："+mass);
      
        // console.log("球的运动速度 ："+footBall);
    
        //接触到人设置一个冲量
        if(otherCollider.node.groupIndex == 6){
          
           this.body.applyLinearImpulse(cc.p(-normal.x*400, -normal.y*400), points[0], true);
           console.log("球的速度大小是 ："+this.body.linearVelocity);
          
        }
         
       
      
},
       

        //重置
        reset: function() {
            this.node.scale = 1;
            this.node.x = this.start_x;
            this.node.y = this.start_y;
            this.body.linearVelocity = cc.p(0, 0);
            this.body.angularVelocity = 0;
            this.player.x=4;
            this.player.y=-229;
            this.enemy.x=4;
            this.enemy.y=229;
        },

        onDestroy: function () {
            cc.audioEngine.stop(this.bgm);
        },
        
     update (dt) {


        var overTime=this.timeText.string;
        var sumSocre=this.scoreText.string;

        if(overTime=='00 ：00'){
            this.onDestroy();
            // cc.audioEngine.stop(this.bgm);
            console.log();
             //显示得分
             this.result.win_match();
             this.result.allScore_show(this.scoreText.string);
             //球回到原点
             this.reset.bind(this);
             //人回到原点
             this.player.x=0;
             this.player.y=-229;

             this.enemy.x=0;
             this.enemy.y=229;

             this.node.x=0;
             this.node.y=0;
        }   
    
     },
});
