

cc.Class({
    extends: cc.Component,

    properties: {
       time: cc.Label,
       score: cc.Label,
       team: cc.Label,
    },

   

    start () {

        var self=this;
        this.init = function(data) {
            self.time.string = data.time;
            self.score.string = data.score;
            self.team.string = data.team;
        };  

    },

    // update (dt) {},
});
