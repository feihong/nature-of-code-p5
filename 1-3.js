export const name = 'Example 1.3: Vector subtraction'

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

    translate(s.width / 2, s.height / 2)
    line(0, 0, mouse.x, mouse.y)
  }
}
