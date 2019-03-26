/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const takeLast = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.takeLast (Iterable expected)');
  }
  if (typeof count !== 'number') {
    throw new TypeError('bad argument #2 to Iterable.takeLast (number expected)');
  }
  if (count < 0) {
    throw new TypeError('bad argument #2 to Iterable.takeLast (positive number expected)');
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
