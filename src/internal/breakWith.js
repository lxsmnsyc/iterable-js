import { isIterable } from './utils';
import takeUntil from './takeUntil';
import skipUntil from './skipUntil';

/**
 * @ignore
 */
const breakWith = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.breakWith (Iterable expected)');
  }
  if (typeof filterFunc !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.breakWith (function expected)');
  }

  return [
    takeUntil(iterable, filterFunc),
    skipUntil(iterable, filterFunc),
  ];
};

export default breakWith;
