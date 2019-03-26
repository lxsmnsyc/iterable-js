import { isIterable } from './utils';
import skipWhile from './skipWhile';
import takeWhile from './takeWhile';

/**
 * @ignore
 */
const spanWith = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.spanWith (Iterable expected)');
  }
  if (typeof filterFunc !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.spanWith (function expected)');
  }

  return [
    takeWhile(iterable, filterFunc),
    skipWhile(iterable, filterFunc),
  ];
};

export default spanWith;
