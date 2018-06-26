
cc.Class({
    extends: cc.Component,

    properties: {
       
        maxTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },


    start () {
        this.time = this.maxTime;
        this.getComponent(cc.Label).string = "30 : 00";
        this.counting=true;
        this.scheduleOnce(this._callback, this.maxTime);
    },


    update (dt) {
        if (this.counting && (this.time-dt) >= 0){
            this.time -= dt;
            let text = this.time.toFixed(2)
            if(text.length === 4){
                text = '0'+text;
            }
            this.getComponent(cc.Label).string = text.replace('.', ' : ');            
        }
    },

    
    _callback: function(){
        this.time = this.maxTime;
        this.getComponent(cc.Label).string = '00 : 00';
        this.counting=false;
        this.unschedule(this._callback);
    },
});
