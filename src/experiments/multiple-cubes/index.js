  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const VIEW_ANGLE = 45;
  const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
  const NEAR = 1;
  const FAR = 10000;

  let scene;
  let camera;
  let renderer;
  let controls;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(500, 500, 500);

    const gridHelper = new THREE.GridHelper(500, 10);
    scene.add(gridHelper);

    const axisHelper = new THREE.AxisHelper(500);
    scene.add(axisHelper);

    const size = 150;
    const gap = 40;
    const halfSize = size / 2;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshNormalMaterial({ wireframe: false });

    const box1 = new THREE.Mesh(geometry, material);
    box1.position.set(halfSize + 0, halfSize, halfSize + 0);
    scene.add(box1);

    const box2 = new THREE.Mesh(geometry, material);
    box2.position.set(halfSize + size + gap, halfSize, halfSize + 0);
    scene.add(box2);

    const box3 = new THREE.Mesh(geometry, material);
    box3.position.set(halfSize + 0, halfSize, halfSize + size + gap);
    scene.add(box3);

    const box4 = new THREE.Mesh(geometry, material);
    box4.position.set(halfSize + size + gap, halfSize, halfSize + size + gap);
    scene.add(box4);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  init();
  animate();
