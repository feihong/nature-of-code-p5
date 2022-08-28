const width = 640
const height = 360

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.x += v.x
    this.y += v.y
  }
  sub(v) {
    this.x -= v.x
    this.y -= v.y
  }
  mult(n) {
    this.x *= n
    this.y *= n
  }
}

const center = new Vector(width / 2, height / 2)

function setup() {
  createCanvas(width, height)
}

function draw() {
  background(255)

  const mouse = new Vector(mouseX, mouseY)
  mouse.sub(center)
  mouse.mult(0.5)

  translate(center.x, center.y)
  line(0, 0, mouse.x, mouse.y)
}
