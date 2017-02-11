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
let venusGeometry;
let earthGeometry;
let marsGeometry;
let jupiterGeometry;
let saturnGeometry;
let uranusGeometry;
let neptuneGeometry;
let sunMaterial;
let venusMaterial;
let earthMaterial;
let marsMaterial;
let jupiterMaterial;
let saturnMaterial;
let uranusMaterial;
let neptuneMaterial;
let sun;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;
let controls;
let ambientLight;

const mercuryOrbitRadius = 200;
const mercurySpeed = (Math.PI * 2) / (360 * 2);
let mercuryAngle = 0;
let mercuryX = 0;
let mercuryY = 0;

const venusOrbitRadius = 300;
const venusRadius = 20;
const venusSpeed = (Math.PI * 2) / (360 * 3);
let venusAngle = 0;
let venusX = 0;
let venusY = 0;

const earthOrbitRadius = 400;
const earthRadius = 40;
const earthSpeed = (Math.PI * 2) / (360 * 4);
let earthAngle = 0;
let earthX = 0;
let earthY = 0;

const marsOrbitRadius = 500;
const marsRadius = 30;
const marsSpeed = (Math.PI * 2) / (360 * 5);
let marsAngle = 0;
let marsX = 0;
let marsY = 0;

const jupiterOrbitRadius = 700;
const jupiterRadius = 90;
const jupiterSpeed = (Math.PI * 2) / (360 * 6);
let jupiterAngle = 0;
let jupiterX = 0;
let jupiterY = 0;

const saturnOrbitRadius = 900;
const saturnRadius = 80;
const saturnSpeed = (Math.PI * 2) / (360 * 7);
let saturnAngle = 0;
let saturnX = 0;
let saturnY = 0;


const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 3000);
  camera.lookAt(origin);

  const axisHelper = new THREE.AxisHelper(500);
  scene.add(axisHelper);

  sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
  earthGeometry = new THREE.SphereBufferGeometry(earthRadius, 16, 16);
  marsGeometry = new THREE.SphereBufferGeometry(marsRadius, 16, 16);
  jupiterGeometry = new THREE.SphereBufferGeometry(jupiterRadius, 16, 16);
  saturnGeometry = new THREE.SphereBufferGeometry(saturnRadius, 16, 16);
  uranusGeometry = new THREE.SphereBufferGeometry(70, 16, 16);
  neptuneGeometry = new THREE.SphereBufferGeometry(60, 16, 16);
  sunMaterial = new THREE.MeshLambertMaterial();
  earthMaterial = new THREE.MeshLambertMaterial();
  marsMaterial = new THREE.MeshLambertMaterial();
  jupiterMaterial = new THREE.MeshLambertMaterial();
  saturnMaterial = new THREE.MeshLambertMaterial();
  uranusMaterial = new THREE.MeshLambertMaterial();
  neptuneMaterial = new THREE.MeshLambertMaterial();

  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  mercury = new Planet({ radius: 10, color: 0x666666 });
  scene.add(mercury);

  venus = new Planet({ radius: 20, color: 0xffff00 });
  scene.add(venus);

  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  mars = new THREE.Mesh(marsGeometry, marsMaterial);
  scene.add(mars);

  jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
  scene.add(jupiter);

  saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
  scene.add(saturn);
  //
  // uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
  // scene.add(uranus);
  //
  // neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
  // scene.add(neptune);

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
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
  const y3 = Math.cos(angle) * 400;
  const y4 = Math.cos(angle) * 500;
  const y5 = Math.cos(angle) * 600;
  const y6 = Math.cos(angle) * 700;
  const y7 = Math.cos(angle) * 800;
  const y8 = Math.cos(angle) * 900;
  const y9 = Math.cos(angle) * 1000;

  mercuryX = mercuryOrbitRadius * Math.cos(mercuryAngle);
  mercuryY = mercuryOrbitRadius * Math.sin(mercuryAngle);
  mercuryAngle += mercurySpeed;
  mercury.position.set(mercuryX, mercuryY, 0);

  venusX = venusOrbitRadius * Math.cos(venusAngle);
  venusY = venusOrbitRadius * Math.sin(venusAngle);
  venusAngle += venusSpeed;
  venus.position.set(venusX, venusY, 0);

  earthX = earthOrbitRadius * Math.cos(earthAngle);
  earthY = earthOrbitRadius * Math.sin(earthAngle);
  earthAngle += earthSpeed;
  earth.position.set(earthX, earthY, 0);

  marsX = marsOrbitRadius * Math.cos(marsAngle);
  marsY = marsOrbitRadius * Math.sin(marsAngle);
  marsAngle += marsSpeed;
  mars.position.set(marsX, marsY, 0);

  jupiterX = jupiterOrbitRadius * Math.cos(jupiterAngle);
  jupiterY = jupiterOrbitRadius * Math.sin(jupiterAngle);
  jupiterAngle += jupiterSpeed;
  jupiter.position.set(jupiterX, jupiterY, 0);

  saturnX = saturnOrbitRadius * Math.cos(saturnAngle);
  saturnY = saturnOrbitRadius * Math.sin(saturnAngle);
  saturnAngle += saturnSpeed;
  saturn.position.set(saturnX, saturnY, 0);
  //
  // angle += 0.01;
  // uranus.position.set(-y6, 0, y8);
  //
  // angle += 0.01;
  // neptune.position.set(-y7, 0, y9);

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
