export const name = 'Example I.6: 2D Perlin noise'

export default function (s) {
  let { createCanvas, random, noise, map, loadPixels, updatePixels, set, color } = s

  s.setup = () => {
    createCanvas(400, 400)

    loadPixels()
    let xoff = 0

    for (let x = 0; x < s.width; x++) {
      let yoff = 0

      for (let y = 0; y < s.height; y++) {
        // const bright = Math.floor(random(255));
        const bright = map(noise(xoff, yoff), 0, 1, 0, 255)

        set(x, y, color(bright))
        yoff += 0.1
      }
      xoff += 0.1
    }
    updatePixels()
  }
}
