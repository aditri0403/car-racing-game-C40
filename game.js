class Game {
    constructor(){}
    getState(){
        var gsref = database.ref("gamestate");
        gsref.on("value",(data)=>{
            gamestate = data.val();
        });
    }

    update(state){
        database.ref("/").update({
           gamestate: state 
        })
    }

    async start(){
        if(gamestate === 0){
            player = new Player();
            var pcref = await database.ref("playercount").once("value");
            if(pcref.exists()){
                playercount = pcref.val();
                player.getcount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage(carimg1);
        car2 = createSprite(300,200);
        car2.addImage(carimg2);
        car3 = createSprite(500,200);
        car3.addImage(carimg3);
        car4 = createSprite(700,200);
        car4.addImage(carimg4);
        cars = [car1,car2,car3,car4]
    }

    play(){
        form.hide();
        textSize(30);
        text("LET'S START",150,100);
        Player.getplayerinfo();
        player.getcarsatend();
        if(allplayers !== undefined){
            background(groundimg);
            image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
            //var display_pos=120;
            var index = 0;
            var x = 175;
            var y;
            for(var plr in allplayers){
                index = index + 1;
                x = x+200;
                y = displayHeight - allplayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index===player.index){
                    cars[index -1].shapeColor = "yellow";
                    fill("white");
                    stroke(10);
                    ellipse(x,y,70,70);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>3850){
            gamestate = 2;
            Player.updatecarsatend(player.rank);
            player.rank = carsatend;
            player.update();
        }
        drawSprites();
    }
    end(){
        console.log("game ended");
        console.log(player.rank);
        textSize(25);
        rectMode(CENTER);
        fill("white");
        strokeWeight(4);
        stroke("blue");
        rect(displayWidth/2,cars[player.index - 1].y - 300, 500,300);
        text("YOUR RANK IS " + player.rank,displayWidth/2 - 70,cars[player.index - 1].y - 280);
    }
};