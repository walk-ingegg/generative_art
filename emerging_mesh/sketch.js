let pts = [];
let pt1;
let pt2;

let pt_num = 40;
let MOVE_SPEED = 1;
let WIDTH_OFFSET = 0;
let HEIGHT_OFFSET = 180;
let LINE_ALPHA = 1;
let CIRCLE_MIN = 1;
let CIRCLE_MAX = 400;
let COLOR_MIN = 0;
let COLOR_MAX = 255;
let RANDOM_SEED = 10;

function setup() {
  createCanvas(1500, 500);
  background(0);
  angleMode(DEGREES);
  randomSeed(RANDOM_SEED);
  strokeWeight(1);

  for (let i = 0; i < pt_num; i++) {
    pt = new SetPoint();
    pts.push(pt);
  }
}

function draw() {
  pts.forEach((pt) => {
    pt.update();
  });

  for (let i = 0; i < pt_num; i++) {
    let pt1 = pts.slice(i - 1)[0];
    let pt2 = pts[i];

    push();
    stroke(pt1.r, pt1.g, pt1.b, LINE_ALPHA);
    line(pt1.x, pt1.y, pt2.x, pt2.y);
    pop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    noLoop();
  } else if (keyCode === RIGHT_ARROW) {
    loop();
  } else if (keyCode === DOWN_ARROW) {
    const date = new Date();
    const timeStamp = date.getTime();
    // console.log(timeStamp)
    save("emerging_mesh_" + RANDOM_SEED + "_" + timeStamp);
  }
}

class SetPoint {
  constructor() {
    this.centerX = random(WIDTH_OFFSET, width - WIDTH_OFFSET);
    this.centerY = random(HEIGHT_OFFSET, height - HEIGHT_OFFSET);
    this.degree = random(360);
    this.radius = random(CIRCLE_MIN, CIRCLE_MAX);
    this.r = floor(random(COLOR_MIN, COLOR_MAX));
    this.g = floor(random(COLOR_MIN, COLOR_MAX));
    this.b = floor(random(COLOR_MIN, COLOR_MAX));
  }

  setPointOrigin() {
    this.x = cos(this.degree) * this.radius;
    this.y = sin(this.degree) * this.radius;
  }

  update() {
    this.setPointOrigin();
    this.x += this.centerX;
    this.y += this.centerY;
    // this.degree += random(MOVE_SPEED);
    this.degree += MOVE_SPEED;
  }
}
