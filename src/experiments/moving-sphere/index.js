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
let geometry;
let material;
let mesh;
let controls;
let pointLight;
let ambientLight;

let prevTime = Date.now();
let r = 10;

const origin = new THREE.Vector3(0, 0, 0);

const bot = new Bot({
  name: 'Bot',
  radius: r,
  color: 0xaa33aa,
  speed: 70,
  boundary: {
    x1: -50,
    x2: 50,
    z1: -50,
    z2: 50,
  }
});

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  // geometry = new THREE.SphereGeometry(r, 64, 64);
  // material = new THREE.MeshNormalMaterial();
  //
  // mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(0, r, 0);
  // scene.add(mesh);

  scene.add(bot);

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

let angle = 0;

function animate() {
  // angle += 0.01  // const x = 1 / Math.sin(angle) * 20;
  // console.log(x);
  // mesh.position.set(x, 1 / Math.tan(angle) * 20, 1 / Math.cos(angle) * 20);

  const time = Date.now();
  const delta = time - prevTime;
  prevTime = time;
  bot.update(delta);

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}

init();
animate();
