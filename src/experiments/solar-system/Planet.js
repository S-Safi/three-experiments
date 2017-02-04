class Planet extends THREE.Object3D {
  constructor(props) {
    super();
  //  this.radius = props.radius;
    const geometry = new THREE.SphereBufferGeometry(props.radius, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: props.color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
}

export default Planet;
