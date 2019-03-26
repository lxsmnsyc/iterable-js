import Iterable from '../iterable';
import { toGenerator } from './utils';

/**
 * @ignore
 */
const map = (iterable, mapper) => {
  if (!(iterable instanceof Iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof mapper === 'function') {
    return new Iterable(toGenerator(iterable, mapper));
  }
  return iterable;
};

export default map;
