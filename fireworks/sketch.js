let seeds = [];

let BACKGROUND = "#fcebdc";

function setup() {
  createCanvas(800, 800);
  background(BACKGROUND);
  noStroke();
  angleMode(DEGREES);

  seeds = new seed();
  drawTable();
  drawWalterMelon();
}

function draw() {}

class seed {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  drawWalterMelonSeed() {
    
  }

  eatWalterMelon() {}
}

function drawWalterMelon() {
  radius = 600;
  fill("#145c1b");
  ellipse(400, 400, radius);
  fill("#e63030");
  ellipse(400, 400, radius - 50);
  fill(BACKGROUND);
  rect(0, 0, 800, 400);
}

function drawTable() {
  fill("#705131");
  rect(0, 600, 800, 200);
  fill("#261c13");
  ellipse(450, 698, 550, 30);
}
