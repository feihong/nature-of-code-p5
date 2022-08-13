export const name = 'Example I.5: Perlin noise walker'

export default function (s) {
  let { map, noise, stroke, fill, ellipse } = s

  class Walker {
    constructor() {
      this.x = 0
      this.y = 0
      this.tx = 0
      this.ty = 10000
    }

    display() {
      stroke(0)
      fill(165)
      ellipse(this.x, this.y, 16, 16)
    }

    step() {
      this.x = map(noise(this.tx), 0, 1, 0, s.width)
      this.y = map(noise(this.ty), 0, 1, 0, s.height)

      this.tx += 0.01
      this.ty += 0.01
    }
  }

  let w = null

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
