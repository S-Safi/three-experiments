
const loader = new THREE.TextureLoader();

class Star extends THREE.Object3D {
  constructor(props) {
    super();
    this.props = props;

    const geometry = new THREE.SphereBufferGeometry(props.radius, 32, 32);
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

    // // create orbit path
    // const orbitGeometry = new THREE.CircleGeometry(props.orbitRadius, 64);
    // orbitGeometry.vertices.shift();
    // // removes the line from the center of the circle to the edge of the circle
    // const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    // const orbitMesh = new THREE.Line(orbitGeometry, orbitMaterial);
    // orbitMesh.rotation.x = Math.PI / 2;
    // this.orbitMesh = orbitMesh;
    // this.add(orbitMesh);
  }

}

export default Star;
