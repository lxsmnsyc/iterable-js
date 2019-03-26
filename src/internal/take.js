/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const take = (iterable, count) => {
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
    let c = count;

    for (const i of iterable) {
      if (c > 0) {
        c -= 1;

        yield i;
      } else {
        return;
      }
    }
  });
};

export default take;
