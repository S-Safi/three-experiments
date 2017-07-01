import Planet from './planet';

const props = {
  color: 0x0000ff,
  radius: 6371, // km
  orbitRadius: 150000000, // km
  orbitPeriod: 365, // days
};

export default class Earth extends Planet {
  constructor() {
    super(props);
  }
}
