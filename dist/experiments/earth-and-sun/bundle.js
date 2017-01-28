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
/***/ function(module, exports) {

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
	var sunGeometry = void 0;
	var earthGeometry = void 0;
	var sunMaterial = void 0;
	var earthMaterial = void 0;
	var sun = void 0;
	var earth = void 0;
	var controls = void 0;
	var ambientLight = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(300, 300, 300);
	  camera.lookAt(origin);

	  sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
	  earthGeometry = new THREE.SphereBufferGeometry(25, 16, 16);
	  sunMaterial = new THREE.MeshLambertMaterial();
	  earthMaterial = new THREE.MeshLambertMaterial();

	  sun = new THREE.Mesh(sunGeometry, sunMaterial);
	  scene.add(sun);

	  earth = new THREE.Mesh(earthGeometry, earthMaterial);
	  scene.add(earth);

	  ambientLight = new THREE.AmbientLight(0xffffff);
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

	  angle += 0.01;
	  sun.position.set(0, 0, 0);

	  angle += 0.01;
	  earth.position.set(-y, 0, y2);

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

/***/ }
/******/ ]);