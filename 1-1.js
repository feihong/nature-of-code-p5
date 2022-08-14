export const name = 'Example 1.1: Bouncing ball with no vectors'

export default function (s) {
  let { background, stroke, fill, ellipse } = s

  let x = 100
  let y = 100
  let xspeed = 1
  let yspeed = 3.3

  s.setup = () => {
    s.createCanvas(640, 360)
    background(255)
  }

  s.draw = () => {
    background(255)

    x += xspeed
    y += yspeed

    if (x > s.width || x < 0) {
      xspeed *= -1
    }

    if (y > s.height || y < 0) {
      yspeed *= -1
    }

    stroke(0)
    fill(175)
    ellipse(x, y, 16, 16)
  }
}
