const canvasSketch = require('canvas-sketch');
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


const settings = {
  animate: true,
  context: 'webgl',
  attributes: { anialiases: true }
  // dimensions: [ 2048, 2048 ]
};

const sketch = ({ context }) => {

  const renderer = new WebGLRenderer({ context });

  renderer.setClearColor('#000', 1);

  const camera = new PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new Vector3())

  const controls = new OrbitControls(camera);

  return ({ context, width, height }) => {
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
