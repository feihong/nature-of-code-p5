export const name = 'Example 1.2: Bouncing ball with no vectors'

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.y += v.y
    this.x += v.x
  }
}

export default function (s) {
  let { background, stroke, fill, ellipse } = s

  let location
  let velocity

  s.setup = () => {
    s.createCanvas(640, 360)
    location = new Vector(100, 100)
    velocity = new Vector(2.5, 5)
  }

  s.draw = () => {
    background(255)

    location.add(velocity)

    if (location.x > s.width || location.x < 0) {
      velocity.x *= -1
    }

    if (location.y > s.height || location.y < 0) {
      velocity.y *= -1
    }

    stroke(0)
    fill(175)
    ellipse(location.x, location.y, 16, 16)
  }
}
