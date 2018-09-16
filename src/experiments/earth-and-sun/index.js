const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let sunGeometry;
let earthGeometry;
let sunMaterial;
let earthMaterial;
let sun;
let earth;
let controls;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();
// yeet
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(300, 300, 300);
  camera.lookAt(origin);

  sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
  earthGeometry = new THREE.SphereBufferGeometry(25, 16, 16);
  sunMaterial = new THREE.MeshLambertMaterial();
  earthMaterial = new THREE.MeshLambertMaterial();

  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();

  // load a resource
  loader.load(
    // resource URL
    '../../assets/textures/planets/earth.jpg',
    // Function when resource is loaded
    (texture) => {
      console.log(texture);
      earthMaterial.map = texture;
      earthMaterial.needsUpdate = true;
    },
  );

  // load a resource
  loader.load(
    // resource URL
    '../../assets/textures/planets/sun.jpg',
    // Function when resource is loaded
    (texture) => {
      console.log(texture);
      sunMaterial.map = texture;
      sunMaterial.needsUpdate = true;
    },
  );
}

let angle = 0;

function update() {
  const y = Math.sin(angle) * 300;
  const y2 = Math.cos(angle) * 300;

  angle += 0.01;
  sun.position.set(0, 0, 0);

  angle += 0.01;
  earth.position.set(-y, 0, y2);

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
