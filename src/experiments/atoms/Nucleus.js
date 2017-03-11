import Proton from './Proton';
import Neutron from './Neutron';

export default class Nucleus extends THREE.Object3D {
  constructor(protonCount, neutronCount) {
    super();
    this.protons = [];
    this.neutrons = [];
    this.addProtons(protonCount);
    this.addNeutrons(neutronCount);
  }

  addProtons(count) {
    for (let n = 0; n < count; n += 1) {
      const proton = new Proton();
      proton.position.x = n * 120;
      this.protons.push(proton);
      this.add(proton);
    }
  }

  addNeutrons(count) {
    for (let n = 0; n < count; n += 1) {
      const neutron = new Neutron();
      neutron.position.x = n * 120 + 60;
      this.neutrons.push(neutron);
      this.add(neutron);
    }
  }
}
