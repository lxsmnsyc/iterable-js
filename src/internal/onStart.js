/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onStart = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.onStart (Iterable expected)');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.onStart (function expected)');
  }

  return new Iterable(function* () {
    fn();
    for (const i of iterable) {
      yield i;
    }
  });
};

export default onStart;
