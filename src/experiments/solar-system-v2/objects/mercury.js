import Planet from './planet';

const props = {
  // color: 0x888888,
  color: 0xffffff,
  radius: 2440, // km
  orbitRadius: 58000000, // km
  orbitPeriod: 88, // days
};

export default class Mercury extends Planet {

  constructor() {
    super(props);
  }
}
