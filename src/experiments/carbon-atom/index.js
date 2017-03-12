import Electron from './Electron';
import Proton from './Proton';
import Neutron from './Neutron';
import Shell from './Shell';
// import Nucleus from './Nucleus';
// import Atom from './Atom';

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
// let nucleus;
// let electron;
// let atom;
let controls;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);
const electron1 = new Electron(1);
const electron2 = new Electron(1);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(300, 300, 300);
  camera.lookAt(origin);

  proton = new Proton(1);
  scene.add(proton);
  proton.position.set(0, 0, 0);

  neutron = new Neutron(1);
  scene.add(neutron);
  neutron.position.set(60, 0, 0);

  scene.add(electron1);

  scene.add(electron2);

  const shell1 = new Shell({ radius: 50 });
  scene.add(shell1);
  shell1.rotation.x = Math.PI / 2;

  const shell2 = new Shell({ radius: 100 });
  scene.add(shell2);
  shell2.rotation.x = Math.PI / 2;

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
  const e11 = Math.sin(angle) * 50;
  const e12 = Math.cos(angle) * 50;

  const e21 = Math.sin(angle) * 100;
  const e22 = Math.cos(angle) * 100;

  // angle += 0.01;
  // proton.position.set(0, 0, 0);
  //
  // angle += 0.01;
  // neutron.position.set(30, 0, 0);

  angle += 0.01;
  electron1.position.set(-e11, 0, e12);

  angle += 0.01;
  electron2.position.set(e11, 0, e12);

  // angle += 0.01;

  // atom.update(angle);
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
