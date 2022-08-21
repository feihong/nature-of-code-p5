export const name = 'Example 1.4: Multiplying a vector'

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

export default function (s) {
  let { background, translate, line } = s

  let center

  s.setup = () => {
    s.createCanvas(640, 360)
    center = new Vector(s.width / 2, s.height / 2)
  }

  s.draw = () => {
    background(255)

    const mouse = new Vector(s.mouseX, s.mouseY)
    mouse.sub(center)
    mouse.mult(0.5)

    translate(center.x, center.y)
    line(0, 0, mouse.x, mouse.y)
  }
}
