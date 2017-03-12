export default class Proton extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereBufferGeometry(30, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    super(geometry, material);
  }
}
