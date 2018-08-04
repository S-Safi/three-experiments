export default class Bot extends THREE.Object3D {
  constructor() {
    super();
    const material = new THREE.MeshLambertMaterial({ color: 0x888888 });

    const bodyGeometry = new THREE.BoxGeometry(15, 50, 30);
    const body = new THREE.Mesh(bodyGeometry, material);

    const headGeometry = new THREE.BoxGeometry(15, 12.5, 30);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.setY(50 / 2 + 12.5 / 2 + 1);

    const arm1Geometry = new THREE.BoxGeometry(7.5, 30, 7.5);
    const arm1 = new THREE.Mesh(arm1Geometry, material);
    arm1.position.set(0, 7.5, 20);

    const arm2Geometry = new THREE.BoxGeometry(7.5, 30, 7.5);
    const arm2 = new THREE.Mesh(arm2Geometry, material);
    arm2.position.set(0, 7.5, -20);

    const leg1Geometry = new THREE.BoxGeometry(10, 35, 10);
    const leg1 = new THREE.Mesh(leg1Geometry, material);
    leg1.position.set(0, -30, 7.5);

    const leg2Geometry = new THREE.BoxGeometry(10, 35, 10);
    const leg2 = new THREE.Mesh(leg2Geometry, material);
    leg2.position.set(0, -30, -7.5);

    this.add(body);
    this.add(head);
    this.add(arm1);
    this.add(arm2);
    this.add(leg1);
    this.add(leg2);
  }
}
