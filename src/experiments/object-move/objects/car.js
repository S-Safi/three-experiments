const rotationAngle = (Math.PI / 180) * 2;


export default class Car extends THREE.Object3D {

  constructor(props) {
    super();
    const { name, color, size } = props;

    const bodyGeometry = new THREE.BoxGeometry(size, size, size);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, size / 2, 0);

    const baseGeometry = new THREE.BoxGeometry(size, size / 2, size * 3);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -size / 4, 0);
    body.add(base);

    const arrowDirection = new THREE.Vector3(0, 0, 1).normalize();
    const arrowLength = size * 2;
    const arrowColor = 0x00aaff;
    const arrowPosition = new THREE.Vector3(0, 0, 0);
    const arrow = new THREE.ArrowHelper(arrowDirection, arrowPosition, arrowLength, arrowColor);
    body.add(arrow);

    this.add(body);

    this.name = name;
  }

  rotateLeft() {
    this.rotateY(rotationAngle);
  }

  rotateRight() {
    this.rotateY(-rotationAngle);
  }

// TODO: make the speed relative to the size of the car
// eg: speed = size / 50;
// multiply by forwardDirection
  moveForward() {
    const forwardDirection = this.getWorldDirection(); // note: This is a unit vector
    this.position.add(forwardDirection);
  }

  moveBackward() {
    const backwardDirection = this.getWorldDirection().negate();
    this.position.add(backwardDirection);
  }

}
