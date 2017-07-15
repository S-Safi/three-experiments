export default class Orbit extends THREE.Object3D {

  constructor(radius) {
    super();
    // create orbit path
    const geometry = new THREE.CircleGeometry(radius, 64);
    // removes the line from the center of the circle to the edge of the circle
    geometry.vertices.shift();
    // geometry.rotateX(Math.PI / 2);
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const mesh = new THREE.Line(geometry, material);
    this.add(mesh);
  }
}
