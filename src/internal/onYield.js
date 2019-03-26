/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onYield = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.onYield (Iterable expected)');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.onYield (function expected)');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      fn(i);
      yield i;
    }
  });
};

export default onYield;
