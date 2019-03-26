/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const skip = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.skip (Iterable expected)');
  }
  if (typeof count !== 'number') {
    throw new TypeError('bad argument #2 to Iterable.skip (number expected)');
  }
  if (count < 0) {
    throw new TypeError('bad argument #2 to Iterable.skip (positive number expected)');
  }

  return new Iterable(function* () {
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;
      } else {
        yield i;
      }
    }
  });
};

export default skip;
