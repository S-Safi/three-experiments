import Planet from './Planet';

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
let sunMaterial;
let sun;
let controls;
let ambientLight;

function randomAngle() {
  return Math.random() * Math.PI * 2;
}

// or
//
// const randomAngle = () => {
//   return Math.random() * Math.PI * 2;
// }
//
// or
//
// const randomAngle = () => Math.random() * Math.PI * 2;

const planets = [];
const planetProps = [];

planetProps.push({
  name: 'mercury',
  orbitRadius: 200,
  radius: 10,
  speed: (Math.PI * 2) / (360 * 2),
  angle: randomAngle(),
  color: 0x666666,
});

planetProps.push({
  name: 'venus',
  orbitRadius: 300,
  radius: 20,
  speed: (Math.PI * 2) / (360 * 3),
  angle: randomAngle(),
  color: 0xffee00,
});

planetProps.push({
  name: 'earth',
  orbitRadius: 400,
  radius: 40,
  speed: (Math.PI * 2) / (360 * 4),
  angle: randomAngle(),
  // color: 0x0000ff,
  texture: '../../assets/textures/planets/earth.jpg',
});

planetProps.push({
  name: 'mars',
  orbitRadius: 600,
  radius: 30,
  speed: (Math.PI * 2) / (360 * 5),
  angle: randomAngle(),
  color: 0xff0000,
});

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 3000);
  camera.lookAt(origin);

  const axisHelper = new THREE.AxisHelper(500);
  scene.add(axisHelper);

  sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
  sunMaterial = new THREE.MeshLambertMaterial();

  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  planetProps.forEach((props) => {
    const planet = new Planet(props);
    planets.push(planet);
    scene.add(planet);
  });

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();

  // // load a resource
  // loader.load(
  //   // resource URL
  //   '../../assets/textures/planets/earth.jpg',
  //   // Function when resource is loaded
  //   (texture) => {
  //     console.log(texture);
  //     earthMaterial.map = texture;
  //     earthMaterial.needsUpdate = true;
  //   },
  // );

  // load a resource
  loader.load(
    // resource URL
    '../../assets/textures/planets/sun.jpg',
    // Function when resource is loaded
    (texture) => {
      sunMaterial.map = texture;
      sunMaterial.needsUpdate = true;
    },
  );
}

function update() {
  planets.forEach((planet) => {
    planet.update();
  });

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
