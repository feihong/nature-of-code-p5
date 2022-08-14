export const name = 'Example I.1: Traditional random walk'

export default function (s) {
  let { random, createCanvas, stroke, point, ellipse, background } = s

  class Walker {
    constructor() {
      this.x = s.width / 2
      this.y = s.height / 2
      console.log(this.x, this.y)
    }

    display() {
      stroke(0)
      // point(this.x, this.y)
      ellipse(this.x, this.y, 16, 16)
    }

    step() {
      const choice = Math.floor(random(4))
      if (choice === 0) {
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
    w = new Walker()
  }

  s.draw = () => {
    background(255)
    w.step()
    w.display()
  }
}
