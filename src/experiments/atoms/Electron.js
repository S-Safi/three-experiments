export default class Electron extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereBufferGeometry(12.5, 16, 16);
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    super(geometry, material);
  }
}
