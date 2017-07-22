import Planet from './planet';
import { ONE_BILLION } from '../lib/constants';

const props = {
  color: 0x336699,
  radius: 24622, // km
  orbitRadius: 4.5 * ONE_BILLION, // km
  orbitPeriod: 165 * 365, // days
};

export default class Neptune extends Planet {
  constructor() {
    super(props);
  }
}
