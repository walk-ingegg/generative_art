let pts = [];
let pt_num = 500;
let pt1;
let pt2;
let MOVE_SPEED = 1;
let WIDTH_OFFSET = -500;
let HEIGHT_OFFSET = -500;

function setup() {
  createCanvas(1500, 500);
  background(0);
  // stroke(255, 255, 255, 1);
  angleMode(DEGREES);

  for (let i = 0; i < pt_num; i++) {
    pt = new SetPoint();
    pts.push(pt);
  }
  noLoop();
}

function draw() {
  pts.forEach((pt) => {
    pt.update();
  });

  for (let i = 0; i < pt_num; i++) {
    let pt1 = pts.slice(i - 1)[0];
    let pt2 = pts[i];

    push();
    stroke(pt1.r, pt1.g, pt1.b, 1);
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
    const timeStamp =  date.getTime()
    // console.log(timeStamp)
    save("twitter_header_" + timeStamp);
  }
}

class SetPoint {
  constructor() {
    this.centerX = random(WIDTH_OFFSET, width - WIDTH_OFFSET);
    this.centerY = random(HEIGHT_OFFSET, height - HEIGHT_OFFSET);
    this.degree = random(360);
    this.radius = random(1, 20);
    this.r = floor(random(0, 255));
    this.g = floor(random(0, 255));
    this.b = floor(random(0, 255));
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
