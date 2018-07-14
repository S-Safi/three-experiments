import Car from './objects/car';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let pointLight;
let ambientLight;
let keyboard;
let car;

const key = {
  FORWARD: 'W',
  BACK: 'S',
  LEFT: 'A',
  RIGHT: 'D',
  UP: 'space',
  DOWN: 'shift',
};
const origin = new THREE.Vector3(0, 0, 0);
const rotationspeed = (Math.PI / 180) * 2;

function init() {
  keyboard = new KeyboardState();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  car = new Car({
    name: 'car',
    color: 0x888888,
    size: 1,
  });

  scene.add(car);

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xff00ff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 200, -200);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  keyboard.update();
  // keyboard.debug();

  if (keyboard.pressed(key.LEFT)) { car.rotateY(rotationspeed); }
  if (keyboard.pressed(key.RIGHT)) { car.rotateY(-rotationspeed); }

  const forwardDirection = car.getWorldDirection();
  const backwardDirection = car.getWorldDirection().clone().negate();

  if (keyboard.pressed(key.FORWARD)) { car.position.add(forwardDirection); }
  if (keyboard.pressed(key.BACK)) { car.position.add(backwardDirection); }
  if (keyboard.pressed(key.UP)) { car.position.y += 2; }
  if (keyboard.pressed(key.DOWN)) { car.position.y -= 2; }


  camera.lookAt(car.position);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
