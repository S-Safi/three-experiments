import Bot from './objects/bot';
import PerimeterMove from './move/perimeter';
import CircleMove from './move/circle-target';
import Stationary from './move/stationary';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let axesHelper;
let gridHelper;
let controls;
let pointLight;
let ambientLight;

let prevTime = Date.now();

const origin = new THREE.Vector3(0, 0, 0);

const bots = [];

const bot1 = new Bot({
  name: 'Bot 1',
  radius: 10,
  color: '#0000ff',
});
bots.push(bot1);

const bot2 = new Bot({
  name: 'Bot 2',
  radius: 10,
  color: '#ff0000',
});
bots.push(bot2);

const bot3 = new Bot({
  name: 'Bot 3',
  radius: 10,
  color: '#ff0000',
});
bots.push(bot3);

const bot4 = new Bot({
  name: 'Bot 4',
  radius: 10,
  color: '#ff00ff',
});
bots.push(bot4);

const circleMove1 = new CircleMove({
  speed: Math.PI,
  radius: 30,
  target: bot1,
});

const circleMove2 = new CircleMove({
  speed: Math.PI / 2,
  radius: 60,
  target: bot3,
});

const circleMove3 = new CircleMove({
  speed: Math.PI / 4,
  radius: 90,
  target: bot2,
});

const nomove1 = new Stationary({
  point: new THREE.Vector3(0, 0, 0),
});

bot1.move = circleMove2;

bot2.move = circleMove1;

bot3.move = nomove1;
bot3.position.set(0, 0, 0);

bot4.move = circleMove3;

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(200, 10);
  scene.add(gridHelper);

  axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  bots.forEach(bot => scene.add(bot));

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0x0000ff, 1, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

// let angle = 0;

function update() {
  const time = Date.now();
  const delta = time - prevTime;
  prevTime = time;

  bots.forEach(bot => bot.update(delta));
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
