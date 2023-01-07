const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: [2048, 2048] // in cm according to units
  dimensions: 'A4',
  orientation: 'landscape',
  units: 'cm',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log(width, height);
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, 2, 0, Math.PI * 2, false);
    context.fillStyle = "gray";
    context.fill();

    context.lineWidth = 0.5;
    context.strokeStyle = "white";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
