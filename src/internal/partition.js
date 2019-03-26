import { isIterable } from './utils';
import filter from './filter';

/**
 * @ignore
 */
const partition = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.partition (Iterable expected)');
  }
  if (typeof filterFunc !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.partition (function expected)');
  }

  return [
    filter(iterable, filterFunc),
    filter(iterable, x => !filterFunc(x)),
  ];
};

export default partition;
