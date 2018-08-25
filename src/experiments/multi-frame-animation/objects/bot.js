const botBone = {
  name: 'body',
  pivot: new THREE.Vector3(0, 0, 0),
  boxes: [
    {
      size: new THREE.Vector3(32, 64, 16),
      offset: new THREE.Vector3(0, 0, 0),
    },
  ],
  children: [
    {
      name: 'head',
      pivot: new THREE.Vector3(0, 32, 0),
      boxes: [
        {
          name: 'head',
          size: new THREE.Vector3(32, 32, 32),
          offset: new THREE.Vector3(0, 16, 0),
        },
        {
          name: 'eye',
          size: new THREE.Vector3(24, 8, 4),
          offset: new THREE.Vector3(0, 16, 16),
        },
      ],
      children: [],
    },
    {
      name: 'leftArm',
      pivot: new THREE.Vector3(24, 32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'rightArm',
      pivot: new THREE.Vector3(-24, 32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'leftLeg',
      pivot: new THREE.Vector3(8, -32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'rightLeg',
      pivot: new THREE.Vector3(-8, -32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
  ],
};


export default class Bot extends THREE.Object3D {
  constructor() {
    super();

    this.bones = {};

    this.addBone(this, botBone);
  //   const bodySize = new THREE.Vector3(30, 50, 15);
  //   const headSize = new THREE.Vector3(bodySize.x, bodySize.y / 4, bodySize.z);
  //   const armSize = new THREE.Vector3(bodySize.x / 2, bodySize.y * 3 / 5, bodySize.z / 4);
  //   const legSize = new THREE.Vector3(bodySize.x * 2 / 3, bodySize.y * 7 / 10, bodySize.z / 3);
  //
  //   const headPosition = new THREE.Vector3(
  //     0,
  //     bodySize.y / 2 + headSize.y / 2 + 1,
  //     0,
  //   );
  //
  //   const armJoint1Position = new THREE.Vector3(
  //     0,
  //     bodySize.y / 2,
  //     bodySize.z * 2 / 3,
  //   );
  //
  //   const armJoint2Position = new THREE.Vector3(
  //     0,
  //     bodySize.y / 2,
  //      -(bodySize.z * 2 / 3),
  //   );
  //
  //   const armPosition = new THREE.Vector3(
  //     0,
  //     armSize.y / 2,
  //     0,
  //   );
  //
  //   const legJoint1Position = new THREE.Vector3(
  //     0,
  //     -(bodySize.y / 2),
  //     bodySize.z / 4,
  //   );
  //
  //   const legJoint2Position = new THREE.Vector3(
  //     0,
  //     -(bodySize.y / 2),
  //     -(bodySize.z / 4),
  //   );
  //
  //   const legPosition = new THREE.Vector3(
  //     0,
  //     -(legSize.y / 2),
  //     0,
  //   );
  //
  //   const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
  //   const armGeometry = new THREE.BoxGeometry(armSize.x, armSize.y, armSize.z);
  //   const legGeometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
  //
  //   const bodyGeometry = new THREE.BoxGeometry(bodySize.x, bodySize.y, bodySize.z);
  //   this.body = new THREE.Mesh(bodyGeometry, material);
  //
  //   const headGeometry = new THREE.BoxGeometry(headSize.x, headSize.y, headSize.z);
  //   this.head = new THREE.Mesh(headGeometry, material);
  //   this.head.position.copy(headPosition);
  //
  //   this.arm1Joint = new THREE.Object3D();
  //   this.arm1Joint.position.copy(armJoint1Position);
  //
  //   this.arm1 = new THREE.Mesh(armGeometry, material);
  //   this.arm1.position.copy(armPosition);
  //   this.arm1Joint.add(this.arm1);
  //
  //   this.arm2Joint = new THREE.Object3D();
  //   this.arm2Joint.position.copy(armJoint2Position);
  //
  //   this.arm2 = new THREE.Mesh(armGeometry, material);
  //   this.arm2.position.copy(armPosition);
  //   this.arm2Joint.add(this.arm2);
  //
  //   this.leg1Joint = new THREE.Object3D();
  //   this.leg1Joint.position.copy(legJoint1Position);
  //
  //   this.leg1 = new THREE.Mesh(legGeometry, material);
  //   this.leg1.position.copy(legPosition);
  //   this.leg1Joint.add(this.leg1);
  //
  //   this.leg2Joint = new THREE.Object3D();
  //   this.leg2Joint.position.copy(legJoint2Position);
  //
  //   this.leg2 = new THREE.Mesh(legGeometry, material);
  //   this.leg2.position.copy(legPosition);
  //   this.leg2Joint.add(this.leg2);
  //
  //   this.add(this.body);
  //   this.add(this.head);
  //   this.add(this.arm1Joint);
  //   this.add(this.arm2Joint);
  //   this.add(this.leg1Joint);
  //   this.add(this.leg2Joint);
  }

  addBone(parent, bone) {
    const pivot = new THREE.Object3D();
    pivot.position.copy(bone.pivot);


    const pivotGeometry = new THREE.SphereGeometry(4, 4, 4);
    const pivotMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    });
    const pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);

    pivot.add(pivotMesh);

    const boxMaterial = new THREE.MeshLambertMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.8,
    });

    bone.boxes.forEach((box) => {
      const boxGeometry = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.copy(box.offset);
      pivot.add(boxMesh);
    });

    parent.add(pivot);

    this.bones[bone.name] = pivot;

    bone.children.forEach(child => this.addBone(pivot, child));
  }

  update() {
    this.bones.head.rotation.y += 0.01;
  }
}
