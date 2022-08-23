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

class Mover {
  constructor() {
    this.location = new Vector(random(width), random(height))
    this.velocity = new Vector(random(-2, 2), random(-2, 2))
  }

  update() {
    this.location.add(this.velocity)
  }

  display() {
    stroke(0)
    fill(175)
    ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = width
    }

    if (this.location.y > height) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = height
    }
  }
}

let mover

function setup() {
  createCanvas(width, height)
  mover = new Mover()
}

function draw() {
  background(255)

  mover.update()
  mover.checkEdges()
  mover.display()
}
