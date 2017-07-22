import Planet from './planet';
import { ONE_MILLION } from '../lib/constants';

const props = {
  color: 0xff6347,
  radius: 69911, // km
  orbitRadius: 778 * ONE_MILLION, // km
  orbitPeriod: 4329, // days
};

export default class Jupiter extends Planet {
  constructor() {
    super(props);
  }
}
