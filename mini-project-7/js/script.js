let dancer;
let angle = 0;
let sliderR, sliderG, sliderB;


function setup() {
  createCanvas(700, 500);
  dancer = new KimDancer(random(width), random(height));
  sliderR = document.getElementById("slider-r");
  sliderG = document.getElementById("slider-g");
  sliderB = document.getElementById("slider-b");
  //(random() * width, random() * height);
}

function draw() {
  let bgR = sliderR.value;
  let bgG = sliderG.value;
  let bgB = sliderB.value;
  background(bgG, bgB, bgR);
  dancer.update();
  dancer.display();
}

class KimDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.xSpd = random(-1, 1);
    this.ySpd = random(-1, 1);

    this.r = 208;
    this.g = 33;
    this.b = 86;

    this.angleRleg = -30;
    this.angleRlimb= 45;


  }

  update() {
    if (mouseIsPressed){
      this.angleRleg= map(sin(frameCount * 0.05), -1, 1, -60, 0);
      this.angleRlimb= map (sin(frameCount * 0.05), -1, 1, -60, 40);
      this.angleGun=map (sin(frameCount * 0.05), -1, 1, -60, 40);
    }
    this.moving();
  }

  display() {
    // draw your dancer here
    push();
    translate(this.x, this.y);
    this.drawBody(-10, -10, 10);

    this.drawRlimb(15, -55, 20, this.angleRlimb);
    this.drawLlimb(-35, -50, 45, 180);

    this.drawLleg(-40, 50, 20);
    this.drawRleg(-10, 30, this.angleRleg);

    this.drawHead();
    // use this function below
    // drawLimb(x, y, length, angle);
    this.rotFreq = random(0.05, 0.08);
    this.rotaAmp = random(0.15, 0.3);
    pop();
  }


  moving() {
    this.y = this.y + sin(frameCount * 0.4);
  }

  drawBody(x, y, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));
    fill(sliderR.value, sliderG.value, sliderB.value);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, 50, 90);
    pop();
  }

  drawRlimb(x, y, height, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));
    fill(sliderR.value, sliderG.value, sliderB.value);
    noStroke();
    rect(0, 0, 80, height, 10);

    pop();
  }
  drawLlimb(x, y, height, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));
    fill(sliderR.value, sliderG.value, sliderB.value);
    noStroke();
    rect(-10, -10, height, 20, 5);

    push();
    rotate(radians(angle - 170));
    rect(x + 50, y, 20, 50, 10);
    pop();
    pop();
  }

  drawLleg(x, y, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));
    rectMode(CENTER);
    fill(sliderR.value, sliderG.value, sliderB.value);
    noStroke();
    rect(0, 0, 20, 50, 5);

    push();
    rotate(radians(angle + 70));
    rect(x + 60, y - 35, 20, 50, 10);
    pop();
    pop();
  }

  drawRleg(x, y, angle) {
    push();
    translate(x, y);
    rotate(radians(angle));
    fill(sliderR.value, sliderG.value, sliderB.value);
    noStroke();
    rect(0, 0, 20, 100, 10);
    pop();
  }

  drawHead() {
    push();
    translate(0, -90);
    fill(0);
    stroke(sliderR.value, sliderG.value, sliderB.value);
    strokeWeight(7);
    ellipse(0, 0, 80);
    pop();

    //mask
    push();
    translate(0, -90);
    fill(0);
    stroke(255);
    strokeWeight(6);
    ellipse(0, 0, 40);
    pop();
  }
}
