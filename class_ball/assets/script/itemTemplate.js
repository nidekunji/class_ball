cc.Class({
    extends: cc.Component,


    properties: {
       
        id: 0,
        match_begin_time: cc.Label,
        score: cc.Label,
        team1_logo: cc.Sprite,
        team2_logo: cc.Sprite,
        team1_name: cc.Label,
        team2_name: cc.Label,

        edit:{
            type:cc.EditBox,
            default:null,
            },
        catch_popup_dlg:{
            type:cc.Node,
            default:null,
        },
        hint:{
        type:cc.Node,
        default:null,
        },
        hint_content:{
        type:cc.Label,
        default:null, 
        },
        catch:{
            type:cc.Node,
            default:null, 
        },
         select:2,
         amount:0,   
    },
    onLoad () {
        
        var self=this;
        this.init = function(data) {
            self.id = data.id;
            self.match_begin_time.string = data.match_begin_time;
            self.score.string = data.score1+" : "+data.score2;
            self.team1_name.string = data.team1_name;
            self.team2_name.string = data.team2_name;

            
            cc.loader.load({url: data.team1_logo, type: 'png'}, function(err,img1){
                let mylogo1  = new cc.SpriteFrame(img1); 
                self.team1_logo.spriteFrame = mylogo1; 
            });
            
            cc.loader.load({url: data.team2_logo, type: 'png'}, function(err,img2){
                let mylogo2  = new cc.SpriteFrame(img2); 
                self.team2_logo.spriteFrame = mylogo2;
            });
        };  


      
    },

   
    btn_onclick:function (event, customEventData){
        this.select = customEventData;
      },

        on_show_dlg_click: function() {

            var editContent = this.edit.string;
            this.amount = parseInt(this.edit.string);
            var score =  cc.sys.localStorage.getItem('grade');
            score = parseInt(score);
            var nowScore = score - this.amount;
            var patrn = /^[0-9]*$/; 
            if (!patrn.test(editContent)) { 
            this.hint.active = true;
            this.hint_content.string = "请输入数字";
            }
            else if(editContent =="") { this.hint.active = true;
                this.hint_content.string = "不能为空";}
            
            else if(this.amount > score ) { this.hint.active = true;
                this.hint_content.string = "积分不足";}
            else{
            this.hint.active = false;
            this.hint_content.string = " ";
            this.catch_popup_dlg.active = true;
            cc.sys.localStorage.setItem('grade',nowScore);

            //传值
           
            this.select = parseInt(this.select);
            let param = "token="+Global.token+"&match_id="+this.id+"&team_id="+this.select+"&amount="+this.amount;
            
            HttpRequest.POST("https://blockchain4.applinzi.com/api/wx/bet",param,function(){  
           console.log("传递成功-----------");
        });
    
            }
            },

});
