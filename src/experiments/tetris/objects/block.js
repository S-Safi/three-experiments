export default class Block extends THREE.Object3D {

  constructor(props) {
    super();
    const { type } = props;

    const bodyGeometry = new THREE.BoxGeometry(25, 25, 25);
    const bodyMaterial = new THREE.MeshLambertMaterial(0x112233);
    let root = new THREE.Mesh(bodyGeometry, bodyMaterial);

    if (type === 1) {
      root.position.set(0, 0, 0);

      const arm1 = new THREE.Mesh(bodyGeometry, bodyMaterial);
      arm1.position.set(0, 25, 0);
      root.add(arm1);

      const arm2 = new THREE.Mesh(bodyGeometry, bodyMaterial);
      arm2.position.set(25, 0, 0);
      root.add(arm2);

      this.add(root);
    } else if (type === 2) {
      root.position.set(0, 0, 0);

      const arm1 = new THREE.Mesh(bodyGeometry, bodyMaterial);
      arm1.position.set(0, 25, 0);
      root.add(arm1);

      const arm2 = new THREE.Mesh(bodyGeometry, bodyMaterial);
      arm2.position.set(25, 0, 0);
      root.add(arm2);

      const arm3 = new THREE.Mesh(bodyGeometry, bodyMaterial);
      arm3.position.set(-25, 0, 0);
      root.add(arm3);

      this.add(root);
    } else if (type === 3) {
      const squareGeometry = new THREE.BoxGeometry(50, 50 / 3, 25);
      root = new THREE.Mesh(squareGeometry, bodyMaterial);
      root.position.set(0, 0, 0);

      const arm1 = new THREE.Mesh(squareGeometry, bodyMaterial);
      arm1.position.set(0, 50 / 3, 0);
      root.add(arm1);

      const arm2 = new THREE.Mesh(squareGeometry, bodyMaterial);
      arm2.position.set(0, -50 / 3, 0);
      root.add(arm2);

      this.add(root);
    } else if (type === 4) {
      const lineGeometry = new THREE.BoxGeometry(25, 100 / 3, 25);
      root = new THREE.Mesh(lineGeometry, bodyMaterial);
      root.position.set(0, 0, 0);

      const arm1 = new THREE.Mesh(lineGeometry, bodyMaterial);
      arm1.position.set(0, 100 / 3, 0);
      root.add(arm1);

      const arm2 = new THREE.Mesh(lineGeometry, bodyMaterial);
      arm2.position.set(0, -100 / 3, 0);
      root.add(arm2);

      this.add(root);
    }
  }

  rotateRight() {
    if (this.rotation.z === 0) {
      this.rotation.z = 3 / 2 * Math.PI;
    } else if (this.rotation.z === 1 / 2 * Math.PI) {
      this.rotation.z = 0;
    } else if (this.rotation.z === Math.PI) {
      this.rotation.z = 1 / 2 * Math.PI;
    } else if (this.rotation.z === 3 / 2 * Math.PI) {
      this.rotation.z = Math.PI;
    } else if (this.rotation.z === 2 * Math.PI) {
      this.rotation.z = 3 / 2 * Math.PI;
    }
  }

  rotateLeft() {
    if ((this.rotation.z === 0) || (this.rotation.z === 2 * Math.PI)) {
      this.rotation.z = 1 / 2 * Math.PI;
    } else if (this.rotation.z === 1 / 2 * Math.PI) {
      this.rotation.z = Math.PI;
    } else if (this.rotation.z === Math.PI) {
      this.rotation.z = 3 / 2 * Math.PI;
    } else if (this.rotation.z === 3 / 2 * Math.PI) {
      this.rotation.z = 2 * Math.PI;
    }
  }

}
