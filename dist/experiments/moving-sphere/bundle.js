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

	var _bot = __webpack_require__(10);

	var _bot2 = _interopRequireDefault(_bot);

	var _perimeter = __webpack_require__(11);

	var _perimeter2 = _interopRequireDefault(_perimeter);

	var _circleTarget = __webpack_require__(12);

	var _circleTarget2 = _interopRequireDefault(_circleTarget);

	var _stationary = __webpack_require__(13);

	var _stationary2 = _interopRequireDefault(_stationary);

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
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;

	var prevTime = Date.now();

	var origin = new THREE.Vector3(0, 0, 0);

	var bots = [];

	var bot1 = new _bot2.default({
	  name: 'Bot 1',
	  radius: 10,
	  color: '#0000ff'
	});
	bots.push(bot1);

	var bot2 = new _bot2.default({
	  name: 'Bot 2',
	  radius: 10,
	  color: '#ff0000'
	});
	bots.push(bot2);

	var bot3 = new _bot2.default({
	  name: 'Bot 3',
	  radius: 10,
	  color: '#ff0000'
	});
	bots.push(bot3);

	var bot4 = new _bot2.default({
	  name: 'Bot 4',
	  radius: 10,
	  color: '#ff00ff'
	});
	bots.push(bot4);

	var circleMove1 = new _circleTarget2.default({
	  speed: Math.PI,
	  radius: 30,
	  target: bot1
	});

	var circleMove2 = new _circleTarget2.default({
	  speed: Math.PI / 2,
	  radius: 60,
	  target: bot3
	});

	var circleMove3 = new _circleTarget2.default({
	  speed: Math.PI / 4,
	  radius: 90,
	  target: bot2
	});

	var nomove1 = new _stationary2.default({
	  point: new THREE.Vector3(0, 0, 0)
	});

	bot1.move = circleMove2;

	bot2.move = circleMove1;

	bot3.move = nomove1;
	bot3.position.set(0, 0, 0);

	bot4.move = circleMove3;

	function init() {
	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(200, 10);
	  scene.add(gridHelper);

	  axesHelper = new THREE.AxesHelper(100);
	  scene.add(axesHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  bots.forEach(function (bot) {
	    return scene.add(bot);
	  });

	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0x0000ff, 1, 1000);
	  pointLight.position.set(100, 100, 100);
	  scene.add(pointLight);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	// let angle = 0;

	function update() {
	  var time = Date.now();
	  var delta = time - prevTime;
	  prevTime = time;

	  bots.forEach(function (bot) {
	    return bot.update(delta);
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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
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

	  function Bot(props) {
	    _classCallCheck(this, Bot);

	    var _this = _possibleConstructorReturn(this, (Bot.__proto__ || Object.getPrototypeOf(Bot)).call(this));

	    var name = props.name,
	        radius = props.radius,
	        color = props.color,
	        move = props.move;


	    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
	    var material = new THREE.MeshBasicMaterial({ color: color });
	    var mesh = new THREE.Mesh(geometry, material);
	    _this.add(mesh);

	    _this.name = name;
	    _this.radius = radius;
	    _this.move = move;
	    return _this;
	  }

	  _createClass(Bot, [{
	    key: "update",
	    value: function update(delta) {
	      var moveVector = this.move.getMoveVector(this.position, delta);
	      this.position.add(moveVector);
	    }
	  }]);

	  return Bot;
	}(THREE.Object3D);

	exports.default = Bot;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Perimeter = function () {
	  function Perimeter(_ref) {
	    var speed = _ref.speed,
	        boundary = _ref.boundary;

	    _classCallCheck(this, Perimeter);

	    this.speed = speed;

	    this.targetPositions = boundary;
	    this.targetPositionIndex = -1;
	    this.targetPosition = null;
	  }

	  _createClass(Perimeter, [{
	    key: "getMoveVector",
	    value: function getMoveVector(currentPosition, delta) {
	      if (!this.targetPosition) {
	        this.targetPositionIndex = 1;
	        this.targetPosition = this.targetPositions[this.targetPositionIndex];
	        return this.targetPositions[0];
	      }

	      var distanceToMove = delta / 1000 * this.speed;
	      var vectorToTarget = this.targetPosition.clone().sub(currentPosition);
	      var distanceToTarget = currentPosition.distanceTo(this.targetPosition);

	      var moveVector = void 0;
	      if (distanceToMove >= distanceToTarget) {
	        moveVector = vectorToTarget;
	        this.targetPositionIndex = (this.targetPositionIndex + 1) % this.targetPositions.length;
	        this.targetPosition = this.targetPositions[this.targetPositionIndex];
	      } else {
	        moveVector = vectorToTarget.normalize().multiplyScalar(distanceToMove);
	      }
	      return moveVector;
	    }
	  }]);

	  return Perimeter;
	}();

	exports.default = Perimeter;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Circle = function () {
	  function Circle(_ref) {
	    var speed = _ref.speed,
	        radius = _ref.radius,
	        target = _ref.target;

	    _classCallCheck(this, Circle);

	    this.speed = speed;
	    this.radius = radius;
	    this.target = target;
	    this.angle = 0;
	  }

	  _createClass(Circle, [{
	    key: "getMoveVector",
	    value: function getMoveVector(currentPosition, delta) {
	      var angleToMove = delta / 1000 * this.speed;
	      this.angle = this.angle + angleToMove;

	      var x = this.radius * Math.cos(this.angle);
	      var z = this.radius * Math.sin(this.angle);
	      var y = 0;

	      var targetPosition = new THREE.Vector3(this.target.position.x + x, this.target.position.y + y, this.target.position.z + z);

	      var moveVector = targetPosition.clone().sub(currentPosition);

	      return moveVector;
	    }
	  }]);

	  return Circle;
	}();

	exports.default = Circle;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* eslint class-methods-use-this: off */

	var zero = new THREE.Vector3();

	var Stationary = function () {
	  function Stationary() {
	    _classCallCheck(this, Stationary);
	  }

	  _createClass(Stationary, [{
	    key: "getMoveVector",
	    value: function getMoveVector() {
	      return zero;
	    }
	  }]);

	  return Stationary;
	}();

	exports.default = Stationary;

/***/ })
/******/ ]);