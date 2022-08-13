export const name = 'Example I.1: Traditional random walk'

export default function (s) {
  let { random, createCanvas, stroke, point, background } = s

  class Walker {
    constructor() {
      this.x = s.width / 2
      this.y = s.height / 2
    }

    display() {
      stroke(0)
      point(this.x, this.y)
    }

    step() {
      const choice = Math.floor(random(4))
      if (choice == 0) {
        this.x++;
      } else if (choice == 1) {
        this.x--;
      } else if (choice == 2) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }

  let w = null

  s.setup = () => {
    createCanvas(400, 400)
    background(255)
    w = new Walker()
  }

  s.draw = () => {
    w.step()
    w.display()
  }
}
