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
/***/ (function(module, exports) {

	'use strict';

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var keyboard = void 0;
	var slides = void 0;

	var key = {
	  LEFT: 'A',
	  RIGHT: 'D'
	};
	var viewPoint = new THREE.Vector3(0, 100, 0);

	function init() {
	  keyboard = new KeyboardState();

	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var geometry = new THREE.BoxGeometry(100, 50, 1);
	  var texture = new THREE.TextureLoader().load('./textures/bheevik.jpg');
	  var material = new THREE.MeshBasicMaterial({ map: texture });
	  var texture1 = new THREE.TextureLoader().load('./textures/diagram.png');
	  var material1 = new THREE.MeshBasicMaterial({ map: texture1 });

	  slides = new THREE.Mesh(geometry, material);
	  var slide1 = new THREE.Mesh(geometry, material1);
	  slide1.position.set(-110, 0, 0);

	  slides.add(slide1);

	  scene.add(slides);
	  slides.position.y = 100;

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, -50);
	  scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 100, -100);
	  camera.lookAt(viewPoint);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function update() {
	  keyboard.update();
	  // keyboard.debug();

	  if (keyboard.pressed(key.LEFT)) {
	    slides.position.x -= 2;
	  }
	  if (keyboard.pressed(key.RIGHT)) {
	    slides.position.x += 2;
	  }
	}

	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}

	init();
	animate();

/***/ })
/******/ ]);