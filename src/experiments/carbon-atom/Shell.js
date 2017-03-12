export default class Shell extends THREE.Line {

  constructor(props) {
    const { radius } = props;
    const geometry = new THREE.CircleGeometry(radius, 64);
    geometry.vertices.shift();
    const material = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.5,
    });
    super(geometry, material);
  }

}
