
const loader = new THREE.TextureLoader();

class Planet extends THREE.Object3D {
  constructor(props) {
    super();
    this.props = props;
    const geometry = new THREE.SphereBufferGeometry(props.radius, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: props.color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    if (props.texture) {
      loader.load(
        // resource URL
        props.texture,
        // Function when resource is loaded
        (texture) => {
          material.map = texture;
          material.needsUpdate = true;
        },
      );
    }
  }

  update() {
    const x = this.props.orbitRadius * Math.cos(this.props.angle);
    const y = this.props.orbitRadius * Math.sin(this.props.angle);
    this.props.angle += this.props.speed;
    this.position.set(x, y, 0);
  }
}

export default Planet;
