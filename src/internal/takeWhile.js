/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const takeWhile = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.takeWhile (Iterable expected)');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.takeWhile (function expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield i;
      } else {
        return;
      }
    }
  });
};

export default takeWhile;
