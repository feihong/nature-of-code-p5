export const name = 'Example 1.5: Vector magnitude'

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

export default function (s) {
  let { background, translate, fill, rect, line } = s

  let center

  s.setup = () => {
    s.createCanvas(640, 360)
    center = new Vector(s.width / 2, s.height / 2)
  }

  s.draw = () => {
    background(255)

    const mouse = new Vector(s.mouseX, s.mouseY)
    mouse.sub(center)

    const m = mouse.mag()
    fill(0)
    rect(0, 0, m, 10)

    translate(center.x, center.y)
    line(0, 0, mouse.x, mouse.y)
  }
}
