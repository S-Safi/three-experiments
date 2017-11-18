const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 0.1;
const FAR = 20000;
const size = 100;

let controls;
let renderer;
let scene;
let camera;

const origin = new THREE.Vector3(0, 0, 0);

function renderGridHelper() {
  const gridHelper = new THREE.GridHelper(size, 10);
  scene.add(gridHelper);
}

function renderAxisHelper() {
  const axisHelper = new THREE.AxisHelper(size);
  scene.add(axisHelper);
}

function renderArrowHelper(v) {
  const arrowDir = v.normalize();
  const arrowLength = size;
  const arrowColor = 0x0000ff;
  const headLength = 10;
  const headWidth = 10;
  const arrowHelper = new THREE.ArrowHelper(
    arrowDir,
    origin,
    arrowLength,
    arrowColor,
    headLength,
    headWidth,
  );

  scene.add(arrowHelper);
}

function renderVectors(vectors) {
  let previousVector = origin;
  for (let i = 0; i < vectors.length; i += 1) {
    const vector = vectors[i];
    const vectorNormal = vector.clone().normalize();
    const arrow = new THREE.ArrowHelper(vectorNormal, previousVector, vector.length());
    scene.add(arrow);
    previousVector = previousVector.add(vector);
  }
}

function randomNumberInRange(min, max) {
  const scale = max - min;
  const offset = min;
  return Math.random() * scale + offset;
}

function randomNumber() {
  return randomNumberInRange(-10, 10);
}

function randomVector() {
  return new THREE.Vector3(randomNumber(), randomNumber(), randomNumber());
}

function init() {
  scene = new THREE.Scene();

  renderGridHelper();
  renderAxisHelper();

  const vectors = [];
  const numberOfVectors = 999;

  for (let n = 1; n <= numberOfVectors; n += 1) {
    const vector = randomVector();
    vectors.push(vector);
  }

  renderVectors(vectors);
  // const v2 = new THREE.Vector3(0, 1, 0);
  // const v3 = v1.addScaledVector(v2, 7);
  // console.log(v3);
  //
  // renderArrowHelper(v3);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();
animate();
