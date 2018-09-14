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

	var _player = __webpack_require__(14);

	var _player2 = _interopRequireDefault(_player);

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
	var player = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var clock = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  clock = new THREE.Clock();
	  clock.start();

	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axesHelper = new THREE.AxisHelper(100);
	  scene.add(axesHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  player = new _player2.default();
	  scene.add(player);

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
	  var delta = clock.getDelta();
	  controls.update();
	  player.update(delta);
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var botBone = {
	  name: 'body',
	  pivot: [0, 0, 0],
	  boxes: [{
	    size: [32, 64, 16],
	    offset: [0, 0, 0]
	  }],
	  children: [{
	    name: 'head',
	    pivot: [0, 32, 0],
	    boxes: [{
	      name: 'head',
	      size: [32, 32, 32],
	      offset: [0, 16, 0]
	    }, {
	      name: 'eye',
	      size: [24, 8, 4],
	      offset: [0, 16, 16]
	    }],
	    children: []
	  }, {
	    name: 'leftArm',
	    pivot: [24, 32, 0],
	    boxes: [{
	      size: [16, 64, 16],
	      offset: [0, -32, 0]
	    }],
	    children: []
	  }, {
	    name: 'rightArm',
	    pivot: [-24, 32, 0],
	    boxes: [{
	      size: [16, 64, 16],
	      offset: [0, -32, 0]
	    }],
	    children: []
	  }, {
	    name: 'leftLeg',
	    pivot: [8, -32, 0],
	    boxes: [{
	      size: [16, 64, 16],
	      offset: [0, -32, 0]
	    }],
	    children: []
	  }, {
	    name: 'rightLeg',
	    pivot: [-8, -32, 0],
	    boxes: [{
	      size: [16, 64, 16],
	      offset: [0, -32, 0]
	    }],
	    children: []
	  }]
	};

	var ANIMATION_WALKING = 'WALKING';
	var ANIMATION_STANDING = 'STANDING';
	var ANIMATION_RUNNING = 'RUNNING';

	var limbRotationDistance = Math.PI / 6;
	var cyclesPerSecond = 1;

	var Player = function (_THREE$Object3D) {
	  _inherits(Player, _THREE$Object3D);

	  function Player() {
	    _classCallCheck(this, Player);

	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

	    _this.bones = {};
	    _this.addBone(_this, botBone);
	    _this.timeElapsed = 0;
	    _this.stand();

	    setInterval(function () {
	      if (_this.isWalking()) {
	        _this.run();
	      } else {
	        _this.walk();
	      }
	    }, 3000);
	    return _this;
	  }

	  _createClass(Player, [{
	    key: 'addBone',
	    value: function addBone(parent, bone) {
	      var _this2 = this;

	      var pivot = new THREE.Object3D();

	      var _bone$pivot = _slicedToArray(bone.pivot, 3),
	          pivotX = _bone$pivot[0],
	          pivotY = _bone$pivot[1],
	          pivotZ = _bone$pivot[2];

	      pivot.position.set(pivotX, pivotY, pivotZ);

	      var pivotGeometry = new THREE.SphereGeometry(4, 4, 4);
	      var pivotMaterial = new THREE.MeshLambertMaterial({
	        color: 0xffffff
	      });
	      var pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);

	      pivot.add(pivotMesh);

	      var boxMaterial = new THREE.MeshLambertMaterial({
	        color: 0x888888,
	        transparent: true,
	        opacity: 0.8
	      });

	      bone.boxes.forEach(function (box) {
	        var _box$offset = _slicedToArray(box.offset, 3),
	            offsetX = _box$offset[0],
	            offsetY = _box$offset[1],
	            offsetZ = _box$offset[2];

	        var _box$size = _slicedToArray(box.size, 3),
	            sizeX = _box$size[0],
	            sizeY = _box$size[1],
	            sizeZ = _box$size[2];

	        var boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
	        var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	        boxMesh.position.set(offsetX, offsetY, offsetZ);
	        pivot.add(boxMesh);
	      });

	      parent.add(pivot);

	      this.bones[bone.name] = pivot;

	      bone.children.forEach(function (child) {
	        return _this2.addBone(pivot, child);
	      });
	    }
	  }, {
	    key: 'walk',
	    value: function walk() {
	      this.currentAnimation = ANIMATION_WALKING;
	    }
	  }, {
	    key: 'isWalking',
	    value: function isWalking() {
	      return this.currentAnimation === ANIMATION_WALKING;
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      this.currentAnimation = ANIMATION_RUNNING;
	    }
	  }, {
	    key: 'isRunning',
	    value: function isRunning() {
	      return this.currentAnimation === ANIMATION_RUNNING;
	    }
	  }, {
	    key: 'stand',
	    value: function stand() {
	      this.currentAnimation = ANIMATION_STANDING;
	    }
	  }, {
	    key: 'update',
	    value: function update(delta) {
	      this.timeElapsed += delta;
	      switch (this.currentAnimation) {
	        case ANIMATION_WALKING:
	          {
	            var radians = this.timeElapsed * Math.PI * 2 * cyclesPerSecond;
	            var position = Math.cos(radians);
	            var rotation = position * limbRotationDistance;
	            this.bones.rightLeg.rotation.x = -rotation;
	            this.bones.leftLeg.rotation.x = rotation;
	            this.bones.rightArm.rotation.x = rotation;
	            this.bones.leftArm.rotation.x = -rotation;
	            this.bones.head.rotation.y = rotation / 2;
	            break;
	          }
	        case ANIMATION_STANDING:
	          {
	            this.bones.rightLeg.rotation.x = 0;
	            this.bones.leftLeg.rotation.x = 0;
	            this.bones.rightArm.rotation.x = 0;
	            this.bones.leftArm.rotation.x = 0;
	            this.bones.head.rotation.y = 0;
	            break;
	          }
	        case ANIMATION_RUNNING:
	          {
	            var _radians = this.timeElapsed * Math.PI * 2 * cyclesPerSecond * 2;
	            var _position = Math.cos(_radians);
	            var _rotation = _position * limbRotationDistance * 2;
	            this.bones.rightLeg.rotation.x = -_rotation;
	            this.bones.leftLeg.rotation.x = _rotation;
	            this.bones.rightArm.rotation.x = _rotation;
	            this.bones.leftArm.rotation.x = -_rotation;
	            this.bones.head.rotation.y = _rotation / 4;
	            break;
	          }
	        default:
	          {
	            // nothing
	          }
	      }
	      // this.bones.head.rotation.y += 0.01;
	    }
	  }]);

	  return Player;
	}(THREE.Object3D);

	exports.default = Player;

/***/ })

/******/ });