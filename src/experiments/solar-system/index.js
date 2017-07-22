import Planet from './Planet';
import Star from './Star';
import entities from './entities';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let sun;
let controls;
let ambientLight;

const planets = [];

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 1000, 1200);

  sun = new Star({
    radius: 1300,
    color: 0xffffff,
    texture: '../../assets/textures/planets/phil.jpg',
  });

  scene.add(sun);

  entities.forEach((props) => {
    const planet = new Planet(props);
    planets.push(planet);
    scene.add(planet);
  });

  ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  planets.forEach((planet) => {
    planet.update();
  });

  sun.rotation.y += 0.1;
  // sun.rotation.x += 0.1;
  // sun.rotation.z += 0.1;

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
