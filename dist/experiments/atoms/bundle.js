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

	var _Nucleus = __webpack_require__(1);

	var _Nucleus2 = _interopRequireDefault(_Nucleus);

	var _Atom = __webpack_require__(4);

	var _Atom2 = _interopRequireDefault(_Atom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Electron from './Electron';
	// import Proton from './Proton';
	// import Neutron from './Neutron';
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
	var nucleus = void 0;
	// let electron;
	var atom = void 0;
	var controls = void 0;
	var ambientLight = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(300, 300, 300);
	  camera.lookAt(origin);

	  nucleus = new _Nucleus2.default(6, 6);
	  scene.add(nucleus);

	  // neutron = new Neutron();
	  // scene.add(neutron);

	  atom = new _Atom2.default(nucleus, 6);
	  scene.add(atom);

	  ambientLight = new THREE.AmbientLight(0xffffff);
	  scene.add(ambientLight);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	var angle = 0;

	function update() {
	  // const y = Math.sin(angle) * 300;
	  // const y2 = Math.cos(angle) * 300;

	  // angle += 0.01;
	  // proton.position.set(0, 0, 0);
	  //
	  // angle += 0.01;
	  // neutron.position.set(30, 0, 0);

	  // angle += 0.01;
	  // electron.position.set(-y, 0, y2);

	  angle += 0.01;

	  atom.update(angle);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Proton = __webpack_require__(2);

	var _Proton2 = _interopRequireDefault(_Proton);

	var _Neutron = __webpack_require__(3);

	var _Neutron2 = _interopRequireDefault(_Neutron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Nucleus = function (_THREE$Object3D) {
	  _inherits(Nucleus, _THREE$Object3D);

	  function Nucleus(protonCount, neutronCount) {
	    _classCallCheck(this, Nucleus);

	    var _this = _possibleConstructorReturn(this, (Nucleus.__proto__ || Object.getPrototypeOf(Nucleus)).call(this));

	    _this.protons = [];
	    _this.neutrons = [];
	    _this.addProtons(protonCount);
	    _this.addNeutrons(neutronCount);
	    return _this;
	  }

	  _createClass(Nucleus, [{
	    key: 'addProtons',
	    value: function addProtons(count) {
	      for (var n = 0; n < count; n += 1) {
	        var proton = new _Proton2.default();
	        proton.position.x = n * 120;
	        this.protons.push(proton);
	        this.add(proton);
	      }
	    }
	  }, {
	    key: 'addNeutrons',
	    value: function addNeutrons(count) {
	      for (var n = 0; n < count; n += 1) {
	        var neutron = new _Neutron2.default();
	        neutron.position.x = n * 120 + 60;
	        this.neutrons.push(neutron);
	        this.add(neutron);
	      }
	    }
	  }]);

	  return Nucleus;
	}(THREE.Object3D);

	exports.default = Nucleus;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Electron = __webpack_require__(5);

	var _Electron2 = _interopRequireDefault(_Electron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Atom = function (_THREE$Object3D) {
	  _inherits(Atom, _THREE$Object3D);

	  function Atom(nucleus, electronCount) {
	    _classCallCheck(this, Atom);

	    var _this = _possibleConstructorReturn(this, (Atom.__proto__ || Object.getPrototypeOf(Atom)).call(this));

	    _this.electrons = [];
	    _this.add(nucleus);
	    _this.addElectrons(electronCount);
	    return _this;
	  }

	  _createClass(Atom, [{
	    key: 'addElectrons',
	    value: function addElectrons(count) {
	      for (var n = 0; n < count; n += 1) {
	        var electron = new _Electron2.default();
	        electron.position.z = n * 25;
	        this.electrons.push(electron);
	        this.add(electron);
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(angle) {
	      for (var i = 0; i < this.electrons.length; i += 1) {
	        var z = Math.sin(angle) * i * 100;
	        var x = Math.cos(angle) * i * 100;
	        this.electrons[i].position.set(x, 0, z);
	      }
	    }
	  }]);

	  return Atom;
	}(THREE.Object3D);

	exports.default = Atom;

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);