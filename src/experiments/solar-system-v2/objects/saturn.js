import Planet from './planet';
import { ONE_BILLION } from '../lib/constants';

const props = {
  color: 0xffd700,
  radius: 58232, // km
  orbitRadius: 1.4 * ONE_BILLION, // km
  orbitPeriod: 10759, // days
};

export default class Saturn extends Planet {
  constructor() {
    super(props);
  }
}
