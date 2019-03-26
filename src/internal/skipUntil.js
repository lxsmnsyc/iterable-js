/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const skipUntil = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.skipUntil (Iterable expected)');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.skipUntil (function expected)');
  }
  return new Iterable(function* () {
    let flag = true;
    for (const i of iterable) {
      if (flag) {
        flag = !predicate(i);
      }
      if (!flag) {
        yield i;
      }
    }
  });
};

export default skipUntil;
