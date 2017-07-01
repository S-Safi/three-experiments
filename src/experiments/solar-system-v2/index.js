import Earth from './objects/earth';
import Mercury from './objects/mercury';
import Venus from './objects/venus';
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

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, -20000, 10000);
  camera.lookAt(origin);

  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);


  const axisHelper = new THREE.AxisHelper(1000);
  scene.add(axisHelper);

  const mercury = new Mercury();
  const venus = new Venus();
  const earth = new Earth();

  const sol = new Sol();
  sol.addPlanet(mercury);
  sol.addPlanet(venus);
  sol.addPlanet(earth);

  solarSystem = new SolarSystem();
  solarSystem.scale.set(SCALE, SCALE, SCALE);
  solarSystem.addBody(sol);
  scene.add(solarSystem);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  const time = Date.now();
  const delta = time - prevTime;
  prevTime = time;
  solarSystem.update(delta);
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
