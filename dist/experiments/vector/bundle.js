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

	"use strict";

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 0.1;
	var FAR = 20000;
	var size = 100;

	var controls = void 0;
	var renderer = void 0;
	var scene = void 0;
	var camera = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function renderGridHelper() {
	  var gridHelper = new THREE.GridHelper(size, 10);
	  scene.add(gridHelper);
	}

	function renderAxisHelper() {
	  var axisHelper = new THREE.AxisHelper(size);
	  scene.add(axisHelper);
	}

	function renderArrowHelper(v) {
	  var arrowDir = v.normalize();
	  var arrowLength = size;
	  var arrowColor = 0x0000ff;
	  var headLength = 10;
	  var headWidth = 10;
	  var arrowHelper = new THREE.ArrowHelper(arrowDir, origin, arrowLength, arrowColor, headLength, headWidth);

	  scene.add(arrowHelper);
	}

	function renderVectors(vectors) {
	  var previousVector = origin;
	  for (var i = 0; i < vectors.length; i += 1) {
	    var vector = vectors[i];
	    var vectorNormal = vector.clone().normalize();
	    var arrow = new THREE.ArrowHelper(vectorNormal, previousVector, vector.length());
	    scene.add(arrow);
	    previousVector = previousVector.add(vector);
	  }
	}

	function randomNumberInRange(min, max) {
	  var scale = max - min;
	  var offset = min;
	  return Math.random() * scale + offset;
	}

	function randomNumber() {
	  return randomNumberInRange(-10, 10);
	}

	function randomVector() {
	  return new THREE.Vector3(randomNumber(), randomNumber(), randomNumber());
	}

	function init() {
	  scene = new THREE.Scene();

	  renderGridHelper();
	  renderAxisHelper();

	  var vectors = [];
	  var numberOfVectors = 999;

	  for (var n = 1; n <= numberOfVectors; n += 1) {
	    var vector = randomVector();
	    vectors.push(vector);
	  }

	  renderVectors(vectors);
	  // const v2 = new THREE.Vector3(0, 1, 0);
	  // const v3 = v1.addScaledVector(v2, 7);
	  // console.log(v3);
	  //
	  // renderArrowHelper(v3);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);
	  scene.add(camera);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function animate() {
	  requestAnimationFrame(animate);
	  controls.update();
	  renderer.render(scene, camera);
	}

	init();
	animate();

/***/ })
/******/ ]);