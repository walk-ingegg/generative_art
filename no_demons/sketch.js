let stars = [];
let seed;
let start_area_offset;

let BACKGROUND = (0, 0, 0);
let FRAME_RATE = 20;
let STAR_NUM = 500;
let START_AREA_OFFSET = 0;
let COLOR_MIN = 0;
let COLOR_MAX = 255;
let ALPHA_MIN = 250;
let ALPHA_MAX = 255;
let SIZE_MIN = 0.5;
let SIZE_MAX = 9.0;
let SPEED_MIN_X = -1.5;
let SPEED_MAX_X = 1.5;
let SPEED_MIN_Y = -1.5;
let SPEED_MAX_Y = 1.5;

function setup() {
  createCanvas(getCanvasSize(), getCanvasSize());
  background(BACKGROUND);
  angleMode(DEGREES);
  randomSeed(seed);
  strokeWeight(2);
  frameRate(FRAME_RATE);

  seed = random(10000);
  start_area_offset = getCanvasOffset();
  makeStarsArray();
}

function draw() {
  background(0, 0, 0, 100);

  stars.forEach((star) => {
    star.update();
    for (let i = 0; i < stars.length; i++) {
      if (collision(star, stars[i])) {
        homogenizeSpeed(star, stars[i]);
        homogenizeColor(star, stars[i]);
        homogenizeSize(star, stars[i]);
      }
    }
  });
  // console.log("count: ", frameCount);
}

function mousePressed() {
  resetLoop();
  makeStarsArray();
  background(BACKGROUND);
}

function touchStarted() {
  resetLoop();
  makeStarsArray();
  background(BACKGROUND);
}

class Star {
  constructor() {
    this.x = random(start_area_offset, width - start_area_offset);
    this.y = random(start_area_offset, height - start_area_offset);
    this.r = random(COLOR_MIN, COLOR_MAX);
    this.g = random(COLOR_MIN, COLOR_MAX);
    this.b = random(COLOR_MIN, COLOR_MAX);
    this.alpha = random(ALPHA_MIN, ALPHA_MAX);
    this.size = random(SIZE_MIN, SIZE_MAX);
    this.speedX = random(SPEED_MIN_X, SPEED_MAX_X);
    this.speedY = random(SPEED_MIN_Y, SPEED_MAX_Y);
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

  const dist = center_dist - (pt1.size + pt2.size) / 1.5;

  return dist <= 0;
};

const homogenizeSpeed = (pt1, pt2) => {
  const x1 = pt1.speedX;
  const y1 = pt1.speedY;
  const size1 = Math.pow(pt1.size, 20);
  const x2 = pt2.speedX;
  const y2 = pt2.speedY;
  const size2 = Math.pow(pt2.size, 20);

  const totalMass = size1 + size2;
  const v1x = ((size1 - size2) * x1 + 2 * size2 * x2) / totalMass;
  const v1y = ((size1 - size2) * y1 + 2 * size2 * y2) / totalMass;
  const v2x = ((size2 - size1) * x2 + 2 * size1 * x1) / totalMass;
  const v2y = ((size2 - size1) * y2 + 2 * size1 * y1) / totalMass;

  pt1.speedX = v1x;
  pt1.speedY = v1y;
  pt2.speedX = v2x;
  pt2.speedY = v2y;
};

const homogenizeColor = (pt1, pt2) => {
  const randomAddR = random(-0.1, 0.11);
  const randomAddG = random(-0.1, 0.11);
  const randomAddB = random(-0.1, 0.11);

  pt1.r = (pt1.r + pt2.r) / 2 + randomAddR;
  pt1.g = (pt1.g + pt2.g) / 2 + randomAddG;
  pt1.b = (pt1.b + pt2.b) / 2 + randomAddB;
  pt1.alpha = (pt1.alpha + pt2.alpha) / 2;

  pt2.r = (pt1.r + pt2.r) / 2 + randomAddR;
  pt2.g = (pt1.g + pt2.g) / 2 + randomAddG;
  pt2.b = (pt1.b + pt2.b) / 2 + randomAddB;
  pt2.alpha = (pt1.alpha + pt2.alpha) / 2;
};

const homogenizeSize = (pt1, pt2) => {
  pt1.size = (pt1.size + pt2.size) / 2;
  pt2.size = (pt1.size + pt2.size) / 2;
};

const makeStarsArray = () => {
  for (let i = 0; i < STAR_NUM; i++) {
    stars.push(new Star());
  }
};

const resetLoop = () => {
  seed = random(1000);
  frameCount = 0;
  stars = [];
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

const getCanvasOffset = () => {
  let offset = getDisplayMin();
  offset = offset * START_AREA_OFFSET;

  return offset;
};
