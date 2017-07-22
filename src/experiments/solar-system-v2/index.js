import { ONE_MILLION } from './lib/constants';
import Moon from './objects/moon';
import Mercury from './objects/mercury';
import Venus from './objects/venus';
import Earth from './objects/earth';
import Mars from './objects/mars';
import Jupiter from './objects/jupiter';
import Saturn from './objects/saturn';
import Uranus from './objects/uranus';
import Neptune from './objects/neptune';
import Sol from './objects/sol';
import SolarSystem from './objects/solar-system';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 5000000;
const SCALE = 0.005;

let prevTime = Date.now();
let scene;
let camera;
let renderer;
let controls;
let pointLight;
let ambientLight;
let solarSystem;

let followObject;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 50000);
  camera.lookAt(origin);

  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);


  const axisHelper = new THREE.AxisHelper(1000);
  scene.add(axisHelper);

  const mercury = new Mercury();
  const venus = new Venus();
  const earth = new Earth();
  const moon = new Moon(
    { color: 0x888888,
      radius: 1737,
      orbitRadius: 384000,
      orbitPeriod: 27 });
  earth.addMoon(moon);
  const mars = new Mars();
  const jupiter = new Jupiter();
  const ganymede = new Moon(
    { color: 0xffffff,
      radius: 2631,
      orbitRadius: 1.070 * ONE_MILLION,
      orbitPeriod: 7 });
  jupiter.addMoon(ganymede);
  const callisto = new Moon(
    { color: 0xffffff,
      radius: 4821 / 2,
      orbitRadius: 1.8827 * ONE_MILLION,
      orbitPeriod: 17 });
  jupiter.addMoon(callisto);
  const io = new Moon(
    { color: 0xffffff,
      radius: 3660 / 2,
      orbitRadius: 0.442 * ONE_MILLION,
      orbitPeriod: 1.7691 });
  jupiter.addMoon(io);
  const saturn = new Saturn();
  const uranus = new Uranus();
  const neptune = new Neptune();

  const sol = new Sol();
  sol.addPlanet(mercury);
  sol.addPlanet(venus);
  sol.addPlanet(earth);
  sol.addPlanet(mars);
  sol.addPlanet(jupiter);
  sol.addPlanet(saturn);
  sol.addPlanet(uranus);
  sol.addPlanet(neptune);

  solarSystem = new SolarSystem();
  solarSystem.scale.set(SCALE, SCALE, SCALE);
  solarSystem.addBody(sol);
  scene.add(solarSystem);

  followObject = jupiter;

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (!followObject) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
  }

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  const time = Date.now();
  const delta = time - prevTime;
  prevTime = time;
  solarSystem.update(delta);
  if (!followObject) {
    controls.update();
  } else {
    camera.position.set(followObject.position.x * SCALE, followObject.position.y * SCALE, 20000);
  }
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
