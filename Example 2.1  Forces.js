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
  limit(max) {
    const m = this.mag()
    if (m > max) {
      this.normalize()
      this.mult(max)
    }
  }
  static random2D() {
    const v = new Vector(random(-1, 1), random(-1, 1))
    v.normalize()
    return v
  }
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }
  static div(v, n) {
    return new Vector(v.x / n, v.y / n)
  }
}

class Mover {
  constructor() {
    this.location = new Vector(random(width), random(height))
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.mass = 10
  }

  applyForce(force) {
    const f = Vector.div(force, this.mass)
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topspeed)
    this.location.add(this.velocity)
  }

  display() {
    stroke(0)
    fill(175)
    ellipse(this.location.x, this.location.y, 16, 16)
  }

  checkEdges() {
    if (this.location.x > width || this.location.x < 0) {
      this.velocity.x *= -1
    }

    if (this.location.y > height || this.location.y < 0) {
      this.velocity.y *= -1
    }
  }
}

let mover

function setup() {
  createCanvas(width, height)
  background(255)

  mover = new Mover()
  const wind = new Vector(0.03, 0)
  const gravity = new Vector(0, 0.3)
  mover.applyForce(wind)
  mover.applyForce(gravity)
}

function draw() {
  background(255)

  mover.update()
  mover.checkEdges()
  mover.display()
}
