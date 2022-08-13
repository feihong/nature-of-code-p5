export const name = 'Example I.5: Perlin noise walker'

export default function (s) {
  // let { text } = s
  let text = s.text.bind(s)

  s.setup = () => {
    s.createCanvas(400, 400)
    s.textSize(52)
  }

  s.draw = () => {
    s.text('你好世界！', 80, 300)
    text('你好世界！', 80, 200)
  }
}
