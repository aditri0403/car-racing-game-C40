var database;
var gamestate = 0;
var playercount;
var form,game,player;
var allplayers;
var distance=0;
var car1,car2,car3,car4;
var cars;
var carimg1,carimg2,carimg3,carimg4;
var trackimg, groundimg;
var carsatend = 0;

function preload(){
  carimg1 = loadImage("images/car1.png");
  carimg2 = loadImage("images/car2.png");
  carimg3 = loadImage("images/car3.png");
  carimg4 = loadImage("images/car4.png");
  trackimg = loadImage("images/track.jpg");
  groundimg = loadImage("images/ground.png");
}
function setup(){
  database = firebase.database();
  createCanvas(displayWidth - 20,displayHeight - 20);
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playercount === 4 && carsatend === 0){
    game.update(1);
}
  if(gamestate === 1){
    clear();
    game.play();
  }
  if(carsatend === 4){
    game.update(2);
  }
  if(gamestate === 2 && carsatend === 4){
    game.end();
  }
}