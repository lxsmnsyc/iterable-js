/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

import Iterable from '../iterable';
import { isIterable, BadArgumentError, isFunction } from './utils';

/**
 * @ignore
 */
const filter = (iterable, predicate) => {
  if (!isIterable(iterable)) {
    throw new BadArgumentError(1, 'Iterable.filter', 'Iterable');
  }
  if (!isFunction(predicate)) {
    throw new BadArgumentError(2, 'Iterable.filter', 'function');
  }
  return new Iterable(function* () {
    for (const i of iterable) {
      if (predicate(i)) {
        yield i;
      }
    }
  });
};

export default filter;
