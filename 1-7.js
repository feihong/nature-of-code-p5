export const name = 'Example 1.7: Motion 101 (velocity)'

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
  constructor(sketch) {
    this.s = sketch
    this.location = new Vector(sketch.random(width), sketch.random(height))
    this.velocity = new Vector(sketch.random(-2, 2), sketch.random(-2, 2))
  }

  update() {
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
  let { background, translate, fill, rect, line } = s

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
