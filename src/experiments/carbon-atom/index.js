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
const electron3 = new Electron(1);
const electron4 = new Electron(1);
const electron5 = new Electron(1);
const electron6 = new Electron(1);

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
  scene.add(electron3);
  scene.add(electron4);
  scene.add(electron5);
  scene.add(electron6);

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
  const e1x = Math.sin(angle) * 50;
  const e1y = Math.cos(angle) * 50;

  const e2x = Math.sin(angle + Math.PI) * 50;
  const e2y = Math.cos(angle + Math.PI) * 50;

  const e3x = Math.sin(angle) * 100;
  const e3y = Math.cos(angle) * 100;

  const e4x = Math.sin(angle + Math.PI / 2) * 100;
  const e4y = Math.cos(angle + Math.PI / 2) * 100;

  const e5x = Math.sin(angle + Math.PI) * 100;
  const e5y = Math.cos(angle + Math.PI) * 100;

  const e6x = Math.sin(angle + Math.PI / 2 + Math.PI) * 100;
  const e6y = Math.cos(angle + Math.PI / 2 + Math.PI) * 100;
  // angle += 0.01;
  // proton.position.set(0, 0, 0);
  //
  // angle += 0.01;
  // neutron.position.set(30, 0, 0);

  angle += 0.01;
  electron1.position.set(-e1x, 0, e1y);

  angle += 0.01;
  electron2.position.set(-e2x, 0, e2y);

  angle += 0.01;
  electron3.position.set(-e3x, 0, e3y);

  angle += 0.01;
  electron4.position.set(-e4x, 0, e4y);

  angle += 0.01;
  electron5.position.set(-e5x, 0, e5y);

  angle += 0.01;
  electron6.position.set(-e6x, 0, e6y);

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
