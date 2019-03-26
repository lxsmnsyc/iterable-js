/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const repeat = (iterable, count) => {
  if (!isIterable(iterable)) {
    throw new TypeError('expects an object that implements the Iteration Protocol');
  }

  if (typeof count !== 'number') {
    throw new TypeError('expects "count" to be a number.');
  }

  if (count < 0) {
    throw new TypeError('expects "count" to be a positive number.');
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
