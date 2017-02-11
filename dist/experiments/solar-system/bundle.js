/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Planet = __webpack_require__(1);

	var _Planet2 = _interopRequireDefault(_Planet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var sunGeometry = void 0;
	var venusGeometry = void 0;
	var earthGeometry = void 0;
	var marsGeometry = void 0;
	var jupiterGeometry = void 0;
	var saturnGeometry = void 0;
	var uranusGeometry = void 0;
	var neptuneGeometry = void 0;
	var sunMaterial = void 0;
	var venusMaterial = void 0;
	var earthMaterial = void 0;
	var marsMaterial = void 0;
	var jupiterMaterial = void 0;
	var saturnMaterial = void 0;
	var uranusMaterial = void 0;
	var neptuneMaterial = void 0;
	var sun = void 0;
	var mercury = void 0;
	var venus = void 0;
	var earth = void 0;
	var mars = void 0;
	var jupiter = void 0;
	var saturn = void 0;
	var uranus = void 0;
	var neptune = void 0;
	var controls = void 0;
	var ambientLight = void 0;

	var mercuryOrbitRadius = 200;
	var mercurySpeed = Math.PI * 2 / (360 * 2);
	var mercuryAngle = 0;
	var mercuryX = 0;
	var mercuryY = 0;

	var venusOrbitRadius = 300;
	var venusRadius = 20;
	var venusSpeed = Math.PI * 2 / (360 * 3);
	var venusAngle = 0;
	var venusX = 0;
	var venusY = 0;

	var earthOrbitRadius = 400;
	var earthRadius = 40;
	var earthSpeed = Math.PI * 2 / (360 * 4);
	var earthAngle = 0;
	var earthX = 0;
	var earthY = 0;

	var marsOrbitRadius = 500;
	var marsRadius = 30;
	var marsSpeed = Math.PI * 2 / (360 * 5);
	var marsAngle = 0;
	var marsX = 0;
	var marsY = 0;

	var jupiterOrbitRadius = 700;
	var jupiterRadius = 90;
	var jupiterSpeed = Math.PI * 2 / (360 * 6);
	var jupiterAngle = 0;
	var jupiterX = 0;
	var jupiterY = 0;

	var saturnOrbitRadius = 900;
	var saturnRadius = 80;
	var saturnSpeed = Math.PI * 2 / (360 * 7);
	var saturnAngle = 0;
	var saturnX = 0;
	var saturnY = 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 0, 3000);
	  camera.lookAt(origin);

	  var axisHelper = new THREE.AxisHelper(500);
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

	  mercury = new _Planet2.default({ radius: 10, color: 0x666666 });
	  scene.add(mercury);

	  venus = new _Planet2.default({ radius: 20, color: 0xffff00 });
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

	  var loader = new THREE.TextureLoader();

	  // load a resource
	  loader.load(
	  // resource URL
	  '../../assets/textures/planets/earth.jpg',
	  // Function when resource is loaded
	  function (texture) {
	    console.log(texture);
	    earthMaterial.map = texture;
	    earthMaterial.needsUpdate = true;
	  });

	  // load a resource
	  loader.load(
	  // resource URL
	  '../../assets/textures/planets/sun.jpg',
	  // Function when resource is loaded
	  function (texture) {
	    console.log(texture);
	    sunMaterial.map = texture;
	    sunMaterial.needsUpdate = true;
	  });
	}

	var angle = 0;

	function update() {
	  var y = Math.sin(angle) * 300;
	  var y2 = Math.cos(angle) * 300;
	  var y3 = Math.cos(angle) * 400;
	  var y4 = Math.cos(angle) * 500;
	  var y5 = Math.cos(angle) * 600;
	  var y6 = Math.cos(angle) * 700;
	  var y7 = Math.cos(angle) * 800;
	  var y8 = Math.cos(angle) * 900;
	  var y9 = Math.cos(angle) * 1000;

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Planet = function (_THREE$Object3D) {
	  _inherits(Planet, _THREE$Object3D);

	  function Planet(props) {
	    _classCallCheck(this, Planet);

	    //  this.radius = props.radius;
	    var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this));

	    var geometry = new THREE.SphereBufferGeometry(props.radius, 16, 16);
	    var material = new THREE.MeshStandardMaterial({ color: props.color });
	    var mesh = new THREE.Mesh(geometry, material);
	    _this.add(mesh);
	    return _this;
	  }

	  return Planet;
	}(THREE.Object3D);

	exports.default = Planet;

/***/ }
/******/ ]);