export default class Bot extends THREE.Object3D {
  constructor() {
    super();
    const bodySize = new THREE.Vector3(15, 50, 30);
    const headSize = new THREE.Vector3(bodySize.x, bodySize.y / 4, bodySize.z);
    const armSize = new THREE.Vector3(bodySize.x / 2, bodySize.y * 3 / 5, bodySize.z / 4);
    const legSize = new THREE.Vector3(bodySize.x * 2 / 3, bodySize.y * 7 / 10, bodySize.z / 3);

    const headPosition = new THREE.Vector3(
      0,
      bodySize.y / 2 + headSize.y / 2 + 1,
      0,
    );

    const armJoint1Position = new THREE.Vector3(
      0,
      bodySize.y / 2,
      bodySize.z * 2 / 3,
    );

    const armJoint2Position = new THREE.Vector3(
      0,
      bodySize.y / 2,
       -(bodySize.z * 2 / 3),
    );

    const armPosition = new THREE.Vector3(
      0,
      armSize.y / 2,
      0,
    );

    const legJoint1Position = new THREE.Vector3(
      0,
      -(bodySize.y / 2),
      bodySize.z / 4,
    );

    const legJoint2Position = new THREE.Vector3(
      0,
      -(bodySize.y / 2),
      -(bodySize.z / 4),
    );

    const legPosition = new THREE.Vector3(
      0,
      -(legSize.y / 2),
      0,
    );

    const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const armGeometry = new THREE.BoxGeometry(armSize.x, armSize.y, armSize.z);
    const legGeometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);

    const bodyGeometry = new THREE.BoxGeometry(bodySize.x, bodySize.y, bodySize.z);
    this.body = new THREE.Mesh(bodyGeometry, material);

    const headGeometry = new THREE.BoxGeometry(headSize.x, headSize.y, headSize.z);
    this.head = new THREE.Mesh(headGeometry, material);
    this.head.position.copy(headPosition);

    this.arm1Joint = new THREE.Object3D();
    this.arm1Joint.position.copy(armJoint1Position);

    this.arm1 = new THREE.Mesh(armGeometry, material);
    this.arm1.position.copy(armPosition);
    this.arm1Joint.add(this.arm1);

    this.arm2Joint = new THREE.Object3D();
    this.arm2Joint.position.copy(armJoint2Position);

    this.arm2 = new THREE.Mesh(armGeometry, material);
    this.arm2.position.copy(armPosition);
    this.arm2Joint.add(this.arm2);

    this.leg1Joint = new THREE.Object3D();
    this.leg1Joint.position.copy(legJoint1Position);

    this.leg1 = new THREE.Mesh(legGeometry, material);
    this.leg1.position.copy(legPosition);
    this.leg1Joint.add(this.leg1);

    this.leg2Joint = new THREE.Object3D();
    this.leg2Joint.position.copy(legJoint2Position);

    this.leg2 = new THREE.Mesh(legGeometry, material);
    this.leg2.position.copy(legPosition);
    this.leg2Joint.add(this.leg2);

    this.add(this.body);
    this.add(this.head);
    this.add(this.arm1Joint);
    this.add(this.arm2Joint);
    this.add(this.leg1Joint);
    this.add(this.leg2Joint);
  }
  update() {
    this.arm1Joint.rotation.z += 0.05;
    this.arm2Joint.rotation.z -= 0.05;
    this.head.rotation.y += 0.05;
    this.leg1Joint.rotation.z -= 0.05;
    this.leg2Joint.rotation.z += 0.05;
  }
}
