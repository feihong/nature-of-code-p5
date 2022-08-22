export const name = 'Example 1.8: Motion 101 (velocity and constant acceleration)'

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
}

class Mover {
  constructor(sketch) {
    this.s = sketch
    this.location = new Vector(sketch.width / 2, sketch.height / 2)
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(-0.001, 0.01)
    this.topspeed = 10
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.topspeed)
    this.location.add(this.velocity)
  }

  display() {
    const s = this.s
    s.stroke(0)
    s.fill(175)
    s.ellipse(this.location.x, this.location.y, 16, 16)
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

export default function (s) {
  let { background } = s

  let mover

  s.setup = () => {
    s.createCanvas(width, height)
    mover = new Mover(s)
  }

  s.draw = () => {
    background(255)

    mover.update()
    mover.checkEdges()
    mover.display()
  }
}
