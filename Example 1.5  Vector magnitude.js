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
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
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

  const m = mouse.mag()
  fill(0)
  rect(0, 0, m, 10)

  translate(center.x, center.y)
  line(0, 0, mouse.x, mouse.y)
}
