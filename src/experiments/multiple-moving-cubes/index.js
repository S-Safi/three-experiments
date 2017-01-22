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
let geometry;
let geometry2;
let geometry3;
let geometry4;
let material;
let material2;
let material3;
let material4;
let mesh;
let mesh2;
let mesh3;
let mesh4;
let controls;
let pointLight;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  geometry = new THREE.BoxGeometry(25, 25, 25);
  geometry2 = new THREE.BoxGeometry(25, 25, 25);
  geometry3 = new THREE.BoxGeometry(25, 25, 25);
  geometry4 = new THREE.BoxGeometry(25, 25, 25);
  material = new THREE.MeshNormalMaterial();
  material2 = new THREE.MeshNormalMaterial();
  material3 = new THREE.MeshNormalMaterial();
  material4 = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh2 = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);

  mesh3 = new THREE.Mesh(geometry3, material3);
  scene.add(mesh3);

  mesh4 = new THREE.Mesh(geometry4, material4);
  scene.add(mesh4);

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

function update() {
  angle += 0.01
  const y = Math.sin(angle) * 20;
  mesh.position.set(y, y, y);

  angle += 0.01
  const y2 = Math.sin(angle) * 10;
  mesh2.position.set(-y2, y2, y2);

  angle += 0.01
  const y3 = Math.sin(angle) * 30;
  mesh3.position.set(y3, y3, -y3);

  angle += 0.01
  const y4 = Math.sin(angle) * 40;
  mesh4.position.set(-y4, y3, -y2);

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
