/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable } from './utils';

/**
 * @ignore
 */
const filter = (iterable, filterFunc) => {
  if (!isIterable(iterable)) {
    throw new TypeError('bad argument #1 to Iterable.filter (Iterable expected)');
  }
  if (typeof filterFunc !== 'function') {
    throw new TypeError('bad argument #2 to Iterable.filter (function expected)');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (filterFunc(i)) {
        yield i;
      }
    }
  });
};

export default filter;
