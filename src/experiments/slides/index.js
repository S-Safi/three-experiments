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
let controls;
let pointLight;
let ambientLight;
let keyboard;
let axis;
let animateRotation = 0;
let animateDirection = 0;
let material1;
let material2;
let material3;
let material4;
let nextTexture = 0;
const SPEED = (Math.PI / 2) / 60;

const key = {
  LEFT: 'A',
  RIGHT: 'D',
};

const slides = [
  '../../assets/textures/slides/bheevik.jpg',
  '../../assets/textures/slides/Capture.jpg',
  '../../assets/textures/slides/Capture1.jpg',
  '../../assets/textures/slides/diagram.png',
  '../../assets/textures/slides/scienc.jpg',
];

const textureLoader = new THREE.TextureLoader();
const textures = slides.map(slide => textureLoader.load(slide));

let currentTexture = 0;

function init() {
  scene = new THREE.Scene();

  keyboard = new KeyboardState();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);

  const distance = 150;

  const markerGeometry = new THREE.SphereGeometry(5);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.setY(60);

  axis = new THREE.Object3D();

  geometry = new THREE.PlaneGeometry(100, 100);

  const texture1 = textures[0];
  material1 = new THREE.MeshBasicMaterial({ map: texture1 });
  const plane1 = new THREE.Mesh(geometry, material1);
  plane1.add(marker);
  plane1.position.setZ(-distance);
  axis.add(plane1);

  const texture2 = textures[1];
  material2 = new THREE.MeshBasicMaterial({ map: texture2 });
  const plane2 = new THREE.Mesh(geometry, material2);
  plane2.position.set(distance, 0, 0);
  plane2.rotateY(-Math.PI / 2);
  axis.add(plane2);

  const texture3 = textures[2];
  material3 = new THREE.MeshBasicMaterial({ map: texture3 });
  const plane3 = new THREE.Mesh(geometry, material3);
  plane3.position.set(0, 0, distance);
  plane3.rotateY(-Math.PI);
  axis.add(plane3);

  const texture4 = textures[3];
  material4 = new THREE.MeshBasicMaterial({ map: texture4 });
  const plane4 = new THREE.Mesh(geometry, material4);
  plane4.position.set(-distance, 0, 0);
  plane4.rotateY(Math.PI / 2);
  axis.add(plane4);

  scene.add(axis);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  keyboard.update();


  if (animateDirection === 0) {
    if (keyboard.pressed(key.LEFT)) {
      /* axis.rotation.y -= Math.PI / 2;*/
      animateDirection = -1;
      nextTexture = (currentTexture - 1) % textures.length;
    }
    if (keyboard.pressed(key.RIGHT)) {
      animateDirection = 1;
      nextTexture = (currentTexture + 1) % textures.length;
    }
  } else {
    const distance = SPEED * animateDirection;
    animateRotation += distance;
    if (animateRotation < -Math.PI / 2 || animateRotation > Math.PI / 2) {
      animateDirection = 0;
      animateRotation = 0;
      currentTexture = nextTexture;
      nextTexture = 0;

      material1.map = textures[currentTexture];
      material2.map = textures[(currentTexture + 1) % textures.length];
      material3.map = textures[(currentTexture + 2) % textures.length];
      material4.map = textures[(currentTexture - 1) % textures.length];
      axis.rotation.y = 0;
    } else {
      axis.rotation.y += distance;
    }
  }

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
