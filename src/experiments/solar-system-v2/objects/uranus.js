import Planet from './planet';
import { ONE_BILLION } from '../lib/constants';

const props = {
  color: 0xccffff,
  radius: 25362, // km
  orbitRadius: 3 * ONE_BILLION, // km
  orbitPeriod: 30660, // days
};

export default class Uranus extends Planet {
  constructor() {
    super(props);
  }
}
