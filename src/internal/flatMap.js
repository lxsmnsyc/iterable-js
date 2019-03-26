import { isIterable } from './utils';
import flat from './flat';
import map from './map';

/**
 * @ignore
 */
const flatMap = (iterable, mapper) => {
  if (!(isIterable(iterable))) {
    throw new TypeError('bad argument #1 to Iterable.flatMap (Iterable expected)');
  }
  if (typeof mapper !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.flatMap (function expected)');
  }
  return flat(map(iterable, mapper));
};
export default flatMap;
