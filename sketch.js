const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048], // in cm according to units
  pixelsPerInch: 300,
  // units: "cm",
  // dimensions: "A4",
};

random.setSeed(151352)
// random.setSeed(random.getRandomSeed())
console.log(random.getSeed())

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 400;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const position = [u, v];
        const radius = Math.abs(random.noise2D(u, v) * 0.05);
        const symbol = '\u{2425}';
        const deadMan = '\u{1303F}';
        const leftFacingSvasti = '\u{0FD6}'
        const omega = '\u{03A9}';
        points.push({
          color: random.pick(palette),
          // radius: Math.max(0, random.gaussian() * 0.008),
          rotation: random.noise2D(u, v),
          radius,
          symbol: leftFacingSvasti,
          position
        })
      }
    }
    return points;
  };

  // random.setSeed(512)
  const points = createGrid().filter(() => random.value() > 0.8);

  return ({ context, width, height }) => {
    // const margin = width * 0.175;
    const margin = 300;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height)


    points.forEach(data => {
      const {
        color,
        position,
        radius,
        symbol,
        rotation
      } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save()
      context.fillStyle = color;
      context.font = `${radius * width}px "Roboto"`
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(symbol, 0, 0);
      context.restore();
      // context.beginPath();
      // arc(x, y, radius, startAngle, endAngle, counterclockwise)
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.rect(x, y, width / 15, height / 15);
      // context.fillText("hello", x, y)
      // context.ellipse(x, y, radius * width, radius * height, 0, Math.PI * 2, false);
      // context.strokeStyle = color;
      // context.lineWidth = 1;
      // context.fillStyle = color;
      // context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
