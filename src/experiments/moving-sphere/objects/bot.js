export default class Bot extends THREE.Object3D {

  constructor(props) {
    super();
    const {
      name,
      radius,
      color,
      boundary,
      speed,
    } = props;

      const { x1, x2, z1, z2 } = boundary;


    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.name = name;
    this.radius = radius;
    this.speed = speed;

    this.targetPositions = [
      new THREE.Vector3(x1, radius, z1),
      new THREE.Vector3(x1, radius, z2),
      new THREE.Vector3(x2, radius, z2),
      new THREE.Vector3(x2, radius, z1),
    ];

    this.isMoving = false;
    this.targetPosition = this.targetPositions[1];

    this.position.copy(this.targetPositions[0]);
  }

  // hasFinishedMoving() {
  //   return !this.isMoving;
  // }
  // moveTo(x, y, z) {
  //   this.targetPosition.set(x, y, z);
  // }

  update(delta) {
    const distanceToMove = delta / 1000 * this.speed;
    const vectorToTarget = this.targetPosition.clone().sub(this.position);
    const distanceToTarget = this.position.distanceTo(this.targetPosition);
    const moveVector = (distanceToMove > distanceToTarget)
      ? vectorToTarget
      : vectorToTarget.normalize().multiplyScalar(distanceToMove);
    this.position.add(moveVector);
  }
}
