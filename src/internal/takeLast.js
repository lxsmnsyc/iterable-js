/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const takeLast = (iterable, count) => {
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

    for (const i of iterable) {
      if (count === 0) {
        yield i;
      } else {
        buffer.push(i);
      }
    }

    for (const i of buffer.slice(-count)) {
      yield i;
    }
  });
};

export default takeLast;
