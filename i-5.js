export const name = 'Example I.5: Perlin noise walker'

export default function (s) {
  let { createCanvas, textSize, text } = s

  s.setup = () => {
    createCanvas(400, 400)
    textSize(52)
  }

  s.draw = () => {
    text('你好世界！', 80, 300)
    text('你好世界！', 80, 200)
  }
}
