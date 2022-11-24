const BACKGROUND = (125);

function setup() {
  createCanvas(800, 800);
  background(BACKGROUND);

}

function draw() {
	ellipse(400, 400, 400, 200);
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
