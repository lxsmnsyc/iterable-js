import concat from './concat';
import { isIterable } from './utils';
/**
 * @ignore
 */
const startWith = (iterable, ...iterables) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.startWith (Iterable expected)');
  }

  return concat(...iterables, iterable);
};

export default startWith;
