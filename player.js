class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }
    getcount(){
        var pcref = database.ref("playercount");
        pcref.on("value",(data)=>{
           playercount = data.val();
        })
    }

    updatecount(count){
        database.ref("/").update({
           playercount: count 
        })
    }

    update(){
        var playerindex = "players/player" + this.index;
        database.ref(playerindex).set({
           name: this.name,
           distance : this.distance,
           rank : this.rank
        })
    }

    static getplayerinfo(){
        var piref = database.ref("players");
        piref.on("value",(data)=>{
           allplayers = data.val();
        })
    }

    getcarsatend(){
        database.ref("carsatend").on("value",(data)=>{
            carsatend = data.val();
        })
    }

    static updatecarsatend(rank){
        database.ref("/").update({
            carsatend: rank++
        })
        this.rank = rank;
    }
};