// import Electron from './Electron';
// import Proton from './Proton';
// import Neutron from './Neutron';
import Nucleus from './Nucleus';
import Atom from './Atom';


const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
// let proton;
// let neutron;
let nucleus;
// let electron;
let atom;
let controls;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(300, 300, 300);
  camera.lookAt(origin);

  nucleus = new Nucleus(6, 6);
  scene.add(nucleus);

  // neutron = new Neutron();
  // scene.add(neutron);

  atom = new Atom(nucleus, 6);
  scene.add(atom);

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
  // const y = Math.sin(angle) * 300;
  // const y2 = Math.cos(angle) * 300;

  // angle += 0.01;
  // proton.position.set(0, 0, 0);
  //
  // angle += 0.01;
  // neutron.position.set(30, 0, 0);

  // angle += 0.01;
  // electron.position.set(-y, 0, y2);

  angle += 0.01;

  atom.update(angle);
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
