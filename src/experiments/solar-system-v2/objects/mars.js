import Planet from './planet';

const props = {
  color: 0xff0000,
  radius: 3390, // km
  orbitRadius: 230000000, // km
  orbitPeriod: 687, // days
};

export default class Mars extends Planet {
  constructor() {
    super(props);
  }
}
