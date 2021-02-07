//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  //this is how you can load images
  dogimage = loadImage("images/Dog.png");
  happyDogimage = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10)
  dog.scale = 0.5;

  //this is how you can assign images to sprites
  dog.addImage(dogimage);

  //this is how you can assign the firebase database to variable database
  database = firebase.database();

  //this is how you fetch the foodstock from your database
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogimage);
  }

 
  drawSprites();
  //add styles here
  textSize = 50;
  fill("red");
  stroke(50);
}

//function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
