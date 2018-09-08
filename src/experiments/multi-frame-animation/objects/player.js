const botBone = {
  name: 'body',
  pivot: [0, 0, 0],
  boxes: [
    {
      size: [32, 64, 16],
      offset: [0, 0, 0],
    },
  ],
  children: [
    {
      name: 'head',
      pivot: [0, 32, 0],
      boxes: [
        {
          name: 'head',
          size: [32, 32, 32],
          offset: [0, 16, 0],
        },
        {
          name: 'eye',
          size: [24, 8, 4],
          offset: [0, 16, 16],
        },
      ],
      children: [],
    },
    {
      name: 'leftArm',
      pivot: [24, 32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'rightArm',
      pivot: [-24, 32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'leftLeg',
      pivot: [8, -32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'rightLeg',
      pivot: [-8, -32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
  ],
};


const ANIMATION_WALKING = 'WALKING';
const ANIMATION_STANDING = 'STANDING';
const ANIMATION_RUNNING = 'RUNNING';

const limbRotationDistance = Math.PI / 6;
const cyclesPerSecond = 1;

export default class Player extends THREE.Object3D {
  constructor() {
    super();
    this.bones = {};
    this.addBone(this, botBone);
    this.timeElapsed = 0;
    this.stand();

    setInterval(
      () => {
        if (this.isWalking()) {
          this.run();
        } else {
          this.walk();
        }
      },
      3000,
    );
  }

  addBone(parent, bone) {
    const pivot = new THREE.Object3D();
    const [pivotX, pivotY, pivotZ] = bone.pivot;
    pivot.position.set(pivotX, pivotY, pivotZ);


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
      const [offsetX, offsetY, offsetZ] = box.offset;
      const [sizeX, sizeY, sizeZ] = box.size;
      const boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.set(offsetX, offsetY, offsetZ);
      pivot.add(boxMesh);
    });

    parent.add(pivot);

    this.bones[bone.name] = pivot;

    bone.children.forEach(child => this.addBone(pivot, child));
  }

  walk() {
    this.currentAnimation = ANIMATION_WALKING;
  }

  isWalking() {
    return this.currentAnimation === ANIMATION_WALKING;
  }

  run() {
    this.currentAnimation = ANIMATION_RUNNING;
  }

  isRunning() {
    return this.currentAnimation === ANIMATION_RUNNING;
  }

  stand() {
    this.currentAnimation = ANIMATION_STANDING;
  }

  update(delta) {
    this.timeElapsed += delta;
    switch (this.currentAnimation) {
      case ANIMATION_WALKING: {
        const radians = this.timeElapsed * Math.PI * 2 * cyclesPerSecond;
        const position = Math.cos(radians);
        const rotation = position * limbRotationDistance;
        this.bones.rightLeg.rotation.x = -rotation;
        this.bones.leftLeg.rotation.x = rotation;
        this.bones.rightArm.rotation.x = rotation;
        this.bones.leftArm.rotation.x = -rotation;
        this.bones.head.rotation.y = rotation / 2;
        break;
      }
      case ANIMATION_STANDING: {
        this.bones.rightLeg.rotation.x = 0;
        this.bones.leftLeg.rotation.x = 0;
        this.bones.rightArm.rotation.x = 0;
        this.bones.leftArm.rotation.x = 0;
        this.bones.head.rotation.y = 0;
        break;
      }
      case ANIMATION_RUNNING: {
        const radians = this.timeElapsed * Math.PI * 2 * cyclesPerSecond * 2;
        const position = Math.cos(radians);
        const rotation = position * limbRotationDistance * 2;
        this.bones.rightLeg.rotation.x = -rotation;
        this.bones.leftLeg.rotation.x = rotation;
        this.bones.rightArm.rotation.x = rotation;
        this.bones.leftArm.rotation.x = -rotation;
        this.bones.head.rotation.y = rotation / 4;
        break;
      }
      default: {
        // nothing
      }
    }
    // this.bones.head.rotation.y += 0.01;
  }
}
