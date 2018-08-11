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
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var geometry = void 0;
	var geometry2 = void 0;
	var geometry3 = void 0;
	var geometry4 = void 0;
	var material = void 0;
	var material2 = void 0;
	var material3 = void 0;
	var material4 = void 0;
	var mesh = void 0;
	var mesh2 = void 0;
	var mesh3 = void 0;
	var mesh4 = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  geometry = new THREE.SphereBufferGeometry(12, 64, 64);
	  geometry2 = new THREE.SphereBufferGeometry(12, 64, 64);
	  geometry3 = new THREE.SphereBufferGeometry(12, 64, 64);
	  geometry4 = new THREE.SphereBufferGeometry(12, 64, 64);
	  material = new THREE.MeshStandardMaterial(0xffffff);
	  material2 = new THREE.MeshStandardMaterial(0xffffff);
	  material3 = new THREE.MeshStandardMaterial(0xffffff);
	  material4 = new THREE.MeshStandardMaterial(0xffffff);

	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);

	  mesh2 = new THREE.Mesh(geometry2, material2);
	  scene.add(mesh2);

	  mesh3 = new THREE.Mesh(geometry3, material3);
	  scene.add(mesh3);

	  mesh4 = new THREE.Mesh(geometry4, material4);
	  scene.add(mesh4);

	  ambientLight = new THREE.AmbientLight(0xffffff);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(100, 100, 100);
	  scene.add(pointLight);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	var angle = 0;

	function update() {
	  var y = Math.sin(angle) * 25;
	  var y2 = Math.cos(angle) * 69;
	  var y3 = Math.tan(angle) * 24;
	  var y4 = Math.cos(angle) * 90;
	  angle += 0.05;
	  mesh.position.set(y, y2, y3);

	  mesh2.position.set(-y3, -y2, -y);

	  mesh3.position.set(-y3, -y4, y);

	  mesh4.position.set(y2, y3, y4);

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

/***/ })
/******/ ]);