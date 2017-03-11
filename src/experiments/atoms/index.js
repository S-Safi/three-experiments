import Electron from './Electron';
import Proton from './Proton';
import Neutron from './Neutron';


const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let proton;
let neutron;
let electron;
let controls;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(300, 300, 300);
  camera.lookAt(origin);

  proton = new Proton();
  scene.add(proton);

  neutron = new Neutron();
  scene.add(neutron);

  electron = new Electron();
  scene.add(electron);

  ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

let angle = 0;

function update() {
  const y = Math.sin(angle) * 300;
  const y2 = Math.cos(angle) * 300;

  angle += 0.01;
  proton.position.set(0, 0, 0);

  angle += 0.01;
  neutron.position.set(30, 0, 0);

  angle += 0.01;
  electron.position.set(-y, 0, y2);

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
