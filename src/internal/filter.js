
import Iterable from '../iterable';
import { toGenerator, isIterable } from './utils';

/**
 * @ignore
 */
const filter = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof filterFunc === 'function') {
    return new Iterable(toGenerator(iterable, x => filterFunc(x) && x));
  }
  return iterable;
};

export default filter;
