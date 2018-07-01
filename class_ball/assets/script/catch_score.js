
cc.Class({
    extends: cc.Component,

    properties: {
       label:{
           type:cc.Label,
           default:null,
       },
       pro:{
        type:cc.Label,
        default:null,
       },
    },

    onLoad () {

       
     
        // cc.sys.localStorage.removeItem('grade');
        // cc.sys.localStorage.removeItem('pro');
        // cc.sys.localStorage.removeItem('count');
        // cc.sys.localStorage.removeItem('key');
       var showScore = cc.sys.localStorage.getItem('grade');
       var showProb =  cc.sys.localStorage.getItem('pro');
       var count = cc.sys.localStorage.getItem('count');

       if(count ==""||count ==null){
        this.label.string ="累计积分：0" ;
        this.pro.string = "胜率 ：100%";
        cc.sys.localStorage.setItem('grade',0);//累计分数
        cc.sys.localStorage.setItem('pro',100);//概率
        cc.sys.localStorage.setItem('count',0);//玩的总场次
        cc.sys.localStorage.setItem('win',0);//赢的次数
        }

       else{  
        console.log("showScore"+ showScore);
        this.label.string ="累计积分：" +showScore;
        this.pro.string = "胜率 ："+showProb+"%";
       }
      
    },

   

    start () {
      
    },
});
