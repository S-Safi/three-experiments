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
let material;
let material2;
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
  camera.position.set(0, 50, 200);
  camera.lookAt(origin);

  geometry = new THREE.BoxGeometry(25, 25, 25);
  geometry2 = new THREE.BoxGeometry(12.5, 12.5, 12.5)
  material = new THREE.MeshNormalMaterial();
  material2 = new THREE.MeshStandardMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh2 = new THREE.Mesh(geometry, material);
  scene.add(mesh2);

  mesh3 = new THREE.Mesh(geometry, material);
  scene.add(mesh3);

  mesh4 = new THREE.Mesh(geometry2, material2);
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
  const cos = Math.cos(angle) * 25;
  mesh.position.set(-50, cos, 0);
  controls.update();

  const sin = Math.sin(angle) * 25;
  mesh2.position.set(sin, 50, 0);

  mesh3.position.set(sin, cos, 0);

  const tan = Math.tan(angle) * 75;
  mesh4.position.set(sin, cos, tan);
//  console.log(tan);
}

function render() {
  renderer.render(scene, camera);
};

function tick () {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
