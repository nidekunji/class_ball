
cc.Class({
    extends: cc.Component,

    properties: {
        playerScore: cc.Label,
        robotScore:cc.Label,
    },

    init: function (game) {
        this.game = game;
        this._playerScore = 0;
        this._robotScore =0;
    },
    
    // // 获取分数
    // getScore: function(){
    //     return _score;
    // },
   
    // // 设置分数
    // setScore: function(score){
    //     this._score = score;
    //     this._updateScore();
    // },
    
    // // 增加分数
    // addScore: function(){
    //     this._score += 1;
    //     this._updateScore();
        
    //     //this.game.soundMng.playScoreSound();
    // },
    
    // // 更新分数
    // _updateScore: function(){
    //     this.scoreText.string = this._score;
    // },
    
    

    //  // 设置分数
    //  setScore: function(playerScore,robotScore){
    //     this._playerScore = playerScore;
    //     this._robotScore = robotScore;
    //     this._updateScore();
    // },
    
    // 用户增加分数
    addScore: function(){
        this._playerScore += 1;
        this._updateScore();
    },
    // 更新用户分数
    _updateScore: function(){
        this.playerScore.string = this._playerScore; 
    },

     // 更新机器人分数
     _updateRobotScore: function(){
        this.robotScore.string = this._robotScore; 
    },

    //增加机器人分数
    addRobotScore: function(){
        this._robotScore +=1;
        this._updateRobotScore();
        
    },

   

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
