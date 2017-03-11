import Electron from './Electron';

export default class Atom extends THREE.Object3D {
  constructor(nucleus, electronCount) {
    super();
    this.electrons = [];
    this.add(nucleus);
    this.addElectrons(electronCount);
  }

  addElectrons(count) {
    for (let n = 0; n < count; n += 1) {
      const electron = new Electron();
      electron.position.z = n * 25;
      this.electrons.push(electron);
      this.add(electron);
    }
  }

  update(angle) {
    for (let i = 0; i < this.electrons.length; i += 1) {
      const z = Math.sin(angle) * i * 100;
      const x = Math.cos(angle) * i * 100;
      this.electrons[i].position.set(x, 0, z);
    }
  }
}
