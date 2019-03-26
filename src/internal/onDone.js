/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
import { isIterable } from './utils';
import Iterable from '../iterable';

/**
 * @ignore
 */
const onDone = (iterable, fn) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.onDone (Iterable expected)');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.onDone (function expected)');
  }

  return new Iterable(function* () {
    for (const i of iterable) {
      yield i;
    }
    fn();
  });
};

export default onDone;
