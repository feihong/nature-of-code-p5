function setup() {
  createCanvas(400, 400)
  textSize(52)
}

function draw() {
  if (mouseIsPressed) {
    fill(0)
  } else {
    fill(255)
  }
  ellipse(mouseX, mouseY, 80, 80)

  fill(150, 200, 180)
  text('你好世界！', 80, 200)
}
