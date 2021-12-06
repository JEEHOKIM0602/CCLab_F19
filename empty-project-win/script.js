let sound;
let song;
let amp;
let mic;

function preload(){
  sound= loadSound("assets/beat.mp3");
  song = loadSound("assets/song.mp3");

}

function setup() {
  createCanvas(400, 500);
  background(220);

  mic = new p5.Amplitude();
  mic.start();
}

function draw(){

  let volume= mic.getLevel();
  let dia= map(volume, 0, 1, 10, 500);

  noStroke();
  fill(0, 150, 255);
  ellipse(width/2, height/2, dia, dia);
}


function mousePressed(){
  if(song.isPlaying()== false){
      song.play();
    } else {
      song.pause();
    }
  }
