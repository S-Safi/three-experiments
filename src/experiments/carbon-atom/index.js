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
// let proton;
// let neutron;
// let nucleus;
// let electron;
// let atom;
let geometry;
let material;
let mesh1;
let controls;
let ambientLight;
let pointLight;

const proton1 = new Proton(1);
const proton2 = new Proton(1);
const proton3 = new Proton(1);
const proton4 = new Proton(1);
const proton5 = new Proton(1);
const proton6 = new Proton(1);

const neutron1 = new Neutron(1);
const neutron2 = new Neutron(1);
const neutron3 = new Neutron(1);
const neutron4 = new Neutron(1);
const neutron5 = new Neutron(1);
const neutron6 = new Neutron(1);

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
  camera.position.set(600, 600, 600);
  camera.lookAt(origin);

  geometry = new THREE.BoxGeometry(50, 50, 50);
  material = new THREE.MeshLambertMaterial({ color: 0x888888 });

  mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);
  mesh1.position.set(350, 500, 500);

  scene.add(proton1);
  proton1.position.set(-60, 0, -60);

  scene.add(proton2);
  proton2.position.set(60, 0, -60);

  scene.add(proton3);
  proton3.position.set(-60, 0, 60);

  scene.add(proton4);
  proton4.position.set(60, 0, 60);

  scene.add(proton5);
  proton5.position.set(-20, -30, 20);

  scene.add(proton6);
  proton6.position.set(20, 30, 20);

  scene.add(neutron1);
  neutron1.position.set(60, 0, 0);

  scene.add(neutron2);
  neutron2.position.set(0, 0, 60);

  scene.add(neutron3);
  neutron3.position.set(0, 0, -60);

  scene.add(neutron4);
  neutron4.position.set(-60, 0, 0);

  scene.add(neutron5);
  neutron5.position.set(20, -30, -20);

  scene.add(neutron6);
  neutron6.position.set(-20, 30, -20);

  scene.add(electron1);
  scene.add(electron2);
  scene.add(electron3);
  scene.add(electron4);
  scene.add(electron5);
  scene.add(electron6);

  const shell1 = new Shell({ radius: 200 });
  scene.add(shell1);
  shell1.rotation.x = Math.PI / 2;

  const shell2 = new Shell({ radius: 300 });
  scene.add(shell2);
  shell2.rotation.x = Math.PI / 2;

  ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(400, 550, 500);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();

  // load a resource
  loader.load(
    // resource URL
    '../../assets/textures/planets/key.png',
    // Function when resource is loaded
    (texture) => {
      material.map = texture;
      material.needsUpdate = true;
    },
  );
}

let angle = 0;

function update() {
  const e1x = Math.sin(angle) * 200;
  const e1y = Math.cos(angle) * 200;

  const e2x = Math.sin(angle + Math.PI) * 200;
  const e2y = Math.cos(angle + Math.PI) * 200;

  const e3x = Math.sin(angle) * 300;
  const e3y = Math.cos(angle) * 300;

  const e4x = Math.sin(angle + Math.PI / 2) * 300;
  const e4y = Math.cos(angle + Math.PI / 2) * 300;

  const e5x = Math.sin(angle + Math.PI) * 300;
  const e5y = Math.cos(angle + Math.PI) * 300;

  const e6x = Math.sin(angle + Math.PI / 2 + Math.PI) * 300;
  const e6y = Math.cos(angle + Math.PI / 2 + Math.PI) * 300;

  angle += 10;
  // angle += 0.01;
  // proton.position.set(0, 0, 0);
  //
  // angle += 0.01;
  // neutron.position.set(30, 0, 0);

  electron1.position.set(-e1x, 0, e1y);

  electron2.position.set(-e2x, 0, e2y);

  electron3.position.set(-e3x, 0, e3y);

  electron4.position.set(-e4x, 0, e4y);

  electron5.position.set(-e5x, 0, e5y);

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
