
const loader = new THREE.TextureLoader();

class Planet extends THREE.Object3D {
  constructor(props) {
    super();
    this.props = props;

    // create planet
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

    // create orbit path
    const orbitGeometry = new THREE.CircleGeometry(props.orbitRadius, 64);
    orbitGeometry.vertices.shift();
    // removes the line from the center of the circle to the edge of the circle
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbitMesh = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitMesh.rotation.x = Math.PI / 2;
    this.orbitMesh = orbitMesh;
    this.add(orbitMesh);
  }

  update() {
    const x = this.props.orbitRadius * Math.cos(this.props.angle);
    const z = this.props.orbitRadius * Math.sin(this.props.angle);
    this.props.angle += this.props.speed;
    this.position.set(x, 0, z);
    this.orbitMesh.position.set(-x, 0, -z);
  }
}

export default Planet;
