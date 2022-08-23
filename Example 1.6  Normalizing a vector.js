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
  div(n) {
    this.x /= n
    this.y /= n
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  normalize() {
    const m = this.mag()
    if (m !== 0) {
      this.div(m)
    }
  }
}

const width = 640
const height = 360
let center = new Vector(width / 2, height / 2)

function setup() {
  createCanvas(width, height)
}

function draw() {
  background(255)

  const mouse = new Vector(mouseX, mouseY)
  mouse.sub(center)

  mouse.normalize()
  mouse.mult(50)

  translate(center.x, center.y)
  line(0, 0, mouse.x, mouse.y)
}
