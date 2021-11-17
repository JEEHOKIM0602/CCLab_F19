let img;

function preload(){
  img=loadImage("asset/koreancolor.png")
}

function setup(){
  createCanvas(200,200);
  background(random(255));


}

function draw(){
  background(220);
  image(img,0,0,width,height)
}
//function change(){
//}
