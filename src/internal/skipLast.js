/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const skipLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }
  if (typeof count !== 'number') {
    throw new TypeError('expects count to be a number.');
  }
  if (count < 0) {
    throw new TypeError('expects "count" to be a positive number.');
  }

  return new Iterable(function* () {
    const buffer = [];
    let c = 0;
    for (const i of iterable) {
      if (count > 0) {
        buffer.push(i);
        if (c === count) {
          yield buffer.shift();
        } else {
          c += 1;
        }
      } else {
        yield i;
      }
    }
  });
};

export default skipLast;
