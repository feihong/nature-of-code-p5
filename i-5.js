export const name = 'Example I.5: Perlin noise walker'

export default function (s) {
  let { map, noise, stroke, fill, ellipse } = s

  class Walker {
    constructor() {
      this.x = s.width / 2
      this.y = s.height / 2
      this.tx = 0
      this.ty = 10000
    }

    display() {
      stroke(0)
      fill(200)
      ellipse(this.x, this.y, 16, 16)
    }

    step() {
      this.x = map(noise(this.tx), 0, 1, 0, s.width)
      this.y = map(noise(this.ty), 0, 1, 0, s.height)

      this.tx += 0.01
      this.ty += 0.01
    }
  }

  let w

  s.setup = () => {
    s.createCanvas(400, 400)
    w = new Walker()
  }

  s.draw = () => {
    s.background(255)
    w.step()
    w.display()
  }
}
