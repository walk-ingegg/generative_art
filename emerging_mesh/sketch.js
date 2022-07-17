let pts = [];
let pt1;
let pt2;

let pt_num = 40;
let seed = 1561;
let circleMin = 1;
let circleMax = 400;

let BACKGROUND = (0, 0, 0);
let MOVE_SPEED = 1;
let WIDTH_OFFSET = 50;
let HEIGHT_OFFSET = 50;
let LINE_ALPHA = 1;
let COLOR_MIN = 0;
let COLOR_MAX = 255;

function setup() {
  createCanvas(1000, 1000);
  background(BACKGROUND);
  angleMode(DEGREES);
  randomSeed(seed);
  strokeWeight(2);

  makePointArray();
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
    // stop loop
    noLoop();
  } else if (keyCode === RIGHT_ARROW) {
    // start loop
    loop();
  } else if (keyCode === UP_ARROW || keyCode === 32) {
    // reset loop and update
    seed = random(1000);
    pt_num = floor(random(20, 150));
    circleMin = random(1, 200);
    circleMax = random(200, 500);

    makePointArray();
    background(BACKGROUND);
  } else if (keyCode === DOWN_ARROW) {
    // save img "emerging_mesh_date_time.png"
    now = getCurrentTime();
    save("emerging_mesh_" + now + ".png");
  }
}

class SetPoint {
  constructor() {
    this.centerX = random(WIDTH_OFFSET, width - WIDTH_OFFSET);
    this.centerY = random(HEIGHT_OFFSET, height - HEIGHT_OFFSET);
    this.degree = random(360);
    this.radius = random(circleMin, circleMax);
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

const makePointArray = () => {
  pts = [];
  for (let i = 0; i < pt_num; i++) {
    pt = new SetPoint();
    pts.push(pt);
  }
};

const getCurrentTime = () => {
  let time;
  const now = new Date();

  const Year = now.getFullYear();
  const Month = str(now.getMonth() + 1).padStart(2, "0");
  const Day = str(now.getDate()).padStart(2, "0");
  const Hour = str(now.getHours()).padStart(2, "0");
  const Min = str(now.getMinutes()).padStart(2, "0");
  const Sec = str(now.getSeconds()).padStart(2, "0");

  return (time = "_" + Year + Month + Day + "_" + Hour + Min + Sec);
};
