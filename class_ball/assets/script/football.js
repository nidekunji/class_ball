var Score = require('score');
var Time = require('timeCount');
var Result = require('result');
cc.Class({
    extends: cc.Component,

    properties: {
        score: Score,
        time: Time,
        result: Result,
        player: {
            type: cc.Node,
            default: null
        },
        button: {
            type: cc.Node,
            default: null,
        },
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        playerScore: {
            type: cc.Label,
            default: null,
        },
        robotScore: {
            type: cc.Label,
            default: null,
        },
        timeText: {
            type: cc.Label,
            default: null,
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },

        enemy: {
            type: cc.Node,
            default: null,
        },

        win: {
            type: cc.Node,
            default: null,
        },

        failed: {
            type: cc.Node,
            default: null,
        },
        flat: {
            type: cc.Node,
            default: null,
        },
        sprite: {
            type: cc.Sprite,
            default: null,
        },
        action: {
            type: cc.Node,
            default: null,
        },
        num1: {
            type: cc.Node,
            default: null,
        },
        num2: {
            type: cc.Node,
            default: null,
        },
        num3: {
            type: cc.Node,
            default: null,
        },
        mask_opacity: 128,
       delaty:0,
    },

    onLoad() {
        this.score.init(this);
        this.result.init(this);
        this.enemy.x = 0;
        this.enemy.y = 229;

        this.judge = false;
        this.judgeWin = 0;
        this.flag = 0;
        

        this.scheduleOnce(function () {
            this.hide_dlg(this.num3); //出现2
        }, 0.7);

        this.scheduleOnce(function () {
            this.num2.active = false;
            this.show_dlg(this.num1); //出现1
        }, 2);

        this.scheduleOnce(function () {
            this.hide_dlg2(this.num1); //开始
        }, 2.5);
        
        this.scheduleOnce(function () {
            this.time.init(this);
            
        }, 3);
    },

    show_dlg: function (node) {
        node.active = true;
        var fin = cc.fadeTo(0.3, this.mask_opacity);
        node.scale = 0;
        var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
        node.runAction(s);
    },

    hide_dlg: function (node) {

        var fout = cc.fadeOut(0.5);
        var s = cc.scaleTo(0.5, 0).easing(cc.easeBackIn());
        var end_func = cc.callFunc(function () {
            this.show_dlg(this.num2);
        }.bind(this));

        var seq = cc.sequence([s, end_func]);
        node.runAction(seq);
    },

    hide_dlg2: function (node) {

        var fout = cc.fadeOut(0.5);
        var s = cc.scaleTo(0.5, 0).easing(cc.easeBackIn());

        var end_func = cc.callFunc(function () {
            this.action.active = false;
        }.bind(this));

        var seq = cc.sequence([s, end_func]);
        node.runAction(seq);
    },

  
    start() {
        this.start_x = this.node.x;
        this.start_y = this.node.y;
        cc.audioEngine.play(this.gameAudio, false);
        this.body = this.getComponent(cc.RigidBody);
      
       
       
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;
        var normal = worldManifold.normal;
    
        this.node.scale = 1;

        if (otherCollider.node.groupIndex == 2) { //进球
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this), 1);
            cc.audioEngine.stop(this.gameAudio);
            cc.audioEngine.play(this.scoreAudio, false, 1);
            this.score.addScore();
            var Allscore = this.playerScore.string;
            return;
        }

        if (otherCollider.node.groupIndex == 8) { //机器人进球
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this), 1);
            cc.audioEngine.play(this.scoreAudio, false, 1);
            this.score.addRobotScore();
        }


        if (otherCollider.node.groupIndex == 6 || otherCollider.node.groupIndex == 7) { //碰撞产生
            this.body.applyLinearImpulse(cc.p(-normal.x * 600, -normal.y * 600), points[0], true);
        }
    },

    reset: function () { //重置
        this.node.scale = 1;
        this.node.x = this.start_x;
        this.node.y = this.start_y;
        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
        this.player.x = 0;
        this.player.y = -229;
        this.enemy.x = 0;
        this.enemy.y = 229;
    },

    submitScoreButtonFunc() { //提交得分
        var grade =  cc.sys.localStorage.getItem('grade');//累计分数
        grade  = parseInt(grade);
          let score = grade ;
          if (window.wx != undefined) {
              window.wx.postMessage({
                  messageType: 3,
                  MAIN_MENU: "x1",
                  score: score,
              });
          } else {
              cc.log("提交得分: x1 : " + score)
          }
      },

  

  



    update(dt) {
      

       // var footballSpeed = this.body.linearVelocity;
      
       var overTime = this.timeText.string;
       var playScore = parseInt(this.playerScore.string);
       var robotScore = parseInt(this.robotScore.string);
     
        this.delaty += 1;
        if(this.delaty == 180){
            this.player.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                var delta = event.touch.getDelta();
                var playerX = this.x+ delta.x;
                var playerY = this.y+ delta.y;//触摸移动
              
               if(playerX<-189||playerX>185){playerX=this.x;}
               if(playerY<-388||playerY>-35){playerY=this.y;}
    
               this.x = playerX;
               this.y = playerY;
        
            }, this.player);
        }//三秒后开始

        if (overTime == '00 ：00') {
            this.judge = true;//游戏结束
            cc.audioEngine.stop(this.gameAudio);
            this.reset.bind(this);

            if (playScore > robotScore) {
                this.result.win_match();
                this.judgeWin = 1;
                this.result.allScore_show(this.playerScore.string);
            } //胜
            else if (playScore == robotScore) {
                this.result.flat_match();
                this.judgeWin = 0;
                resultScore = 0;
                
            } //平
            else {
                this.result.failed_match();
                this.judgeWin = -1; 
            } //败

            
            if(this.judge == true){//比赛结束

             

                this.flag +=1;
                 if(this.flag == 1){//只执行一次

                    var resultScore =parseInt(playScore - robotScore);//和机器人的比分差

                    var oldCount = cc.sys.localStorage.getItem('count');//场次
                    var newCount = parseInt(oldCount) + 1;//更新场次
                    cc.sys.localStorage.setItem('count',newCount);//存储
                  
                    if(resultScore == 0){
                        return;
                    }
                    else{
                        var oldGrade =  cc.sys.localStorage.getItem('grade');//分数
                        var newGrade = resultScore + parseInt(oldGrade);//新分数
                        if(newGrade < 0){ cc.sys.localStorage.setItem('grade',0);}
                        else{ cc.sys.localStorage.setItem('grade',newGrade);} 
                    }

                    if(this.judgeWin==1){
                    var oldWin = cc.sys.localStorage.getItem('win');//赢的次数
                    var newWin = parseInt(oldWin) + 1;
                    console.log("oldWin--------"+oldWin);
                    cc.sys.localStorage.setItem('win',newWin);//更新赢的次数
                    console.log("newWin--------"+newWin);
                    var prob = (newWin/newCount).toFixed(2)*100;//计算概率
                    console.log("pro--------"+prob);
                    cc.sys.localStorage.setItem('pro',prob);
                    }
                else if(this.judgeWin== -1){
                        var oldWin = cc.sys.localStorage.getItem('win');//赢的次数
                        console.log("以前赢的次数-----" +oldWin);
                        oldWin = parseInt(oldWin);
                        var prob = (oldWin/newCount).toFixed(2)*100;
                        cc.sys.localStorage.setItem('pro',prob);
                }
            
             this.submitScoreButtonFunc();//提交到排行榜
              
           }
            }

    
        }

    },
});