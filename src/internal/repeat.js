/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const repeat = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.repeat (Iterable expected)');
  }
  if (typeof count !== 'number') {
    throw new TypeError('bad argument #2 to Iterable.repeat (number expected)');
  }
  if (count < 0) {
    throw new TypeError('bad argument #2 to Iterable.repeat (positive number expected)');
  }

  return new Iterable(function* () {
    for (let c = count; c > 0; c -= 1) {
      for (const i of iterable) {
        yield i;
      }
    }
  });
};

export default repeat;
