import Bot from './objects/bot';

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

const botCount = 51;
const bots = [];

const minSize = 5;
const maxSize = 30;
const intervalCount = botCount - 1;
const interval = (maxSize - minSize) / intervalCount;

for (let i = 0; i < botCount; i += 1) {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);
  const color = (red * 256 ** 0) + (green * 256 ** 1) + (blue * 256 ** 2);
  const bot = new Bot({
    name: 'Bot',
    radius: maxSize - (interval * i),
    color,
    speed:  maxSize - (interval * i),
    boundary: {
      x1: -100,
      x2: 100,
      z1: -100,
      z2: 100,
    },
  });
  bots.push(bot);
}

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
