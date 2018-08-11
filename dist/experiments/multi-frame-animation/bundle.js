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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _bot = __webpack_require__(14);

	var _bot2 = _interopRequireDefault(_bot);

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
	var axesHelper = void 0;
	var gridHelper = void 0;
	var bot = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axesHelper = new THREE.AxisHelper(100);
	  scene.add(axesHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  bot = new _bot2.default();
	  scene.add(bot);

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
	  controls.update();
	  bot.update();
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

/***/ 14:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bot = function (_THREE$Object3D) {
	    _inherits(Bot, _THREE$Object3D);

	    function Bot() {
	        _classCallCheck(this, Bot);

	        var _this = _possibleConstructorReturn(this, (Bot.__proto__ || Object.getPrototypeOf(Bot)).call(this));

	        var bodySize = new THREE.Vector3(15, 50, 30);
	        var headSize = new THREE.Vector3(bodySize.x, bodySize.y / 4, bodySize.z);
	        var armSize = new THREE.Vector3(bodySize.x / 2, bodySize.y * 3 / 5, bodySize.z / 4);
	        var legSize = new THREE.Vector3(bodySize.x * 2 / 3, bodySize.y * 7 / 10, bodySize.z / 3);

	        var headPosition = new THREE.Vector3(0, bodySize.y / 2 + headSize.y / 2 + 1, 0);

	        var armJoint1Position = new THREE.Vector3(0, bodySize.y / 2, bodySize.z * 2 / 3);

	        var armJoint2Position = new THREE.Vector3(0, bodySize.y / 2, -(bodySize.z * 2 / 3));

	        var armPosition = new THREE.Vector3(0, armSize.y / 2, 0);

	        var legJoint1Position = new THREE.Vector3(0, -(bodySize.y / 2), bodySize.z / 4);

	        var legJoint2Position = new THREE.Vector3(0, -(bodySize.y / 2), -(bodySize.z / 4));

	        var legPosition = new THREE.Vector3(0, -(legSize.y / 2), 0);

	        var material = new THREE.MeshLambertMaterial({ color: 0x888888 });
	        var armGeometry = new THREE.BoxGeometry(armSize.x, armSize.y, armSize.z);
	        var legGeometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);

	        var bodyGeometry = new THREE.BoxGeometry(bodySize.x, bodySize.y, bodySize.z);
	        _this.body = new THREE.Mesh(bodyGeometry, material);

	        var headGeometry = new THREE.BoxGeometry(headSize.x, headSize.y, headSize.z);
	        _this.head = new THREE.Mesh(headGeometry, material);
	        _this.head.position.copy(headPosition);

	        _this.arm1Joint = new THREE.Object3D();
	        _this.arm1Joint.position.copy(armJoint1Position);

	        _this.arm1 = new THREE.Mesh(armGeometry, material);
	        _this.arm1.position.copy(armPosition);
	        _this.arm1Joint.add(_this.arm1);

	        _this.arm2Joint = new THREE.Object3D();
	        _this.arm2Joint.position.copy(armJoint2Position);

	        _this.arm2 = new THREE.Mesh(armGeometry, material);
	        _this.arm2.position.copy(armPosition);
	        _this.arm2Joint.add(_this.arm2);

	        _this.leg1Joint = new THREE.Object3D();
	        _this.leg1Joint.position.copy(legJoint1Position);

	        _this.leg1 = new THREE.Mesh(legGeometry, material);
	        _this.leg1.position.copy(legPosition);
	        _this.leg1Joint.add(_this.leg1);

	        _this.leg2Joint = new THREE.Object3D();
	        _this.leg2Joint.position.copy(legJoint2Position);

	        _this.leg2 = new THREE.Mesh(legGeometry, material);
	        _this.leg2.position.copy(legPosition);
	        _this.leg2Joint.add(_this.leg2);

	        _this.add(_this.body);
	        _this.add(_this.head);
	        _this.add(_this.arm1Joint);
	        _this.add(_this.arm2Joint);
	        _this.add(_this.leg1Joint);
	        _this.add(_this.leg2Joint);
	        return _this;
	    }

	    _createClass(Bot, [{
	        key: "update",
	        value: function update() {
	            this.arm1Joint.rotation.z += 0.05;
	            this.arm2Joint.rotation.z -= 0.05;
	            this.head.rotation.y += 0.05;
	            this.leg1Joint.rotation.z -= 0.05;
	            this.leg2Joint.rotation.z += 0.05;
	        }
	    }]);

	    return Bot;
	}(THREE.Object3D);

	exports.default = Bot;

/***/ })

/******/ });