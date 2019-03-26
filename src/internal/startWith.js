import concat from './concat';
import { isIterable } from './utils';
/**
 * @ignore
 */
const startWith = (iterable, ...iterables) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }

  return concat(...iterables, iterable);
};

export default startWith;
