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
	var sunMaterial = void 0;
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

	var planets = [];
	var planetProps = [];

	planetProps.push({
	  name: 'mercury',
	  orbitRadius: 200,
	  radius: 10,
	  speed: Math.PI * 2 / (360 * 2),
	  angle: randomAngle(),
	  color: 0x666666
	});

	planetProps.push({
	  name: 'venus',
	  orbitRadius: 300,
	  radius: 20,
	  speed: Math.PI * 2 / (360 * 3),
	  angle: randomAngle(),
	  color: 0xffee00
	});

	planetProps.push({
	  name: 'earth',
	  orbitRadius: 400,
	  radius: 40,
	  speed: Math.PI * 2 / (360 * 4),
	  angle: randomAngle(),
	  // color: 0x0000ff,
	  texture: '../../assets/textures/planets/earth.jpg'
	});

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 0, 3000);
	  camera.lookAt(origin);

	  var axisHelper = new THREE.AxisHelper(500);
	  scene.add(axisHelper);

	  sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
	  sunMaterial = new THREE.MeshLambertMaterial();

	  sun = new THREE.Mesh(sunGeometry, sunMaterial);
	  scene.add(sun);

	  planetProps.forEach(function (props) {
	    var planet = new _Planet2.default(props);
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

	  var loader = new THREE.TextureLoader();

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
	  function (texture) {
	    sunMaterial.map = texture;
	    sunMaterial.needsUpdate = true;
	  });
	}

	function update() {
	  planets.forEach(function (planet) {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var loader = new THREE.TextureLoader();

	var Planet = function (_THREE$Object3D) {
	  _inherits(Planet, _THREE$Object3D);

	  function Planet(props) {
	    _classCallCheck(this, Planet);

	    var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this));

	    _this.props = props;
	    var geometry = new THREE.SphereBufferGeometry(props.radius, 16, 16);
	    var material = new THREE.MeshStandardMaterial({ color: props.color });
	    var mesh = new THREE.Mesh(geometry, material);
	    _this.add(mesh);

	    if (props.texture) {
	      loader.load(
	      // resource URL
	      props.texture,
	      // Function when resource is loaded
	      function (texture) {
	        material.map = texture;
	        material.needsUpdate = true;
	      });
	    }
	    return _this;
	  }

	  _createClass(Planet, [{
	    key: "update",
	    value: function update() {
	      var x = this.props.orbitRadius * Math.cos(this.props.angle);
	      var y = this.props.orbitRadius * Math.sin(this.props.angle);
	      this.props.angle += this.props.speed;
	      this.position.set(x, y, 0);
	    }
	  }]);

	  return Planet;
	}(THREE.Object3D);

	exports.default = Planet;

/***/ }
/******/ ]);