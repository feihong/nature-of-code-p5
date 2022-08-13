export const name = 'Example I.5: Perlin noise walker'

function autoBindMethods(s) {
  const proto = Object.getPrototypeOf(s)
  for (const name of Object.getOwnPropertyNames(proto)) {
    const thing = proto[name]
    if (typeof thing === 'function') {
      s[name] = thing.bind(s)
    }
  }
  return s
}

export default function (s) {
  autoBindMethods(s)

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
