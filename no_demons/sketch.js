let stars = [];
let seed = 999;

let BACKGROUND = (0, 0, 0);
let COLOR_MIN = 0;
let COLOR_MAX = 255;
let ALPHA_MIN = 0;
let ALPHA_MAX = 255;
let SIZE_MIN = 1;
let SIZE_MAX = 15;
let SPEED_MIN = -5;
let SPEED_MAX = 5;

function setup() {
  createCanvas(getCanvasSize(), getCanvasSize());
  background(BACKGROUND);
  angleMode(DEGREES);
  randomSeed(seed);
  strokeWeight(2);
  frameRate(60);

  makeStarsArray();
}

function draw() {
  background(BACKGROUND);
  stars.forEach((star) => {
    star.update();
    for (let i = 0; i < stars.length; i++) {
      if (collision(star, stars[i])) {
        homogenizeSpeed(star, stars[i]);
      }
    }
  });
  console.log("count: ", frameCount);
}

class Star {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(COLOR_MIN, COLOR_MAX);
    this.g = random(COLOR_MIN, COLOR_MAX);
    this.b = random(COLOR_MIN, COLOR_MAX);
    this.alpha = random(ALPHA_MIN, ALPHA_MAX);
    this.size = random(SIZE_MIN, SIZE_MAX);
    this.speedX = random(SPEED_MIN, SPEED_MAX);
    this.speedY = random(SPEED_MIN, SPEED_MAX);
  }

  drawStar() {
    push();
    stroke(this.r, this.g, this.b, this.alpha);
    strokeWeight(this.size);
    point(this.x, this.y);
    pop();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }

    this.drawStar();
  }
}

const collision = (pt1, pt2) => {
  const center_dist = Math.sqrt(
    Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2)
  );

  const dist = center_dist - (pt1.size + pt2.size) / 2;

  return dist <= 0 ? true : false;
};

const homogenizeSpeed = (pt1, pt2) => {
  const x1 = pt1.speedX;
  const y1 = pt1.speedY;
  const x2 = pt2.speedX;
  const y2 = pt2.speedY;
  // const x_new = (x1 + x2) / 2;
  // const y_new = (y1 + y2) / 2;

  // pt1.speedX = x_new;
  // pt1.speedY = y_new;
  // pt2.speedX = x_new;
  // pt2.speedY = y_new;

  const homoSpeedX = (Math.abs(x1) + Math.abs(x2)) / 2;
  const homoSpeedY = (Math.abs(y1) + Math.abs(y2)) / 2;

  pt1.speedX = -Math.sign(x1) * homoSpeedX;
  pt1.speedY = -Math.sign(y1) * homoSpeedY;
  pt2.speedX = -Math.sign(x2) * homoSpeedX;
  pt2.speedY = -Math.sign(y2) * homoSpeedY;
};

const homogenizeColor = (pt1, pt2) => {
  let r1 = pt1.r;
  let g1 = pt1.g;
  let b1 = pt1.b;
  let r2 = pt2.r;
  let g2 = pt2.g;
  let b2 = pt2.b;
};

const makeStarsArray = () => {
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
};

const getDisplayMin = () => {
  let wid = displayWidth;
  let hei = displayHeight;

  return wid > hei ? hei : wid;
};

const getCanvasSize = () => {
  let size = getDisplayMin();
  size = size * 0.85;

  return size;
};
