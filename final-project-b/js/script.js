let universe;
let num = 50;
let stars = [];
let blackHoleRad = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  /*
  for (let i = 0; i < num; i++) {
    stars[i] = new Star(random() * width, random() * height, random(3, 15));
  }
  */
}

function draw() {
  background(0);

  //space


  //Black Hole
  push();
  translate(width / 2, height/2);
  rotate(frameCount * -0.002);
  for (let j = 0; j < 20; j++) {
    for (let deg = 0; deg < 360; deg += 10) {
      let angle = radians(deg + j*0.03*frameCount);
      let radDist = blackHoleRad + j * 12;
      let x = cos(angle) * radDist;
      let y = sin(angle) * radDist;
      let dia = 6 - j * 0.5;
      noStroke();
      fill(255);
      ellipse(x, y, dia, dia);
    }
  }
  pop();

  // generate
  stars.push( new Star(random() * width, random() * height, random(1, 2)) );
  if (mouseIsPressed) {
    stars.push( new Star(mouseX, mouseY, random(2, 15)) );
  }

  // star
  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    //s.fluctuate();
    s.follow(width/2, height/2);
    s.move();
    s.slowDown();
    s.three();
    s.display();

    s.disappear();

    // remove
    if (s.isDead == true) {
      stars.splice(i, 1);
    }
  }
}

class Star {
  constructor(startX, startY, rad) {
    this.x = startX;
    this.y = startY;
    this.rad = rad;
    this.scl = 1.0;

    this.xSpd = random(-30, 30);
    this.ySpd = random(-35, 35);

    this.r = 255; //random(255);
    this.g = 255; //random(255);
    this.b = 255; //random(255);
    this.isDead = false;

    this.fluct = random(0.05, 0.1);
  }

  disappear() {
    let distance = dist(width/2, height/2, this.x, this.y);
    if (distance < blackHoleRad/2) {
      this.isDead = true;
    }
  }
  three() {
    let distance = dist(width/2, height/2, this.x, this.y);
    this.scl = map(distance*distance, 0, 300000, 0, 5.0);
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;

    this.xSpd = constrain(this.xSpd, -10, 10);
    this.ySpd = constrain(this.ySpd, -10, 10);
  }

  slowDown() {
    this.xSpd *= 0.95;
    this.ySpd *= 0.95;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scl);
    noStroke();
    fill(this.r, this.g, this.b, 200);
    circle(0, 0, this.rad * 2);
    stroke(255);
    noFill();
    circle(0, 0, this.rad * 2.5);
    pop();
  }

  fluctuate() {
    this.y = this.y + sin(frameCount * 4);
  }

  follow(targetX, targetY) {
    let adj = 100;
    let accX = (targetX - this.x) / (this.rad * adj); // ***
    let accY = (targetY - this.y) / (this.rad * adj);

    this.xSpd += accX;
    this.ySpd += accY;
  }
}
