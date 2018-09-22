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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Electron = __webpack_require__(6);

	var _Electron2 = _interopRequireDefault(_Electron);

	var _Proton = __webpack_require__(7);

	var _Proton2 = _interopRequireDefault(_Proton);

	var _Neutron = __webpack_require__(8);

	var _Neutron2 = _interopRequireDefault(_Neutron);

	var _Shell = __webpack_require__(9);

	var _Shell2 = _interopRequireDefault(_Shell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Nucleus from './Nucleus';
	// import Atom from './Atom';

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	// let proton;
	// let neutron;
	// let nucleus;
	// let electron;
	// let atom;
	var geometry = void 0;
	var material = void 0;
	var mesh1 = void 0;
	var controls = void 0;
	var ambientLight = void 0;
	var pointLight = void 0;

	var proton1 = new _Proton2.default(1);
	var proton2 = new _Proton2.default(1);
	var proton3 = new _Proton2.default(1);
	var proton4 = new _Proton2.default(1);
	var proton5 = new _Proton2.default(1);
	var proton6 = new _Proton2.default(1);

	var neutron1 = new _Neutron2.default(1);
	var neutron2 = new _Neutron2.default(1);
	var neutron3 = new _Neutron2.default(1);
	var neutron4 = new _Neutron2.default(1);
	var neutron5 = new _Neutron2.default(1);
	var neutron6 = new _Neutron2.default(1);

	var origin = new THREE.Vector3(0, 0, 0);
	var electron1 = new _Electron2.default(1);
	var electron2 = new _Electron2.default(1);
	var electron3 = new _Electron2.default(1);
	var electron4 = new _Electron2.default(1);
	var electron5 = new _Electron2.default(1);
	var electron6 = new _Electron2.default(1);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(600, 600, 600);
	  camera.lookAt(origin);

	  geometry = new THREE.BoxGeometry(50, 50, 50);
	  material = new THREE.MeshLambertMaterial({ color: 0x888888 });

	  mesh1 = new THREE.Mesh(geometry, material);
	  scene.add(mesh1);
	  mesh1.position.set(350, 500, 500);

	  scene.add(proton1);
	  proton1.position.set(-60, 0, -60);

	  scene.add(proton2);
	  proton2.position.set(60, 0, -60);

	  scene.add(proton3);
	  proton3.position.set(-60, 0, 60);

	  scene.add(proton4);
	  proton4.position.set(60, 0, 60);

	  scene.add(proton5);
	  proton5.position.set(-20, -30, 20);

	  scene.add(proton6);
	  proton6.position.set(20, 30, 20);

	  scene.add(neutron1);
	  neutron1.position.set(60, 0, 0);

	  scene.add(neutron2);
	  neutron2.position.set(0, 0, 60);

	  scene.add(neutron3);
	  neutron3.position.set(0, 0, -60);

	  scene.add(neutron4);
	  neutron4.position.set(-60, 0, 0);

	  scene.add(neutron5);
	  neutron5.position.set(20, -30, -20);

	  scene.add(neutron6);
	  neutron6.position.set(-20, 30, -20);

	  scene.add(electron1);
	  scene.add(electron2);
	  scene.add(electron3);
	  scene.add(electron4);
	  scene.add(electron5);
	  scene.add(electron6);

	  var shell1 = new _Shell2.default({ radius: 200 });
	  scene.add(shell1);
	  shell1.rotation.x = Math.PI / 2;

	  var shell2 = new _Shell2.default({ radius: 300 });
	  scene.add(shell2);
	  shell2.rotation.x = Math.PI / 2;

	  ambientLight = new THREE.AmbientLight(0xffffff);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(400, 550, 500);
	  scene.add(pointLight);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  var loader = new THREE.TextureLoader();

	  // load a resource
	  loader.load(
	  // resource URL
	  '../../assets/textures/planets/key.png',
	  // Function when resource is loaded
	  function (texture) {
	    material.map = texture;
	    material.needsUpdate = true;
	  });
	}

	var angle = 0;

	function update() {
	  var e1x = Math.sin(angle) * 200;
	  var e1y = Math.cos(angle) * 200;

	  var e2x = Math.sin(angle + Math.PI) * 200;
	  var e2y = Math.cos(angle + Math.PI) * 200;

	  var e3x = Math.sin(angle) * 300;
	  var e3y = Math.cos(angle) * 300;

	  var e4x = Math.sin(angle + Math.PI / 2) * 300;
	  var e4y = Math.cos(angle + Math.PI / 2) * 300;

	  var e5x = Math.sin(angle + Math.PI) * 300;
	  var e5y = Math.cos(angle + Math.PI) * 300;

	  var e6x = Math.sin(angle + Math.PI / 2 + Math.PI) * 300;
	  var e6y = Math.cos(angle + Math.PI / 2 + Math.PI) * 300;

	  angle += 10;
	  // angle += 0.01;
	  // proton.position.set(0, 0, 0);
	  //
	  // angle += 0.01;
	  // neutron.position.set(30, 0, 0);

	  electron1.position.set(-e1x, 0, e1y);

	  electron2.position.set(-e2x, 0, e2y);

	  electron3.position.set(-e3x, 0, e3y);

	  electron4.position.set(-e4x, 0, e4y);

	  electron5.position.set(-e5x, 0, e5y);

	  electron6.position.set(-e6x, 0, e6y);

	  // angle += 0.01;

	  // atom.update(angle);
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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Electron = function (_THREE$Mesh) {
	  _inherits(Electron, _THREE$Mesh);

	  function Electron() {
	    _classCallCheck(this, Electron);

	    var geometry = new THREE.SphereBufferGeometry(12.5, 16, 16);
	    var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
	    return _possibleConstructorReturn(this, (Electron.__proto__ || Object.getPrototypeOf(Electron)).call(this, geometry, material));
	  }

	  return Electron;
	}(THREE.Mesh);

	exports.default = Electron;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Proton = function (_THREE$Mesh) {
	  _inherits(Proton, _THREE$Mesh);

	  function Proton() {
	    _classCallCheck(this, Proton);

	    var geometry = new THREE.SphereBufferGeometry(30, 32, 32);
	    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	    return _possibleConstructorReturn(this, (Proton.__proto__ || Object.getPrototypeOf(Proton)).call(this, geometry, material));
	  }

	  return Proton;
	}(THREE.Mesh);

	exports.default = Proton;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Neutron = function (_THREE$Mesh) {
	  _inherits(Neutron, _THREE$Mesh);

	  function Neutron() {
	    _classCallCheck(this, Neutron);

	    var geometry = new THREE.SphereBufferGeometry(30, 32, 32);
	    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	    return _possibleConstructorReturn(this, (Neutron.__proto__ || Object.getPrototypeOf(Neutron)).call(this, geometry, material));
	  }

	  return Neutron;
	}(THREE.Mesh);

	exports.default = Neutron;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Shell = function (_THREE$Line) {
	  _inherits(Shell, _THREE$Line);

	  function Shell(props) {
	    _classCallCheck(this, Shell);

	    var radius = props.radius;

	    var geometry = new THREE.CircleGeometry(radius, 64);
	    geometry.vertices.shift();
	    var material = new THREE.LineBasicMaterial({
	      transparent: true,
	      opacity: 0.5
	    });
	    return _possibleConstructorReturn(this, (Shell.__proto__ || Object.getPrototypeOf(Shell)).call(this, geometry, material));
	  }

	  return Shell;
	}(THREE.Line);

	exports.default = Shell;

/***/ })
/******/ ]);