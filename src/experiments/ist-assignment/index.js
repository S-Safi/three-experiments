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
let pointLight;
let ambientLight;
let keyboard;
let slides;

const key = {
  LEFT: 'A',
  RIGHT: 'D',
};
const viewPoint = new THREE.Vector3(0, 100, 0);

function init() {
  keyboard = new KeyboardState();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const geometry = new THREE.BoxGeometry(100, 50, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
  const material1 = new THREE.MeshLambertMaterial({ color: 0x888888 });
  slides = new THREE.Mesh(geometry, material);
  const slide1 = new THREE.Mesh(geometry, material1);
  slide1.position.set(-110, 0, 0);

  const loader = new THREE.TextureLoader();

  loader.load(
    './textures/bheevik.jpg',
    (texture) => {
      material.map = texture;
      material.needsUpdate = true;
    },
  );

  loader.load(
    './textures/diagram.png',
    (texture) => {
      material1.map = texture;
      material1.needsUpdate = true;
    },
  );


  slides.add(slide1);

  scene.add(slides);
  slides.position.y = 100;

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, -50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 100, -100);
  camera.lookAt(viewPoint);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  keyboard.update();
  // keyboard.debug();

  if (keyboard.pressed(key.LEFT)) { slides.position.x -= 2; }
  if (keyboard.pressed(key.RIGHT)) { slides.position.x += 2; }
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
