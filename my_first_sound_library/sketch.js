// setup前に音源を読み込む
function preload() {
  sound = loadSound("./mixkit-flock-of-wild-geese-20.wav");
}

function setup() {
  canvas = createCanvas(600, 600);
  // canvasをクリックすると音が鳴る
  canvas.mousePressed(onClickPlay);

  amplitude = new p5.Amplitude();
}

function draw() {
  background(0);

  const level = amplitude.getLevel();
  const peak = sound.getPeaks(1);

  text(level, 100, 100);

  textSize(32);
  fill(255);

  if (level > peak - 0.2) {
    text("Volume exceeded peak - 0.2", 50, 50);
  } else {
    text("volume less than peak - 0.2", 50, 150);
  }
}

// 音源を鳴らす
function onClickPlay() {
  if (sound.isPlaying()) {
    sound.stop();
    return;
  }
  sound.play();
}

// function keyPressed() {
//   if (keyCode === LEFT_ARROW) {
//     // stop loop
//     noLoop();
//   } else if (keyCode === RIGHT_ARROW) {
//     // start loop
//     loop();
//   } else if (keyCode === UP_ARROW || keyCode === 32) {
//     // reset loop and update
//     resetLoop();
//     makePointArray();
//     background(BACKGROUND);
//   } else if (keyCode === DOWN_ARROW) {
//     // save img "emerging_mesh_date_time.png"
//     now = getCurrentTime();
//     save("emerging_mesh_" + now + ".png");
//   }
// }
