class Form{
    constructor(){
        this.input = createInput("name");
        this.button = createButton("PLAY");
        this.greetings = createElement("h3");
        this.reset = createButton("RESET");
    }
    hide(){
        this.input.hide();
        this.button.hide();
        this.greetings.hide();
    }
    display(){
        var title = createElement("h2");
        title.html("CAR RACING GAME");
        title.position(displayWidth/2 - 50,10);

        this.input.position(displayWidth/2 - 30,displayHeight/2 - 80);
        this.button.position(displayWidth/2 + 30,displayHeight/2);
        this.reset.position(displayWidth-100 ,50);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playercount+=1;
            player.index=playercount;
            player.update();
            player.updatecount(playercount);
            this.greetings.html("HELLO " + player.name); 
            this.greetings.position(displayWidth/2 - 70,displayHeight/2 - 70);
        });
        this.reset.mousePressed(()=>{
            player.updatecount(0);
            game.update(0);
            database.ref('/').update({
                players : null
            })
        })
    }
};