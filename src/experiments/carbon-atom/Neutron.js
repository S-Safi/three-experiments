export default class Neutron extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereBufferGeometry(30, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    super(geometry, material);
  }
}
