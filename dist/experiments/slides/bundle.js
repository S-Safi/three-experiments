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
	// let orbitControls;
	var keyboard = void 0;
	var axis = void 0;
	var animateDirection = 0;
	var animateRotation = 0;
	var materialFront = void 0;
	var materialRight = void 0;
	var materialBack = void 0;
	var materialLeft = void 0;

	var SPEED = Math.PI / 2 / 60;

	var PLANE_WIDTH = 180;
	var PLANE_HEIGHT = 100;

	var DISTANCE = 150;

	var key = {
	  LEFT: 'A',
	  RIGHT: 'D'
	};

	var slides = ['../../assets/textures/slides/slide1.JPG', '../../assets/textures/slides/slide2.JPG', '../../assets/textures/slides/slide3.JPG', '../../assets/textures/slides/slide4.JPG', '../../assets/textures/slides/slide5.JPG', '../../assets/textures/slides/slide6.JPG', '../../assets/textures/slides/slide7.JPG', '../../assets/textures/slides/slide8.JPG', '../../assets/textures/slides/slide9.JPG', '../../assets/textures/slides/slide10.JPG', '../../assets/textures/slides/slide11.JPG', '../../assets/textures/slides/slide12.JPG', '../../assets/textures/slides/slide13.JPG', '../../assets/textures/slides/slide14.JPG', '../../assets/textures/slides/slide15.JPG', '../../assets/textures/slides/slide16.JPG'];

	var textureLoader = new THREE.TextureLoader();
	var textures = slides.map(function (slide) {
	  return textureLoader.load(slide);
	});

	var nextTexture = 0;
	var currentTexture = 0;

	var indexAt = function indexAt(index) {
	  if (index < 0) {
	    return (textures.length - -index % textures.length) % textures.length;
	  }
	  return index % textures.length;
	};

	var textureAt = function textureAt(index) {
	  return textures[indexAt(index)];
	};

	function init() {
	  keyboard = new KeyboardState();

	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 0, 0);
	  camera.lookAt(new THREE.Vector3());
	  // camera.position.set(0, 0, DISTANCE - 10);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  // orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  // const gridHelper = new THREE.GridHelper(100, 10);
	  // scene.add(gridHelper);

	  // const axisHelper = new THREE.AxisHelper(100);
	  // scene.add(axisHelper);

	  // const markerGeometry = new THREE.SphereGeometry(5);
	  // const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	  // const marker = new THREE.Mesh(markerGeometry, markerMaterial);
	  // marker.position.setY(60);

	  axis = new THREE.Object3D();

	  var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);

	  var textureFront = textureAt(0);
	  materialFront = new THREE.MeshBasicMaterial({ map: textureFront, side: THREE.DoubleSide });
	  var planeFront = new THREE.Mesh(geometry, materialFront);
	  // planeFront.add(marker);
	  planeFront.position.setZ(-DISTANCE);
	  axis.add(planeFront);

	  var textureRight = textureAt(1);
	  materialRight = new THREE.MeshBasicMaterial({ map: textureRight, side: THREE.DoubleSide });
	  var planeRight = new THREE.Mesh(geometry, materialRight);
	  planeRight.position.setX(DISTANCE);
	  planeRight.rotateY(-Math.PI / 2);
	  axis.add(planeRight);

	  var textureLeft = textureAt(-1);
	  materialLeft = new THREE.MeshBasicMaterial({ map: textureLeft, side: THREE.DoubleSide });
	  var planeLeft = new THREE.Mesh(geometry, materialLeft);
	  planeLeft.position.setX(-DISTANCE);
	  planeLeft.rotateY(Math.PI / 2);
	  axis.add(planeLeft);

	  var textureBack = null;
	  materialBack = new THREE.MeshBasicMaterial({ map: textureBack, side: THREE.DoubleSide });
	  var planeBack = new THREE.Mesh(geometry, materialBack);
	  planeBack.position.setZ(DISTANCE);
	  planeBack.rotateY(-Math.PI);
	  axis.add(planeBack);

	  scene.add(axis);

	  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);
	}

	function update() {
	  keyboard.update();

	  if (animateDirection === 0) {
	    if (keyboard.pressed(key.LEFT)) {
	      animateDirection = -1;
	      nextTexture = indexAt(currentTexture - 1);
	      materialBack.map = textureAt(nextTexture - 1);
	      materialBack.needsUpdate = true;
	    }
	    if (keyboard.pressed(key.RIGHT)) {
	      animateDirection = 1;
	      nextTexture = indexAt(currentTexture + 1);
	      materialBack.map = textureAt(nextTexture + 1);
	      materialBack.needsUpdate = true;
	    }
	  } else {
	    var distance = SPEED * animateDirection;
	    animateRotation += distance;
	    if (animateRotation < -Math.PI / 2 || animateRotation > Math.PI / 2) {
	      animateDirection = 0;
	      animateRotation = 0;
	      currentTexture = nextTexture;
	      nextTexture = 0;

	      materialLeft.map = textureAt(currentTexture - 1);
	      materialLeft.needsUpdate = true;

	      materialFront.map = textureAt(currentTexture);
	      materialFront.needsUpdate = true;

	      materialRight.map = textureAt(currentTexture + 1);
	      materialRight.needsUpdate = true;

	      materialBack.map = null;
	      materialBack.needsUpdate = true;

	      axis.rotation.y = 0;
	    } else {
	      axis.rotation.y += distance;
	    }
	  }

	  // orbitControls.update();
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